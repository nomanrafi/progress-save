#!/bin/bash
# Usage: scripts/push.sh <repo_dir> "<commit msg>"   (token is read from /tmp/.tok, never stored in repo)
cd "$1" || exit 1
git add -A
if git diff --cached | grep -E "ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}" >/dev/null; then echo "SECRET FOUND, abort"; exit 1; fi
git commit -qm "$2" || echo "nothing to commit"
git pull -q --rebase origin main 2>&1 | sed "s/$(cat /tmp/.tok)/<TOKEN>/g"
git push -q origin main 2>&1 | sed "s/$(cat /tmp/.tok)/<TOKEN>/g"
git log --oneline -1
