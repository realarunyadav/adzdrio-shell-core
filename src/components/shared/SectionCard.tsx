import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface SectionCardProps {
  title?: string;
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
  description,
  actions,
  footer,
  className,
  contentClassName,
  children,
}: SectionCardProps) {
  return (
    <section className={cn("surface-card overflow-hidden", className)}>
      {title || actions ? (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="space-y-0.5">
            {title ? (
              <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            ) : null}
            {description ? (
              <p className="text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
      ) : null}
      <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
      {footer ? (
        <footer className="border-t border-border bg-muted/40 px-5 py-3 text-xs text-muted-foreground">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}