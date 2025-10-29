#!/bin/bash

# SMART Obsidian to Jekyll Sync
# Updates only when Obsidian version is newer

SOURCE="/Users/maxmilne/Library/Mobile Documents/iCloud~md~obsidian/Documents/aVault/Website/"
DESTINATION="/Volumes/aWork Drive/1. Projects/Website/"

echo "Starting smart sync from Obsidian to Jekyll at $(date)" >> /tmp/sync_to_jekyll.log
rsync -avu \
    --exclude='.obsidian/' \
    --exclude='*.canvas' \
    --exclude='*.excalidraw' \
    --exclude='*.trash' \
    "$SOURCE" "$DESTINATION" >> /tmp/sync_to_jekyll.log 2>> /tmp/sync_to_jekyll_error.log
echo "Smart sync completed at $(date)" >> /tmp/sync_to_jekyll.log