
"use client";

import { useCallback, useEffect, useState } from "react";
import type { Conversation } from "@/lib/types/chat";

const STORAGE_KEY = "heuristix_conversations_v1";

const initialConversations: Conversation[] = [
  { id: "conv-1", title: "New conversation", updatedAt: new Date().toISOString() },
];

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>("conv-1");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage only after the component mounts on the client
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Conversation[] = JSON.parse(saved);
        if (parsed.length > 0) {
          setConversations(parsed);
          setActiveConversationId(parsed[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to load conversations from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  // Save conversations to localStorage whenever they change (after initialization)
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (error) {
      console.error("Failed to save conversations to localStorage", error);
    }
  }, [conversations, isInitialized]);

  const createConversation = useCallback((titleInput?: string | React.MouseEvent) => {
    const title = typeof titleInput === "string" ? titleInput : "New conversation";
    
    const newId = `conv-${Date.now()}`;
    const newConversation: Conversation = {
      id: newId,
      title,
      updatedAt: new Date().toISOString(),
    };
    setConversations((current) => [newConversation, ...current]);
    setActiveConversationId(newId);
    return newId;
  }, []);

  const updateConversationTitle = useCallback((id: string, firstMessageText: string) => {
    const words = firstMessageText.trim().split(/\s+/);
    const generatedTitle = words.slice(0, 4).join(" ") || "New conversation";
    
    setConversations((current) =>
      current.map((conv) => 
        conv.id === id && conv.title === "New conversation"
          ? { ...conv, title: generatedTitle, updatedAt: new Date().toISOString() }
          : conv
      )
    );
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  // Added delete conversation function
  const deleteConversation = useCallback((id: string) => {
    setConversations((current) => {
      const updated = current.filter((conv) => conv.id !== id);
      
      // If all conversations are deleted, automatically create a default one
      if (updated.length === 0) {
        const fallback: Conversation = {
          id: `conv-${Date.now()}`,
          title: "New conversation",
          updatedAt: new Date().toISOString(),
        };
        setActiveConversationId(fallback.id);
        return [fallback];
      }

      // If the currently active conversation was deleted, switch to the first remaining one
      if (activeConversationId === id) {
        setActiveConversationId(updated[0].id);
      }

      return updated;
    });
  }, [activeConversationId]);

  return {
    conversations,
    activeConversationId,
    createConversation,
    selectConversation,
    updateConversationTitle,
    deleteConversation: deleteConversation, // Exposed as requested by AppShell & Sidebar
  };
}