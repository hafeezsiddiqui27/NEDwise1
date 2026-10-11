
"use client";

import React, { useEffect, useState } from "react";
import type { Conversation } from "@/lib/types/chat";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId?: string | null;
  onSelectConversation: (id: string) => void;
  onCreateConversation: () => void;
  onDeleteConversation?: (id: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const [userName, setUserName] = useState<string>("Guest User");

  useEffect(() => {
    const stored = localStorage.getItem("user_name");
    if (stored) {
      setUserName(stored);
    }
  }, []);

  return (
    <>
      {/* Mobile Dark Backdrop with Fade */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-72 bg-black border-r border-zinc-800/90
          flex flex-col h-screen text-white font-sans select-none
          transition-transform duration-300 ease-in-out shrink-0
          lg:translate-x-0 lg:static lg:z-auto
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand Header with Live Waveform Icon */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Live animated signal icon */}
            <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-black text-xs relative overflow-hidden group">
              <span className="z-10 font-mono tracking-tighter">HX</span>
              {/* Subtle background live scan line */}
              <div className="absolute inset-0 bg-zinc-300/30 -translate-y-full animate-[scan_2.5s_infinite_linear]" />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-widest text-white uppercase">
                Heuristix
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                v1.0 Core
              </span>
            </div>
          </div>

          {/* Close drawer button for mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Create Session Button */}
        <div className="p-3 shrink-0">
          <button
            onClick={() => {
              onCreateConversation();
              setMobileOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-white text-black hover:bg-zinc-200 font-bold text-xs tracking-wider uppercase transition-all duration-200 active:scale-[0.98] group"
          >
            <svg
              className="w-4 h-4 text-black group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            New Workspace
          </button>
        </div>

        {/* Scrollable Conversation History */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            Session History
          </div>

          {conversations.length === 0 ? (
            <div className="px-3 py-8 text-center text-xs text-zinc-400 font-mono">
              [No active sessions]
            </div>
          ) : (
            conversations.map((conv, index) => {
              const isActive = conv.id === activeConversationId;
              return (
                <div
                  key={conv.id}
                  style={{ animationDelay: `${index * 30}ms` }}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    setMobileOpen(false);
                  }}
                  className={`
                    group relative flex items-center justify-between gap-2 px-3 py-2.5 rounded text-xs transition-all duration-200 cursor-pointer
                    animate-slide-in
                    ${
                      isActive
                        ? "bg-zinc-900 text-white font-medium border-l-2 border-white pl-2.5"
                        : "text-zinc-300 hover:bg-zinc-900/60 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <svg
                      className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                        isActive ? "text-white" : "text-zinc-400 group-hover:text-white"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <span className="truncate tracking-wide">{conv.title}</span>
                  </div>

                  {onDeleteConversation && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conv.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-150"
                      aria-label="Delete session"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer User Info Section */}
        <div className="p-3 border-t border-zinc-800 shrink-0">
          <div className="flex items-center justify-between px-3 py-2 rounded bg-zinc-950 border border-zinc-800/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative flex items-center justify-center">
                {/* Live ping animation */}
                <span className="w-2 h-2 rounded-full bg-white animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-white relative" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate tracking-wider uppercase">
                  {userName}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono truncate">
                  Guest User
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}