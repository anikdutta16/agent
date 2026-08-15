#!/bin/bash

# Script to scan npm packages for potential secrets before/after publishing
# Usage: ./scripts/scan-for-secrets.sh <package-name-or-tarball>

if [ -z "$1" ]; then
    echo "Usage: $0 <package-name-or-tarball>"
    echo "Examples:"
    echo "  $0 @agent-fabric/agents-core        # Scan published package"
    echo "  $0 ./my-package-1.0.0.tgz     # Scan local tarball"
    exit 1
fi

PACKAGE=$1
TEMP_DIR=$(mktemp -d)

echo "🔍 Scanning package for potential secrets..."
echo ""

# Download or copy package
if [[ -f "$PACKAGE" ]]; then
    echo "📦 Using local tarball: $PACKAGE"
    cp "$PACKAGE" "$TEMP_DIR/package.tgz"
else
    echo "📦 Downloading package: $PACKAGE"
    cd "$TEMP_DIR"
    npm pack "$PACKAGE" > /dev/null 2>&1
    mv *.tgz package.tgz
fi

# Extract package
tar -xzf "$TEMP_DIR/package.tgz" -C "$TEMP_DIR"
cd "$TEMP_DIR/package"

echo "📋 Package contents summary:"
echo "  Total files: $(find . -type f | wc -l)"
echo "  JS files: $(find . -name "*.js" | wc -l)"
echo "  JSON files: $(find . -name "*.json" | wc -l)"
echo ""

echo "🔎 Scanning for secrets..."
echo ""

# Check for common secret patterns
echo "1️⃣ Checking for API keys and tokens..."
KEYS_FOUND=$(grep -r -E "sk-[a-zA-Z0-9]{32,}|AIza[0-9A-Za-z_-]{35}|AKIA[0-9A-Z]{16}|ghp_[0-9a-zA-Z]{36}" --include="*.js" --include="*.json" 2>/dev/null | wc -l)
if [ "$KEYS_FOUND" -gt 0 ]; then
    echo "  ⚠️  Found $KEYS_FOUND potential API keys/tokens:"
    grep -r -E "sk-[a-zA-Z0-9]{32,}|AIza[0-9A-Za-z_-]{35}|AKIA[0-9A-Z]{16}|ghp_[0-9a-zA-Z]{36}" --include="*.js" --include="*.json" 2>/dev/null | head -5
else
    echo "  ✅ No hardcoded API keys found"
fi

echo ""
echo "2️⃣ Checking for environment variable references..."
ENV_REFS=$(grep -r "process.env" --include="*.js" | grep -E "(KEY|TOKEN|SECRET|PASSWORD|AUTH|CREDENTIAL)" | wc -l)
if [ "$ENV_REFS" -gt 0 ]; then
    echo "  ℹ️  Found $ENV_REFS environment variable references (normal for config):"
    grep -r "process.env" --include="*.js" | grep -E "(KEY|TOKEN|SECRET|PASSWORD|AUTH|CREDENTIAL)" | head -3
else
    echo "  ✅ No sensitive environment variables referenced"
fi

echo ""
echo "3️⃣ Checking for private keys..."
PRIVATE_KEYS=$(grep -r "BEGIN.*PRIVATE KEY" --include="*" 2>/dev/null | wc -l)
if [ "$PRIVATE_KEYS" -gt 0 ]; then
    echo "  🚨 FOUND PRIVATE KEYS! This is critical:"
    grep -r "BEGIN.*PRIVATE KEY" --include="*" 2>/dev/null | head -3
else
    echo "  ✅ No private keys found"
fi

echo ""
echo "4️⃣ Checking for .env files..."
ENV_FILES=$(find . -name ".env*" -o -name "*.env" | wc -l)
if [ "$ENV_FILES" -gt 0 ]; then
    echo "  🚨 FOUND .env FILES! These should not be published:"
    find . -name ".env*" -o -name "*.env"
else
    echo "  ✅ No .env files found"
fi

echo ""
echo "5️⃣ Checking for localhost/internal URLs..."
INTERNAL_URLS=$(grep -r -E "localhost|127\.0\.0\.1|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\." --include="*.js" --include="*.json" 2>/dev/null | grep -v "node_modules" | wc -l)
if [ "$INTERNAL_URLS" -gt 0 ]; then
    echo "  ⚠️  Found $INTERNAL_URLS references to internal URLs (review these):"
    grep -r -E "localhost|127\.0\.0\.1" --include="*.js" --include="*.json" 2>/dev/null | grep -v "node_modules" | head -3
else
    echo "  ✅ No internal URLs found"
fi

echo ""
echo "6️⃣ Checking for database connection strings..."
DB_STRINGS=$(grep -r -E "mongodb://|postgres://|mysql://|redis://" --include="*.js" --include="*.json" 2>/dev/null | grep -v "node_modules" | wc -l)
if [ "$DB_STRINGS" -gt 0 ]; then
    echo "  ⚠️  Found $DB_STRINGS database connection strings:"
    grep -r -E "mongodb://|postgres://|mysql://|redis://" --include="*.js" --include="*.json" 2>/dev/null | grep -v "node_modules" | head -3
else
    echo "  ✅ No database connection strings found"
fi

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "✨ Scan complete!"
echo ""
echo "⚠️  Remember to also check for:"
echo "  • Sensitive comments in code"
echo "  • Debug logs that might expose data"
echo "  • Test credentials that shouldn't be public"
echo "  • Internal documentation or TODOs"