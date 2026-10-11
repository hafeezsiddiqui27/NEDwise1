// "use client";

// import { useEffect, useState } from "react";
// import {
//   FileText,
//   Search,
//   Zap,
//   ShieldCheck,
//   ChevronRight,
//   Database,
//   Bot,
//   User,
//   LogOut,
//   Sparkles,
// } from "lucide-react";
// import { GuestModal } from "../components/GuestModal";

// export default function Landing() {
//   const [userName, setUserName] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<"chat" | "sources">("chat");

//   useEffect(() => {
//     const stored = localStorage.getItem("user_name");
//     if (stored) {
//       setUserName(stored);
//     }
//   }, []);

//   const handleSignOut = () => {
//     localStorage.removeItem("user_name");
//     setUserName(null);
//   };

//   return (
//     <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white">
//       {/* Background Subtle Gradient Grid */}
//       <div className="fixed inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

//       {/* Navigation */}
//       <header className="sticky top-0 z-40 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md">
//         <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-lg bg-neutral-100 text-black flex items-center justify-center font-bold text-sm tracking-tighter">
//               Rx
//             </div>
//             <span className="font-semibold text-base tracking-tight text-white">
//               Heuristix
//             </span>
//           </div>

//           <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
//             <a href="#features" className="hover:text-white transition-colors">
//               Architecture
//             </a>
//             <a href="#pipeline" className="hover:text-white transition-colors">
//               Pipeline
//             </a>
//             <a href="#benchmarks" className="hover:text-white transition-colors">
//               Benchmarks
//             </a>
//           </nav>

//           <div className="flex items-center gap-3">
//             {userName ? (
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-200">
//                   <User className="w-3.5 h-3.5 text-neutral-400" />
//                   <span>{userName}</span>
//                 </div>
//                 <button
//                   onClick={handleSignOut}
//                   title="Sign Out"
//                   className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors"
//                 >
//                   <LogOut className="w-4 h-4" />
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="px-4 py-2 text-xs font-medium bg-white text-black rounded-lg hover:bg-neutral-200 transition-all active:scale-95"
//               >
//                 Sign in as Guest
//               </button>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative pt-24 pb-16 px-6 max-w-6xl mx-auto">
//         <div className="max-w-3xl space-y-6">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs text-neutral-400">
//             <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
//             <span>Next-Gen Enterprise Retrieval Pipeline</span>
//           </div>

//           <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
//             Turn static documentation into precise context vectors.
//           </h1>

//           <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
//             Ground your large language models with real-time vector search across internal datasets, technical specifications, and knowledge repositories with zero hallucination.
//           </p>

//           <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="px-6 py-3 bg-white text-black font-medium text-sm rounded-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
//             >
//               <span>{userName ? `Welcome back, ${userName}` : "Try Sandbox Mode"}</span>
//               <ChevronRight className="w-4 h-4" />
//             </button>
//             <a
//               href="#architecture"
//               className="px-6 py-3 border border-neutral-800 text-neutral-300 font-medium text-sm rounded-lg hover:bg-neutral-900 transition-colors flex items-center justify-center"
//             >
//               View Documentation
//             </a>
//           </div>
//         </div>

//         {/* Dynamic Interface Preview */}
//         <div className="mt-16 rounded-xl border border-neutral-800 bg-neutral-900/40 p-2 sm:p-4 backdrop-blur-sm shadow-2xl">
//           <div className="border border-neutral-800 rounded-lg bg-neutral-950 overflow-hidden">
//             {/* Top Toolbar */}
//             <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/30">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-neutral-800" />
//                 <div className="w-3 h-3 rounded-full bg-neutral-800" />
//                 <div className="w-3 h-3 rounded-full bg-neutral-800" />
//                 <span className="ml-2 text-xs text-neutral-500 font-mono">
//                   Heuristix-engine // v2.4.0
//                 </span>
//               </div>
//               <div className="flex bg-neutral-900 p-0.5 rounded-md border border-neutral-800 text-xs">
//                 <button
//                   onClick={() => setActiveTab("chat")}
//                   className={`px-3 py-1 rounded-sm transition-colors ${
//                     activeTab === "chat"
//                       ? "bg-neutral-800 text-white"
//                       : "text-neutral-400 hover:text-white"
//                   }`}
//                 >
//                   Chat Interface
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("sources")}
//                   className={`px-3 py-1 rounded-sm transition-colors ${
//                     activeTab === "sources"
//                       ? "bg-neutral-800 text-white"
//                       : "text-neutral-400 hover:text-white"
//                   }`}
//                 >
//                   Retrieved Vectors
//                 </button>
//               </div>
//             </div>

