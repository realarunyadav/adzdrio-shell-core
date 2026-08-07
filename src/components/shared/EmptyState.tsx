import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "surface-card border-dashed flex flex-col items-center justify-center gap-6 px-8 py-20 text-center bg-card/30 backdrop-blur-[2px]",
        className,
      )}
    >
      {Icon ? (
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
          <span className="relative flex size-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary-foreground shadow-sm shadow-primary/5">
            <Icon className="size-8 text-primary" aria-hidden />
          </span>
        </div>
      ) : null}
      <div className="space-y-2 max-w-sm">
        <h3 className="text-xl font-bold text-foreground tracking-tight">{title}</h3>
        {description ? (
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        ) : null}
      </div>
      {action && <div className="mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">{action}</div>}
    </div>
  );
}