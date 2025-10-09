#!/bin/bash
set -e

echo "🚀 Running Complete Jekyll Fix"
echo "=============================="

# Make all scripts executable
chmod +x *.sh

# Run diagnostic first
echo "📊 Running diagnostic..."
./diagnose_jekyll.sh

# Run setup
echo ""
echo "🔧 Running setup..."
./setup_jekyll_macos.sh

# Source rbenv for current session
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

# Final verification
echo ""
echo "✅ Final verification..."
ruby --version
bundle exec jekyll --version

echo ""
echo "🎉 Setup complete! You can now run:"
echo "   bundle exec jekyll serve --livereload"