# @shellicar/core-foundation

[![Node.js](https://img.shields.io/badge/node-20-green)][node]
[![npm](https://img.shields.io/badge/npm-10.8.2-blue)][npm]
[![PNPM](https://img.shields.io/badge/pnpm-9.12.0-F69220)][pnpm]
[![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)][typescript]
[![Docker](https://img.shields.io/badge/docker-supported-blue)][docker]
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)][biome]
[![AI Assisted](https://img.shields.io/badge/AI--Assisted-ChatGPT-brightgreen)][chatgpt]

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

This section provides guidance on using **Node Version Manager (NVM)** for managing Node.js versions in your development environment.

Using **NVM** allows for a consistent Node.js version across all contributors' environments, which is especially important when working on projects that have specific version requirements.

### Setting Up NVM

To manage Node.js versions effectively:

1. **Install NVM**: The setup script in this repository will automatically install NVM if it is not already present. You can also follow the official [NVM installation instructions][nvm-install].

1. **Specify Node Version**: The required Node.js version is specified in the `.nvmrc` file. You can install the specified version by running:

   ```sh
   nvm use
   ```

   If the specified version is not installed, NVM will download it.

1. **Fallback Version**: If the `.nvmrc` file is missing, the script defaults to using `lts/*` to ensure a stable Node.js version is installed.

For more information on using NVM, visit the official [NVM documentation][nvm-usage].

## Monorepo Structure

This project utilizes a **monorepo** setup to manage multiple packages and projects in a single repository. The setup is powered by **Turbo** and **PNPM Workspaces** to handle task orchestration and dependency management.

### Turbo & PNPM Workspaces

- **PNPM Workspaces** provide a way to manage multiple packages in a single repository, allowing efficient dependency sharing between packages without redundancy.

- **Turbo** is used to speed up and orchestrate tasks, such as builds and tests, across different packages by using intelligent caching and parallel task execution.

### Configuration Files

- **`pnpm-workspace.yaml`**: This file defines which packages are part of the workspace. It allows PNPM to recognize and manage interdependencies between packages.

- **`turbo.json`**: This file is used to configure the Turbo build system, specifying tasks like building, testing, and linting. For more information on configuring Turbo, refer to the [Turbo documentation][turbo].

For more information on using PNPM Workspaces and Turbo, see their respective documentation:

- [PNPM Workspaces][pnpm-workspaces]
- [Turbo Configuration][turbo-config]

### Package Management & Syncing

This repository uses **PNPM** as the preferred package manager, supported by **Corepack** for version management. PNPM is chosen due to its efficiency and compatibility with monorepo structures.

### Using Corepack with PNPM

- **Corepack**: Corepack is included with recent Node.js versions and is used to manage package managers like PNPM. This ensures the correct version of PNPM is used as specified in the repository configuration.

- **Specifying PNPM Version**: The PNPM version used by the repository is specified in the `packageManager` field within `package.json`. To ensure that the correct version is being used, simply run:

  ```sh
  corepack prepare --activate
  ```

  This command activates the version specified in `package.json`.

- **Updating PNPM**: If an update is required for PNPM, you can run:

  ```sh
  corepack up
  ```

  This command updates the `packageManager` field to the latest version, which can then be activated using Corepack.

For more details, refer to the official [Corepack documentation][corepack].

### Syncpack

**Syncpack** is used in this repository to manage consistent dependency versions across packages in the monorepo. It ensures that the same versions of shared dependencies are used, avoiding version conflicts and reducing the risk of inconsistencies.

#### Syncpack Features

- **Dependency Alignment**: Ensures dependencies are correctly aligned across different packages.
- **List and Fix Mismatches**: Syncpack can identify mismatches in version numbers between packages and help in fixing them.

#### Helper Scripts

To simplify the use of Syncpack, there are predefined helper scripts configured in `package.json`:

- **List Mismatches**: Use the following command to check if there are any version mismatches across packages:

  ```sh
  pnpm list-mismatches
  ```

  This script runs `syncpack list-mismatches` under the hood to identify version inconsistencies.

- **Fix Mismatches**: To automatically fix any version mismatches, use:

  ```sh
  pnpm fix-mismatches
  ```

  This script runs `syncpack fix-mismatches` to align version numbers across all packages.

#### Configuration

Syncpack is configured using the `.syncpackrc` file in the repository. This file controls the rules for version alignment, ensuring consistency for all shared dependencies.

For more information, see the [Syncpack documentation][syncpack].

## GitVersion

**Semantic Versioning (SemVer)** is a widely adopted versioning scheme that uses the pattern `MAJOR.MINOR.PATCH`, where:

- **MAJOR**: Significant changes that may break backward compatibility.
- **MINOR**: New features added in a backward-compatible manner.
- **PATCH**: Bug fixes or small improvements that do not alter functionality.

SemVer is especially crucial for **libraries**, where versioning helps consumers understand compatibility. For **applications**, especially in cloud environments, versioning is often less about compatibility and more about identifying software versions for tracking deployments.

In this repository, versioning is used to **identify software**, rather than for strict version control. Since I follow a **Continuous Development** approach—where software progresses through different environments before being released—every commit to the `main` branch has the potential to be released.

I use **GitVersion** in **MainLine mode** to automatically generate version numbers that reflect the repository's current state. This helps uniquely identify each build or commit without manual intervention, which aligns well with a continuous development workflow.

To use **GitVersion**, you can run:

```sh
gitversion
```

This command outputs all version variables. You can also get specific version variables like `semver` by running:

```sh
gitversion -showvariable SemVer
```

For more details, refer to the [GitVersion documentation][gitversion-docs].

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

[nvm-install]: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
[nvm-usage]: https://github.com/nvm-sh/nvm?tab=readme-ov-file#usage
[pnpm-workspaces]: https://pnpm.io/workspaces
[turbo]: https://turbo.build/
[turbo-config]: https://turbo.build/repo/docs/reference/configuration

[corepack]: https://nodejs.org/api/corepack.html
[syncpack]: https://github.com/JamieMason/syncpack?tab=readme-ov-file#commands
[chatgpt]: https://openai.com/chatgpt
[biome]: https://biomejs.dev
[typescript]: https://www.typescriptlang.org/
[node]: https://nodejs.org/en
[npm]: https://www.npmjs.com/

[gitversion-docs]: https://gitversion.net/docs/

*This README was created with the assistance of [ChatGPT][chatgpt] by OpenAI.*
