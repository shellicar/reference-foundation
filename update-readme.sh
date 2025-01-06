#!/bin/bash
set -euo pipefail

NODE_VERSION=$(node -v | sed -E 's/v([0-9]+)\..*/\1/')
NPM_VERSION=$(npm -v)
PNPM_VERSION=$(pnpm -v)
TYPESCRIPT_VERSION=$(pnpm tsc --version | sed -E 's/Version ([0-9]+)\..*/\1/')

cp README.md README.md.bak

sed -i "s/badge\/Node.js-.*-/badge\/Node.js-${NODE_VERSION}-/g" README.md
sed -i "s/badge\/npm-.*-/badge\/npm-${NPM_VERSION}-/g" README.md
sed -i "s/badge\/pnpm-.*-/badge\/pnpm-${PNPM_VERSION}-/g" README.md
sed -i "s/badge\/TypeScript-.*-/badge\/TypeScript-${TYPESCRIPT_VERSION}-/g" README.md

# rm README.md.bak
