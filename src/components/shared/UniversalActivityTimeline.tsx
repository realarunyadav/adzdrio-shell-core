import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  Circle, 
  Clock, 
  User, 
  Activity, 
  ArrowRight,
  ChevronRight,
  MessageSquare,
  Phone,
  Mail,
  UserPlus
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface TimelineItem {
  id: string;
  type: string;
  content?: string;
  user: string | { name: string; initials: string };
  timestamp: string;
  metadata?: Record<string, any>;
  // Legacy fields for backward compatibility during transition
  title?: string;
  description?: string;
  category?: string;
}

const typeIcons: Record<string, any> = {
  comment: MessageSquare,
  system: Clock,
  status: Circle,
  assignment: UserPlus,
  communication: Phone,
  activity: Activity,
};

interface UniversalActivityTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function UniversalActivityTimeline({ items, className }: UniversalActivityTimelineProps) {
  return (
    <div className={cn("relative space-y-6 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border/80 before:via-border/40 before:to-transparent animate-in fade-in duration-700", className)}>
      {items.length > 0 ? (
        items.map((item) => {
          const Icon = typeIcons[item.type] || Activity;
          const displayContent = item.content || (item.title ? `${item.title}: ${item.description}` : item.description);
          
          let userName = "Unknown User";
          let userInitials = "??";
          
          if (typeof item.user === 'string') {
            userName = item.user;
            userInitials = item.user.substring(0, 2).toUpperCase();
          } else if (item.user && typeof item.user === 'object') {
            userName = item.user.name || "Unknown User";
            userInitials = item.user.initials || "??";
          }

          return (
            <div key={item.id} className="relative flex items-start gap-6 group">
              <div className="absolute left-0 flex size-8 items-center justify-center rounded-xl bg-background border border-border/60 shadow-elevated-sm premium-transition group-hover:border-primary/40 group-hover:scale-110 z-10">
                <Icon className="size-3.5 text-primary/80 group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 pt-1 pb-4 border-b border-border/20 last:border-0 ml-8">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-5 border border-border/40">
                      <AvatarFallback className="text-[8px] font-black">{userInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-black text-foreground uppercase tracking-tight">{userName}</span>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground/60 tabular-nums uppercase">{item.timestamp}</span>
                </div>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">{displayContent}</p>
                {item.metadata?.['type'] === "email" && (
                  <div className="mt-2 flex items-center gap-2">
                     <div className="rounded-full bg-info/10 p-1">
                        <Mail className="size-3 text-info" />
                     </div>
                     <span className="text-[10px] font-bold text-info uppercase">Email Sent</span>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center opacity-30 italic">
          <Activity className="size-8 mb-3" />
          <p className="text-[10px] font-black uppercase tracking-widest">No activity log found</p>
        </div>
      )}
    </div>
  );
}