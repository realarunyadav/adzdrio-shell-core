import * as React from "react";
import { cn } from "@/lib/utils";

export type StatusTone = "neutral" | "success" | "warning" | "info" | "danger" | "premium";

const toneClasses: Record<StatusTone, string> = {
  neutral: "bg-muted text-muted-foreground border-border/40",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  info: "bg-info/10 text-info border-info/20",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  premium: "bg-primary/10 text-primary border-primary/20 shadow-sm shadow-primary/5",
};

export function StatusBadge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: StatusTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest transition-all hover:brightness-95",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}