#!/bin/bash
echo "⚡ Quick Jekyll Fix Attempt"
echo "=========================="

# Try using system Ruby with user gems
export GEM_HOME="$HOME/.gem"
export PATH="$GEM_HOME/bin:$PATH"

echo "📦 Installing Jekyll and Bundler to user directory..."
gem install --user-install jekyll bundler

echo "📦 Installing project dependencies..."
bundle install --path vendor/bundle

echo ""
echo "🚀 Testing Jekyll..."
bundle exec jekyll --version

echo ""
echo "✅ Quick fix complete!"
echo "🚀 Starting Jekyll server..."
bundle exec jekyll serve --livereload