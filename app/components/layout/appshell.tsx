
"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { ChatWorkspace } from "../chat/chat-workspace";
import { useConversations } from "@/hooks/use-conversations";
import { Menu, Plus } from "lucide-react";

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    conversations,
    activeConversationId,
    createConversation,
    selectConversation,
    deleteConversation,
    updateConversationTitle, // <-- Added here
  } = useConversations();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-black font-sans antialiased">
      {/* Fixed Desktop Sidebar & Mobile Drawer */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onCreateConversation={createConversation}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Container */}
      <div className="flex flex-1 flex-col h-full min-w-0 bg-white overflow-hidden relative">
        
        {/* Sticky Mobile Header (Stays pinned at top when scrolling) */}
        <header className="sticky top-0 z-30 lg:hidden flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-neutral-200 text-neutral-900 shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm tracking-wider uppercase text-neutral-900">
              Heuristix
            </span>
          </div>

          <button
            onClick={() => createConversation()}
            className="p-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all active:scale-95 cursor-pointer flex items-center justify-center"
            aria-label="New Workspace"
          >
            <Plus className="w-4 h-4" />
          </button>
        </header>

        {/* Workspace Canvas (Independently scrollable message area) */}
        <main className="flex-1 overflow-y-auto h-full">
          <ChatWorkspace 
            activeConversationId={activeConversationId} 
            onUpdateTitle={updateConversationTitle} // <-- Passed down here
          />
        </main>
      </div>
    </div>
  );
}