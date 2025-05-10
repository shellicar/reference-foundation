#!/bin/sh
set -e

SETUP_NODE_FALLBACK_VERSION='lts/*'
SETUP_NVM_VERSION="latest"
SETUP_GITVERSION_VERSION="^5\.[0-9]+\.[0-9]+$"

is_command_available() {
  command -v "$1" >/dev/null 2>&1
}

fetch_latest_github_tag() {
  REPO=$1
  VERSION_PATTERN=$2

  # If "latest" is requested, use a regex pattern for stable versions only (x.y.z format)
  if [ "$VERSION_PATTERN" = "latest" ]; then
    VERSION_PATTERN="^[0-9]+\.[0-9]+\.[0-9]+$"
  fi

  AUTH_HEADER=""
  if [ -n "$GITHUB_TOKEN" ]; then
    AUTH_HEADER="-H 'Authorization: token ${GITHUB_TOKEN}'"
  fi

  # Fetch the tags using the REST API
  RESPONSE=$(curl -s -w "%{http_code}" ${AUTH_HEADER} "https://api.github.com/repos/${REPO}/tags?per_page=2000")
  HTTP_STATUS=$(echo "$RESPONSE" | tail -c 4)

  # Check if the request was successful
  if [ "$HTTP_STATUS" -ne 200 ]; then
    echo "❌ GitHub API request failed for ${REPO}. HTTP status code: ${HTTP_STATUS}" >&2
    exit 1
  fi
  TAGS=$(echo "$RESPONSE" | head -c -4)

  # Extract tag names from the response
  TAGS=$(echo "$TAGS" | grep '"name":' | sed -E 's/.*"name": *"([^"]+)".*/\1/')

  # Loop through the tags to find the first matching version
  for TAG in $TAGS; do
    # Normalize the tag by removing the leading 'v', if present
    NORMALIZED_TAG=$(echo "$TAG" | sed -E 's/^v//')

    # Check if the normalized tag matches the VERSION_PATTERN
    if echo "$NORMALIZED_TAG" | grep -Eq "$VERSION_PATTERN"; then
      # Return the original tag as soon as we find a match
      echo "$TAG"
      return
    fi
  done

  # If no matching version is found, print an error to stderr
  MESSAGE="❌ Could not determine the latest version for ${REPO} matching pattern ${VERSION_PATTERN}"
  if [ "$2" != "$VERSION_PATTERN" ]; then
    MESSAGE="${MESSAGE} ($2)"
  fi
  echo "$MESSAGE" >&2
  exit 1
}

# Function to allow updating apt only once
has_updated=false
ensure_apt_get_update() {
  if [ "$has_updated" = false ]; then
    echo "Running apt-get update..."
    sudo apt-get update -y
    has_updated=true
  else
    echo "apt-get update has already been run."
  fi
}

get_architecture() {
  SETUP_ARCHITECTURE=""
  SETUP_OS="unknown"

  case $(uname) in
  Darwin)
    OS="macOS"
    SETUP_ARCHITECTURE="osx-arm64"
    ;;
  Linux)
    OS="linux"
    SETUP_ARCHITECTURE="linux-x64"
    ;;
  *)
    echo "Unknown operating system."
    exit 1
    ;;
  esac
  echo "OS=$OS"

  if [ "$OS" = "linux" ]; then
    check_package() {
      status=$(dpkg-query -W -f='${Status}' $1 2>/dev/null)
      if [ "$status" = "install ok installed" ]; then
        return 0
      else
        return 1
      fi
    }
  else
    check_package() {
      brew list $1 >/dev/null 2>&1
    }
  fi
}

install_nvm() {
  echo "❔ Checking nvm.sh"
  # Check if ~/.nvm/nvm.sh exists
  if [ -f ~/.nvm/nvm.sh ]; then
    echo "✅ Sourcing ~/.nvm/nvm.sh..."
    . ~/.nvm/nvm.sh
  else
    echo "❌ ~/.nvm/nvm.sh does not exist."
  fi

  echo "❔ Checking nvm command"
  # Check if NVM command exists on the path and will run
  if ! is_command_available nvm >/dev/null; then
    echo "❌ NVM is not installed properly, installing"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${SETUP_NVM_VERSION}/install.sh | bash
    . ~/.nvm/nvm.sh
  else
    INSTALLED_VERSION="v$(nvm -v)"
    if [ "$INSTALLED_VERSION" != "$SETUP_NVM_VERSION" ]; then
      echo "🔄 Updating NVM from version $INSTALLED_VERSION to ${SETUP_NVM_VERSION#v}"
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${SETUP_NVM_VERSION}/install.sh | bash
      . ~/.nvm/nvm.sh
    else
      echo "✅ NVM is installed properly."
    fi
  fi
}

install_node() {
  if [ -f .nvmrc ]; then
    echo "✅ Installing node version: $(cat .nvmrc)"
    nvm install
  else
    echo "✅ Installing node fallback version: ${SETUP_NODE_FALLBACK_VERSION}"
    nvm install ${SETUP_NODE_FALLBACK_VERSION}
  fi
}

install_function_core_tools() {
  if [ "$OS" = "macOS" ]; then
    if ! is_command_available func >/dev/null; then
      # https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-csharp#install-the-azure-functions-core-tools
      brew tap azure/functions
      brew install azure-functions-core-tools@4
      # if upgrading on a machine that has 2.x or 3.x installed:
      brew link --overwrite azure-functions-core-tools@4
    fi
  elif [ "$OS" = "linux" ]; then
    # https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-csharp#install-the-azure-functions-core-tools
    if [ ! -e /etc/apt/trusted.gpg.d/microsoft.gpg ]; then
      curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor >microsoft.gpg
      sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
      has_updated=false
    fi

    if [ ! -f /etc/apt/sources.list.d/dotnetdev.list ]; then
      sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-$(lsb_release -cs)-prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list'
      has_updated=false
    fi
    ensure_apt_get_update
    sudo apt-get install azure-functions-core-tools-4 -y
  fi
}

