"use client";

import { UploadDropzone } from "./upload-dropzone";

export function PdfUpload({ onUpload, isUploading }: { onUpload: (files: FileList | File[]) => void; isUploading: boolean }) {
  return (
    <div>
      <UploadDropzone onUpload={onUpload} disabled={isUploading} />
      <p className="mt-2 text-center text-[10px] text-slate-400">PDF only · Mock upload · No files sent to a server</p>
    </div>
  );
}
