export type DocumentStatus = "processing" | "ready" | "failed";

export type DocumentItem = {
  id: string;
  name: string;
  size: number;
  status: DocumentStatus;
  addedAt: string;
};
