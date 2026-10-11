"use client";

import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/lib/types/chat";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-white"><Bot size={16} /></div>}
      <div className={`max-w-[85%] ${isUser ? "rounded-2xl rounded-tr-md bg-slate-900 px-4 py-3 text-white" : "prose prose-sm max-w-none text-slate-700"}`}>
        {isUser ? <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p> : <ReactMarkdown>{message.content}</ReactMarkdown>}
      </div>
      {isUser && <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-slate-200 text-slate-600"><User size={16} /></div>}
    </div>
  );
}
