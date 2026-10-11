"use client";

import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" };

export function Button({ children, className = "", variant = "primary", ...props }: Props) {
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-700 disabled:bg-slate-300",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
  };
  return <button {...props} className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed ${variants[variant]} ${className}`}>{children}</button>;
}
