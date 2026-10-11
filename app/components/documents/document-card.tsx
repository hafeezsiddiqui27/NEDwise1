"use client";

import { FileText, MoreHorizontal, Trash2 } from "lucide-react";
import type { DocumentItem } from "@/lib/types/document";

export function DocumentCard({ document, onRemove }: { document: DocumentItem; onRemove: (id: string) => void }) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-slate-200 hover:bg-slate-50">
      <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600"><FileText size={18} /></div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-slate-800" title={document.name}>{document.name}</p>
        <div className="mt-1 flex items-center gap-2"><span className={`size-1.5 rounded-full ${document.status === "ready" ? "bg-emerald-500" : document.status === "processing" ? "bg-amber-500" : "bg-red-500"}`} /><span className="text-[10px] capitalize text-slate-500">{document.status}</span><span className="text-[10px] text-slate-400">{formatSize(document.size)}</span></div>
      </div>
      <button onClick={() => onRemove(document.id)} aria-label={`Remove ${document.name}`} className="rounded-md p-1.5 text-slate-300 opacity-100 hover:bg-white hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"><Trash2 size={14} /></button>
    </div>
  );
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
