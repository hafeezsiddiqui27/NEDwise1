// // // // // "use client";

// // // // // import { useState, useEffect } from "react";
// // // // // import { useChat } from "@/hooks/use-chat";
// // // // // import { uploadDocument } from "@/lib/api";
// // // // // import { ChatMessages } from "./chat-messages";
// // // // // import { ChatInput } from "./chat-input";
// // // // // import { WelcomeScreen } from "./welcome-screen";
// // // // // import { FileText, Loader2 } from "lucide-react";

// // // // // type ChatWorkspaceProps = {
// // // // //   activeConversationId: string;
// // // // //   onUpdateTitle: (id: string, text: string) => void;
// // // // // };

// // // // // export function ChatWorkspace({ activeConversationId, onUpdateTitle }: ChatWorkspaceProps) {
// // // // //   const { messages, sendMessage, isLoading, clearMessages } = useChat(activeConversationId);
  
// // // // //   const fileIdStorageKey = `heuristix_file_${activeConversationId}`;
// // // // //   const fileNameStorageKey = `heuristix_filename_${activeConversationId}`;

// // // // //   const [activeFileId, setActiveFileId] = useState<string | null>(() => {
// // // // //     if (typeof window === "undefined") return null;
// // // // //     try {
// // // // //       return localStorage.getItem(fileIdStorageKey);
// // // // //     } catch {
// // // // //       return null;
// // // // //     }
// // // // //   });

// // // // //   const [activeFileName, setActiveFileName] = useState<string | null>(() => {
// // // // //     if (typeof window === "undefined") return null;
// // // // //     try {
// // // // //       return localStorage.getItem(fileNameStorageKey);
// // // // //     } catch {
// // // // //       return null;
// // // // //     }
// // // // //   });

// // // // //   const [isUploading, setIsUploading] = useState(false);
// // // // //   const [uploadError, setUploadError] = useState<string | null>(null);

// // // // //   // Sync active file state when switching conversations
// // // // //   useEffect(() => {
// // // // //     try {
// // // // //       setActiveFileId(localStorage.getItem(fileIdStorageKey));
// // // // //       setActiveFileName(localStorage.getItem(fileNameStorageKey));
// // // // //     } catch {
// // // // //       setActiveFileId(null);
// // // // //       setActiveFileName(null);
// // // // //     }
// // // // //     setUploadError(null);
// // // // //   }, [activeConversationId, fileIdStorageKey, fileNameStorageKey]);

// // // // //   function handleRemoveFile() {
// // // // //     setActiveFileId(null);
// // // // //     setActiveFileName(null);
// // // // //     try {
// // // // //       localStorage.removeItem(fileIdStorageKey);
// // // // //       localStorage.removeItem(fileNameStorageKey);
// // // // //     } catch {}
// // // // //   }

// // // // //   async function handleSend(text: string, file: File | null) {
// // // // //     setUploadError(null);
// // // // //     let fileIdToUse = activeFileId;

// // // // //     try {
// // // // //       if (file) {
// // // // //         setIsUploading(true);
// // // // //         const response = await uploadDocument(file);
// // // // //         fileIdToUse = response.file_id;
        
// // // // //         setActiveFileId(response.file_id);
// // // // //         setActiveFileName(response.filename);
        
// // // // //         localStorage.setItem(fileIdStorageKey, response.file_id);
// // // // //         localStorage.setItem(fileNameStorageKey, response.filename);
        
// // // // //         setIsUploading(false);
// // // // //       }

// // // // //       if (!fileIdToUse) {
// // // // //         setUploadError("Please upload a PDF, CSV, or TXT document first for this conversation.");
// // // // //         return;
// // // // //       }

// // // // //       // Automatically update conversation title on the first message
// // // // //       if (messages.length === 0) {
// // // // //         onUpdateTitle(activeConversationId, text);
// // // // //       }

// // // // //       await sendMessage(text, fileIdToUse);
// // // // //     } catch (error: any) {
// // // // //       setIsUploading(false);
// // // // //       setUploadError(error.message || "Failed to upload document.");
// // // // //     }
// // // // //   }

// // // // //   return (
// // // // //     <div id="chat" className="mx-auto flex h-full w-full max-w-4xl flex-col">
// // // // //       <section className="flex min-h-[calc(100vh-68px)] min-w-0 flex-col">
        
// // // // //         {activeFileName && (
// // // // //           <div className="mx-4 mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 sm:mx-8">
// // // // //             <div className="flex items-center gap-2 truncate">
// // // // //               <FileText size={16} className="text-slate-500" />
// // // // //               <span className="font-medium">Active Document:</span>
// // // // //               <span className="truncate text-slate-900">{activeFileName}</span>
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={handleRemoveFile}
// // // // //               className="text-xs text-slate-500 hover:text-red-600"
// // // // //             >
// // // // //               Change / Remove
// // // // //             </button>
// // // // //           </div>
// // // // //         )}

