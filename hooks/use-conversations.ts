
// // "use client";

// // import { useCallback, useEffect, useState } from "react";
// // import type { Conversation } from "@/lib/types/chat";

// // const STORAGE_KEY = "heuristix_conversations_v1";

// // const initialConversations: Conversation[] = [
// //   { id: "conv-1", title: "New conversation", updatedAt: new Date().toISOString() },
// // ];

// // export function useConversations() {
// //   const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
// //   const [activeConversationId, setActiveConversationId] = useState<string>("conv-1");
// //   const [isInitialized, setIsInitialized] = useState(false);

// //   // Load from localStorage only after the component mounts on the client
// //   useEffect(() => {
// //     try {
// //       const saved = localStorage.getItem(STORAGE_KEY);
// //       if (saved) {
// //         const parsed: Conversation[] = JSON.parse(saved);
// //         if (parsed.length > 0) {
// //           setConversations(parsed);
// //           setActiveConversationId(parsed[0].id);
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Failed to load conversations from localStorage", error);
// //     }
// //     setIsInitialized(true);
// //   }, []);

// //   // Save conversations to localStorage whenever they change (after initialization)
// //   useEffect(() => {
// //     if (!isInitialized) return;
// //     try {
// //       localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
// //     } catch (error) {
// //       console.error("Failed to save conversations to localStorage", error);
// //     }
// //   }, [conversations, isInitialized]);

// //   const createConversation = useCallback((titleInput?: string | React.MouseEvent) => {
// //     const title = typeof titleInput === "string" ? titleInput : "New conversation";
    
// //     const newId = `conv-${Date.now()}`;
// //     const newConversation: Conversation = {
// //       id: newId,
// //       title,
// //       updatedAt: new Date().toISOString(),
// //     };
// //     setConversations((current) => [newConversation, ...current]);
// //     setActiveConversationId(newId);
// //     return newId;
// //   }, []);

// //   const updateConversationTitle = useCallback((id: string, firstMessageText: string) => {
// //     const words = firstMessageText.trim().split(/\s+/);
// //     const generatedTitle = words.slice(0, 4).join(" ") || "New conversation";
    
// //     setConversations((current) =>
// //       current.map((conv) => 
// //         conv.id === id && conv.title === "New conversation"
// //           ? { ...conv, title: generatedTitle, updatedAt: new Date().toISOString() }
// //           : conv
// //       )
// //     );
// //   }, []);

// //   const selectConversation = useCallback((id: string) => {
// //     setActiveConversationId(id);
// //   }, []);

// //   // Added delete conversation function
// //   const deleteConversation = useCallback((id: string) => {
// //     setConversations((current) => {
// //       const updated = current.filter((conv) => conv.id !== id);
      
// //       // If all conversations are deleted, automatically create a default one
// //       if (updated.length === 0) {
// //         const fallback: Conversation = {
// //           id: `conv-${Date.now()}`,
// //           title: "New conversation",
// //           updatedAt: new Date().toISOString(),
// //         };
// //         setActiveConversationId(fallback.id);
// //         return [fallback];
// //       }

// //       // If the currently active conversation was deleted, switch to the first remaining one
// //       if (activeConversationId === id) {
// //         setActiveConversationId(updated[0].id);
// //       }

// //       return updated;
// //     });
// //   }, [activeConversationId]);

// //   return {
// //     conversations,
// //     activeConversationId,
// //     createConversation,
// //     selectConversation,
// //     updateConversationTitle,
// //     deleteConversation: deleteConversation, // Exposed as requested by AppShell & Sidebar
// //   };
// // }
// "use client";

// import { useCallback, useEffect, useState } from "react";
// import type { Conversation } from "@/lib/types/chat";

// const STORAGE_KEY = "heuristix_conversations_v1";

// const initialConversations: Conversation[] = [
//   { id: "conv-1", title: "New conversation", updatedAt: new Date().toISOString() },
// ];

// export function useConversations() {
//   const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
//   const [activeConversationId, setActiveConversationId] = useState<string>("conv-1");
//   const [isInitialized, setIsInitialized] = useState(false);

//   // Load from localStorage only after the component mounts on the client
//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem(STORAGE_KEY);
//       if (saved) {
//         const parsed: Conversation[] = JSON.parse(saved);
//         if (parsed.length > 0) {
//           setConversations(parsed);
//           setActiveConversationId(parsed[0].id);
//         }
//       }
//     } catch (error) {
//       console.error("Failed to load conversations from localStorage", error);
//     }
//     setIsInitialized(true);
//   }, []);

