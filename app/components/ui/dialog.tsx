"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

type Props = { open: boolean; onClose: () => void; title: string; children: ReactNode };

export function Dialog({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) { if (event.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <button aria-label="Close dialog overlay" onClick={onClose} className="absolute inset-0 bg-slate-950/40" />
      <div role="dialog" aria-modal="true" aria-label={title} className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">{title}</h2><button onClick={onClose} aria-label="Close dialog" className="rounded-lg p-2 hover:bg-slate-100"><X size={17} /></button></div>
        {children}
      </div>
    </div>
  );
}
