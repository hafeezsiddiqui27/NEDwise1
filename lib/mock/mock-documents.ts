import type { DocumentItem } from "@/lib/types/document";

// Optional sample data if you want the library populated during UI development.
export const mockDocuments: DocumentItem[] = [
  { id: "doc-demo-1", name: "RAG Research Notes.pdf", size: 1240000, status: "ready", addedAt: new Date().toISOString() },
  { id: "doc-demo-2", name: "Introduction to AI.pdf", size: 860000, status: "ready", addedAt: new Date().toISOString() },
];
