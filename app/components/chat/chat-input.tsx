

"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUp, Paperclip, X, FileText } from "lucide-react";

type Props = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled = false }: Props) {
  const [value, setValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = value.trim();

    if (!trimmed || disabled) return;

    onSend(trimmed);
    setValue("");
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }

    // Allow selecting the same file again.
    event.target.value = "";
  }

  function removeFile() {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="mx-auto mt-0 w-full max-w-3xl px-4 sm:px-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-slate-400 focus-within:shadow-md"
      >
        {/* Selected PDF preview */}
        {selectedFile && (
          <div className="mb-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-slate-700">
              <FileText size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-500">
                PDF · {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={disabled}
              aria-label="Remove selected PDF"
              className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 disabled:opacity-50"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder="Ask a question about your documents..."
          rows={2}
          disabled={disabled}
          className="max-h-36 min-h-[52px] w-full resize-y bg-transparent px-3 py-2 text-sm leading-6 outline-none placeholder:text-slate-400 disabled:opacity-60"
        />

        <div className="flex items-center justify-between px-1 pb-1">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              disabled={disabled}
              className="hidden"
              aria-label="Choose a PDF document"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Paperclip size={15} />
              <span>{selectedFile ? "Change PDF" : "Upload PDF"}</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={!value.trim() || disabled}
            aria-label="Send message"
            className="grid size-9 place-items-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
