#!/bin/zsh

# Obsidian to Jekyll Initial Sync Setup
# This script performs initial setup and synchronization

# Configuration
SOURCE="/Users/maxmilne/Library/Mobile Documents/iCloud~md~obsidian/Documents/aVault/Website/"
DESTINATION="/Volumes/aWork Drive/1. Projects/Website/"

echo "Starting initial Obsidian to Jekyll sync..."

# Create timestamped backup
timestamp=$(date +%Y%m%d%H%M%S)
backup_dir="$DESTINATION/../Website_backup_$timestamp"
echo "Creating backup at $backup_dir"
cp -R "$DESTINATION" "$backup_dir"

# Perform initial synchronization
echo "Running initial rsync from Obsidian to Jekyll"
rsync -av \
    --exclude='.obsidian/' \
    --exclude='*.canvas' \
    --exclude='*.excalidraw' \
    --exclude='*.trash' \
    "$SOURCE" "$DESTINATION"

# Update .gitignore
GITIGNORE="$DESTINATION/.gitignore"
echo -e "\n# Obsidian files to ignore (added by setup_obsidian_sync.sh)" >> "$GITIGNORE"
echo ".obsidian/" >> "$GITIGNORE"
echo "*.canvas" >> "$GITIGNORE"
echo "*.excalidraw" >> "$GITIGNORE"
echo "*.trash" >> "$GITIGNORE"
echo "" >> "$GITIGNORE"  # Add an empty line for readability

echo -e "\nInitial setup complete. Your Obsidian content has been synchronized to Jekyll."
