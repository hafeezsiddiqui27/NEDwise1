// "use client";

// export function LoadingIndicator() {
//   return <div className="flex items-center gap-1.5 py-1" aria-label="Assistant is thinking"><span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.25s]" /><span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.12s]" /><span className="size-1.5 animate-bounce rounded-full bg-slate-400" /><span className="ml-2 text-xs text-slate-400">cooking</span></div>;
// }

"use client";

import { useEffect, useState } from "react";
import {
  BrainCircuit,
  CheckCircle2,
  CircleDot,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

const STATUS_MESSAGES = [
  "Cooking up an answer",
  "Searching the prospectus",
  "Connecting the relevant information",
  "Thinking through your question",
  "Almost there, free models can take a moment",
];

export function LoadingIndicator() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % STATUS_MESSAGES.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full max-w-sm animate-in fade-in duration-300"
      role="status"
      aria-live="polite"
      aria-label="Assistant is preparing an answer"
    >
      <div className="flex items-start gap-3">
        {/* Animated assistant icon */}
        

        <div className="min-w-0 flex-1 space-y-3 pt-1">
          {/* Animated dots */}
          <div className="flex items-center gap-1.5">
            <span className="size-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
            <span className="size-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
            <span className="size-2 animate-bounce rounded-full bg-slate-400" />
            <span className="ml-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              {STATUS_MESSAGES[messageIndex]}
            </span>
          </div>

          {/* Indeterminate progress bar */}
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="absolute h-full w-1/3 animate-[loading-slide_1.5s_ease-in-out_infinite] rounded-full bg-slate-600 dark:bg-slate-300" />
          </div>

          {/* Animated processing stages */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <CircleDot className="size-3 animate-pulse" />
              Retrieve
            </span>
            <span className="inline-flex items-center gap-1">
              <LoaderCircle className="size-3 animate-spin" />
              Generate
            </span>
            <span className="inline-flex items-center gap-1">
              <Sparkles className="size-3 animate-pulse" />
              Respond
            </span>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes loading-slide {
          0% {
            left: -35%;
          }
          100% {
            left: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-bounce,
          .animate-pulse,
          .animate-ping,
          .animate-spin {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
