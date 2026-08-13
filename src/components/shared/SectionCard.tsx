import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface SectionCardProps {
  title?: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}

/** Neutral content container used across all modules. */
export function SectionCard({
  title,
  eyebrow,
  description,
  actions,
  footer,
  className,
  contentClassName,
  children,
}: SectionCardProps) {
  return (
    <section className={cn("surface-card surface-card-hover overflow-hidden shadow-card border-border/40 premium-transition", className)}>
      {title || actions || eyebrow ? (
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 bg-muted/5 px-6 py-4 backdrop-blur-[2px]">
          <div className="space-y-1">
            {eyebrow ? (
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-0.5">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="text-sm font-black text-foreground tracking-tight uppercase tracking-widest">{title}</h2>
            ) : null}
            {description ? (
              <p className="text-[11px] font-medium text-muted-foreground/70 leading-relaxed">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
      ) : null}
      <div className={cn("px-6 py-5", contentClassName)}>{children}</div>
      {footer ? (
        <footer className="border-t border-border/40 bg-muted/10 px-6 py-4 text-[11px] text-muted-foreground/60 font-black uppercase tracking-tighter">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}
