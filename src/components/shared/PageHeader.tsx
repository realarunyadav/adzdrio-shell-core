import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  className?: string;
}

/** Standard page title block used by every module screen. */
export function PageHeader({ title, description, eyebrow, actions, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 border-b border-border/40 pb-8 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight m-0">{title}</h1>
        {description ? (
          <p className="max-w-2xl text-[15px] text-muted-foreground leading-relaxed">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-500">{actions}</div> : null}
    </div>
  );
}