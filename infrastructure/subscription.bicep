targetScope = 'subscription'

@minLength(1)
param workspaceId string

@secure()
param mySecret string

@maxLength(36)
@minLength(36)
param uuid string
@minLength(1)
param location string

var sandboxId = replace(uuid, '-', '')

resource group 'Microsoft.Resources/resourceGroups@2024-06-01-preview' = {
  name: 'sandbox-${sandboxId}'
  location: location
}

module main 'main.bicep' = {
  name: '${deployment().name}-group'
  scope: group
  params: {
    workspaceId: workspaceId
    sandboxId: sandboxId
    location: location
  }
}

#disable-next-line outputs-should-not-contain-secrets demonstrative purposes only
output mySecret string = mySecret
