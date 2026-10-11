import type { ChatMessage } from "./chat";

export type ChatRequest = {
  question: string;
  document_ids: string[];
  conversation_id?: string;
  history?: Pick<ChatMessage, "role" | "content">[];
};

export type ChatResponse = {
  answer: string;
  conversation_id: string;
};

export type ApiError = {
  detail?: string;
  message?: string;
};
