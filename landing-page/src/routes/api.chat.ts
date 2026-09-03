import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createFileRoute } from "@tanstack/react-router";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  safeValidateUIMessages,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

import {
  isChatPayloadWithinLimits,
  longTaaGuideInstructions,
} from "../chat-config";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_REQUESTS = 10;
const requestWindows = new Map<string, number[]>();

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function getClientKey(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous"
  );
}

function isRateLimited(clientKey: string, now = Date.now()) {
  const activeRequests = (requestWindows.get(clientKey) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (activeRequests.length >= RATE_LIMIT_REQUESTS) {
    requestWindows.set(clientKey, activeRequests);
    return true;
  }
  activeRequests.push(now);
  requestWindows.set(clientKey, activeRequests);
  return false;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.KIMI_API_KEY ?? process.env.MOONSHOT_API_KEY;
        if (!apiKey) {
          return jsonError("Visitor guide is not configured.", 503);
        }

        if (isRateLimited(getClientKey(request))) {
          return jsonError("Too many requests. Please wait a moment.", 429);
        }

        let body: { messages?: unknown };
        try {
          body = (await request.json()) as { messages?: unknown };
        } catch {
          return jsonError("Invalid request body.", 400);
        }

        if (!Array.isArray(body.messages) || !isChatPayloadWithinLimits(body.messages)) {
          return jsonError("Conversation is empty or too long.", 400);
        }

        const validation = await safeValidateUIMessages<UIMessage>({
          messages: body.messages,
        });
        if (!validation.success) {
          return jsonError("Invalid conversation format.", 400);
        }

        const kimi = createOpenAICompatible({
          name: "kimi",
          apiKey,
          baseURL: process.env.KIMI_BASE_URL ?? "https://api.moonshot.ai/v1",
          includeUsage: true,
        });

        const result = streamText({
          model: kimi(process.env.KIMI_MODEL ?? "kimi-k2.6"),
          instructions: longTaaGuideInstructions,
          messages: await convertToModelMessages(validation.data),
          maxOutputTokens: 450,
          providerOptions: {
            kimi: {
              thinking: { type: "disabled" },
            },
          },
          abortSignal: request.signal,
        });

        return createUIMessageStreamResponse({
          stream: toUIMessageStream({
            stream: result.stream,
            sendReasoning: false,
          }),
        });
      },
    },
  },
});