// // // // //         {uploadError && (
// // // // //           <div className="mx-4 mt-3 rounded-xl bg-red-50 p-3 text-xs text-red-600 sm:mx-8">
// // // // //             {uploadError}
// // // // //           </div>
// // // // //         )}

// // // // //         <div className="flex-1">
// // // // //           {messages.length === 0 ? (
// // // // //             <WelcomeScreen onAsk={(text) => handleSend(text, null)} />
// // // // //           ) : (
// // // // //             <ChatMessages messages={messages} isLoading={isLoading || isUploading} />
// // // // //           )}
// // // // //         </div>

// // // // //         <ChatInput 
// // // // //           onSend={handleSend} 
// // // // //           disabled={isLoading || isUploading} 
// // // // //         />
        
// // // // //         <p className="px-4 pb-4 pt-2 text-center text-[11px] text-slate-400">
// // // // //           {isUploading ? (
// // // // //             <span className="inline-flex items-center gap-1.5 text-slate-600">
// // // // //               <Loader2 size={12} className="animate-spin" /> Uploading and indexing document...
// // // // //             </span>
// // // // //           ) : (
// // // // //             "Created by Team Heuristix."
// // // // //           )}
// // // // //         </p>
// // // // //       </section>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import { useChat } from "@/hooks/use-chat";
// // // // import { uploadDocument, ingestUrl } from "@/lib/api";
// // // // import { ChatMessages } from "./chat-messages";
// // // // import { ChatInput } from "./chat-input";
// // // // import { WelcomeScreen } from "./welcome-screen";
// // // // import { FileText, Loader2, Globe } from "lucide-react";

// // // // type ChatWorkspaceProps = {
// // // //   activeConversationId: string;
// // // //   onUpdateTitle: (id: string, text: string) => void;
// // // // };

// // // // export function ChatWorkspace({ activeConversationId, onUpdateTitle }: ChatWorkspaceProps) {
// // // //   const { messages, sendMessage, isLoading } = useChat(activeConversationId);
  
// // // //   const fileIdStorageKey = `heuristix_file_${activeConversationId}`;
// // // //   const fileNameStorageKey = `heuristix_filename_${activeConversationId}`;

// // // //   const [activeFileId, setActiveFileId] = useState<string | null>(() => {
// // // //     if (typeof window === "undefined") return null;
// // // //     try {
// // // //       return localStorage.getItem(fileIdStorageKey);
// // // //     } catch {
// // // //       return null;
// // // //     }
// // // //   });

// // // //   const [activeFileName, setActiveFileName] = useState<string | null>(() => {
// // // //     if (typeof window === "undefined") return null;
// // // //     try {
// // // //       return localStorage.getItem(fileNameStorageKey);
// // // //     } catch {
// // // //       return null;
// // // //     }
// // // //   });

// // // //   const [isUploading, setIsUploading] = useState(false);
// // // //   const [uploadError, setUploadError] = useState<string | null>(null);

// // // //   // Sync active file state when switching conversations
// // // //   useEffect(() => {
// // // //     try {
// // // //       setActiveFileId(localStorage.getItem(fileIdStorageKey));
// // // //       setActiveFileName(localStorage.getItem(fileNameStorageKey));
// // // //     } catch {
// // // //       setActiveFileId(null);
// // // //       setActiveFileName(null);
// // // //     }
// // // //     setUploadError(null);
// // // //   }, [activeConversationId, fileIdStorageKey, fileNameStorageKey]);

// // // //   function handleRemoveFile() {
// // // //     setActiveFileId(null);
// // // //     setActiveFileName(null);
// // // //     try {
// // // //       localStorage.removeItem(fileIdStorageKey);
// // // //       localStorage.removeItem(fileNameStorageKey);
// // // //     } catch {}
// // // //   }

// // // //   async function handleSend(text: string, file: File | null, urlInput?: string | null) {
// // // //     setUploadError(null);
// // // //     let fileIdToUse = activeFileId;

// // // //     try {
// // // //       if (file) {
// // // //         setIsUploading(true);
// // // //         const response = await uploadDocument(file);
// // // //         fileIdToUse = response.file_id;
        
// // // //         setActiveFileId(response.file_id);
// // // //         setActiveFileName(response.filename);
        
