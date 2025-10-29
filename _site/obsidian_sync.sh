#!/bin/zsh

# Obsidian to Jekyll Sync Script (Assets only)
# This script synchronizes asset changes from Obsidian vault to Jekyll project

OBSIDIAN_ASSETS="/Users/maxmilne/Library/Mobile Documents/iCloud~md~obsidian/Documents/aVault/Website/assets/"
JEKYLL_ASSETS="/Volumes/aWork Drive/1. Projects/Website/assets/"

echo "Syncing assets from Obsidian to Jekyll at $(date)" >> /tmp/obsidian_sync.log
rsync -av \
    --exclude='.obsidian/' \
    "$OBSIDIAN_ASSETS" \
    "$JEKYLL_ASSETS" >> /tmp/obsidian_sync.log 2>> /tmp/obsidian_sync_error.log
echo "Asset sync completed." >> /tmp/obsidian_sync.log