#!/bin/zsh
# Renders the approved Long Taa vertical delivery master from a normal macOS Terminal.
set -euo pipefail

script_dir="${0:A:h}"
cd "$script_dir"
mkdir -p renders .hf-runtime-state .hf-runtime-cache

export XDG_STATE_HOME="$PWD/.hf-runtime-state"
export XDG_CACHE_HOME="$PWD/.hf-runtime-cache"

npx --yes hyperframes@0.8.27 render . \
  --quality high \
  --sdr \
  --output renders/long-taa-final-pricing.mp4

test -s renders/long-taa-final-pricing.mp4
ffprobe -v error -show_entries format=duration,size \
  -of default=noprint_wrappers=1 renders/long-taa-final-pricing.mp4
