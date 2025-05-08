# Infrastructure as Code

## Local Deployment

Create a .env file in the root directory: [`.env`](../.env).\
Ensure you have set the relevant environment variables.
There is an example env file you can use for reference here [`.env.example`](../.env.example).

|Name|Description|
|-|-|
|SubscriptionId|The Id of the Azure Subscription you wish to deploy to.|
|Location|The Azure location you wish to deploy to.|
|UniqueId|A unique Id to avoid conflicts with other Azure resources.|
|WorkspaceId|Log analytics resource Id for App Insights logging.|

Normally you would define each resource and group names explicitly.\
The `UniqueId` is just for demonstrative purposes.

## Resource Naming Conventions

For production environments, consider following Microsoft's best practices:

- [Define your naming convention](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming)
- [Abbreviation recommendations for Azure resources](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-abbreviations)

## Deployment Process

After setting up your environment variables, you can deploy the infrastructure by running:

```bash
$ cd infrastructure
$ ./deploy.sh
SubscriptionId=00000000-0000-0000-0000-000000000000
UniqueId=00000000-0000-0000-0000-000000000000
Suffix=250508-2138
Location=australiaeast
Name=core-250508-2138
```
