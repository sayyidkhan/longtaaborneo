import { lazy, Suspense, useState } from "react";

const ChatPanel = lazy(() =>
  import("./chat-panel").then((module) => ({ default: module.ChatPanel })),
);

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="chat-assistant" aria-label="Long Taa visitor assistant">
      {isOpen ? (
        <Suspense
          fallback={(
            <div className="chat-panel chat-loading" role="status">
              Opening visitor guide…
            </div>
          )}
        >
          <ChatPanel onClose={() => setIsOpen(false)} />
        </Suspense>
      ) : null}

      <button
        className="chat-launcher"
        type="button"
        aria-expanded={isOpen}
        aria-controls="long-taa-chat"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="chat-launcher-mark" aria-hidden="true">✦</span>
        <span>Ask Long Taa</span>
      </button>
    </aside>
  );
}
