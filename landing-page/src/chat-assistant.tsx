import { lazy, Suspense, useRef, useState } from "react";

import { useLanguage } from "./language";

const ChatPanel = lazy(() =>
  import("./chat-panel").then((module) => ({ default: module.ChatPanel })),
);

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { copy } = useLanguage();
  const launcherRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setIsOpen(false);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  };

  return (
    <aside className={`chat-assistant${isOpen ? " is-open" : ""}`} aria-label="Long Taa visitor assistant">
      {isOpen ? (
        <Suspense
          fallback={(
            <div className="chat-panel chat-loading" role="status">
              Opening your guide…
            </div>
          )}
        >
          <ChatPanel onClose={close} />
        </Suspense>
      ) : null}

      <button
        className="chat-launcher"
        ref={launcherRef}
        type="button"
        aria-label={copy.launch}
        aria-expanded={isOpen}
        aria-controls="long-taa-chat"
        title={copy.launch}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="chat-launcher-mark" aria-hidden="true">✦</span>
        <span className="chat-launcher-label">{copy.launch}</span>
      </button>
    </aside>
  );
}
