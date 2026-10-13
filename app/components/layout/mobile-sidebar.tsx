"use client";

import { X } from "lucide-react";
import { Sidebar } from "./sidebar";
import type { ComponentProps } from "react";

// Combine Sidebar's props with MobileSidebar's custom control props
type MobileSidebarProps = ComponentProps<typeof Sidebar> & {
  open: boolean;
  onClose: () => void;
};

export function MobileSidebar({ open, onClose, ...sidebarProps }: MobileSidebarProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button 
        aria-label="Close navigation overlay" 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-950/40" 
      />
      <div className="absolute inset-y-0 left-0 w-[290px] max-w-[85vw] overflow-y-auto bg-white shadow-2xl">
        <div className="absolute right-3 top-3 z-10">
          <button 
            onClick={onClose} 
            aria-label="Close navigation" 
            className="rounded-lg p-2 bg-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        {/* Forward all necessary sidebar props down */}
        <Sidebar {...sidebarProps} />
      </div>
    </div>
  );
}