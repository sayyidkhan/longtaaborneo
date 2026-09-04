import { createElement, useEffect, useRef, useState } from "react";

export type RumputState =
  | "idle"
  | "greeting"
  | "thinking"
  | "responding"
  | "success"
  | "error"
  | "sleeping";

export type RumputAction = "wave" | "blink";

type RumputElement = HTMLElement & {
  setState: (state: RumputState) => void;
  wave: () => void;
  blink: () => void;
};

let rumputScriptPromise: Promise<void> | null = null;

function loadRumputMascot() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.customElements.get("rumput-mascot")) return Promise.resolve();
  if (rumputScriptPromise) return rumputScriptPromise;

  rumputScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-rumput-mascot]");
    const script = existing ?? document.createElement("script");

    const handleReady = () => resolve();
    const handleError = () => reject(new Error("Rumput mascot could not be loaded"));
    script.addEventListener("load", handleReady, { once: true });
    script.addEventListener("error", handleError, { once: true });

    if (!existing) {
      script.src = "/rumput-mascot.js";
      script.dataset.rumputMascot = "true";
      script.defer = true;
      document.head.appendChild(script);
    }
  });

  return rumputScriptPromise;
}

interface RumputMascotProps {
  state?: RumputState;
  action?: RumputAction;
  actionKey?: number;
  size?: number;
  className?: string;
}

export function RumputMascot({
  state = "idle",
  action,
  actionKey = 0,
  size = 96,
  className = "",
}: RumputMascotProps) {
  const [isReady, setIsReady] = useState(false);
  const mascotRef = useRef<RumputElement | null>(null);

  useEffect(() => {
    let active = true;
    void loadRumputMascot()
      .then(() => {
        if (active) setIsReady(true);
      })
      .catch(() => {
        if (active) setIsReady(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (isReady) mascotRef.current?.setState(state);
  }, [isReady, state]);

  useEffect(() => {
    if (!isReady || !action) return;
    mascotRef.current?.[action]();
  }, [action, actionKey, isReady]);

  return (
    <span className={`rumput-mascot-stage ${className}`.trim()} aria-hidden="true">
      {isReady
        ? createElement("rumput-mascot", {
            ref: mascotRef,
            size: String(size),
            state,
          })
        : <span className="rumput-mascot-placeholder" />}
    </span>
  );
}
