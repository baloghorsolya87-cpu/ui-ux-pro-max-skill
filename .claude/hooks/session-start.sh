#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install pytest for ui-styling skill tests
pip install --quiet \
  "pytest>=8.0.0" \
  "pytest-cov>=4.1.0" \
  "pytest-mock>=3.12.0"
