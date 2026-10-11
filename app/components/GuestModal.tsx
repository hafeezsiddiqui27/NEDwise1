// "use client";

// import { useState } from "react";
// import { X, ArrowRight } from "lucide-react";
// import { AppShell } from "./layout/appshell";
// import Link from "next/link";
// interface GuestModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: (name: string) => void;
// }

// export function GuestModal({ isOpen, onClose, onSuccess }: GuestModalProps) {
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");

//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const trimmed = name.trim();
//     if (!trimmed) {
//       setError("Please enter your name.");
//       return;
//     }
//     localStorage.setItem("user_name", trimmed);
//     onSuccess(trimmed);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
//       <div className="relative w-full max-w-md border border-neutral-800 bg-neutral-950 p-6 rounded-xl shadow-2xl">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-neutral-400 hover:text-white transition-colors"
//           aria-label="Close"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <div className="space-y-2">
//           <h2 className="text-xl font-medium tracking-tight text-white">
//             Continue as Guest
//           </h2>
//           <p className="text-sm text-neutral-400">
//             Enter your display name to start exploring the platform instantly.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2"
//             >
//               Your Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               autoFocus
//               placeholder="e.g. Alex Mercer"
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//                 if (error) setError("");
//               }}
//               className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
//             />
//             {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//           </div>

//           <Link
//           href={"./chatinterface"}
       
//             className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black font-medium text-sm rounded-lg hover:bg-neutral-200 transition-all active:scale-[0.99]"
        
//         /  >
//             <span>Enter Workspace</span>
//             <ArrowRight className="w-4 h-4" />
        
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

export function GuestModal({ isOpen, onClose, onSuccess }: GuestModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name.");
      return;
    }
    
    // Save to localStorage
    localStorage.setItem("user_name", trimmed);
    onSuccess(trimmed);
    onClose();

    // Navigate to chat interface
    router.push("/chatinterface");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[92%] sm:max-w-md border border-neutral-800 bg-neutral-950 p-5 sm:p-6 rounded-xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-white transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 pr-6">
          <h2 className="text-lg sm:text-xl font-medium tracking-tight text-white">
            Continue as Guest
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Enter your display name to start exploring the platform instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              autoFocus
              placeholder="e.g. Alex Mercer"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
            />
            {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black font-medium text-sm rounded-lg hover:bg-neutral-200 transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>Enter Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}