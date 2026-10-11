// "use client";

// import { useChat } from "@/hooks/use-chat";
// import { useDocuments } from "@/hooks/use-documents";
// // import { ChatHeader } from "./chat-header";
// import { ChatMessages } from "./chat-messages";
// import { ChatInput } from "./chat-input";
// import { WelcomeScreen } from "./welcome-screen";
// // import { DocumentLibrary } from "../documents/document-library";

// export function ChatWorkspace() {
//   const { messages, sendMessage, isLoading, clearMessages } = useChat();
//   const { documents, addFiles, removeDocument, isUploading } = useDocuments();

//   return (
//     <div id="chat" className="mx-auto">
//       <section className="flex min-h-[calc(100vh-68px)] min-w-0 flex-col">
//         {/* <ChatHeader onClear={clearMessages} /> */}
//         <div className="flex-1">
//           {messages.length === 0 ? (
//             <WelcomeScreen onAsk={sendMessage} />
//           ) : (
//             <ChatMessages messages={messages} isLoading={isLoading} />
//           )}
//         </div>
//         <ChatInput onSend={sendMessage} disabled={isLoading} />
//         <p className="px-4 pb-4 text-center text-[11px] text-slate-400">
//           Demo responses are simulated. Connect the FastAPI backend when your RAG pipeline is ready.
//         </p>
//       </section>

//       {/* <aside id="documents" className="hidden border-l border-slate-200 bg-white xl:block">
//         <DocumentLibrary
//           documents={documents}
//           onUpload={addFiles}
//           onRemove={removeDocument}
//           isUploading={isUploading}
//         />
//       </aside> */}
//     </div>
//   );
// }
"use client";

import { useChat } from "@/hooks/use-chat";
import { useDocuments } from "@/hooks/use-documents";
// import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { WelcomeScreen } from "./welcome-screen";
// import { DocumentLibrary } from "../documents/document-library";

type ChatWorkspaceProps = {
  activeConversationId: string;
};

export function ChatWorkspace({ activeConversationId }: ChatWorkspaceProps) {
  const { messages, sendMessage, isLoading, clearMessages } = useChat(activeConversationId);
  const { documents, addFiles, removeDocument, isUploading } = useDocuments();

  return (
    <div id="chat" className="mx-auto">
      <section className="flex min-h-[calc(100vh-68px)] min-w-0 flex-col">
        {/* <ChatHeader onClear={clearMessages} /> */}
        <div className="flex-1">
          {messages.length === 0 ? (
            <WelcomeScreen onAsk={sendMessage} />
          ) : (
            <ChatMessages messages={messages} isLoading={isLoading} />
          )}
        </div>
        <ChatInput onSend={sendMessage} disabled={isLoading} />
        <p className="px-4 pb-4 text-center text-[11px] text-slate-400">
          Demo responses are simulated. Connect the FastAPI backend when your RAG pipeline is ready.
        </p>
      </section>

      {/* <aside id="documents" className="hidden border-l border-slate-200 bg-white xl:block">
        <DocumentLibrary
          documents={documents}
          onUpload={addFiles}
          onRemove={removeDocument}
          isUploading={isUploading}
        />
      </aside> */}
    </div>
  );
}