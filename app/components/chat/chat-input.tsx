
// // "use client";

// // import { FormEvent, useRef, useState } from "react";
// // import { ArrowUp, Paperclip, X, FileText } from "lucide-react";

// // type Props = {
// //   onSend: (message: string, file: File | null) => void;
// //   disabled?: boolean;
// // };

// // export function ChatInput({ onSend, disabled = false }: Props) {
// //   const [value, setValue] = useState("");
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   function handleSubmit(event: FormEvent<HTMLFormElement>) {
// //     event.preventDefault();
// //     const trimmed = value.trim();

// //     if (!trimmed || disabled) return;

// //     // Send the message and the attached file up to the parent
// //     onSend(trimmed, selectedFile);
    
// //     // Clear input and file selection after sending
// //     setValue("");
// //     setSelectedFile(null);
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = "";
// //     }
// //   }

// //   function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
// //     const file = event.target.files?.[0];
// //     if (file) {
// //       const extension = file.name.split(".").pop()?.toLowerCase();
      
// //       // Allow only PDF, CSV, or TXT
// //       if (["pdf", "csv", "txt"].includes(extension || "")) {
// //         setSelectedFile(file);
// //       } else {
// //         alert("Please select a valid PDF, CSV, or TXT file.");
// //       }
// //     }
// //     event.target.value = "";
// //   }

// //   function removeFile() {
// //     setSelectedFile(null);
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = "";
// //     }
// //   }

// //   const fileExtension = selectedFile
// //     ? selectedFile.name.split(".").pop()?.toUpperCase() || "FILE"
// //     : "";

// //   return (
// //     <div className="mx-auto mt-0 w-full max-w-3xl px-4 sm:px-8">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-slate-400 focus-within:shadow-md"
// //       >
// //         {selectedFile && (
// //           <div className="mb-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
// //             <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-slate-700">
// //               <FileText size={20} />
// //             </div>

// //             <div className="min-w-0 flex-1">
// //               <p className="truncate text-sm font-medium text-slate-800">
// //                 {selectedFile.name}
// //               </p>
// //               <p className="text-xs text-slate-500">
// //                 {fileExtension} · {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
// //               </p>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={removeFile}
// //               disabled={disabled}
// //               aria-label="Remove selected file"
// //               className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 disabled:opacity-50"
// //             >
// //               <X size={16} />
// //             </button>
// //           </div>
// //         )}

// //         <textarea
// //           value={value}
// //           onChange={(event) => setValue(event.target.value)}
// //           onKeyDown={(event) => {
// //             if (event.key === "Enter" && !event.shiftKey) {
// //               event.preventDefault();
// //               event.currentTarget.form?.requestSubmit();
// //             }
// //           }}
// //           placeholder="Ask a question about your documents..."
// //           rows={2}
// //           disabled={disabled}
// //           className="max-h-36 min-h-[52px] w-full resize-y bg-transparent px-3 py-2 text-sm leading-6 outline-none placeholder:text-slate-400 disabled:opacity-60"
// //         />

// //         <div className="flex items-center justify-between px-1 pb-1">
// //           <div className="flex items-center gap-2">
// //             <input
// //               ref={fileInputRef}
// //               type="file"
// //               onChange={handleFileChange}
// //               disabled={disabled}
// //               className="hidden"
// //               aria-label="Choose a document"
// //             />

// //             <button
// //               type="button"
// //               onClick={() => fileInputRef.current?.click()}
// //               disabled={disabled}
// //               className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
// //             >
// //               <Paperclip size={15} />
// //               <span>{selectedFile ? "Change Document" : "Upload Document"}</span>
// //             </button>
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={!value.trim() || disabled}
// //             aria-label="Send message"
// //             className="grid size-9 place-items-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
// //           >
// //             <ArrowUp size={18} />
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }
// "use client";

// import { FormEvent, useRef, useState } from "react";
// import { ArrowUp, Paperclip, X, FileText, Globe } from "lucide-react";

// type Props = {
//   onSend: (message: string, file: File | null, urlInput?: string | null) => void;
//   disabled?: boolean;
// };

// export function ChatInput({ onSend, disabled = false }: Props) {
//   const [value, setValue] = useState("");
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [urlInput, setUrlInput] = useState("");
//   const [showUrlInput, setShowUrlInput] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     const trimmed = value.trim();

//     if (!trimmed || disabled) return;

//     onSend(trimmed, selectedFile, showUrlInput ? urlInput.trim() : null);
    
//     // Reset form states
//     setValue("");
//     setSelectedFile(null);
//     setUrlInput("");
//     setShowUrlInput(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   }

//   function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];
//     if (file) {
//       const extension = file.name.split(".").pop()?.toLowerCase();
//       if (["pdf", "csv", "txt"].includes(extension || "")) {
//         setSelectedFile(file);
//         setShowUrlInput(false); // Close URL mode if file selected
//         setUrlInput("");
//       } else {
//         alert("Please select a valid PDF, CSV, or TXT file.");
//       }
//     }
//     event.target.value = "";
//   }

//   function removeFile() {
//     setSelectedFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   }

//   const fileExtension = selectedFile
//     ? selectedFile.name.split(".").pop()?.toUpperCase() || "FILE"
//     : "";

