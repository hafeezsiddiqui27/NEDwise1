// "use client";

// import { useCallback, useState } from "react";
// import type { ChatMessage } from "@/lib/types/chat";
// import { getMockAnswer } from "@/lib/mock/mock-chat";

// function makeId() {
//   return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
// }

// export function useChat() {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const sendMessage = useCallback((content: string) => {
//     const trimmed = content.trim();
//     if (!trimmed || isLoading) return;

//     const userMessage: ChatMessage = { id: makeId(), role: "user", content: trimmed, createdAt: new Date().toISOString() };
//     setMessages((current) => [...current, userMessage]);
//     setIsLoading(true);

//     // Simulated response until the FastAPI + LangChain backend is implemented.
//     window.setTimeout(() => {
//       const assistantMessage: ChatMessage = {
//         id: makeId(),
//         role: "assistant",
//         content: getMockAnswer(trimmed),
//         createdAt: new Date().toISOString(),
//       };
//       setMessages((current) => [...current, assistantMessage]);
//       setIsLoading(false);
//     }, 700 + Math.random() * 500);
//   }, [isLoading]);

//   const clearMessages = useCallback(() => {
//     setMessages([]);
//     setIsLoading(false);
//   }, []);

//   return { messages, isLoading, sendMessage, clearMessages };
// }
"use client";

import { useCallback, useState, useEffect } from "react";
import type { ChatMessage } from "@/lib/types/chat";
import { getMockAnswer } from "@/lib/mock/mock-chat";

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto 
    ? crypto.randomUUID() 
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useChat(activeConversationId: string) {
  const storageKey = `heuristix_messages_${activeConversationId}`;

  // Load messages from localStorage when the active conversation changes
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(`heuristix_messages_${activeConversationId}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync messages when activeConversationId changes via the sidebar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`heuristix_messages_${activeConversationId}`);
      setMessages(saved ? JSON.parse(saved) : []);
    } catch {
      setMessages([]);
    }
    setIsLoading(false);
  }, [activeConversationId]);

  // Persist messages to localStorage whenever they update
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to storage", error);
    }
  }, [messages, storageKey]);

  const sendMessage = useCallback((content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { 
      id: makeId(), 
      role: "user", 
      content: trimmed, 
      createdAt: new Date().toISOString() 
    };

    setMessages((current) => [...current, userMessage]);
    setIsLoading(true);

    // Simulated response until the FastAPI + LangChain backend is implemented.
    window.setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: makeId(),
        role: "assistant",
        content: getMockAnswer(trimmed),
        createdAt: new Date().toISOString(),
      };
      setMessages((current) => [...current, assistantMessage]);
      setIsLoading(false);
    }, 700 + Math.random() * 500);
  }, [isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setIsLoading(false);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }, [storageKey]);

  return { messages, isLoading, sendMessage, clearMessages };
}