param workspaceId string

@maxLength(36)
@minLength(36)
param sandboxId string
param location string

@secure()
param mySecret string

@maxLength(32)
@minLength(32)
param resourceSuffix string = replace(sandboxId, '-', '')

@maxLength(32)
param funcName string = substring('func${resourceSuffix}', 0, 32)
@maxLength(32)
param planName string = substring('plan${resourceSuffix}', 0, 32)
@maxLength(24)
param storageName string = substring('st${resourceSuffix}', 0, 24)
@maxLength(32)
param insightsName string = substring('appi${resourceSuffix}', 0, 32)

var functionId = resourceId('Microsoft.Web/sites', funcName)
var containerName = 'app-package-${funcName}-${substring(uniqueString(functionId, storageName), 0, 7)}'

module storage 'br/public:avm/res/storage/storage-account:0.14.1' = {
  name: '${deployment().name}-storage-api'
  params: {
    name: storageName
    requireInfrastructureEncryption: false
    allowBlobPublicAccess: false
    blobServices: {
      containers: [
        {
          name: containerName
          publicAccess: 'None'
        }
      ]
    }
    location: location
    networkAcls: {
      bypass: 'None'
      defaultAction: 'Allow'
      virtualNetworkRules: []
    }
    sasExpirationPeriod: '180.00:00:00'
    skuName: 'Standard_LRS'
  }
}

module serverfarm 'br/public:avm/res/web/serverfarm:0.2.3' = {
  name: '${deployment().name}-plan'
  params: {
    name: planName
    kind: 'FunctionApp'
    location: location
    skuCapacity: 0
    skuName: 'FC1'
    reserved: true
    zoneRedundant: false
  }
}

resource func 'Microsoft.Web/sites@2023-12-01' = {
  name: funcName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  kind: 'functionapp,linux'
  properties: {
    reserved: true
    httpsOnly: true
    enabled: true
    publicNetworkAccess: 'Enabled'
    clientAffinityEnabled: false
    serverFarmId: serverfarm.outputs.resourceId
    functionAppConfig: {
      deployment: {
        storage: {
          type: 'blobContainer'
          value: 'https://${storage.outputs.name}.blob.${environment().suffixes.storage}/${containerName}'
          authentication: {
            type: 'SystemAssignedIdentity'
          }
        }
      }
      runtime: {
        name: 'node'
        version: '20'
      }
      scaleAndConcurrency: {
        maximumInstanceCount: 40
        instanceMemoryMB: 2048
        alwaysReady: []
      }
    }
  }

  resource web 'config' = {
    name: 'web'
    properties: {
      http20Enabled: true
      alwaysOn: false
      use32BitWorkerProcess: false
      scmType: 'None'
      scmMinTlsVersion: '1.2'
      defaultDocuments: []
      numberOfWorkers: 1
      netFrameworkVersion: 'v4.0'
      healthCheckPath: ''
      ipSecurityRestrictionsDefaultAction: 'Allow'
      ipSecurityRestrictions: []
      cors: {
        allowedOrigins: ['https://portal.azure.com']
        supportCredentials: true
      }
      minTlsVersion: '1.2'
      ftpsState: 'FtpsOnly'
      preWarmedInstanceCount: 0
      functionAppScaleLimit: null
      minimumElasticInstanceCount: 0
    }
  }
}

module assignment 'func-storage-assignment.bicep' = {
  name: '${deployment().name}-assignment'
  params: {
    principalIds: [func.identity.principalId]
    storageName: storage.outputs.name
  }
}

resource insights 'Microsoft.Insights/components@2020-02-02' = {
  name: insightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Bluefield'
    IngestionMode: 'LogAnalytics'
    RetentionInDays: 30
    WorkspaceResourceId: workspaceId
  }

  resource current 'pricingPlans@2017-10-01' = {
    name: 'current'
    properties: {
      cap: json('0.5')
      planType: 'Basic'
      warningThreshold: 90
      stopSendNotificationWhenHitCap: false
      stopSendNotificationWhenHitThreshold: false
    }
  }
}

resource flexAppSettings 'Microsoft.Web/sites/config@2023-12-01' = {
  name: 'appsettings'
  parent: func
  properties: {
    FUNCTIONS_EXTENSION_VERSION: '~4'
    APPINSIGHTS_INSTRUMENTATIONKEY: insights.properties.InstrumentationKey
    APPLICATIONINSIGHTS_CONNECTION_STRING: insights.properties.ConnectionString
    NODE_ENV: 'development'
    AzureWebJobsStorage__accountName: storage.outputs.name
    AzureWebJobsStorage__credential: 'managedidentity'
  }
}

#disable-next-line outputs-should-not-contain-secrets demonstrative purposes only
output mySecret string = mySecret
