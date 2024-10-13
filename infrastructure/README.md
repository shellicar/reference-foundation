# infrastructure

## deployment

Ensure you have set the relevant environment variables in the root `.env` file located [here](../.env).

|Name|Description|
|-|-|
|SubscriptionId|The id of the Azure Subscription you wish to deploy to.|
|Location|The location you wish to deploy to.|
|UniqueId|A unique ide to avoid conflicts with the test resource group.|

Normally you would define each resource and group names explicitly.