install_pnpm() {
  # https://pnpm.io/installation#using-corepack
  if ! is_command_available corepack >/dev/null; then
    echo "Please ensure node LTS is installed which includes corepack"
    exit 1
  fi

  corepack enable
  # use pnpm version from package.json
  corepack prepare --activate
}

install_gitversion() {
  SETUP_GITVERSION_FILE=gitversion-${SETUP_ARCHITECTURE}-${SETUP_GITVERSION_VERSION}.tar.gz
  SETUP_GITVERSION_SRC=https://github.com/GitTools/GitVersion/releases/download/${SETUP_GITVERSION_VERSION}/${SETUP_GITVERSION_FILE}
  echo "❔ Checking gitversion"
  download_gitversion() {
    echo "❌ Installing gitversion ${SETUP_GITVERSION_VERSION}"
    SETUP_TEMP_DIR=$(mktemp -d)
    SETUP_TEMP_FILE=${SETUP_TEMP_DIR}/${SETUP_GITVERSION_FILE}

    echo "TEMP_FILE=$SETUP_TEMP_FILE"
    mkdir -p $SETUP_TEMP_DIR
    curl -LJ -o ${SETUP_TEMP_FILE} ${SETUP_GITVERSION_SRC} || (echo "Error downloading file. Please try again" && return 1)
    sudo tar -xvf ${SETUP_TEMP_FILE} -C /usr/local/bin/ || (echo "Ensure that /usr/local/bin exists and you have access" && return 2)
    sudo chmod 755 /usr/local/bin/gitversion || (echo "Error changing permissions for gitversion file" && return 3)
    rm -rf ${SETUP_TEMP_DIR} || return 3
    echo "✅ Installed gitversion ${SETUP_GITVERSION_VERSION}"
  }

  if ! is_command_available gitversion >/dev/null; then
    download_gitversion
  else
    INSTALLED_VERSION=$(gitversion /version | cut -d'+' -f1)
    if [ "$INSTALLED_VERSION" = "$SETUP_GITVERSION_VERSION" ]; then
      echo "✔️ gitversion ${SETUP_GITVERSION_VERSION} is already installed"
    else
      echo "❌ gitversion ${INSTALLED_VERSION} is installed, but ${SETUP_GITVERSION_VERSION} is required"
      download_gitversion
    fi
  fi
}

install_docker() {
  echo "❔ Checking Docker"
  if [ "$OS" = "linux" ]; then
    if ! check_package docker-ce; then
      echo "❌ Installing Docker"

      # Add Docker's official GPG key:
      ensure_apt_get_update
      sudo apt-get install ca-certificates curl -y
      sudo install -m 0755 -d /etc/apt/keyrings
      sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
      sudo chmod a+r /etc/apt/keyrings/docker.asc

      # Add the repository to Apt sources:
      echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" |
        sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

      has_updated=false
      ensure_apt_get_update

      sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

      # Add current user to docker group
      if ! groups $USER | grep &>/dev/null '\bdocker\b'; then
        sudo gpasswd -a $USER docker
        echo "ℹ️  Please log out and log back in for Docker group permissions to take effect."
      fi
      echo "✅ Installed Docker"
    else
      echo "❔ Checking for Docker updates"
      ensure_apt_get_update
      sudo apt-get install --only-upgrade docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
      echo "✔️ Docker already installed"
    fi
  fi
}

install_azcli() {
  echo "❔ Checking AzCli"
  if [ "$OS" = "linux" ]; then
    if ! check_package azure-cli; then
      echo "❌ Installing AzCli"

      ensure_apt_get_update
      sudo apt-get install ca-certificates curl apt-transport-https lsb-release gnupg -y

      sudo mkdir -p /etc/apt/keyrings
      curl -sLS https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /etc/apt/keyrings/microsoft.gpg sudo chmod go+r /etc/apt/keyrings/microsoft.gpg >/dev/null
      AZ_DIST=$(lsb_release -cs)
      echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/azure-cli/ $AZ_DIST main" | sudo tee /etc/apt/sources.list.d/azure-cli.list

      has_updated=false
      ensure_apt_get_update
      sudo apt-get install azure-cli -y

      echo "✅ Installed AzCli"
    else
      echo "❔ Checking for AzCli updates"
      ensure_apt_get_update
      sudo apt-get install --only-upgrade azure-cli -y
      echo "✔️ AzCli already installed"
    fi
  fi
}

get_architecture

SETUP_NVM_VERSION=$(fetch_latest_github_tag "nvm-sh/nvm" "$SETUP_NVM_VERSION")
printf "nvm version: %s\n" "$SETUP_NVM_VERSION"
SETUP_GITVERSION_VERSION=$(fetch_latest_github_tag "GitTools/GitVersion" "$SETUP_GITVERSION_VERSION")
printf "GitVersion version: %s\n" "$SETUP_GITVERSION_VERSION"

install_nvm
install_node
install_pnpm
install_gitversion
install_function_core_tools
install_docker
install_azcli

echo ""
echo "Checking versions"
echo "nvm: $(nvm --version)"
echo "node: $(node --version)"
echo "pnpm: $(pnpm --version)"
echo "gitversion: $(gitversion -version)"
echo "func: $(func --version)"
docker --version
az version -o table