//             {/* Content Body */}
//             <div className="p-6 min-h-[320px] font-mono text-xs">
//               {activeTab === "chat" ? (
//                 <div className="space-y-6">
//                   <div className="flex items-start gap-3">
//                     <div className="p-1.5 rounded bg-neutral-800 text-neutral-300">
//                       <User className="w-4 h-4" />
//                     </div>
//                     <div className="space-y-1">
//                       <div className="text-neutral-500 text-[11px]">
//                         {userName || "User"}
//                       </div>
//                       <div className="text-neutral-200 bg-neutral-900 p-3 rounded-lg border border-neutral-800/80">
//                         What are the compliance requirements for storing financial vectors on cloud nodes?
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <div className="p-1.5 rounded bg-white text-black">
//                       <Bot className="w-4 h-4" />
//                     </div>
//                     <div className="space-y-2">
//                       <div className="text-neutral-500 text-[11px]">RAG Engine</div>
//                       <div className="text-neutral-300 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800/60 space-y-3 leading-relaxed">
//                         <p>
//                           According to section 4.2 of the compliance framework, cloud vector stores must implement AES-256 encryption at rest and isolated tenant indexes.
//                         </p>
//                         <div className="flex flex-wrap gap-2 pt-1 font-sans">
//                           <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700 text-[10px]">
//                             <FileText className="w-3 h-3" /> SOC2_Compliance.pdf (p. 14)
//                           </span>
//                           <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700 text-[10px]">
//                             <FileText className="w-3 h-3" /> Security_Policy_v3.md
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-3 text-neutral-400">
//                   <div className="p-3 rounded border border-neutral-800 bg-neutral-900/40">
//                     <div className="text-neutral-300 font-semibold mb-1">
//                       Chunk #8941 - Score: 0.942
//                     </div>
//                     <p className="text-neutral-400 leading-normal">
//                       "All cloud vector stores storing financial payload vectors must enforce strict tenant segregation via tenant_id headers on all metadata filters."
//                     </p>
//                   </div>
//                   <div className="p-3 rounded border border-neutral-800 bg-neutral-900/40">
//                     <div className="text-neutral-300 font-semibold mb-1">
//                       Chunk #3210 - Score: 0.887
//                     </div>
//                     <p className="text-neutral-400 leading-normal">
//                       "Data at rest must utilize AES-256 encryption with quarterly key rotations automated via AWS KMS or HashiCorp Vault."
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Grid */}
//       <section id="features" className="py-20 px-6 border-t border-neutral-900">
//         <div className="max-w-6xl mx-auto space-y-12">
//           <div className="space-y-3">
//             <h2 className="text-2xl font-semibold tracking-tight text-white">
//               Designed for accuracy & enterprise scale
//             </h2>
//             <p className="text-neutral-400 text-sm max-w-xl">
//               High-speed indexing pipelines built for deep domain retrieval across massive unstructured datasets.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 space-y-3">
//               <div className="p-2 w-fit rounded bg-neutral-800 text-white">
//                 <Database className="w-5 h-5" />
//               </div>
//               <h3 className="text-base font-medium text-white">Hybrid Vector Search</h3>
//               <p className="text-sm text-neutral-400 leading-relaxed">
//                 Combines dense embedding search with BM25 sparse keyword matching for precision retrieval.
//               </p>
//             </div>

//             <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 space-y-3">
//               <div className="p-2 w-fit rounded bg-neutral-800 text-white">
//                 <Search className="w-5 h-5" />
//               </div>
//               <h3 className="text-base font-medium text-white">Re-ranking Engine</h3>
//               <p className="text-sm text-neutral-400 leading-relaxed">
//                 Contextual cross-encoder reranking layers filter out noisy search hits before LLM inference.
//               </p>
//             </div>

//             <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 space-y-3">
//               <div className="p-2 w-fit rounded bg-neutral-800 text-white">
//                 <ShieldCheck className="w-5 h-5" />
//               </div>
//               <h3 className="text-base font-medium text-white">Strict Source Attribution</h3>
//               <p className="text-sm text-neutral-400 leading-relaxed">
//                 Every generated statement maps back to verifiable metadata and exact source line references.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-neutral-900 py-8 px-6 text-xs text-neutral-500">
//         <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div>&copy;Heuristix Systems Inc. All rights reserved.</div>
//           <div className="flex gap-6">
//             <a href="#" className="hover:text-white transition-colors">Privacy</a>
//             <a href="#" className="hover:text-white transition-colors">Terms</a>
//             <a href="#" className="hover:text-white transition-colors">Docs</a>
//           </div>
//         </div>
//       </footer>

//       {/* Guest Modal */}
//       <GuestModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSuccess={(name) => setUserName(name)}
//       />
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Search,
  Database,
  Bot,
  User,
  LogOut,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { GuestModal } from "../components/GuestModal";

