import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TagColor = "emerald" | "amber" | "blue" | "rose" | "slate";

export function UniversalTag({ label, color = "slate" }: { label: string, color?: TagColor }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    slate: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-wider rounded-md", colors[color])}>
      {label}
    </Badge>
  );
}
