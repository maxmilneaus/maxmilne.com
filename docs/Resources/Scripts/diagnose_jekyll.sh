#!/bin/bash
echo "🔍 Jekyll Environment Diagnostic"
echo "================================"
echo ""

echo "📊 Ruby Version Check:"
ruby --version
echo ""

echo "📊 Bundler Version Check:"
bundler --version 2>/dev/null || echo "❌ Bundler not found"
echo ""

echo "📊 Jekyll Installation Check:"
jekyll --version 2>/dev/null || echo "❌ Jekyll not found"
echo ""

echo "📊 Gem Environment:"
gem env | grep -E "(INSTALLATION DIRECTORY|USER INSTALLATION)"
echo ""

echo "📊 Current Directory:"
pwd
ls -la | grep -E "(Gemfile|_config)"
echo ""

echo "🔍 Checking for Ruby version managers..."
which rbenv 2>/dev/null || echo "rbenv not found"
which rvm 2>/dev/null || echo "rvm not found"
which asdf 2>/dev/null || echo "asdf not found"
echo ""

echo "💡 Recommendations:"
echo "1. Install Ruby 3.0+ using rbenv or rvm"
echo "2. Install Jekyll: gem install jekyll bundler"
echo "3. Run: bundle install"
echo "4. Then: bundle exec jekyll serve --livereload"