
// // "use client";

// // import { useCallback, useState, useEffect } from "react";
// // import type { ChatMessage } from "@/lib/types/chat";
// // import { askQuestion } from "@/lib/api"; // Import your api helper

// // function makeId() {
// //   return typeof crypto !== "undefined" && "randomUUID" in crypto 
// //     ? crypto.randomUUID() 
// //     : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
// // }

// // export function useChat(activeConversationId: string) {
// //   const storageKey = `heuristix_messages_${activeConversationId}`;

// //   const [messages, setMessages] = useState<ChatMessage[]>(() => {
// //     if (typeof window === "undefined") return [];
// //     try {
// //       const saved = localStorage.getItem(storageKey);
// //       return saved ? JSON.parse(saved) : [];
// //     } catch {
// //       return [];
// //     }
// //   });

// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     try {
// //       const saved = localStorage.getItem(storageKey);
// //       setMessages(saved ? JSON.parse(saved) : []);
// //     } catch {
// //       setMessages([]);
// //     }
// //     setIsLoading(false);
// //   }, [activeConversationId, storageKey]);

// //   useEffect(() => {
// //     try {
// //       localStorage.setItem(storageKey, JSON.stringify(messages));
// //     } catch (error) {
// //       console.error("Failed to save messages to storage", error);
// //     }
// //   }, [messages, storageKey]);

// //   const sendMessage = useCallback(async (content: string, fileId?: string | null) => {
// //     const trimmed = content.trim();
// //     if (!trimmed || isLoading) return;

// //     const userMessage: ChatMessage = { 
// //       id: makeId(), 
// //       role: "user", 
// //       content: trimmed, 
// //       createdAt: new Date().toISOString() 
// //     };

// //     setMessages((current) => [...current, userMessage]);
// //     setIsLoading(true);

// //     try {
// //       if (!fileId) {
// //         throw new Error("Please upload a document (PDF, CSV, or TXT) before asking questions.");
// //       }

// //       // Call the API wrapper passing both question and fileId
// //       const data = await askQuestion(trimmed, fileId);

// //       const assistantMessage: ChatMessage = {
// //         id: makeId(),
// //         role: "assistant",
// //         content: data.answer,
// //         createdAt: new Date().toISOString(),
// //       };

// //       setMessages((current) => [...current, assistantMessage]);
// //     } catch (error: any) {
// //       const errorMessage: ChatMessage = {
// //         id: makeId(),
// //         role: "assistant",
// //         content: `Error: ${error.message || "Could not connect to backend server."}`,
// //         createdAt: new Date().toISOString(),
// //       };
// //       setMessages((current) => [...current, errorMessage]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, [isLoading]);

// //   const clearMessages = useCallback(() => {
// //     setMessages([]);
// //     setIsLoading(false);
// //     try {
// //       localStorage.removeItem(storageKey);
// //     } catch {}
// //   }, [storageKey]);

// //   return { messages, isLoading, sendMessage, clearMessages };
// // }
// "use client";

// import { useCallback, useState, useEffect } from "react";
// import type { ChatMessage } from "@/lib/types/chat";
// import { askQuestion } from "@/lib/api";

// function makeId() {
//   return typeof crypto !== "undefined" && "randomUUID" in crypto 
//     ? crypto.randomUUID() 
//     : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
// }

// export function useChat(activeConversationId: string) {
//   const storageKey = `heuristix_messages_${activeConversationId}`;

//   const [messages, setMessages] = useState<ChatMessage[]>(() => {
//     if (typeof window === "undefined") return [];
//     try {
//       const saved = localStorage.getItem(storageKey);
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem(storageKey);
//       setMessages(saved ? JSON.parse(saved) : []);
//     } catch {
//       setMessages([]);
//     }
//     setIsLoading(false);
//   }, [activeConversationId, storageKey]);

//   useEffect(() => {
//     try {
//       localStorage.setItem(storageKey, JSON.stringify(messages));
//     } catch (error) {
//       console.error("Failed to save messages to storage", error);
//     }
//   }, [messages, storageKey]);

//   const sendMessage = useCallback(async (content: string, fileId?: string | null) => {
//     const trimmed = content.trim();
//     if (!trimmed || isLoading) return;

//     const userMessage: ChatMessage = { 
//       id: makeId(), 
//       role: "user", 
//       content: trimmed, 
//       createdAt: new Date().toISOString() 
//     };

//     setMessages((current) => [...current, userMessage]);
//     setIsLoading(true);

//     try {
//       // If no document or URL has been uploaded yet, return a polite message directly
//       if (!fileId) {
//         const fallbackMessage: ChatMessage = {
//           id: makeId(),
//           role: "assistant",
//           content: "I am specifically designed to answer questions through provided documents (PDF, CSV, TXT) or web links. Please upload a document or attach a web link first!",
//           createdAt: new Date().toISOString(),
//         };
//         setMessages((current) => [...current, fallbackMessage]);
//         setIsLoading(false);
//         return;
//       }

//       // Query the backend
//       const data = await askQuestion(trimmed, fileId);

//       const assistantMessage: ChatMessage = {
//         id: makeId(),
//         role: "assistant",
//         content: data.answer,
//         createdAt: new Date().toISOString(),
//       };

//       setMessages((current) => [...current, assistantMessage]);
//     } catch (error: any) {
//       const errorMessage: ChatMessage = {
//         id: makeId(),
//         role: "assistant",
//         content: `Error: ${error.message || "Could not connect to backend server."}`,
//         createdAt: new Date().toISOString(),
//       };
//       setMessages((current) => [...current, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [isLoading]);

//   const clearMessages = useCallback(() => {
//     setMessages([]);
//     setIsLoading(false);
//     try {
//       localStorage.removeItem(storageKey);
//     } catch {}
//   }, [storageKey]);

//   return { messages, isLoading, sendMessage, clearMessages };
// }
"use client";

import { useCallback, useEffect, useState } from "react";
import type { ChatMessage } from "@/lib/types/chat";
import { askQuestion } from "@/lib/api";

function makeId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useChat(activeConversationId: string) {
  const storageKey = `heuristix_messages_${activeConversationId}`;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load messages whenever the active conversation changes.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setMessages(saved ? JSON.parse(saved) : []);
    } catch (error) {
      console.error("Failed to load conversation messages:", error);
      setMessages([]);
    }

    setIsLoading(false);
  }, [storageKey]);

  // Persist the messages for the current conversation.
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save conversation messages:", error);
    }
  }, [messages, storageKey]);

  const sendMessage = useCallback(
    async (content: string, _fileId?: string | null) => {
      const question = content.trim();

      if (!question) return;

      const userMessage: ChatMessage = {
        id: makeId(),
        role: "user",
        content: question,
        createdAt: new Date().toISOString(),
      };

      setMessages((current) => [...current, userMessage]);
      setIsLoading(true);

      try {
        // The backend automatically indexes the fixed NED prospectus.
        // Pass the conversation ID so backend history stays separated.
        const data = await askQuestion(
          question,
          activeConversationId
        );

        const assistantMessage: ChatMessage = {
          id: makeId(),
          role: "assistant",
          content: data.answer,
          createdAt: new Date().toISOString(),
        };

        setMessages((current) => [
          ...current,
          assistantMessage,
        ]);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Could not connect to the backend server.";

        const errorMessage: ChatMessage = {
          id: makeId(),
          role: "assistant",
          content: `Error: ${message}`,
          createdAt: new Date().toISOString(),
        };

        setMessages((current) => [
          ...current,
          errorMessage,
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [activeConversationId]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setIsLoading(false);

    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Failed to clear conversation messages:", error);
    }
  }, [storageKey]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
