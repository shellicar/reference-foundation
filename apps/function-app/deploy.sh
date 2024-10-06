#!/bin/sh
set -e

PackagePath="package.zip"
Name="func3634e7489d4c564bbbcce9eed000"
Group="sandbox-3634e7489d4c564bbbcce9eed0001c13"
Subscription=""

zip -FSr "$PackagePath" dist/ package.json host.json

StorageUrl=$(az resource show --resource-type 'Microsoft.Web/Sites' --query 'properties.functionAppConfig.deployment.storage.value' -n "$Name" -g "$Group" --subscription "$Subscription" -o tsv)
StorageName=$(echo "$StorageUrl" | sed -E 's|https://([^.]+)\.blob\.core\.windows\.net/.*|\1|')
ContainerName=$(echo "$StorageUrl" | sed -E 's|https://[^.]+\.blob\.core\.windows\.net/([^/]+).*|\1|')

echo "Storage Account Name: $StorageName"
echo "Container Name: $ContainerName"

StorageKey=$(az storage account keys list -g "$Group" -n "$StorageName" --query "[0].value" --subscription "$Subscription" -o tsv)
az storage blob upload --overwrite --account-name "$StorageName" --account-key "$StorageKey" --container-name "$ContainerName" --file "$PackagePath" --subscription "$Subscription" --name released-package.zip -o none

az resource invoke-action --action syncfunctiontriggers --resource-type 'Microsoft.Web/Sites' --query 'properties.functionAppConfig.deployment.storage.value' -n "$Name" -g "$Group" --subscription "$Subscription"
