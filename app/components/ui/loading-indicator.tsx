"use client";

export function LoadingIndicator() {
  return <div className="flex items-center gap-1.5 py-1" aria-label="Assistant is thinking"><span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.25s]" /><span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.12s]" /><span className="size-1.5 animate-bounce rounded-full bg-slate-400" /><span className="ml-2 text-xs text-slate-400">Thinking</span></div>;
}
