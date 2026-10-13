
"use client";

import { useCallback, useState, useEffect } from "react";
import type { ChatMessage } from "@/lib/types/chat";
import { askQuestion } from "@/lib/api"; // Import your api helper

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto 
    ? crypto.randomUUID() 
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useChat(activeConversationId: string) {
  const storageKey = `heuristix_messages_${activeConversationId}`;

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setMessages(saved ? JSON.parse(saved) : []);
    } catch {
      setMessages([]);
    }
    setIsLoading(false);
  }, [activeConversationId, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to storage", error);
    }
  }, [messages, storageKey]);

  const sendMessage = useCallback(async (content: string, fileId?: string | null) => {
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

    try {
      if (!fileId) {
        throw new Error("Please upload a document (PDF, CSV, or TXT) before asking questions.");
      }

      // Call the API wrapper passing both question and fileId
      const data = await askQuestion(trimmed, fileId);

      const assistantMessage: ChatMessage = {
        id: makeId(),
        role: "assistant",
        content: data.answer,
        createdAt: new Date().toISOString(),
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error: any) {
      const errorMessage: ChatMessage = {
        id: makeId(),
        role: "assistant",
        content: `Error: ${error.message || "Could not connect to backend server."}`,
        createdAt: new Date().toISOString(),
      };
      setMessages((current) => [...current, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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