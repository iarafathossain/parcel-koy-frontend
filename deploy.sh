#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

run_step() {
  local desc="$1"
  shift
  local log
  log=$(mktemp)
  if "$@" > "$log" 2>&1; then
    echo -e "${GREEN}✓ ${desc}${NC}"
    rm -f "$log"
  else
    echo -e "${RED}✗ ${desc}${NC}"
    cat "$log"
    rm -f "$log"
    exit 1
  fi
}

read -p "Enter branch name: " branch_name
echo "Branch name: $branch_name"

read -p "Enter frontend pm2 id: " frontend_pm2_id
echo "Frontend pm2 id: $frontend_pm2_id"

run_step "Pulling branch $branch_name" git pull origin "$branch_name"
run_step "Installing dependencies" pnpm i --frozen-lockfile
run_step "Building project" pnpm run build

if [ -n "$frontend_pm2_id" ]; then
  run_step "Restarting frontend (pm2 id $frontend_pm2_id)" pm2 restart "$frontend_pm2_id"
else
  echo "No frontend pm2 id provided, skipping frontend restart."
fi