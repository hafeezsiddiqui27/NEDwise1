"use client";

import { useCallback, useState } from "react";
import type { DocumentItem } from "@/lib/types/document";

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const addFiles = useCallback((input: FileList | File[]) => {
    const pdfs = Array.from(input).filter((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
    if (!pdfs.length) return;

    setIsUploading(true);
    const newItems: DocumentItem[] = pdfs.map((file) => ({
      id: makeId(),
      name: file.name,
      size: file.size,
      status: "processing",
      addedAt: new Date().toISOString(),
    }));
    setDocuments((current) => [...newItems, ...current]);

    // Mock processing only. This does not read, upload, or index PDF contents.
    window.setTimeout(() => {
      const ids = new Set(newItems.map((item) => item.id));
      setDocuments((current) => current.map((item) => ids.has(item.id) ? { ...item, status: "ready" } : item));
      setIsUploading(false);
    }, 900);
  }, []);

  const removeDocument = useCallback((id: string) => {
    setDocuments((current) => current.filter((document) => document.id !== id));
  }, []);

  return { documents, isUploading, addFiles, removeDocument };
}
