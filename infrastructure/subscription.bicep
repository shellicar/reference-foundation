targetScope = 'subscription'

@maxLength(32)
param uuid string = replace(guid(uniqueString(subscription().subscriptionId), '0'), '-', '')
param location string

resource group 'Microsoft.Resources/resourceGroups@2024-06-01-preview' = {
  name: 'sandbox-${uuid}'
  location: location
}

module main 'main.bicep' = {
  name: '${deployment().name}-group'
  scope: group
  params: {
    uuid: uuid
    location: location
  }
}