// // // //         localStorage.setItem(fileIdStorageKey, response.file_id);
// // // //         localStorage.setItem(fileNameStorageKey, response.filename);
// // // //         setIsUploading(false);
// // // //       } else if (urlInput) {
// // // //         setIsUploading(true);
// // // //         const response = await ingestUrl(urlInput);
// // // //         fileIdToUse = response.file_id;

// // // //         setActiveFileId(response.file_id);
// // // //         setActiveFileName(response.filename);

// // // //         localStorage.setItem(fileIdStorageKey, response.file_id);
// // // //         localStorage.setItem(fileNameStorageKey, response.filename);
// // // //         setIsUploading(false);
// // // //       }

// // // //       if (!fileIdToUse) {
// // // //         setUploadError("Please upload a document (PDF, CSV, TXT) or provide a web URL first for this conversation.");
// // // //         return;
// // // //       }

// // // //       // Automatically update conversation title on the first message
// // // //       if (messages.length === 0) {
// // // //         onUpdateTitle(activeConversationId, text);
// // // //       }

// // // //       await sendMessage(text, fileIdToUse);
// // // //     } catch (error: any) {
// // // //       setIsUploading(false);
// // // //       setUploadError(error.message || "Failed to process document or web link.");
// // // //     }
// // // //   }

// // // //   return (
// // // //     <div id="chat" className="mx-auto flex h-full w-full max-w-4xl flex-col">
// // // //       <section className="flex min-h-[calc(100vh-68px)] min-w-0 flex-col">
        
// // // //         {/* Active Document / URL Banner */}
// // // //         {activeFileName && (
// // // //           <div className="mx-4 mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 sm:mx-8">
// // // //             <div className="flex items-center gap-2 truncate">
// // // //               {activeFileName.startsWith("http") ? (
// // // //                 <Globe size={16} className="text-slate-500 shrink-0" />
// // // //               ) : (
// // // //                 <FileText size={16} className="text-slate-500 shrink-0" />
// // // //               )}
// // // //               <span className="font-medium">Active Source:</span>
// // // //               <span className="truncate text-slate-900">{activeFileName}</span>
// // // //             </div>
// // // //             <button
// // // //               onClick={handleRemoveFile}
// // // //               className="text-xs text-slate-500 hover:text-red-600 shrink-0 ml-2"
// // // //             >
// // // //               Change / Remove
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {/* Upload / Error Banner */}
// // // //         {uploadError && (
// // // //           <div className="mx-4 mt-3 rounded-xl bg-red-50 p-3 text-xs text-red-600 sm:mx-8">
// // // //             {uploadError}
// // // //           </div>
// // // //         )}

// // // //         <div className="flex-1">
// // // //           {messages.length === 0 ? (
// // // //             <WelcomeScreen onAsk={(text) => handleSend(text, null, null)} />
// // // //           ) : (
// // // //             <ChatMessages messages={messages} isLoading={isLoading || isUploading} />
// // // //           )}
// // // //         </div>

// // // //         <ChatInput 
// // // //           onSend={handleSend} 
// // // //           disabled={isLoading || isUploading} 
// // // //         />
        
// // // //         <p className="px-4 pb-4 pt-2 text-center text-[11px] text-slate-400">
// // // //           {isUploading ? (
// // // //             <span className="inline-flex items-center gap-1.5 text-slate-600">
// // // //               <Loader2 size={12} className="animate-spin" /> Indexing document or web link...
// // // //             </span>
// // // //           ) : (
// // // //             "Created by Team Heuristix."
// // // //           )}
// // // //         </p>
// // // //       </section>
// // // //     </div>
// // // //   );
// // // // }
// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useChat } from "@/hooks/use-chat";
// // // import { uploadDocument, ingestUrl } from "@/lib/api";
// // // import { ChatMessages } from "./chat-messages";
// // // import { ChatInput } from "./chat-input";
// // // import { WelcomeScreen } from "./welcome-screen";
// // // import { FileText, Loader2, Globe } from "lucide-react";

// // // type ChatWorkspaceProps = {
// // //   activeConversationId: string;
// // //   onUpdateTitle: (id: string, text: string) => void;
// // // };

// // // export function ChatWorkspace({ activeConversationId, onUpdateTitle }: ChatWorkspaceProps) {
// // //   const { messages, sendMessage, isLoading } = useChat(activeConversationId);
  
// // //   const fileIdStorageKey = `heuristix_file_${activeConversationId}`;
// // //   const fileNameStorageKey = `heuristix_filename_${activeConversationId}`;

// // //   const [activeFileId, setActiveFileId] = useState<string | null>(() => {
// // //     if (typeof window === "undefined") return null;
// // //     try {
// // //       return localStorage.getItem(fileIdStorageKey);
// // //     } catch {
// // //       return null;
// // //     }
// // //   });