//   // Save conversations to localStorage whenever they change
//   useEffect(() => {
//     if (!isInitialized) return;
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
//     } catch (error) {
//       console.error("Failed to save conversations to localStorage", error);
//     }
//   }, [conversations, isInitialized]);

//   const createConversation = useCallback((titleInput?: string | React.MouseEvent) => {
//     const title = typeof titleInput === "string" ? titleInput : "New conversation";
    
//     const newId = `conv-${Date.now()}`;
//     const newConversation: Conversation = {
//       id: newId,
//       title,
//       updatedAt: new Date().toISOString(),
//     };
//     setConversations((current) => [newConversation, ...current]);
//     setActiveConversationId(newId);
//     return newId;
//   }, []);

//   // Updated title generator: removes stop words and creates a clean 4-word summary
//   const updateConversationTitle = useCallback((id: string, textInput: string) => {
//     const stopWords = new Set([
//       "what", "is", "the", "a", "an", "and", "or", "to", "in", "on", 
//       "for", "with", "how", "can", "you", "tell", "me", "about", "of", 
//       "it", "please", "i", "do", "does", "are", "from", "that", "where", "why"
//     ]);

//     const words = textInput
//       .replace(/[^\w\s]/gi, "")
//       .split(/\s+/)
//       .filter((w) => w.length > 0 && !stopWords.has(w.toLowerCase()));

//     const titleWords = (words.length > 0 ? words : textInput.trim().split(/\s+/)).slice(0, 4);
//     const generatedTitle = titleWords
//       .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//       .join(" ") || "New conversation";

//     setConversations((current) =>
//       current.map((conv) =>
//         conv.id === id && conv.title === "New conversation"
//           ? { ...conv, title: generatedTitle, updatedAt: new Date().toISOString() }
//           : conv
//       )
//     );
//   }, []);

//   const selectConversation = useCallback((id: string) => {
//     setActiveConversationId(id);
//   }, []);

//   const deleteConversation = useCallback((id: string) => {
//     setConversations((current) => {
//       const updated = current.filter((conv) => conv.id !== id);
      
//       if (updated.length === 0) {
//         const fallback: Conversation = {
//           id: `conv-${Date.now()}`,
//           title: "New conversation",
//           updatedAt: new Date().toISOString(),
//         };
//         setActiveConversationId(fallback.id);
//         return [fallback];
//       }

//       if (activeConversationId === id) {
//         setActiveConversationId(updated[0].id);
//       }

//       return updated;
//     });
//   }, [activeConversationId]);

//   return {
//     conversations,
//     activeConversationId,
//     createConversation,
//     selectConversation,
//     updateConversationTitle,
//     deleteConversation,
//   };
// }
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
  const updateConversationTitle = useCallback((id: string, textInput: string) => {
    // Clean punctuation and keep the first 4 words in their exact original order
    const cleaned = textInput.replace(/[^\w\s]/gi, "").trim();
    const words = cleaned.split(/\s+/).filter(Boolean);

    const titleWords = words.slice(0, 4);
    const generatedTitle = titleWords
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ") || "New conversation";

    setConversations((current) =>
      current.map((conv) =>
        conv.id === id && conv.title === "New conversation"
          ? { ...conv, title: generatedTitle, updatedAt: new Date().toISOString() }
          : conv
      )
    );
  }, []);

  // const updateConversationTitle = useCallback((id: string, textInput: string) => {
  //   const stopWords = new Set([
  //     "what", "is", "the", "a", "an", "and", "or", "to", "in", "on", 
  //     "for", "with", "how", "can", "you", "tell", "me", "about", "of", 
  //     "it", "please", "i", "do", "does", "are", "from", "that", "where", "why"
  //   ]);

  //   const words = textInput
  //     .replace(/[^\w\s]/gi, "")
  //     .split(/\s+/)
  //     .filter((w) => w.length > 0 && !stopWords.has(w.toLowerCase()));

  //   const titleWords = (words.length > 0 ? words : textInput.trim().split(/\s+/)).slice(0, 4);
  //   const generatedTitle = titleWords
  //     .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  //     .join(" ") || "New conversation";

  //   setConversations((current) =>
  //     current.map((conv) =>
  //       conv.id === id && conv.title === "New conversation"
  //         ? { ...conv, title: generatedTitle, updatedAt: new Date().toISOString() }
  //         : conv
  //     )
  //   );
  // }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((current) => {
      const updated = current.filter((conv) => conv.id !== id);
      if (updated.length === 0) {
        const fallback: Conversation = {
          id: `conv-${Date.now()}`,
          title: "New conversation",
          updatedAt: new Date().toISOString(),
        };
        setActiveConversationId(fallback.id);
        return [fallback];
      }
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
    deleteConversation,
  };
}