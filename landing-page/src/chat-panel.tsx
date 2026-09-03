import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  CHAT_INPUT_LIMIT,
  getFollowUpQuestions,
  quickQuestions,
} from "./chat-config";
import { whatsappUrl } from "./content";

interface ChatPanelProps {
  onClose: () => void;
}

function getTextContent(message: { parts: Array<{ type: string; text?: string }> }) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("");
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [responseIssue, setResponseIssue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );
  const {
    messages,
    sendMessage,
    setMessages,
    status,
    stop,
    error,
    clearError,
  } = useChat({
    transport,
    onFinish: ({ message, isAbort, isError }) => {
      const hasVisibleText = message.parts.some(
        (part) => part.type === "text" && part.text.trim().length > 0,
      );
      if (!isAbort && !isError && !hasVisibleText) {
        setResponseIssue("The guide finished without a reply. Please try again.");
      }
    },
  });
  const isBusy = status === "submitted" || status === "streaming";
  const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const lastAssistantMessage = [...messages]
    .reverse()
    .find((message) => message.role === "assistant");
  const lastUserText = lastUserMessage ? getTextContent(lastUserMessage) : "";
  const lastAssistantText = lastAssistantMessage
    ? getTextContent(lastAssistantMessage)
    : "";
  const suggestedQuestions = messages.length === 0
    ? quickQuestions
    : getFollowUpQuestions(lastUserText, lastAssistantText);
  const showSuggestions =
    !isBusy &&
    !error &&
    !responseIssue &&
    (messages.length === 0 || lastAssistantText.length > 0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, status]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const ask = (question: string) => {
    const trimmed = question.trim().slice(0, CHAT_INPUT_LIMIT);
    if (!trimmed || isBusy) return;
    clearError();
    setResponseIssue(null);
    void sendMessage({ text: trimmed });
    setInput("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(input);
  };

  const reset = () => {
    if (isBusy) void stop();
    clearError();
    setResponseIssue(null);
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <section
      id="long-taa-chat"
      className="chat-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="chat-title"
    >
      <header className="chat-header">
        <div>
          <span className="chat-status-dot" aria-hidden="true" />
          <p className="chat-kicker">Kimi-powered visitor guide</p>
          <h2 id="chat-title">Ask about Long Taa</h2>
        </div>
        <button
          className="chat-close"
          type="button"
          aria-label="Close visitor guide"
          onClick={onClose}
        >
          Close
        </button>
      </header>

      <div className="chat-messages" aria-live="polite" aria-busy={isBusy}>
        <article className="chat-message is-assistant">
          <span>Long Taa Guide</span>
          <p>
            Selamat datang. Tell me what kind of visit you have in mind. I can
            guide you from first idea to itinerary, cost estimate, and enquiry.
          </p>
        </article>

        {messages.map((message) => {
          const text = message.parts
            .filter((part) => part.type === "text")
            .map((part) => part.text)
            .join("");

          if (!text) return null;

          return (
            <article
              key={message.id}
              className={`chat-message ${message.role === "user" ? "is-user" : "is-assistant"}`}
            >
              <span>{message.role === "user" ? "You" : "Long Taa Guide"}</span>
              <p>{text}</p>
            </article>
          );
        })}

        {status === "submitted" ? (
          <p className="chat-progress">Checking the visitor guide…</p>
        ) : null}

        {error || responseIssue ? (
          <div className="chat-error" role="alert">
            <p>{responseIssue ?? "The guide could not reply just now. Please try again or contact Long Taa directly."}</p>
            <button
              type="button"
              onClick={() => {
                clearError();
                setResponseIssue(null);
              }}
            >
              Dismiss
            </button>
          </div>
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      {showSuggestions ? (
        <div className="chat-suggestions" aria-label="Suggested next steps">
          <p className="chat-suggestions-label">
            {messages.length === 0 ? "Start here" : "Continue planning"}
          </p>
          {suggestedQuestions.map((question) => (
            <button key={question} type="button" onClick={() => ask(question)}>
              {question}
            </button>
          ))}
        </div>
      ) : null}

      <form className="chat-form" onSubmit={submit}>
        <label htmlFor="chat-question" className="sr-only">Ask a question about Long Taa</label>
        <input
          ref={inputRef}
          id="chat-question"
          name="question"
          type="text"
          autoComplete="off"
          enterKeyHint="send"
          maxLength={CHAT_INPUT_LIMIT}
          placeholder="Ask about costs, travel or activities…"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isBusy}
        />
        {isBusy ? (
          <button className="chat-send" type="button" onClick={() => void stop()}>
            Stop
          </button>
        ) : (
          <button className="chat-send" type="submit" disabled={!input.trim()}>
            Send
          </button>
        )}
      </form>

      <footer className="chat-footer">
        <p>Messages are processed by Kimi AI. Do not share sensitive information. Confirm availability and final prices directly.</p>
        <div>
          <button type="button" onClick={reset}>Clear chat</button>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp Long Taa</a>
        </div>
      </footer>
    </section>
  );
}