// // //   const [activeFileName, setActiveFileName] = useState<string | null>(() => {
// // //     if (typeof window === "undefined") return null;
// // //     try {
// // //       return localStorage.getItem(fileNameStorageKey);
// // //     } catch {
// // //       return null;
// // //     }
// // //   });

// // //   const [isUploading, setIsUploading] = useState(false);
// // //   const [uploadError, setUploadError] = useState<string | null>(null);

// // //   // Sync active file state when switching conversations
// // //   useEffect(() => {
// // //     try {
// // //       setActiveFileId(localStorage.getItem(fileIdStorageKey));
// // //       setActiveFileName(localStorage.getItem(fileNameStorageKey));
// // //     } catch {
// // //       setActiveFileId(null);
// // //       setActiveFileName(null);
// // //     }
// // //     setUploadError(null);
// // //   }, [activeConversationId, fileIdStorageKey, fileNameStorageKey]);

// // //   function handleRemoveFile() {
// // //     setActiveFileId(null);
// // //     setActiveFileName(null);
// // //     try {
// // //       localStorage.removeItem(fileIdStorageKey);
// // //       localStorage.removeItem(fileNameStorageKey);
// // //     } catch {}
// // //   }

// // //   function generateTitleSummary(text: string): string {
// // //     const stopWords = new Set(["what", "is", "the", "a", "an", "and", "or", "to", "in", "on", "for", "with", "how", "can", "you", "tell", "me", "about", "of", "it"]);
// // //     const words = text
// // //       .replace(/[^\w\s]/gi, "")
// // //       .split(/\s+/)
// // //       .filter(w => w.length > 0 && !stopWords.has(w.toLowerCase()));
    
// // //     const summaryWords = (words.length > 0 ? words : text.split(/\s+/)).slice(0, 4);
// // //     return summaryWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
// // //   }

// // //   async function handleSend(text: string, file: File | null, urlInput?: string | null) {
// // //     setUploadError(null);
// // //     let fileIdToUse = activeFileId;

// // //     try {
// // //       if (file) {
// // //         setIsUploading(true);
// // //         const response = await uploadDocument(file);
// // //         fileIdToUse = response.file_id;
        
// // //         setActiveFileId(response.file_id);
// // //         setActiveFileName(response.filename);
        
// // //         localStorage.setItem(fileIdStorageKey, response.file_id);
// // //         localStorage.setItem(fileNameStorageKey, response.filename);
// // //         setIsUploading(false);
// // //       } else if (urlInput) {
// // //         setIsUploading(true);
// // //         const response = await ingestUrl(urlInput);
// // //         fileIdToUse = response.file_id;

// // //         setActiveFileId(response.file_id);
// // //         setActiveFileName(response.filename);

// // //         localStorage.setItem(fileIdStorageKey, response.file_id);
// // //         localStorage.setItem(fileNameStorageKey, response.filename);
// // //         setIsUploading(false);
// // //       }

// // //       if (!fileIdToUse) {
// // //         setUploadError("Please upload a document (PDF, CSV, TXT) or provide a web URL first for this conversation.");
// // //         return;
// // //       }

// // //       // Automatically update conversation title with a 4-word summary on the first message
// // //       if (messages.length === 0) {
// // //         const titleSummary = generateTitleSummary(text);
// // //         onUpdateTitle(activeConversationId, titleSummary);
// // //       }

// // //       await sendMessage(text, fileIdToUse);
// // //     } catch (error: any) {
// // //       setIsUploading(false);
// // //       setUploadError(error.message || "Failed to process document or web link.");
// // //     }
// // //   }

// // //   return (
// // //     <div id="chat" className="mx-auto flex h-full w-full max-w-4xl flex-col">
// // //       <section className="flex min-h-[calc(100vh-68px)] min-w-0 flex-col">
        
// // //         {activeFileName && (
// // //           <div className="mx-4 mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 sm:mx-8">
// // //             <div className="flex items-center gap-2 truncate">
// // //               {activeFileName.startsWith("http") ? (
// // //                 <Globe size={16} className="text-slate-500 shrink-0" />
// // //               ) : (
// // //                 <FileText size={16} className="text-slate-500 shrink-0" />
// // //               )}
// // //               <span className="font-medium">Active Source:</span>
// // //               <span className="truncate text-slate-900">{activeFileName}</span>
// // //             </div>
// // //             <button
// // //               onClick={handleRemoveFile}
// // //               className="text-xs text-slate-500 hover:text-red-600 shrink-0 ml-2"
// // //             >
// // //               Change / Remove
// // //             </button>
// // //           </div>
// // //         )}

