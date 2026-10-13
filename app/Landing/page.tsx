
"use client";

import { useEffect, useState, useRef } from "react";
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
  Mail,
  Code2,
  Users,
  Star,
  Activity,
  Zap,
} from "lucide-react";
import { GuestModal } from "../components/GuestModal";

export default function Landing() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "sources">("chat");
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user_name");
    if (stored) {
      setUserName(stored);
    }
  }, []);

  // Interactive Particle/Vector Node Animation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate random particle nodes
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections & movement
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p1.alpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        const mdx = p1.x - mouseX;
        const mdy = p1.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 * (1 - mdist / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
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
            <div className="w-8 h-8 rounded-lg bg-neutral-100 text-black flex items-center justify-center font-bold text-sm tracking-tighter shadow-md">
              Hx
            </div>
            <span className="font-semibold text-base tracking-tight text-white">
              Heuristix
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">
              Architecture
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Support & Team
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
      <section className="relative pt-24 pb-16 px-6 max-w-6xl mx-auto overflow-hidden">
        {/* Interactive Node Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-60"
        />

        {/* Ambient Radial Glow Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-neutral-800/20 via-neutral-100/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Animated Badge with Pulse Vector Star */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/80 backdrop-blur-md text-xs text-neutral-300 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Next-Gen Enterprise Retrieval Pipeline</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>

          {/* Dynamic Typography & Vector Stars */}
          <div className="relative">
            <Star className="w-5 h-5 text-neutral-600 absolute -top-4 -left-6 animate-spin [animation-duration:8s]" />
            <Zap className="w-4 h-4 text-neutral-400 absolute top-2 right-4 animate-bounce" />

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Turn static documentation into{" "}
              <span className="bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent underline decoration-neutral-800 underline-offset-8">
                precise context vectors.
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Ground your large language models with real-time vector search across internal datasets, technical specifications, and knowledge repositories with zero hallucination.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={handleHeroClick}
              className="px-6 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 group"
            >
              <span>{userName ? `Welcome back, ${userName}` : "Try Sandbox Mode"}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Live Index Active</span>
            </div>
          </div>
        </div>

        {/* Dynamic Interface Preview */}
        <div className="relative z-10 mt-16 rounded-xl border border-neutral-800 bg-neutral-900/40 p-2 sm:p-4 backdrop-blur-sm shadow-2xl">
          <div className="border border-neutral-800 rounded-lg bg-neutral-950 overflow-hidden relative">
            
            {/* Ambient Scan Line */}
            <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-400/40 to-transparent animate-[scan_4s_infinite_linear] pointer-events-none z-20" />

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

      {/* Team & Contact Section */}
      <section id="contact" className="py-16 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-6xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/30 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <Code2 className="w-4 h-4 text-white" />
              <span>Developed by Team Heuristix</span>
            </div>

            {/* Team Members List */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <Users className="w-3.5 h-3.5 text-neutral-500" />
              <span>Team: Hunain · Hashim · Hafeez Siddiqui</span>
            </div>

            <h3 className="text-lg font-semibold text-white">
              Need technical support or custom integrations?
            </h3>
            <p className="text-xs text-neutral-400 max-w-md">
              If you face any errors or need assistance configuring your document RAG pipeline, feel free to contact us.
            </p>
          </div>

          <a
            href="mailto:hafeezusiddiqui4@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono border border-neutral-700 transition-colors cursor-pointer shrink-0"
          >
            <Mail className="w-4 h-4 text-neutral-300" />
            <span>hafeezusiddiqui4@gmail.com</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-8 px-6 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy; Heuristix Systems. Developed by Team Heuristix.</div>
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