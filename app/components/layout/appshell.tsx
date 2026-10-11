
// "use client";

// import { useState } from "react";
// import { Sidebar } from "./sidebar";
// import { ChatWorkspace } from "../chat/chat-workspace";
// import { useConversations } from "@/hooks/use-conversations";

// export function AppShell() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const {
//     conversations,
//     activeConversationId,
//     createConversation,
//     selectConversation,
// onDeleteConversation,
//   } = useConversations();

//   return (
//     <div className="flex h-screen w-screen overflow-hidden bg-white  text-black font-sans antialiased">
//       {/* Fixed Desktop Sidebar & Mobile Drawer */}
//       <Sidebar
//         conversations={conversations}
//         activeConversationId={activeConversationId}
//         onCreateConversation={createConversation}
//         onSelectConversation={selectConversation}
//         onDeleteConversation={DeleteConversation}
//         mobileOpen={mobileOpen}
//         setMobileOpen={setMobileOpen}
//       />

//       {/* Main Chat Area - Independently Scrollable Workspace */}
//       <div className="flex flex-1 flex-col h-full min-w-0 bg-white overflow-hidden relative">
//         {/* Mobile Header Toggle */}
//         <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-zinc-800 text-white shrink-0">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setMobileOpen(true)}
//               className="p-1.5 rounded text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors focus:outline-none"
//               aria-label="Open navigation"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//             <span className="font-bold text-sm tracking-wider uppercase">Heuristix</span>
//           </div>

//           <button
//             onClick={createConversation}
//             className="p-1.5 rounded bg-white text-black hover:bg-zinc-200 transition-all active:scale-95"
//             aria-label="New Workspace"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
//             </svg>
//           </button>
//         </div>

//         {/* Workspace Canvas */}
//         <main className="flex-1 overflow-y-auto h-full">
//           <ChatWorkspace activeConversationId={activeConversationId} />
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar"; // Adjust relative import if needed based on your folder structure
import { ChatWorkspace } from "../chat/chat-workspace";
import { useConversations } from "@/hooks/use-conversations";

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    conversations,
    activeConversationId,
    createConversation,
    selectConversation,
    deleteConversation,
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

      {/* Main Chat Area - Independently Scrollable Workspace */}
      <div className="flex flex-1 flex-col h-full min-w-0 bg-white overflow-hidden relative">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-zinc-800 text-white shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-1.5 rounded text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors focus:outline-none"
              aria-label="Open navigation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="font-bold text-sm tracking-wider uppercase">Heuristix</span>
          </div>

          <button
            onClick={createConversation}
            className="p-1.5 rounded bg-white text-black hover:bg-zinc-200 transition-all active:scale-95"
            aria-label="New Workspace"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Workspace Canvas */}
        <main className="flex-1 overflow-y-auto h-full">
          <ChatWorkspace activeConversationId={activeConversationId} />
        </main>
      </div>
    </div>
  );
}