// // //         {uploadError && (
// // //           <div className="mx-4 mt-3 rounded-xl bg-red-50 p-3 text-xs text-red-600 sm:mx-8">
// // //             {uploadError}
// // //           </div>
// // //         )}

// // //         <div className="flex-1">
// // //           {messages.length === 0 ? (
// // //             <WelcomeScreen onAsk={(text) => handleSend(text, null, null)} />
// // //           ) : (
// // //             <ChatMessages messages={messages} isLoading={isLoading || isUploading} />
// // //           )}
// // //         </div>

// // //         <ChatInput 
// // //           onSend={handleSend} 
// // //           disabled={isLoading || isUploading} 
// // //         />
        
// // //         <p className="px-4 pb-4 pt-2 text-center text-[11px] text-slate-400">
// // //           {isUploading ? (
// // //             <span className="inline-flex items-center gap-1.5 text-slate-600">
// // //               <Loader2 size={12} className="animate-spin" /> Indexing document or web link...
// // //             </span>
// // //           ) : (
// // //             "Created by Team Heuristix."
// // //           )}
// // //         </p>
// // //       </section>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useState, useEffect } from "react";
// // import { useChat } from "@/hooks/use-chat";
// // import { uploadDocument, ingestUrl } from "@/lib/api";
// // import { ChatMessages } from "./chat-messages";
// // import { ChatInput } from "./chat-input";
// // import { WelcomeScreen } from "./welcome-screen";
// // import { FileText, Loader2, Globe } from "lucide-react";

// // type ChatWorkspaceProps = {
// //   activeConversationId: string;
// //   onUpdateTitle: (id: string, text: string) => void;
// // };

// // export function ChatWorkspace({ activeConversationId, onUpdateTitle }: ChatWorkspaceProps) {
// //   const { messages, sendMessage, isLoading } = useChat(activeConversationId);
  
// //   const fileIdStorageKey = `heuristix_file_${activeConversationId}`;
// //   const fileNameStorageKey = `heuristix_filename_${activeConversationId}`;

// //   const [activeFileId, setActiveFileId] = useState<string | null>(() => {
// //     if (typeof window === "undefined") return null;
// //     try {
// //       return localStorage.getItem(fileIdStorageKey);
// //     } catch {
// //       return null;
// //     }
// //   });

// //   const [activeFileName, setActiveFileName] = useState<string | null>(() => {
// //     if (typeof window === "undefined") return null;
// //     try {
// //       return localStorage.getItem(fileNameStorageKey);
// //     } catch {
// //       return null;
// //     }
// //   });

// //   const [isUploading, setIsUploading] = useState(false);
// //   const [uploadError, setUploadError] = useState<string | null>(null);

// //   // Sync active file state when switching conversations
// //   useEffect(() => {
// //     try {
// //       setActiveFileId(localStorage.getItem(fileIdStorageKey));
// //       setActiveFileName(localStorage.getItem(fileNameStorageKey));
// //     } catch {
// //       setActiveFileId(null);
// //       setActiveFileName(null);
// //     }
// //     setUploadError(null);
// //   }, [activeConversationId, fileIdStorageKey, fileNameStorageKey]);

// //   function handleRemoveFile() {
// //     setActiveFileId(null);
// //     setActiveFileName(null);
// //     try {
// //       localStorage.removeItem(fileIdStorageKey);
// //       localStorage.removeItem(fileNameStorageKey);
// //     } catch {}
// //   }

// //   // Smarter 4-word keyword summary generator
// //   function generateTitleSummary(text: string): string {
// //     const stopWords = new Set([
// //       "what", "is", "the", "a", "an", "and", "or", "to", "in", "on", 
// //       "for", "with", "how", "can", "you", "tell", "me", "about", "of", 
// //       "it", "please", "i", "do", "does", "are", "from", "that"
// //     ]);
    
// //     const words = text
// //       .replace(/[^\w\s]/gi, "")
// //       .split(/\s+/)
// //       .filter(w => w.length > 0 && !stopWords.has(w.toLowerCase()));
    
// //     const summaryWords = (words.length > 0 ? words : text.split(/\s+/)).slice(0, 4);
// //     return summaryWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
// //   }

// //   async function handleSend(text: string, file: File | null, urlInput?: string | null) {
// //     setUploadError(null);
// //     let fileIdToUse = activeFileId;

// //     try {
// //       if (file) {
// //         setIsUploading(true);
// //         const response = await uploadDocument(file);
// //         fileIdToUse = response.file_id;
        
// //         setActiveFileId(response.file_id);
// //         setActiveFileName(response.filename);
        
