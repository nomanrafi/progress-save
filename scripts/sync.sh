#!/bin/bash
# copy progress logs into website repo (progress-save repo is read-only for both tokens) and push website
mkdir -p /data/velora/agent-progress
cp /data/project/PROGRESS.md /data/project/COMMANDS.md /data/project/DECISIONS.md /data/velora/agent-progress/
mkdir -p /data/velora/agent-progress/scripts; cp /data/project/scripts/*.sh /data/project/scripts/*.js /data/velora/agent-progress/scripts/ 2>/dev/null
cd /data/project && git add -A && git commit -qm "$1" 2>/dev/null
bash /data/project/scripts/push.sh /data/velora "$1"
