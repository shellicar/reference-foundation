#!/bin/sh
set -e
. ../../.env

PackagePath="package.zip"
zip -FSr "$PackagePath" dist/ package.json host.json

echo "SubscriptionId=$SubscriptionId"
echo "UniqueId=$UniqueId"

# Remove dashes from UniqueId
SandboxId=$(echo "$UniqueId" | sed 's/-//g')
echo "SandboxId=$SandboxId"

# Trim Name and Group to 32 characters
Name=$(echo "func${SandboxId}" | cut -c 1-32)
Group="sandbox-${SandboxId}"
echo "Name=$Name"
echo "Group=$Group"

echo "Get Storage Account"
StorageUrl=$(az resource show --resource-type 'Microsoft.Web/Sites' --query 'properties.functionAppConfig.deployment.storage.value' -n "$Name" -g "$Group" --subscription "$SubscriptionId" -o tsv)
StorageName=$(echo "$StorageUrl" | sed -E 's|https://([^.]+)\.blob\.core\.windows\.net/.*|\1|')
ContainerName=$(echo "$StorageUrl" | sed -E 's|https://[^.]+\.blob\.core\.windows\.net/([^/]+).*|\1|')

echo "Storage Account Name=$StorageName"
echo "Container Name=$ContainerName"

echo "Get Credentials"
StorageKey=$(az storage account keys list -g "$Group" -n "$StorageName" --query "[0].value" --subscription "$SubscriptionId" -o tsv)

echo "Upload Blob"
az storage blob upload --overwrite --account-name "$StorageName" --account-key "$StorageKey" --container-name "$ContainerName" --file "$PackagePath" --subscription "$SubscriptionId" --name released-package.zip -o none

echo "Sync Function Triggers"
az resource invoke-action --action syncfunctiontriggers --resource-type 'Microsoft.Web/Sites' --query 'properties.functionAppConfig.deployment.storage.value' -n "$Name" -g "$Group" --subscription "$SubscriptionId"

echo "List Functions"
az functionapp function list -g "$Group" -n "$Name" --subscription "$SubscriptionId" --query "[].{name: config.name, methods: join(',', config.bindings[?type=='httpTrigger'].methods[] || ['None']), triggerType: config.bindings[0].type, url: invokeUrlTemplate || 'N/A'}" -o table