// //         localStorage.setItem(fileIdStorageKey, response.file_id);
// //         localStorage.setItem(fileNameStorageKey, response.filename);
// //         setIsUploading(false);
// //       } else if (urlInput) {
// //         setIsUploading(true);
// //         const response = await ingestUrl(urlInput);
// //         fileIdToUse = response.file_id;

// //         setActiveFileId(response.file_id);
// //         setActiveFileName(response.filename);

// //         localStorage.setItem(fileIdStorageKey, response.file_id);
// //         localStorage.setItem(fileNameStorageKey, response.filename);
// //         setIsUploading(false);
// //       }

// //       // Automatically update conversation title with a 4-word summary on the first message
// //       if (messages.length === 0) {
// //         const titleSummary = generateTitleSummary(text);
// //         onUpdateTitle(activeConversationId, titleSummary);
// //       }

// //       // Send message (if fileIdToUse is null/empty, backend will return the polite prompt)
// //       await sendMessage(text, fileIdToUse);
// //     } catch (error: any) {
// //       setIsUploading(false);
// //       setUploadError(error.message || "Failed to process document or web link.");
// //     }
// //   }

// //   return (
// //     <div id="chat" className="mx-auto flex h-full w-full max-w-4xl flex-col">
// //       <section className="flex min-h-[calc(100vh-68px)] min-w-0 flex-col">
        
// //         {activeFileName && (
// //           <div className="mx-4 mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 sm:mx-8">
// //             <div className="flex items-center gap-2 truncate">
// //               {activeFileName.startsWith("http") ? (
// //                 <Globe size={16} className="text-slate-500 shrink-0" />
// //               ) : (
// //                 <FileText size={16} className="text-slate-500 shrink-0" />
// //               )}
// //               <span className="font-medium">Active Source:</span>
// //               <span className="truncate text-slate-900">{activeFileName}</span>
// //             </div>
// //             <button
// //               onClick={handleRemoveFile}
// //               className="text-xs text-slate-500 hover:text-red-600 shrink-0 ml-2"
// //             >
// //               Change / Remove
// //             </button>
// //           </div>
// //         )}

// //         {uploadError && (
// //           <div className="mx-4 mt-3 rounded-xl bg-red-50 p-3 text-xs text-red-600 sm:mx-8">
// //             {uploadError}
// //           </div>
// //         )}

// //         <div className="flex-1">
// //           {messages.length === 0 ? (
// //             <WelcomeScreen onAsk={(text) => handleSend(text, null, null)} />
// //           ) : (
// //             <ChatMessages messages={messages} isLoading={isLoading || isUploading} />
// //           )}
// //         </div>

// //         <ChatInput 
// //           onSend={handleSend} 
// //           disabled={isLoading || isUploading} 
// //         />
        
// //         <p className="px-4 pb-4 pt-2 text-center text-[11px] text-slate-400">
// //           {isUploading ? (
// //             <span className="inline-flex items-center gap-1.5 text-slate-600">
// //               <Loader2 size={12} className="animate-spin" /> Indexing document or web link...
// //             </span>
// //           ) : (
// //             "Created by Team Heuristix."
// //           )}
// //         </p>
// //       </section>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import { useChat } from "@/hooks/use-chat";
// import { uploadDocument, ingestUrl } from "@/lib/api";
// import { ChatMessages } from "@/app/components/chat/chat-messages";
// import { ChatInput } from "@/app/components/chat/chat-input";
// import { WelcomeScreen } from "@/app/components/chat/welcome-screen";
// import { FileText, Loader2, Globe } from "lucide-react";

// type ChatWorkspaceProps = {
//   activeConversationId: string;
//   onUpdateTitle: (id: string, text: string) => void;
// };

// export function ChatWorkspace({ activeConversationId, onUpdateTitle }: ChatWorkspaceProps) {
//   const { messages, sendMessage, isLoading } = useChat(activeConversationId);
  
//   const fileIdStorageKey = `heuristix_file_${activeConversationId}`;
//   const fileNameStorageKey = `heuristix_filename_${activeConversationId}`;

//   const [activeFileId, setActiveFileId] = useState<string | null>(() => {
//     if (typeof window === "undefined") return null;
//     try {
//       return localStorage.getItem(fileIdStorageKey);
//     } catch {
//       return null;
//     }
//   });

//   const [activeFileName, setActiveFileName] = useState<string | null>(() => {
//     if (typeof window === "undefined") return null;
//     try {
//       return localStorage.getItem(fileNameStorageKey);
//     } catch {
//       return null;
//     }
//   });

//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState<string | null>(null);

