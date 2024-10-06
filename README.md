# @shellicar/core-foundation

`@shellicar/core-foundation` is a comprehensive starter repository created out of practical necessity to provide a solid foundation for building modern applications and services. It includes the tools and configurations I frequently use, helping streamline development and reduce repetitive setup tasks.

This repository brings together a range of technologies, including monorepo setups, linting, infrastructure as code, web frameworks, Docker Compose projects, and dependency injection. By using core-foundation, I aim to improve my own efficiency and share the practices that work well for me, hoping others might find them useful too.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Setup Script](#setup-script)
- [Cloud Platform Focus](#cloud-platform-focus)
- [Tools Overview](#tools-overview)
- [Node Version Management](#node-version-management)
- [Monorepo Structure](#monorepo-structure)
  - [Turbo & PNPM Workspaces](#turbo--pnpm-workspaces)
  - [Package Management & Syncing](#package-management--syncing)
  - [Syncpack](#syncpack)
  - [GitVersion](#gitversion)
- [Linting and Formatting](#linting-and-formatting)
  - [Biome](#biome)
- [TypeScript Setup](#typescript-setup)
  - [Shared tsconfig](#shared-tsconfig)
  - [Library Configuration](#library-configuration)
- [Dependency Injection](#dependency-injection)
  - [@shellicar/core-di](#shellicarcore-di)
- [Logging and Monitoring](#logging-and-monitoring)
  - [App Insights & Winston](#app-insights--winston)
- [Function Applications](#function-applications)
  - [Azure Function App Setup](#azure-function-app-setup)
  - [GraphQL in Function Apps](#graphql-in-function-apps)
- [GraphQL Code Generation](#graphql-code-generation)
- [Web Applications](#web-applications)
  - [Svelte Web App](#svelte-web-app)
  - [Nuxt Web App](#nuxt-web-app)
  - [UI Libraries with ShadCN](#ui-libraries-with-shadcn)
  - [Form Handling](#form-handling)
- [Testing](#testing)
  - [Mocha & TSX](#mocha--tsx)
- [Docker Compose Projects](#docker-compose-projects)
- [Infrastructure as Code](#infrastructure-as-code)
  - [Bicep](#bicep)
- [Documentation and Diagrams](#documentation-and-diagrams)
  - [Structurizr](#structurizr)

## Overview

**@shellicar/core-foundation** is designed to provide an opinionated starting point for building projects efficiently. This repository serves as a boilerplate for various configurations and setups across web, server, and infrastructure domains.

## Getting Started

### Setup Script

Run the setup script to install all required dependencies, including PNPM, Docker, Azure CLI, Bicep, and more. This script is designed to set up all necessary development tools and dependencies needed for contributing to this repository.

> Note: I primarily use WSL2 for development, so compatibility with other platforms may vary, and not all platforms are fully supported.

```sh
./setup.sh
```

This will:

- Detect whether this is linux or macOS architecture
- Check for versions of nvm and `gitversion` based on a version specifier.
- Install NVM
- Install Node based on either the version in `.nvmrc` or the `SETUP_NODE_FALLBACK_VERSION`
- Install PNPM using `corepack`.
  - This will use the version specified in the package.json `packageManager`.
- Install GitVersion CLI
- Install latest Azure Functions Core Tools
- Install latest Docker
- Install latest Azure CLI

Previously, I created the script to be sourced directly. For the best results, you should restart your shell after running the script.

If you run into rate limits from GitHub, then set the `GITHUB_TOKEN` environment variable with your [GitHub token][github-token].

## Cloud Platform Focus

The primary cloud platform used in this repository is **Azure**. Many of the tools and configurations are oriented towards working efficiently with Azure services, such as Azure Functions, Azure Key Vault, and Azure CLI.

However, other tools used in the repository, such as Docker, Node.js, and various utilities, are cloud-agnostic and can be adapted to work in different environments if needed.

This means the core setup should still be applicable even if not using Azure as your primary cloud provider.

## Tools Overview

Below, you'll find a brief overview of the tools used in this repository, along with links to their official documentation.

### NVM

[NVM (Node Version Manager)][nvm] is a tool that allows you to easily manage multiple versions of Node.js. This is particularly useful for switching between different versions as needed.

The version of Node.js can be specified in the `.nvmrc` file. To use a different Node.js version, simply update the `.nvmrc` file accordingly.

### PNPM

[PNPM][pnpm] is a fast, disk space-efficient package manager for Node.js. It uses symlinks to avoid unnecessary duplication of dependencies and supports monorepos well.

PNPM is stricter than other package managers about using packages that are not explicitly referenced in the `package.json`. This helps ensure that only the required dependencies are being used and no undeclared dependencies are utilized.

### GitVersion

[GitVersion][gitversion] is a tool that provides semantic versioning based on your Git repository history. It helps standardize version numbers across different projects.

In this repository, GitVersion is used solely for generating a version number. Other versioning tools often attempt to include deployment tasks, which is unnecessary here.

The versioning configuration is provided in the `GitVersion.yml` file. Note that GitVersion v6 introduces changes to the version file format compared to earlier versions.

### Azure Functions Core Tools

[Azure Functions Core Tools][azure-functions-core-tools] allow you to run Azure Functions locally for development and testing. They provide the command-line interface needed for working with Azure Functions outside of the cloud environment.

It is recommended to install Azure Functions Core Tools globally rather than as a local dependency through npm, as re-downloading it as part of the packages can be slow and redundant. Additionally, the version used in Azure cloud is independent of the local version, making it unnecessary to bundle it with your dependencies.

### Docker

[Docker][docker] is a platform for developing, shipping, and running applications inside containers. Containers allow you to package an application with all its dependencies to run consistently across different environments.

In this repository, Docker is used exclusively for supporting development tools, such as Azurite (Azure Storage emulator), code generation tools, Structurizr (for diagrams), and databases like MongoDB or CosmosDB. Docker is not used for deployment or running the main application itself.

### Azure CLI

[Azure CLI][azure-cli] is a command-line tool for managing Azure resources. It allows you to interact with Azure services from your terminal, and also authenticate with Azure resources such as Key Vault when running applications locally.

Azure CLI also includes the [Bicep][bicep] tool, which is used for infrastructure as code. To keep Bicep up to date, you can use the command `az bicep upgrade`.

## Node Version Management

This section will explain how to use Node Version Manager (NVM) for managing Node.js versions in your development environment.

## Monorepo Structure

### Turbo & PNPM Workspaces

Details on how to set up and use Turbo with PNPM workspaces for managing a monorepo efficiently.

### Package Management & Syncing

Overview of package management strategies and synchronization practices.

### Syncpack

Explanation of using `Syncpack` to manage consistent dependency versions across the monorepo.

### GitVersion

Usage details and configurations for GitVersion in managing semantic versioning.

## Linting and Formatting

### Biome

Explanation of how to use Biome for linting and code formatting across the project to ensure consistent coding standards.

## TypeScript Setup

### Shared tsconfig

Details on configuring and using a shared `tsconfig.json` to maintain consistent TypeScript settings across projects.

### Library Configuration

Overview of using `tsup` for library configuration and TypeScript build setups.

## Dependency Injection

### @shellicar/core-di

An overview of how the custom dependency injection library, `@shellicar/core-di`, is used to manage service dependencies throughout the application.

## Logging and Monitoring

### App Insights & Winston

Details on integrating Application Insights and Winston logging, and how they are configured for centralized logging and monitoring.

## Function Applications

### Azure Function App Setup

Steps and best practices for setting up Azure Function Apps for serverless application logic.

### GraphQL in Function Apps

How GraphQL is integrated with Azure Function Apps for handling complex queries and mutations.

## GraphQL Code Generation

Overview of using GraphQL code generation to create TypeScript types and hooks for interacting with GraphQL endpoints.

## Web Applications

### Svelte Web App

Details on the Svelte setup for building modern web applications, along with usage of the static adapter.

### Nuxt Web App

Details on setting up a Nuxt web application without server-side rendering (SSR).

### UI Libraries with ShadCN

Explanation of using ShadCN to create reusable UI components across the Svelte and Nuxt applications.

### Form Handling

Overview of setting up simple form handling using `sveltekit-superforms`.

## Testing

### Mocha & TSX

How Mocha and TSX are used to run tests and ensure application stability.

## Docker Compose Projects

Details on Docker Compose projects that are included for development purposes, such as databases, codegen tools, and other supporting services.

## Infrastructure as Code

### Bicep

How Bicep is used for managing infrastructure as code in Azure, with examples and best practices.

## Documentation and Diagrams

### Structurizr

Details on how Structurizr is used to create architectural diagrams for documentation purposes.

---

[github-token]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
[nvm]: https://github.com/nvm-sh/nvm
[pnpm]: https://pnpm.io/
[gitversion]: https://gitversion.net/docs/
[azure-functions-core-tools]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local
[docker]: https://www.docker.com/
[azure-cli]: https://learn.microsoft.com/en-us/cli/azure/
[bicep]: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/
