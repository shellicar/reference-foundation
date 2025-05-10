using './main.bicep'

param workspaceId = readEnvironmentVariable('WORKSPACEID')
param location = readEnvironmentVariable('LOCATION')
param sandboxId = readEnvironmentVariable('SANDBOXID')

param mySecret = readEnvironmentVariable('MYSECRET')
