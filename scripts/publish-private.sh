#!/bin/bash

# Script to publish packages to npm as private (restricted access)
# Usage: ./scripts/publish-private.sh <otp-code>

if [ -z "$1" ]; then
    echo "Please provide OTP code as argument"
    echo "Usage: $0 <otp-code>"
    exit 1
fi

OTP=$1

echo "📦 Publishing packages as private to npm with OTP..."
echo ""

# Navigate to root
cd "$(dirname "$0")/.."

# Publish in dependency order
echo "1️⃣ Publishing @agent-fabric/agents-core..."
cd packages/agents-core
npm publish --access restricted --otp=$OTP
if [ $? -ne 0 ]; then
    echo "❌ Failed to publish @agent-fabric/agents-core"
    exit 1
fi
cd ../..

echo "2️⃣ Publishing @agent-fabric/agents-sdk..."
cd packages/agents-sdk  
npm publish --access restricted --otp=$OTP
if [ $? -ne 0 ]; then
    echo "❌ Failed to publish @agent-fabric/agents-sdk"
    exit 1
fi
cd ../..

echo "3️⃣ Publishing @agent-fabric/agents-cli..."
cd agents-cli
npm publish --access restricted --otp=$OTP
if [ $? -ne 0 ]; then
    echo "❌ Failed to publish @agent-fabric/agents-cli"
    exit 1
fi
cd ..

echo "4️⃣ Publishing @agent-fabric/agents-ui..."
cd agents-ui
npm publish --access restricted --otp=$OTP
if [ $? -ne 0 ]; then
    echo "❌ Failed to publish @agent-fabric/agents-ui"
    exit 1
fi
cd ..

echo ""
echo "✅ All packages published successfully as private!"
echo ""
echo "To make them public later, run:"
echo "  npm access public @agent-fabric/agents-core"
echo "  npm access public @agent-fabric/agents-sdk"
echo "  npm access public @agent-fabric/agents-cli"
echo "  npm access public @agent-fabric/agents-ui"