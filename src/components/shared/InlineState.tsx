import { CheckCircle2, AlertCircle, Info, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type StateType = "success" | "error" | "info" | "warning" | "loading";

interface StateProps {
  type: StateType;
  title?: string;
  message?: string;
  className?: string;
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
  loading: Loader2,
};

const colors = {
  success: "text-success",
  error: "text-destructive",
  info: "text-info",
  warning: "text-warning",
  loading: "text-primary",
};

export function InlineState({ type, title, message, className }: StateProps) {
  const Icon = icons[type];
  
  return (
    <div className={cn("flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border", className)}>
      <Icon className={cn("size-5 mt-0.5 shrink-0", colors[type], type === 'loading' && "animate-spin")} />
      <div className="space-y-1">
        {title && <h4 className="text-sm font-semibold leading-none">{title}</h4>}
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
}