export default function Landing() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "sources">("chat");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user_name");
    if (stored) {
      setUserName(stored);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user_name");
    setUserName(null);
  };

  const handleHeroClick = () => {
    if (userName) {
      router.push("/chatinterface");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white">
      {/* Background Subtle Gradient Grid */}
      <div className="fixed inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 text-black flex items-center justify-center font-bold text-sm tracking-tighter">
              Rx
            </div>
            <span className="font-semibold text-base tracking-tight text-white">
              Heuristix
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">
              Architecture
            </a>
            <a href="#pipeline" className="hover:text-white transition-colors">
              Pipeline
            </a>
            <a href="#benchmarks" className="hover:text-white transition-colors">
              Benchmarks
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {userName ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-200">
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{userName}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-xs font-medium bg-white text-black rounded-lg hover:bg-neutral-200 transition-all active:scale-95 cursor-pointer"
              >
                Sign in as Guest
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs text-neutral-400">
            <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
            <span>Next-Gen Enterprise Retrieval Pipeline</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
            Turn static documentation into precise context vectors.
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Ground your large language models with real-time vector search across internal datasets, technical specifications, and knowledge repositories with zero hallucination.
          </p>

          <div className="pt-2">
            <button
              onClick={handleHeroClick}
              className="px-6 py-3 bg-white text-black font-medium text-sm rounded-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{userName ? `Welcome back, ${userName}` : "Try Sandbox Mode"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Interface Preview */}
        <div className="mt-16 rounded-xl border border-neutral-800 bg-neutral-900/40 p-2 sm:p-4 backdrop-blur-sm shadow-2xl">
          <div className="border border-neutral-800 rounded-lg bg-neutral-950 overflow-hidden">
            {/* Top Toolbar */}
            <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neutral-800" />
                <div className="w-3 h-3 rounded-full bg-neutral-800" />
                <div className="w-3 h-3 rounded-full bg-neutral-800" />
                <span className="ml-2 text-xs text-neutral-500 font-mono">
                  Heuristix-engine // v2.4.0
                </span>
              </div>
              <div className="flex bg-neutral-900 p-0.5 rounded-md border border-neutral-800 text-xs">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`px-3 py-1 rounded-sm transition-colors cursor-pointer ${
                    activeTab === "chat"
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Chat Interface
                </button>
                <button
                  onClick={() => setActiveTab("sources")}
                  className={`px-3 py-1 rounded-sm transition-colors cursor-pointer ${
                    activeTab === "sources"
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Retrieved Vectors
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 min-h-[320px] font-mono text-xs">
              {activeTab === "chat" ? (
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded bg-neutral-800 text-neutral-300">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-neutral-500 text-[11px]">
                        {userName || "User"}
                      </div>
                      <div className="text-neutral-200 bg-neutral-900 p-3 rounded-lg border border-neutral-800/80">
                        What are the compliance requirements for storing financial vectors on cloud nodes?
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded bg-white text-black">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-neutral-500 text-[11px]">RAG Engine</div>
                      <div className="text-neutral-300 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800/60 space-y-3 leading-relaxed">
                        <p>
                          According to section 4.2 of the compliance framework, cloud vector stores must implement AES-256 encryption at rest and isolated tenant indexes.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1 font-sans">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700 text-[10px]">
                            <FileText className="w-3 h-3" /> SOC2_Compliance.pdf (p. 14)
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700 text-[10px]">
                            <FileText className="w-3 h-3" /> Security_Policy_v3.md
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-neutral-400">
                  <div className="p-3 rounded border border-neutral-800 bg-neutral-900/40">
                    <div className="text-neutral-300 font-semibold mb-1">
                      Chunk #8941 - Score: 0.942
                    </div>
                    <p className="text-neutral-400 leading-normal">
                      "All cloud vector stores storing financial payload vectors must enforce strict tenant segregation via tenant_id headers on all metadata filters."
                    </p>
                  </div>
                  <div className="p-3 rounded border border-neutral-800 bg-neutral-900/40">
                    <div className="text-neutral-300 font-semibold mb-1">
                      Chunk #3210 - Score: 0.887
                    </div>
                    <p className="text-neutral-400 leading-normal">
                      "Data at rest must utilize AES-256 encryption with quarterly key rotations automated via AWS KMS or HashiCorp Vault."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Designed for accuracy & enterprise scale
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl">
              High-speed indexing pipelines built for deep domain retrieval across massive unstructured datasets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 space-y-3">
              <div className="p-2 w-fit rounded bg-neutral-800 text-white">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium text-white">Hybrid Vector Search</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Combines dense embedding search with BM25 sparse keyword matching for precision retrieval.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 space-y-3">
              <div className="p-2 w-fit rounded bg-neutral-800 text-white">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium text-white">Re-ranking Engine</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Contextual cross-encoder reranking layers filter out noisy search hits before LLM inference.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 space-y-3">
              <div className="p-2 w-fit rounded bg-neutral-800 text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium text-white">Strict Source Attribution</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Every generated statement maps back to verifiable metadata and exact source line references.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-8 px-6 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy;Heuristix Systems Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </div>
        </div>
      </footer>

      {/* Guest Modal */}
      <GuestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(name) => setUserName(name)}
      />
    </div>
  );
}