#!/bin/sh
Suffix=$(date +"%y%m%d-%H%M")
Project="core"
Location=${Location:-australiaeast}
Name="${Project}-${Suffix}"

echo "SubscriptionId=$SubscriptionId"
echo "UniqueId=$UniqueId"
echo "Suffix=$Suffix"
echo "Location=$Location"
echo "Name=$Name"

az deployment sub create --name "$Name" --location "$Location" --subscription "$SubscriptionId" --template-file subscription.bicep --parameters subscription.bicepparam
