// "use client";

// import { ArrowUpRight, BookOpen, FileText, Lightbulb, Sparkles } from "lucide-react";

// const suggestions = [
//   { title: "Summarize a document", prompt: "Give me a clear summary of the main ideas.", icon: BookOpen },
//   { title: "Find key takeaways", prompt: "What are the most important takeaways?", icon: Lightbulb },
//   // { title: "Explain a difficult topic", prompt: "Explain the most difficult concept in the documents in simple terms.", icon: Sparkles },
//   // { title: "Create study questions", prompt: "Create five study questions based on the documents, with answers.", icon: FileText },
// ];

// export function WelcomeScreen({ onAsk }: { onAsk: (message: string) => void }) {
//   return (
//     <div className="mx-auto flex min-h-[430px] max-w-3xl flex-col justify-center px-4 !mb-0 !mt-0 sm:px-8">
//       {/* <div className=" grid size-12 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm"><Sparkles size={16} /></div> */}
//       <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Your research workspace</p>
//       <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Your documents have answers.</h2>
//       <p className="mt-2 max-w-lg text-sm leading-7 text-slate-500">Upload PDFs, ask questions, and turn long documents into useful insights.</p>
//       <div className="mt-8 grid gap-3 sm:grid-cols-2">
//         {suggestions.map(({ title, prompt, icon: Icon }) => (
//           <button key={title} onClick={() => onAsk(prompt)} className="group rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm">
//             <div className="mb-4 flex items-center justify-between"><Icon size={18} className="text-slate-500" /><ArrowUpRight size={16} className="text-slate-300 transition group-hover:text-slate-700" /></div>
//             <p className="text-sm font-semibold">{title}</p>
//             <p className="mt-1 text-xs leading-5 text-slate-500">{prompt}</p>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { ArrowUpRight, BookOpen, Lightbulb } from "lucide-react";

const suggestions = [
  { title: "Summarize a document", prompt: "Give me a clear summary of the main ideas.", icon: BookOpen },
  { title: "Find key takeaways", prompt: "What are the most important takeaways?", icon: Lightbulb },
  // { title: "Explain a difficult topic", prompt: "Explain the most difficult concept in the documents in simple terms.", icon: Sparkles },
  // { title: "Create study questions", prompt: "Create five study questions based on the documents, with answers.", icon: FileText },
];

export function WelcomeScreen({ onAsk }: { onAsk: (message: string) => void }) {
  return (
    <div className="mx-auto flex min-h-[430px] max-w-3xl flex-col justify-center px-4 mt-8 sm:mt-0 sm:px-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Your research workspace</p>
      <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Your documents have answers.</h2>
      <p className="mt-2 max-w-lg text-sm leading-7 text-slate-500">Upload PDFs, ask questions, and turn long documents into useful insights.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {suggestions.map(({ title, prompt, icon: Icon }) => (
          <button 
            key={title} 
            onClick={() => onAsk(prompt)} 
            className="group rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm cursor-pointer"
          >
            <div className="mb-4 flex items-center justify-between">
              <Icon size={18} className="text-slate-500" />
              <ArrowUpRight size={16} className="text-slate-300 transition group-hover:text-slate-700" />
            </div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
}