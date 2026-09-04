#!/usr/bin/env python3
"""Minimal Kimi K3 connectivity and access check (no third-party packages)."""

import json
import os
import sys
from argparse import ArgumentParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


def load_dotenv(path: Path) -> None:
    """Load simple KEY=VALUE entries without executing the file as shell code."""
    if not path.is_file():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key, value = key.strip(), value.strip().strip("\"'")
        if key:
            os.environ.setdefault(key, value)


def api_request(url: str, api_key: str, payload=None) -> dict:
    headers = {"Authorization": f"Bearer {api_key}"}
    data = None
    if payload is not None:
        headers["Content-Type"] = "application/json"
        data = json.dumps(payload).encode("utf-8")

    request = Request(url, data=data, headers=headers, method="POST" if data else "GET")
    try:
        with urlopen(request, timeout=60) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError as error:
        raise RuntimeError(f"Kimi API returned HTTP {error.code} for {url}") from error
    except URLError as error:
        raise RuntimeError(f"Could not reach Kimi API: {error.reason}") from error


def main() -> int:
    parser = ArgumentParser(description="Send a message to Kimi K3 after checking model access.")
    parser.add_argument(
        "message",
        nargs="*",
        help="Message to send. Quote it when it contains spaces.",
    )
    args = parser.parse_args()

    load_dotenv(Path(__file__).with_name(".env"))

    api_key = os.getenv("KIMI_API_KEY")
    if not api_key:
        print("Set KIMI_API_KEY in .env before running this script.", file=sys.stderr)
        return 2

    base_url = os.getenv("KIMI_BASE_URL", "https://api.moonshot.ai/v1").rstrip("/")
    model = os.getenv("KIMI_MODEL", "kimi-k3")
    max_completion_tokens = int(os.getenv("KIMI_MAX_COMPLETION_TOKENS", "2048"))
    message = " ".join(args.message) or "Reply with exactly: KIMI_K3_OK"

    print(f"Checking whether {model} is available...")
    models = api_request(f"{base_url}/models", api_key)
    available_models = {item.get("id") for item in models.get("data", [])}
    if model not in available_models:
        print(f"{model} was not returned by {base_url}/models.", file=sys.stderr)
        return 3

    print("Model available. Sending a minimal completion request...")
    response = api_request(
        f"{base_url}/chat/completions",
        api_key,
        {
            "model": model,
            "messages": [{"role": "user", "content": message}],
            "max_completion_tokens": max_completion_tokens,
        },
    )

    choice = response.get("choices", [{}])[0]
    content = choice.get("message", {}).get("content", "")
    print(f"Success: {model} accepted the request.")
    print(f"Message: {message}")
    print(f"Response: {content or '(no final text returned)'}")
    print(f"Finish reason: {choice.get('finish_reason', 'unknown')}")
    if choice.get("finish_reason") == "length":
        print(
            "Tip: the response reached its token limit. Set KIMI_MAX_COMPLETION_TOKENS=4096 "
            "in .env and run again.",
            file=sys.stderr,
        )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except RuntimeError as error:
        print(f"Error: {error}", file=sys.stderr)
        raise SystemExit(1) from error