//   return (
//     <div className="mx-auto mt-0 w-full max-w-3xl px-4 sm:px-8">
//       <form
//         onSubmit={handleSubmit}
//         className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-slate-400 focus-within:shadow-md"
//       >
//         {/* Selected File Preview */}
//         {selectedFile && (
//           <div className="mb-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
//             <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-slate-700">
//               <FileText size={20} />
//             </div>
//             <div className="min-w-0 flex-1">
//               <p className="truncate text-sm font-medium text-slate-800">
//                 {selectedFile.name}
//               </p>
//               <p className="text-xs text-slate-500">
//                 {fileExtension} · {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={removeFile}
//               disabled={disabled}
//               className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         )}

//         {/* Web URL Input Box */}
//         {showUrlInput && (
//           <div className="mb-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
//             <Globe size={18} className="text-slate-500 ml-2" />
//             <input
//               type="url"
//               value={urlInput}
//               onChange={(e) => setUrlInput(e.target.value)}
//               placeholder="Enter website link (e.g., https://example.com)"
//               className="w-full bg-transparent px-2 py-1 text-xs outline-none text-slate-800 placeholder:text-slate-400"
//             />
//             <button
//               type="button"
//               onClick={() => { setShowUrlInput(false); setUrlInput(""); }}
//               className="p-1 text-slate-400 hover:text-slate-700"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         )}

//         <textarea
//           value={value}
//           onChange={(event) => setValue(event.target.value)}
//           onKeyDown={(event) => {
//             if (event.key === "Enter" && !event.shiftKey) {
//               event.preventDefault();
//               event.currentTarget.form?.requestSubmit();
//             }
//           }}
//           placeholder="Ask a question about your documents or website link..."
//           rows={2}
//           disabled={disabled}
//           className="max-h-36 min-h-[52px] w-full resize-y bg-transparent px-3 py-2 text-sm leading-6 outline-none placeholder:text-slate-400 disabled:opacity-60"
//         />

//         <div className="flex items-center justify-between px-1 pb-1">
//           <div className="flex items-center gap-2">
//             <input
//               ref={fileInputRef}
//               type="file"
//               onChange={handleFileChange}
//               disabled={disabled}
//               className="hidden"
//             />

//             <button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               disabled={disabled}
//               className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
//             >
//               <Paperclip size={15} />
//               <span>{selectedFile ? "Change Doc" : "Upload File"}</span>
//             </button>

//             <button
//               type="button"
//               onClick={() => { setShowUrlInput(!showUrlInput); setSelectedFile(null); }}
//               disabled={disabled}
//               className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
//             >
//               <Globe size={15} />
//               <span>{showUrlInput ? "Hide URL" : "Add Web Link"}</span>
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={!value.trim() || disabled}
//             aria-label="Send message"
//             className="grid size-9 place-items-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
//           >
//             <ArrowUp size={18} />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUp, Paperclip, X, FileText, Globe } from "lucide-react";

type Props = {
  onSend: (message: string, file: File | null, urlInput?: string | null) => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled = false }: Props) {
  const [value, setValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();

    if (!trimmed || disabled) return;

    onSend(
      trimmed, 
      selectedFile, 
      showUrlInput && urlInput.trim() ? urlInput.trim() : null
    );
    
    // Reset form states
    setValue("");
    setSelectedFile(null);
    setUrlInput("");
    setShowUrlInput(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (["pdf", "csv", "txt"].includes(extension || "")) {
        setSelectedFile(file);
        setShowUrlInput(false);
        setUrlInput("");
      } else {
        alert("Please select a valid PDF, CSV, or TXT file.");
      }
    }
    event.target.value = "";
  }

  function removeFile() {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const fileExtension = selectedFile
    ? selectedFile.name.split(".").pop()?.toUpperCase() || "FILE"
    : "";

  return (
    <div className="mx-auto mt-0 w-full max-w-3xl px-4 sm:px-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-slate-400 focus-within:shadow-md"
      >
        {/* Selected File Preview Card */}
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
                {fileExtension} · {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={disabled}
              aria-label="Remove selected file"
              className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 disabled:opacity-50"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Web URL Input Card */}
        {showUrlInput && (
          <div className="mb-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
            <Globe size={18} className="text-slate-500 ml-2 shrink-0" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com)"
              className="w-full bg-transparent px-2 py-1 text-xs outline-none text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => { setShowUrlInput(false); setUrlInput(""); }}
              className="p-1 text-slate-400 hover:text-slate-700 shrink-0"
              aria-label="Close URL input"
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
          placeholder="Ask a question about your documents or website link..."
          rows={2}
          disabled={disabled}
          className="max-h-36 min-h-[52px] w-full resize-y bg-transparent px-3 py-2 text-sm leading-6 outline-none placeholder:text-slate-400 disabled:opacity-60"
        />

        <div className="flex items-center justify-between px-1 pb-1">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              disabled={disabled}
              className="hidden"
              aria-label="Choose a document"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Paperclip size={15} />
              <span>{selectedFile ? "Change Doc" : "Upload File"}</span>
            </button>

            <button
              type="button"
              onClick={() => { setShowUrlInput(!showUrlInput); setSelectedFile(null); }}
              disabled={disabled}
              className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Globe size={15} />
              <span>{showUrlInput ? "Hide URL" : "Add Web Link"}</span>
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