# Kimi K3 API check

This runs two inexpensive, OpenAI-compatible API calls against Kimi:

1. lists models and confirms `kimi-k3` is available to your key;
2. sends a minimal chat completion, which proves the model can serve a request.

## Run

Create an API key in the [Kimi Open Platform](https://platform.kimi.ai), then run:

```bash
cd kimi
# cp .env.example .env  # only needed if .env does not already exist
# Paste the key into .env:
# KIMI_API_KEY='your-key-here'
./ping.sh
```

Or use the dependency-free Python version (Python 3.8+):

```bash
/usr/bin/python3 ping.py
```

Send your own prompt by adding it after the script name:

```bash
python ping.py "Explain Borneo eco-tourism in one sentence."
```

K3 may use some output tokens for reasoning. The script allows 2,048 completion tokens by default; increase it in `.env` for longer requests:

```env
KIMI_MAX_COMPLETION_TOKENS=4096
```

If your shell uses pyenv, prefer the explicit `/usr/bin/python3` command until the pyenv Python installation is repaired.

The default endpoint is `https://api.moonshot.ai/v1` and the model is `kimi-k3`.
Override either without editing the script:

```bash
KIMI_BASE_URL='https://api.moonshot.cn/v1' KIMI_MODEL='kimi-k3' ./ping.sh
```

Do not commit API keys. `.env` is ignored by Git and is loaded automatically by `ping.sh`.
