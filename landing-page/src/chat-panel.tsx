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
  getQuickQuestions,
  shouldStartGuidedPlanner,
} from "./chat-config";
import { GuidedTripPlanner } from "./guided-trip-planner";
import { useLanguage } from "./language";
import { RumputMascot, type RumputState } from "./rumput-mascot";

interface ChatPanelProps {
  onClose: () => void;
  plannerRequest?: number;
}

function getTextContent(message: { parts: Array<{ type: string; text?: string }> }) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("");
}

export function ChatPanel({ onClose, plannerRequest = 0 }: ChatPanelProps) {
  const { language, copy } = useLanguage();
  const [input, setInput] = useState("");
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [responseIssue, setResponseIssue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { language } }),
    [language],
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
        setResponseIssue(language === "ms" ? "Panduan selesai tanpa jawapan. Sila cuba lagi." : "The guide finished without a reply. Please try again.");
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
    ? getQuickQuestions(language)
    : getFollowUpQuestions(lastUserText, lastAssistantText);
  const showSuggestions =
    !isBusy &&
    !error &&
    !responseIssue &&
    (messages.length === 0 || lastAssistantText.length > 0);
  const rumputState: RumputState = error || responseIssue
    ? "error"
    : status === "submitted"
      ? "thinking"
      : status === "streaming"
        ? "responding"
        : lastAssistantText
          ? "success"
          : "idle";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (plannerRequest > 0) setIsPlannerOpen(true);
  }, [plannerRequest]);

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
    if (shouldStartGuidedPlanner(trimmed)) {
      setIsPlannerOpen(true);
      setInput("");
      return;
    }
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
    setIsPlannerOpen(false);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <section
      id="long-taa-chat"
      className="chat-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
    >
      <header className="chat-header">
        <RumputMascot className="chat-header-mascot" state={rumputState} size={104} />
        <div className="chat-header-copy">
          <p className="chat-kicker">{copy.guideKicker}</p>
          <p className="chat-pronunciation">{copy.rumputPronunciation}</p>
          <h2 id="chat-title">{copy.guideTitle}</h2>
          <p className="chat-rumput-status">
            <span className="chat-status-dot" aria-hidden="true" />
            {isBusy ? copy.thinking : copy.rumputReady}
          </p>
        </div>
        <button
          className="chat-close"
          type="button"
          aria-label={copy.close}
          onClick={onClose}
        >
          {copy.close}
        </button>
      </header>

      {isPlannerOpen ? (
        <GuidedTripPlanner language={language} onExit={() => setIsPlannerOpen(false)} />
      ) : (
        <>
      <div className="chat-messages" aria-live="polite" aria-busy={isBusy}>
        <article className="chat-message is-assistant">
          <span>{copy.companion}</span>
          <p>{copy.guideWelcome}</p>
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
              <span>{message.role === "user" ? copy.you : copy.guide}</span>
              <p>{text}</p>
            </article>
          );
        })}

        {status === "submitted" ? (
          <p className="chat-progress">{copy.thinking}</p>
        ) : null}

        {error || responseIssue ? (
          <div className="chat-error" role="alert">
            <p>{responseIssue ?? (language === "ms" ? "Panduan tidak dapat membalas sekarang. Sila cuba lagi atau hubungi Long Taa terus." : "The guide could not reply just now. Please try again or contact Long Taa directly.")}</p>
            <button
              type="button"
              onClick={() => {
                clearError();
                setResponseIssue(null);
              }}
            >
              {copy.dismiss}
            </button>
          </div>
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      {showSuggestions ? (
        <div className="chat-suggestions" aria-label={copy.guideStart}>
          <p className="chat-suggestions-label">
            {messages.length === 0 ? copy.guideStart : copy.continuePlanning}
          </p>
          {suggestedQuestions.map((question) => (
            <button key={question} type="button" onClick={() => ask(question)}>
              {question}
            </button>
          ))}
        </div>
      ) : null}

      <form className="chat-form" onSubmit={submit}>
        <label htmlFor="chat-question" className="sr-only">{copy.launch}</label>
        <input
          ref={inputRef}
          id="chat-question"
          name="question"
          type="text"
          autoComplete="off"
          enterKeyHint="send"
          maxLength={CHAT_INPUT_LIMIT}
          placeholder={copy.guidePlaceholder}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isBusy}
        />
        {isBusy ? (
          <button className="chat-send" type="button" onClick={() => void stop()}>
            {copy.stop}
          </button>
        ) : (
          <button className="chat-send" type="submit" disabled={!input.trim()}>
            {copy.send}
          </button>
        )}
      </form>

      <footer className="chat-footer">
        <p>{copy.footer}</p>
        <div>
          <button type="button" onClick={reset}>{copy.clear}</button>
          <button type="button" onClick={() => setIsPlannerOpen(true)}>
            {language === "ms" ? "Sediakan pertanyaan lengkap" : "Build complete enquiry"}
          </button>
        </div>
      </footer>
        </>
      )}
    </section>
  );
}
