import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  Circle, 
  Clock, 
  User, 
  Activity, 
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface TimelineItem {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    initials: string;
  };
  category: "crm" | "finance" | "hrms" | "inventory" | "projects" | "users" | "system";
  meta?: React.ReactNode;
}

interface UniversalActivityTimelineProps {
  items: TimelineItem[];
  className?: string;
  compact?: boolean;
}

export function UniversalActivityTimeline({ items, className, compact = false }: UniversalActivityTimelineProps) {
  return (
    <div className={cn("space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-border/60", className)}>
      {items.map((item) => (
        <div key={item.id} className="relative pl-12 group">
          {/* Node */}
          <div className="absolute left-0 top-1 p-1.5 rounded-full bg-background border-2 border-border shadow-sm group-hover:border-primary premium-transition z-10">
            <div className={cn(
              "size-2.5 rounded-full",
              item.category === 'finance' ? "bg-emerald-500" :
              item.category === 'inventory' ? "bg-amber-500" :
              item.category === 'projects' ? "bg-blue-500" :
              "bg-primary"
            )} />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.timestamp}</span>
              <span className="size-1 rounded-full bg-border" />
              <Badge variant="outline" className="text-[9px] font-bold py-0 h-4 border-muted-foreground/20">
                {item.category}
              </Badge>
            </div>
            
            <div className="flex gap-3">
              <Avatar className="size-8 border border-border/40 shadow-sm">
                <AvatarFallback className="text-[10px] font-bold bg-muted text-muted-foreground">
                  {item.user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground leading-tight">
                  <span className="text-primary hover:underline cursor-pointer">{item.user.name}</span>
                  {" "}{item.title}
                </p>
                <p className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">
                  {item.description}
                </p>
                {item.meta && (
                  <div className="mt-3 p-3 rounded-xl bg-muted/30 border border-border/40 text-xs text-muted-foreground">
                    {item.meta}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper components for the Timeline
function Badge({ children, variant, className }: { children: React.ReactNode, variant?: any, className?: string }) {
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
      {children}
    </div>
  );
}
