
"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
  Bot,
  User,
  Code2,
  ExternalLink,
} from "lucide-react";

import type { ChatMessage as ChatMessageType } from "@/lib/types/chat";
import { LoadingIndicator } from "../ui/loading-indicator";

import "highlight.js/styles/github.css";

export function ChatMessages({
  messages,
  isLoading,
}: {
  messages: ChatMessageType[];
  isLoading: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:px-8">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex gap-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-white">
            <Bot size={16} />
          </div>

          <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3">
            <LoadingIndicator />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-white">
          <Bot size={16} />
        </div>
      )}

      <div
        className={`min-w-0 ${
          isUser
            ? "max-w-[88%] rounded-2xl rounded-tr-md bg-slate-900 px-4 py-3 text-white sm:max-w-[80%]"
            : "max-w-full flex-1 sm:max-w-[calc(100%-2.75rem)]"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words text-sm leading-6">
            {message.content}
          </p>
        ) : (
          <div className="min-w-0">
            <div
              className="
                prose prose-sm max-w-none break-words text-slate-700
                prose-headings:scroll-mt-20
                prose-headings:font-semibold
                prose-headings:tracking-tight
                prose-h1:mb-4 prose-h1:mt-7 prose-h1:text-2xl prose-h1:text-slate-900
                prose-h2:mb-3 prose-h2:mt-7 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-h2:text-xl prose-h2:text-slate-900
                prose-h3:mb-2 prose-h3:mt-5 prose-h3:text-base prose-h3:text-slate-900
                prose-p:my-3 prose-p:leading-7
                prose-a:font-medium prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline
                prose-strong:font-semibold prose-strong:text-slate-900
                prose-ul:my-3 prose-ul:pl-5
                prose-ol:my-3 prose-ol:pl-5
                prose-li:my-1 prose-li:leading-7
                prose-li:marker:text-slate-400
                prose-blockquote:my-4 prose-blockquote:border-l-4 prose-blockquote:border-slate-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600
                prose-hr:my-6 prose-hr:border-slate-200
                prose-table:my-5 prose-table:w-full prose-table:border-collapse prose-table:text-sm
                prose-th:border prose-th:border-slate-200 prose-th:bg-slate-50 prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-slate-800
                prose-td:border prose-td:border-slate-200 prose-td:px-3 prose-td:py-2 prose-td:align-top
                prose-img:my-4 prose-img:rounded-xl
                prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-medium prose-code:text-slate-800 prose-code:before:content-none prose-code:after:content-none
                prose-pre:my-4 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-50 prose-pre:p-4 prose-pre:text-sm prose-pre:leading-6
              "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  a: ({ href, children, ...props }) => {
                    const isExternal =
                      href?.startsWith("https://") ||
                      href?.startsWith("http://");

                    return (
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  },

                  pre: ({ children }) => (
                    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6">
                      {children}
                    </pre>
                  ),

                  code: ({ className, children, ...props }) => {
                    const isBlock = Boolean(className?.includes("language-"));

                    if (isBlock) {
                      return (
                        <code
                          className={`${className ?? ""} font-mono text-[13px]`}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }

                    return (
                      <code
                        className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-slate-200/70 pt-3 text-[11px] text-slate-400">
              <Code2 size={13} />
              <span>AI-generated response</span>
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-slate-200 text-slate-600">
          <User size={16} />
        </div>
      )}
    </div>
  );
}
