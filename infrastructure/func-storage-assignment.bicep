targetScope = 'resourceGroup'

@minLength(3)
param storageName string

@minLength(1)
param principalIds array

resource blobDataOwner 'Microsoft.Authorization/roleDefinitions@2022-04-01' existing = {
  name: 'b7e6dc6d-f1e8-4753-8033-0f276bb0955b'
  scope: subscription()
}

resource storage 'Microsoft.Storage/storageAccounts@2023-05-01' existing = {
  name: storageName
}

resource storageAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = [for i in principalIds: {
  name: guid(storage.id, blobDataOwner.name, i)
  scope: storage
  properties: {
    principalId: i
    roleDefinitionId: blobDataOwner.id
    principalType: 'ServicePrincipal'
  }
}]
