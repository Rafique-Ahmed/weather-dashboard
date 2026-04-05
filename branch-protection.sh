#!/bin/bash

# Requires GitHub CLI (gh) to be installed
# Install: https://cli.github.com/

echo "Setting up branch protection rules..."

# Protect main branch
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["continuous-integration"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null

echo "✅ Branch protection enabled for main branch"
