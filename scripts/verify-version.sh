#!/bin/sh
PACKAGE_NAME=$(cat .packagename)
FULL_VERSION=$(git show :packages/$PACKAGE_NAME/package.json | node -p "JSON.parse(require('fs').readFileSync(0)).version")
CHANGELOG=$(git show :CHANGELOG.md)

# Extract base version (x.y.z) from full version (x.y.z-preview.n)
BASE_VERSION=$(echo "$FULL_VERSION" | sed 's/^\([0-9]\+\.[0-9]\+\.[0-9]\+\).*/\1/')

# Check current base version has header
echo "$CHANGELOG" | egrep -q "^## \[$BASE_VERSION\] - [0-9]{4}-[0-9]{2}-[0-9]{2}\$"
if [ $? -ne 0 ]; then
  echo "Error: Version header [$BASE_VERSION] not found in CHANGELOG.md (package version: $FULL_VERSION)"
  exit 1
fi

# Check all version headers have link definitions
VERSIONS=$(echo "$CHANGELOG" | grep -o "^## \[[0-9]\+\.[0-9]\+\.[0-9]\+\]" | sed 's/## \[\(.*\)\]/\1/')
for v in $VERSIONS; do
  echo "$CHANGELOG" | egrep -q "^\[$v\]: https://github.com/shellicar/$PACKAGE_NAME/releases/tag/$v\$"
  if [ $? -ne 0 ]; then
    echo "Error: Missing or invalid link definition for version [$v]"
    exit 1
  fi
done

exit 0
