#!/bin/bash

# Check if version parameter is provided
if [ -z "$1" ]
then
    echo "Please provide version number (e.g., ./release.sh v1.0.0)"
    exit 1
fi

VERSION=$1

echo "Ì∫Ä Creating release $VERSION..."

# Update version in package.json
npm version ${VERSION#v} --no-git-tag-version

# Create git tag
git add package.json package-lock.json
git commit -m "chore: release $VERSION"
git tag -a $VERSION -m "Release $VERSION"

# Push changes and tag
git push origin main
git push origin $VERSION

echo "‚úÖ Release $VERSION created and pushed to GitHub"
echo "Ì≥ù Create release notes on GitHub:"
echo "   https://github.com/YOUR_USERNAME/weather-dashboard/releases/new?tag=$VERSION"
