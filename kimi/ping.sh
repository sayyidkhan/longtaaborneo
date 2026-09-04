#!/usr/bin/env bash
# Minimal Kimi K3 connectivity and access check.
# Required: KIMI_API_KEY
# Optional: KIMI_BASE_URL (default: https://api.moonshot.ai/v1)
# Optional: KIMI_MODEL (default: kimi-k3)

set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
if [[ -f "$script_dir/.env" ]]; then
  # shellcheck disable=SC1091
  source "$script_dir/.env"
fi

: "${KIMI_API_KEY:?Set KIMI_API_KEY to an API key from https://platform.kimi.ai first.}"

base_url="${KIMI_BASE_URL:-https://api.moonshot.ai/v1}"
base_url="${base_url%/}"
model="${KIMI_MODEL:-kimi-k3}"

if [[ ! "$model" =~ ^[A-Za-z0-9._-]+$ ]]; then
  echo "KIMI_MODEL contains unsupported characters." >&2
  exit 2
fi

echo "Checking whether $model is available..."
models_json="$(curl --silent --show-error --fail-with-body \
  --header "Authorization: Bearer $KIMI_API_KEY" \
  "$base_url/models")"

if ! printf '%s' "$models_json" | grep -q '"id"[[:space:]]*:[[:space:]]*"'"$model"'"'; then
  echo "$model was not returned by $base_url/models." >&2
  echo "Your API key may not have access to this model, or KIMI_BASE_URL is incorrect." >&2
  exit 3
fi

echo "Model available. Sending a minimal completion request..."
response="$(curl --silent --show-error --fail-with-body \
  --request POST "$base_url/chat/completions" \
  --header "Authorization: Bearer $KIMI_API_KEY" \
  --header "Content-Type: application/json" \
  --data "{\"model\":\"$model\",\"messages\":[{\"role\":\"user\",\"content\":\"Reply with exactly: KIMI_K3_OK\"}],\"max_completion_tokens\":128}")"

echo "Success: $model accepted the request."
printf '%s\n' "$response"
