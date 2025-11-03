#!/bin/bash
set -e

echo "🚀 Setting up Jekyll on macOS"
echo "=============================="

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "📦 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install rbenv and Ruby
echo "📦 Installing rbenv and Ruby 3.2..."
brew update
brew install rbenv ruby-build

# Add rbenv to shell if not already present
if ! grep -q "rbenv init" ~/.zshrc; then
    echo 'eval "$(rbenv init -)"' >> ~/.zshrc
    echo "Added rbenv to ~/.zshrc"
fi

# Initialize rbenv for current session
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

# Install Ruby 3.2.2 (latest stable)
if ! rbenv versions | grep -q "3.2.2"; then
    echo "📦 Installing Ruby 3.2.2..."
    rbenv install 3.2.2
else
    echo "✅ Ruby 3.2.2 already installed"
fi

rbenv global 3.2.2

# Verify Ruby version
echo "✅ Ruby version:"
ruby --version

# Install Jekyll and Bundler
echo "📦 Installing Jekyll and Bundler..."
gem install jekyll bundler

# Navigate to project directory
cd "$(dirname "$0")"

# Install project dependencies
echo "📦 Installing project dependencies..."
bundle install

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start Jekyll server:"
echo "   bundle exec jekyll serve --livereload"
echo ""
echo "🌐 Server will be available at: http://localhost:4000"
echo ""
echo "💡 If you open a new terminal, run:"
echo "   eval \"\$(rbenv init -)\""