#!/bin/bash
set -e

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Change to the script's directory to run commands
cd "$SCRIPT_DIR"

echo "==> Checking Jekyll dependencies..."

# Check for rbenv
if ! command -v rbenv &> /dev/null
then
    echo "Error: rbenv is not installed. Please install it to manage Ruby versions."
    exit 1
fi

# Initialise rbenv
eval "$(rbenv init -)"

# Check for Bundler
if ! gem spec bundler &> /dev/null
then
    echo "Error: Bundler is not installed. Please run 'gem install bundler'."
    exit 1
fi

echo "==> Installing gems with Bundler..."
bundle install

echo "==> Starting Jekyll server..."
rbenv exec bundle exec jekyll serve --livereload