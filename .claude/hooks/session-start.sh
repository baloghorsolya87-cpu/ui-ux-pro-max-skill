#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Export 21st.dev Magic MCP API key, if provided via the environment's secret store
if [ -n "${TWENTYFIRST_API_KEY:-}" ]; then
  echo "export API_KEY=\"${TWENTYFIRST_API_KEY}\"" >> "$CLAUDE_ENV_FILE"
fi

# Install pytest for ui-styling skill tests
pip install --quiet \
  "pytest>=8.0.0" \
  "pytest-cov>=4.1.0" \
  "pytest-mock>=3.12.0"
