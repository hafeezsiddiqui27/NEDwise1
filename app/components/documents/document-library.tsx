// "use client";

// import { FilePlus2, Files, MoreHorizontal } from "lucide-react";
// import type { DocumentItem } from "@/lib/types/document";
// import { PdfUpload } from "./pdf-upload";
// import { DocumentCard } from "./document-card";

// type Props = {
//   documents: DocumentItem[];
//   onUpload: (files: FileList | File[]) => void;
//   onRemove: (id: string) => void;
//   isUploading: boolean;
// };

// export function DocumentLibrary({ documents, onUpload, onRemove, isUploading }: Props) {
//   return (
//     <div className="flex h-full min-h-[500px] flex-col p-5">
//       <div className="mb-5 flex items-start justify-between">
//         <div><h3 className="text-sm font-semibold">Your documents</h3><p className="mt-1 text-xs text-slate-500">{documents.length} files in this workspace</p></div>
//         <button aria-label="More document options" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={18} /></button>
//       </div>
//       <PdfUpload onUpload={onUpload} isUploading={isUploading} />
//       <div className="mb-3 mt-7 flex items-center justify-between">
//         <p className="text-xs font-semibold text-slate-700">Library</p>
//         <span className="text-[11px] text-slate-400">Newest first</span>
//       </div>
//       {documents.length === 0 ? (
//         <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
//           <div className="mb-3 grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-500"><Files size={20} /></div>
//           <p className="text-sm font-medium">No documents yet</p><p className="mt-1 max-w-[210px] text-xs leading-5 text-slate-500">Upload a PDF to see it here. Mock uploads do not process document content.</p>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           {documents.map((document) => <DocumentCard key={document.id} document={document} onRemove={onRemove} />)}
//         </div>
//       )}
//       <div className="mt-auto border-t border-slate-100 pt-4">
//         <div className="flex gap-2 rounded-xl bg-slate-50 p-3"><FilePlus2 size={16} className="mt-0.5 shrink-0 text-slate-500" /><p className="text-[11px] leading-5 text-slate-500">Mock mode: files are listed in this browser session only. No backend upload happens yet.</p></div>
//       </div>
//     </div>
//   );
// }
