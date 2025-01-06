# @shellicar/core-foundation

[![Node.js](https://img.shields.io/badge/Node.js-20-5FA04E?logo=nodedotjs)][node]
[![npm](https://img.shields.io/badge/npm-10.8.2-CB3837?logo=npm)][npm]
[![PNPM](https://img.shields.io/badge/pnpm-9.15.3-F69220?logo=pnpm)][pnpm]
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)][typescript]
[![nvm](https://img.shields.io/badge/nvm-0.40-F4DD4B?logo=nvm)][typescript]
[![Docker](https://img.shields.io/badge/Docker-dev-2496ED?logo=docker)][docker]
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60A5FA?style=flat&logo=biome)][biome]
[![AI Assisted](https://img.shields.io/badge/AI--Assisted-ChatGPT-412991?logo=openai)][chatgpt]
[![VS Code](https://img.shields.io/badge/VS%20Code-IDE-007ACC?logo=visualstudiocode&logoColor=white)][vscode]

## Built Using

These are some of the key tools and technologies used to build and develop this project:

[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)][vite]
[![esbuild](https://img.shields.io/badge/esbuild-0.24-FFCF00?logo=esbuild)][esbuild]
[![TSX](https://img.shields.io/badge/TSX-4-3178C6)][tsx]
[![Cucumber](https://img.shields.io/badge/Cucumber-11-23D96C?logo=cucumber)][cucumber]
[![Mocha](https://img.shields.io/badge/Mocha-10-8D6748?logo=mocha)][mocha]
[![Chai](https://img.shields.io/badge/Chai-5-A30701?logo=chai)][chai]

## Runs On

These are some of the key dependencies required to run the applications:

[![@azure/functions](https://img.shields.io/badge/Azure%20Functions-4-0082FC?logo=github)][azure-functions]
[![GraphQL](https://img.shields.io/badge/GraphQL-16-E10098?logo=graphql)][graphql]
[![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte)][svelte]
[![Nuxt.js](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js)][nuxt]
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss)][tailwind]
[![Zod](https://img.shields.io/badge/Zod-3-3E67B1?logo=zod&logoColor=3E67B1)][zod]
[![js-joda](https://img.shields.io/badge/js--joda/core-5-2C3E50?logo=github)][js-joda]
[![Winston](https://img.shields.io/badge/Winston-3-5B8C5B?logo=github)][winston]
[![OpenTelemetry](https://img.shields.io/badge/OpenTelemetry-1-000000?logo=opentelemetry&logoColor=white)][opentelemetry]

---

`@shellicar/core-foundation` is a comprehensive starter repository created out of practical necessity to provide a solid foundation for building modern applications and services. It includes the tools and configurations I frequently use, helping streamline development and reduce repetitive setup tasks.

This repository brings together a range of technologies, including monorepo setups, linting, infrastructure as code, web frameworks, Docker Compose projects, and dependency injection. By using core-foundation, I aim to improve my own efficiency and share the practices that work well for me, hoping others might find them useful too.

## Table of Contents

- [Overview](#overview)
- [@shellicar Ecosystem](#shellicar-typescript-ecosystem)
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
  - [Building with esbuild](#building-with-esbuild)
- [Dependency Injection](#dependency-injection)
- [Logging and Monitoring](#logging-and-monitoring)
  - [Application Insights & Winston](#application-insights--winston)
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
  - [Unit Testing](#unit-testing)
  - [Acceptance Testing](#acceptance-testing)
- [Docker Compose Projects](#docker-compose-projects)
- [Infrastructure as Code](#infrastructure-as-code)
  - [Bicep](#bicep)
- [Documentation and Diagrams](#documentation-and-diagrams)
  - [Structurizr](#structurizr)

<!-- BEGIN_ECOSYSTEM -->

## @shellicar TypeScript Ecosystem

### Core Libraries

- [`@shellicar/core-config`](https://github.com/shellicar/core-config) - A library for securely handling sensitive configuration values like connection strings, URLs, and secrets.
- [`@shellicar/core-di`](https://github.com/shellicar/core-di) - A basic dependency injection library.
- [`@shellicar/core-foundation`](https://github.com/shellicar/core-foundation) - A comprehensive starter repository.

### Build Tools

- [`@shellicar/build-version`](https://github.com/shellicar/build-version) - Build plugin that calculates and exposes version information through a virtual module import.
- [`@shellicar/build-graphql`](https://github.com/shellicar/build-graphql) - Build plugin that loads GraphQL files and makes them available through a virtual module import.

### Framework Adapters

- [`@shellicar/svelte-adapter-azure-functions`](https://github.com/shellicar/svelte-adapter-azure-functions) - A [SvelteKit adapter](https://kit.svelte.dev/docs/adapters) that builds your app into an Azure Function.

### Logging & Monitoring

- [`@shellicar/winston-azure-application-insights`](https://github.com/shellicar/winston-azure-application-insights) - An [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) transport for [Winston](https://github.com/winstonjs/winston) logging library.
- [`@shellicar/pino-applicationinsights-transport`](https://github.com/shellicar/pino-applicationinsights-transport) - [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights) transport for [pino](https://github.com/pinojs/pino)

<!-- END_ECOSYSTEM -->

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

**Linting** and **formatting** are essential practices in software development. Linting helps identify potential issues in your code, such as syntax errors or stylistic inconsistencies, before they lead to bugs in production. This proactive approach enhances code quality and reduces the likelihood of runtime errors.

**Formatting** ensures that code adheres to a consistent style, making it easier to read and maintain. Consistent code styling promotes collaboration, as team members can quickly understand each other's work, leading to more effective teamwork.

### Biome

In this repository, I use **Biome** for linting and formatting. Biome offers a streamlined setup and ease of use, reducing the complexity often associated with configuring multiple packages. It integrates linting, formatting, and checking into a single tool, simplifying maintenance and configuration management.

The **`biome.json`** file is used for configuration, where the "recommended" rules are enabled along with some additional rules based on personal preferences. This ensures that the code adheres to best practices while accommodating specific coding styles.

For an enhanced development experience, I recommend using the Biome VS Code extension, which provides real-time feedback and highlights issues directly in your editor.

Key commands for using Biome include:

```sh
biome lint # linting
biome format # formatting
biome check # linting, formatting, and order imports
biome ci # https://biomejs.dev/recipes/continuous-integration
biome check --fix # fix issues
```

For more information, refer to the official [Biome documentation][biome]

## TypeScript Setup

This section covers the setup of TypeScript in the repository, including configuration and library compilation. It’s essential to use the correct targets, such as **ESM** (ECMAScript Module) and **CommonJS**, to ensure compatibility across different environments, whether for modern JavaScript runtime or Node.js applications.

### Shared tsconfig

A shared `tsconfig.json` file is used to maintain consistent TypeScript settings across projects. These shared configurations will be located in the `packages/typescript-config` package. This standardization helps avoid discrepancies between different parts of the codebase.

For more details on sharing `tsconfig.json`, refer to the [Turbo documentation on TypeScript][tsconfig-sharing].

### Library Configuration

**Tsup** is utilized in this repository for library configuration and TypeScript build setups. The configuration for `tsup` is defined in `tsup.config.ts`, allowing for fast and easy production of both ESM and CJS outputs, streamlining the build process for libraries.

For more information on configuring `tsup`, check out the official [tsup documentation][tsup].

### Building with esbuild

**esbuild** is a highly performant JavaScript and TypeScript bundler and minifier.

I use **esbuild** because it efficiently handles bundling, minifying, ESM output, and code splitting, making the TypeScript build process easier and faster compared to other tools.

The build process is configured using a `build.mts` file, which leverages **tsx** to execute the build commands. You can build or watch using the following commands:

```json
"build": "tsx build.mts",
"watch": "tsx build.mts --watch"
```

The `build.mts` script supports both production builds and watch mode for development, handling tasks like code splitting, outputting in ESM format, and creating a sourcemap.

For more information, visit [esbuild][esbuild].

## Dependency Injection

### Introduction to Dependency Injection

**Dependency Injection (DI)** is a design pattern that helps manage dependencies between classes by allowing them to be provided externally rather than having each class create them itself. This results in better separation of concerns, modularity, and makes applications easier to test and maintain.

### Why Use Dependency Injection in JavaScript/TypeScript?

In JavaScript/TypeScript, DI helps reduce manual dependency management, which can become cumbersome in complex applications. By decoupling the instantiation of objects from the application logic, DI promotes modularity and makes testing more straightforward by allowing easy injection of mock services.

### Existing Dependency Injection Solutions

Several DI solutions exist for JavaScript/TypeScript, including: `awilix`, `didi`, `diod`, `InversifyJS`, and `tsyringe`.

Each of these libraries has its own approach and trade-offs.

### Why Write a Custom DI Library?

I decided to write **`@shellicar/core-di`** because my requirements were fairly simple, yet none of the available solutions seemed to fit them perfectly. This library focuses on providing essential features without unnecessary complexity. For more information, visit [@shellicar/core-di on GitHub](https://github.com/shellicar/core-di).

### Basic Setup and Usage

For basic setup and usage of `@shellicar/core-di`, refer to the [core-di documentation](https://github.com/shellicar/core-di). It includes details on creating a container, registering services, and resolving dependencies, covering both fundamental and advanced features.

## Logging and Monitoring

Effective logging and monitoring are crucial for maintaining the health and performance of applications. They provide insights into application behavior, help identify issues, and allow for proactive maintenance. This repository leverages **Application Insights** for telemetry and performance monitoring, along with **Winston** for flexible logging.

### Application Insights & Winston

In this setup, I'm using the **@opentelemetry/*** package suite along with **Application Insights 3.x** and **Winston**. Currently, I am migrating from Application Insights 2.x and experimenting with the best configuration for centralized logging and monitoring.

#### Logging Configuration

- **Winston** is used as the logging library, providing a robust and customizable logging solution.
- The following transports are integrated:
  - **ApplicationInsightsExceptionTransport**: A custom transport that logs error-like objects at error level or higher as exceptions in Application Insights. This helps capture and categorize errors effectively.
  - **OpenTelemetryTransportV3**: This transport facilitates sending telemetry data to Application Insights via OpenTelemetry, ensuring comprehensive monitoring across various application layers.
  - **Console Transport**: This transport outputs logs to the console for local development and debugging.

### Use of OpenTelemetry

The `useAzureMonitor` function from the Azure OpenTelemetry library is utilized for tracking other performance metrics and telemetry data. This integration enables enhanced observability of the application.

For more details on integrating Application Insights and Winston, refer to the official [Application Insights documentation][app-insights-overview] and [Winston documentation][winston].

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

### Unit Testing

How Mocha and TSX are used to run tests and ensure application stability.

### Acceptance Testing

Acceptance testing ensures that software behaves as expected from a business perspective by validating workflows and enforcing rules. Unlike unit tests, which focus on individual components, acceptance tests ensure that business processes and rules are correctly implemented and followed.

Cucumber is used for writing acceptance tests, utilizing the `Given-When-Then` format defined by Gherkin. This structure provides a clear, human-readable way to describe features, ensuring that both technical and non-technical stakeholders can collaborate effectively.

For more details, visit the [Gherkin Reference][gherkin].

### Demo: EmployeeAggregate

The `EmployeeAggregate` represents the root of a domain model related to employee changes, enforcing important business rules such as "The CEO must be located in America." This pattern comes from Domain-Driven Design (DDD), where an aggregate root manages business logic and consistency within a defined boundary.

For more information on aggregate roots, refer to [Domain-Driven Design][ddd-fowler].

Find the complete demo and the `.feature` file in the [`packages/atdd-tests`](./packages/atdd-tests) directory.

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
[pnpm]: https://pnpm.io
[gitversion]: https://gitversion.net/docs
[azure-functions-core-tools]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local
[docker]: https://www.docker.com
[azure-cli]: https://learn.microsoft.com/en-us/cli/azure
[bicep]: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep

[nvm-install]: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
[nvm-usage]: https://github.com/nvm-sh/nvm?tab=readme-ov-file#usage
[pnpm-workspaces]: https://pnpm.io/workspaces
[turbo]: https://turbo.build
[turbo-config]: https://turbo.build/repo/docs/reference/configuration

[corepack]: https://nodejs.org/api/corepack.html
[syncpack]: https://github.com/JamieMason/syncpack?tab=readme-ov-file#commands
[chatgpt]: https://openai.com/chatgpt
[biome]: https://biomejs.dev
[typescript]: https://www.typescriptlang.org
[node]: https://nodejs.org/en
[npm]: https://www.npmjs.com

[gitversion-docs]: https://gitversion.net/docs
[tsup]: https://github.com/egoist/tsup
[tsconfig-sharing]: https://turbo.build/repo/docs/guides/toolstypescript#sharing-tsconfigjson
[esbuild]: https://esbuild.github.io

[app-insights-overview]: https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview
[winston]: https://github.com/winstonjs/winston
[tailwind]: https://tailwindcss.com
[vite]: https://vitejs.dev
[azure-functions]: https://www.npmjs.com/package/@azure/functions
[graphql]: https://www.npmjs.com/package/graphql
[svelte]: https://svelte.dev
[nuxt]: https://nuxtjs.org
[opentelemetry]: https://opentelemetry.io
[zod]: https://github.com/colinhacks/zod
[js-joda]: https://js-joda.github.io/js-joda
[vscode]: https://code.visualstudio.com

[cucumber]: https://cucumber.io/docs
[mocha]: https://mochajs.org
[chai]: https://www.chaijs.com
[tsx]: https://github.com/privatenumber/tsx

[gherkin]: https://cucumber.io/docs/gherkin/reference
[ddd-fowler]: https://martinfowler.com/bliki/DomainDrivenDesign.html

*This README was created with the assistance of [ChatGPT][chatgpt] by OpenAI.*