//   useEffect(() => {
//     try {
//       setActiveFileId(localStorage.getItem(fileIdStorageKey));
//       setActiveFileName(localStorage.getItem(fileNameStorageKey));
//     } catch {
//       setActiveFileId(null);
//       setActiveFileName(null);
//     }
//     setUploadError(null);
//   }, [activeConversationId, fileIdStorageKey, fileNameStorageKey]);

//   function handleRemoveFile() {
//     setActiveFileId(null);
//     setActiveFileName(null);
//     try {
//       localStorage.removeItem(fileIdStorageKey);
//       localStorage.removeItem(fileNameStorageKey);
//     } catch {}
//   }

//   function generateTitleSummary(text: string): string {
//     const stopWords = new Set([
//       "what", "is", "the", "a", "an", "and", "or", "to", "in", "on", 
//       "for", "with", "how", "can", "you", "tell", "me", "about", "of", 
//       "it", "please", "i", "do", "does", "are", "from", "that"
//     ]);
    
//     const words = text
//       .replace(/[^\w\s]/gi, "")
//       .split(/\s+/)
//       .filter(w => w.length > 0 && !stopWords.has(w.toLowerCase()));
    
//     const summaryWords = (words.length > 0 ? words : text.split(/\s+/)).slice(0, 4);
//     return summaryWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
//   }

//   async function handleSend(text: string, file: File | null, urlInput?: string | null) {
//     setUploadError(null);
//     let fileIdToUse = activeFileId;

//     try {
//       if (file) {
//         setIsUploading(true);
//         const response = await uploadDocument(file);
//         fileIdToUse = response.file_id;
        
//         setActiveFileId(response.file_id);
//         setActiveFileName(response.filename);
        
//         localStorage.setItem(fileIdStorageKey, response.file_id);
//         localStorage.setItem(fileNameStorageKey, response.filename);
//         setIsUploading(false);
//       } else if (urlInput) {
//         setIsUploading(true);
//         const response = await ingestUrl(urlInput);
//         fileIdToUse = response.file_id;

//         setActiveFileId(response.file_id);
//         setActiveFileName(response.filename);

//         localStorage.setItem(fileIdStorageKey, response.file_id);
//         localStorage.setItem(fileNameStorageKey, response.filename);
//         setIsUploading(false);
//       }

//       if (messages.length === 0) {
//         const titleSummary = generateTitleSummary(text);
//         onUpdateTitle(activeConversationId, titleSummary);
//       }

//       await sendMessage(text, fileIdToUse);
//     } catch (error: any) {
//       setIsUploading(false);
//       setUploadError(error.message || "Failed to process document or web link.");
//     }
//   }

//   return (
//     <div id="chat" className="mx-auto flex h-full w-full max-w-4xl flex-col">
//       <section className="flex min-h-[calc(100vh-68px)] min-w-0 flex-col">
        
//         {activeFileName && (
//           <div className="mx-4 mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 sm:mx-8">
//             <div className="flex items-center gap-2 truncate">
//               {activeFileName.startsWith("http") ? (
//                 <Globe size={16} className="text-slate-500 shrink-0" />
//               ) : (
//                 <FileText size={16} className="text-slate-500 shrink-0" />
//               )}
//               <span className="font-medium">Active Source:</span>
//               <span className="truncate text-slate-900">{activeFileName}</span>
//             </div>
//             <button
//               onClick={handleRemoveFile}
//               className="text-xs text-slate-500 hover:text-red-600 shrink-0 ml-2"
//             >
//               Change / Remove
//             </button>
//           </div>
//         )}

//         {uploadError && (
//           <div className="mx-4 mt-3 rounded-xl bg-red-50 p-3 text-xs text-red-600 sm:mx-8">
//             {uploadError}
//           </div>
//         )}

//         <div className="flex-1">
//           {messages.length === 0 ? (
//             <WelcomeScreen onAsk={(text) => handleSend(text, null, null)} />
//           ) : (
//             <ChatMessages messages={messages} isLoading={isLoading || isUploading} />
//           )}
//         </div>

//         <ChatInput 
//           onSend={handleSend} 
//           disabled={isLoading || isUploading} 
//         />
        
//         <p className="px-4 pb-4 pt-2 text-center text-[11px] text-slate-400">
//           {isUploading ? (
//             <span className="inline-flex items-center gap-1.5 text-slate-600">
//               <Loader2 size={12} className="animate-spin" /> Indexing document or web link...
//             </span>
//           ) : (
//             "Created by Team Heuristix."
//           )}
//         </p>
//       </section>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import { uploadDocument, ingestUrl } from "@/lib/api";
import { ChatMessages } from "@/app/components/chat/chat-messages";
import { ChatInput } from "@/app/components/chat/chat-input";
import { WelcomeScreen } from "@/app/components/chat/welcome-screen";
import { FileText, Loader2, Globe } from "lucide-react";

