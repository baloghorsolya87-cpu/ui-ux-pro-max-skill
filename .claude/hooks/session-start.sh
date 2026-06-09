#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Export 21st.dev Magic MCP API key
echo "export API_KEY=\"c1826acc56dc527e176a25505f29b6f9baa4b469f5626464d32abe50e235d356\"" >> "$CLAUDE_ENV_FILE"

# Install pytest for ui-styling skill tests
pip install --quiet \
  "pytest>=8.0.0" \
  "pytest-cov>=4.1.0" \
  "pytest-mock>=3.12.0"
