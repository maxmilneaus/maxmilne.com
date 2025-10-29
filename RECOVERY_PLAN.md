# Comprehensive Recovery and Hardening Plan

**To the assisting AI:** This document outlines the history of a critical failure and the plan to recover from it. It is imperative that you read the context section carefully before proceeding with the implementation. The user's data was lost due to a mistake; our primary goal is to restore functionality without repeating it.

---

## 1. Context: What Happened

1.  **Initial Goal:** The user requested a feature to synchronise file deletions from their Obsidian Vault (the source) to their Jekyll project folder (the destination).
2.  **Initial Implementation:** The standard `--delete` flag was added to the `rsync` command in the synchronisation script. To prevent accidental data loss, a safeguard was added to the script. This safeguard was intended to check if the source directory existed and was not empty before allowing the `rsync --delete` command to run.
3.  **The Failure:** During testing, the safeguard failed catastrophically. The user reported that the script deleted the entire contents of their Jekyll project folder.
4.  **Root Cause Analysis:** The investigation revealed a subtle but critical interaction with iCloud Drive.
    *   The safeguard correctly checked that the source directory (`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/aVault/Website/`) existed.
    *   However, at the moment the script ran, iCloud Drive was in a state where it reported the directory as present, but the actual file contents were not fully available on the local disk.
    *   When `rsync --delete` executed, it saw an existing but empty source directory. It then performed its function correctly, mirroring this "empty" state to the destination, which resulted in the deletion of all files in the Jekyll project.
    *   **Conclusion:** The initial safeguard was not robust enough to handle the specific synchronisation states of cloud-based file systems like iCloud Drive.

---

## 2. The Recovery and Hardening Plan

**Objective:** To safely re-enable the synchronisation of file deletions with a new, more robust safeguard that is resilient to cloud drive synchronisation states.

**The New Approach:** We will replace the simple directory check with a more reliable "heartbeat" check. The script will now look for a specific, known file inside the vault. The main `rsync --delete` command will **only** run if this heartbeat file is present, which provides a much stronger guarantee that the vault is fully and correctly mounted and accessible.

---

## 3. Step-by-Step Implementation Guide

**Prerequisite:** This plan must be executed **after** the user has restored their Jekyll project folder from a backup to a state before the deletion occurred.

**Step 1: Create the "Heartbeat" File**

This is the most critical step for the new safeguard.

1.  In the file manager (Finder), navigate to the root of the Obsidian Vault:
    `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/aVault/Website/`
2.  Create a new, empty file with the exact name `.sync_heartbeat`.
    *   This file must never be deleted. It serves as proof to the script that the vault is safely connected.

**Step 2: Recreate and Update the Synchronisation Script**

1.  A file needs to be created at `.obsidiansync/obsidian_sync.sh`.
2.  Its entire contents must be the following code. This new version includes the heartbeat check and reinstates the `--delete` flag behind this new, safer guard.

```sh
#!/bin/zsh

# Obsidian to Jekyll Sync Script (Hardened Version)
# This script synchronizes the entire Obsidian vault to the Jekyll project,
# including safely deleting files.

# --- Configuration ---
OBSIDIAN_VAULT="/Users/maxmilne/Library/Mobile Documents/iCloud~md~obsidian/Documents/aVault/Website/"
JEKYLL_ROOT="/Volumes/aWork Drive/1. Projects/Vibe Coding/1 . Active/Website/"
HEARTBEAT_FILE="${OBSIDIAN_VAULT}.sync_heartbeat"
LOG_FILE="/tmp/obsidian_sync.log"
ERROR_LOG_FILE="/tmp/obsidian_sync_error.log"

# --- Hardened Safeguard ---
# The script will only proceed if the heartbeat file exists. This is a much more
# reliable check for iCloud Drive availability than simply checking for a directory.
if [ ! -f "$HEARTBEAT_FILE" ]; then
  echo "CRITICAL: Sync aborted at $(date). Heartbeat file not found at $HEARTBEAT_FILE. Source may be offline or improperly mounted." >> "$ERROR_LOG_FILE"
  exit 1
fi

# --- Execution ---
echo "Sync started at $(date)" >> "$LOG_FILE"
rsync -av --delete \
    --exclude='.obsidian/' \
    --exclude='.sync_heartbeat' \
    "$OBSIDIAN_VAULT" \
    "$JEKYLL_ROOT" >> "$LOG_FILE" 2>> "$ERROR_LOG_FILE"

echo "Sync completed at $(date)." >> "$LOG_FILE"
echo "---------------------------------" >> "$LOG_FILE"
```

**Step 3: Set Permissions and Reload the Service**

1.  Open a terminal in the project directory.
2.  Make the new script executable:
    `chmod +x .obsidiansync/obsidian_sync.sh`
3.  Reload the `launchd` service to ensure it uses the updated script. Run these commands in order:
    `launchctl unload ~/Library/LaunchAgents/com.maxmilne.obsidian-sync.plist`
    `cp .obsidiansync/com.maxmilne.obsidian-sync.plist ~/Library/LaunchAgents/`
    `launchctl load ~/Library/LaunchAgents/com.maxmilne.obsidian-sync.plist`

**Step 4: Final Verification**

Perform a safe test to confirm the fix:
1.  Create a new test file (e.g., `final_test.md`) in the Obsidian vault.
2.  Confirm it appears in the Jekyll project folder.
3.  Delete the `final_test.md` file from the Obsidian vault.
4.  Confirm it is now also deleted from the Jekyll project folder.