import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DataToolbarProps {
  title?: string;
  icon?: LucideIcon;
  search?: ReactNode;
  filters?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function DataToolbar({
  title,
  icon: Icon,
  search,
  filters,
  actions,
  className,
}: DataToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex flex-1 items-center gap-4">
        {title || Icon ? (
          <div className="flex items-center gap-2 pr-4 border-r border-border hidden lg:flex">
            {Icon && <Icon className="size-4 text-muted-foreground" />}
            {title && <h3 className="text-sm font-medium">{title}</h3>}
          </div>
        ) : null}
        <div className="flex flex-1 items-center gap-2 max-w-md">
          {search}
          {filters}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
