using './subscription.bicep'

param uuid = readEnvironmentVariable('UniqueId', '')
param workspaceId = readEnvironmentVariable('WorkspaceId', '')
param location = readEnvironmentVariable('Location', '')
