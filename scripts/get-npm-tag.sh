#!/bin/sh

get_npm_tag() {
  VERSION="$1"
  TAG=$(echo "$VERSION" | sed -n 's/^[0-9]\+\.[0-9]\+\.[0-9]\+-\(.*\)\.[0-9]\+$/\1/p')
  
  if [ -z "$TAG" ]; then
    TAG="latest"
    # If tag is latest, version should be x.y.z format only
    if ! echo "$VERSION" | grep -q '^[0-9]\+\.[0-9]\+\.[0-9]\+$'; then
      echo "Error: Version $VERSION should be x.y.z format for latest tag"
      return 1
    fi
  elif echo "$TAG" | grep -q '^-\|-$'; then
    echo "Error: Tag cannot start or end with hyphen: $TAG"
    return 1
  elif echo "$TAG" | grep -q '^v\?[0-9]\+\(\.[0-9x]\+\)*$'; then
    echo "Error: Tag looks like a semver range (rejected by npm): $TAG"
    return 1
  fi
  
  echo "$TAG"
  return 0
}
