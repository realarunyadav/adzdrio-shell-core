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
        "surface-card border-dashed flex flex-col items-center justify-center gap-6 px-8 py-20 text-center bg-muted/5 backdrop-blur-[2px] animate-in fade-in duration-700",
        className,
      )}
    >
      {Icon ? (
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse opacity-20" />
          <span className="relative flex size-20 items-center justify-center rounded-3xl bg-background border border-border/50 text-primary shadow-elevated transition-transform hover:scale-105 duration-500">
            <Icon className="size-10 stroke-[1.5]" aria-hidden />
          </span>
        </div>
      ) : null}
      <div className="space-y-2 max-w-sm">
        <h3 className="text-xl font-black text-foreground tracking-tighter uppercase">{title}</h3>
        {description ? (
          <p className="text-xs text-muted-foreground font-medium leading-relaxed opacity-70 italic">{description}</p>
        ) : null}
      </div>
      {action && (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          {action}
        </div>
      )}
    </div>
  );
}