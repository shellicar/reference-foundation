#!/bin/bash
set -e
# Extract current versions
NODE_VERSION=$(node -v | sed -E 's/v([0-9]+)\..*/\1/')
NPM_VERSION=$(npm -v)
PNPM_VERSION=$(pnpm -v)

# Backup README.md
cp README.md README.md.bak

sed -i "s/badge\/node-.*-green/badge\/node-${NODE_VERSION}-green/g" README.md
sed -i "s/badge\/npm-.*-blue/badge\/npm-${NPM_VERSION}-blue/g" README.md
sed -i "s/badge\/pnpm-.*-F69220/badge\/pnpm-${PNPM_VERSION}-F69220/g" README.md

rm README.md.bak