type ChatWorkspaceProps = {
  activeConversationId: string;
  onUpdateTitle: (id: string, text: string) => void;
};

export function ChatWorkspace({ activeConversationId, onUpdateTitle }: ChatWorkspaceProps) {
  const { messages, sendMessage, isLoading } = useChat(activeConversationId);
  
  const fileIdStorageKey = `heuristix_file_${activeConversationId}`;
  const fileNameStorageKey = `heuristix_filename_${activeConversationId}`;

  const [activeFileId, setActiveFileId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(fileIdStorageKey);
    } catch {
      return null;
    }
  });

  const [activeFileName, setActiveFileName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(fileNameStorageKey);
    } catch {
      return null;
    }
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setActiveFileId(localStorage.getItem(fileIdStorageKey));
      setActiveFileName(localStorage.getItem(fileNameStorageKey));
    } catch {
      setActiveFileId(null);
      setActiveFileName(null);
    }
    setUploadError(null);
  }, [activeConversationId, fileIdStorageKey, fileNameStorageKey]);

  function handleRemoveFile() {
    setActiveFileId(null);
    setActiveFileName(null);
    try {
      localStorage.removeItem(fileIdStorageKey);
      localStorage.removeItem(fileNameStorageKey);
    } catch {}
  }

  // Natural 4-word title summary preserving original word order
  function generateTitleSummary(text: string): string {
    const cleaned = text.replace(/[^\w\s]/gi, "").trim();
    const words = cleaned.split(/\s+/).filter(Boolean);
    const titleWords = words.slice(0, 4);
    
    return titleWords
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ") || "New conversation";
  }

  async function handleSend(text: string, file: File | null, urlInput?: string | null) {
    setUploadError(null);
    let fileIdToUse = activeFileId;

    try {
      if (file) {
        setIsUploading(true);
        const response = await uploadDocument(file);
        fileIdToUse = response.file_id;
        
        setActiveFileId(response.file_id);
        setActiveFileName(response.filename);
        
        localStorage.setItem(fileIdStorageKey, response.file_id);
        localStorage.setItem(fileNameStorageKey, response.filename);
        setIsUploading(false);
      } else if (urlInput) {
        setIsUploading(true);
        const response = await ingestUrl(urlInput);
        fileIdToUse = response.file_id;

        setActiveFileId(response.file_id);
        setActiveFileName(response.filename);

        localStorage.setItem(fileIdStorageKey, response.file_id);
        localStorage.setItem(fileNameStorageKey, response.filename);
        setIsUploading(false);
      }

      if (messages.length === 0) {
        const titleSummary = generateTitleSummary(text);
        onUpdateTitle(activeConversationId, titleSummary);
      }

      // If no file/URL is active, sendMessage will gracefully trigger the backend guard clause or hook fallback
      await sendMessage(text, fileIdToUse);
    } catch (error: any) {
      setIsUploading(false);
      setUploadError(error.message || "Failed to process document or web link.");
    }
  }

  return (
    <div id="chat" className="mx-auto flex h-full w-full max-w-4xl flex-col">
      <section className="flex min-h-[calc(100vh-68px)] min-w-0 flex-col">
        
        {activeFileName && (
          <div className="mx-4 mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 sm:mx-8">
            <div className="flex items-center gap-2 truncate">
              {activeFileName.startsWith("http") ? (
                <Globe size={16} className="text-slate-500 shrink-0" />
              ) : (
                <FileText size={16} className="text-slate-500 shrink-0" />
              )}
              <span className="font-medium">Active Source:</span>
              <span className="truncate text-slate-900">{activeFileName}</span>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-xs text-slate-500 hover:text-red-600 shrink-0 ml-2"
            >
              Change / Remove
            </button>
          </div>
        )}

        {uploadError && (
          <div className="mx-4 mt-3 rounded-xl bg-red-50 p-3 text-xs text-red-600 sm:mx-8">
            {uploadError}
          </div>
        )}

        <div className="flex-1">
          {messages.length === 0 ? (
            <WelcomeScreen onAsk={(text) => handleSend(text, null, null)} />
          ) : (
            <ChatMessages messages={messages} isLoading={isLoading || isUploading} />
          )}
        </div>

        <ChatInput 
          onSend={handleSend} 
          disabled={isLoading || isUploading} 
        />
        
        <p className="px-4 pb-4 pt-2 text-center text-[11px] text-slate-400">
          {isUploading ? (
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <Loader2 size={12} className="animate-spin" /> Indexing document or web link...
            </span>
          ) : (
            "Created by Team Heuristix."
          )}
        </p>
      </section>
    </div>
  );
}