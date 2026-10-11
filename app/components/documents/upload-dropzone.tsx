"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { FileUp, LoaderCircle } from "lucide-react";

type Props = { onUpload: (files: FileList | File[]) => void; disabled?: boolean };

export function UploadDropzone({ onUpload, disabled = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function acceptFiles(files: FileList | File[]) {
    const pdfs = Array.from(files).filter((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
    if (pdfs.length) onUpload(pdfs);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) acceptFiles(event.target.files);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files) acceptFiles(event.dataTransfer.files);
  }

  return (
    <div
      onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`rounded-xl border border-dashed p-5 text-center transition ${dragging ? "border-slate-500 bg-slate-100" : "border-slate-300 bg-slate-50/70"} ${disabled ? "opacity-60" : ""}`}
    >
      <div className="mx-auto mb-3 grid size-10 place-items-center rounded-xl bg-white text-slate-600 shadow-sm">{disabled ? <LoaderCircle size={19} className="animate-spin" /> : <FileUp size={19} />}</div>
      <p className="text-xs font-semibold">{disabled ? "Adding files..." : "Drop PDF files here"}</p>
      <p className="mt-1 text-[11px] text-slate-500">or browse from your device</p>
      <button type="button" disabled={disabled} onClick={() => inputRef.current?.click()} className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium hover:bg-slate-100 disabled:cursor-not-allowed">Choose files</button>
      <input ref={inputRef} type="file" accept="application/pdf,.pdf" multiple onChange={handleChange} className="hidden" />
    </div>
  );
}
