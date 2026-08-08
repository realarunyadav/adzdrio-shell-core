import { SectionCard } from "@/components/shared/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  User, 
  MessageSquare, 
  Calendar, 
  Target, 
  ShieldAlert,
  ArrowRight
} from "lucide-react";

export function ContextualAI({ contextType, contextId }: { contextType: 'customer' | 'lead' | 'employee'; contextId: string }) {
  return (
    <SectionCard 
      title="AI Contextual Intelligence" 
      className="border-primary/20 bg-primary/5"
      actions={<Button variant="ghost" size="icon" className="size-8"><Sparkles className="size-4 text-primary" /></Button>}
    >
      <div className="space-y-4">
        <div className="p-3 rounded-xl glass-surface border border-border/40 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Strategic Summary</h4>
            <Badge variant="outline" className="text-[8px] px-1 py-0 h-4">Context: {contextType}</Badge>
          </div>
          <p className="text-[11px] leading-relaxed italic opacity-80">
            "This {contextType} has shown high engagement in the last 48 hours. Based on previous interactions, they are likely concerned about data migration SLAs. Recommended approach: Lead with the 'Zero-Downtime Migration' case study."
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg border border-border/40 hover:border-primary/40 transition-all cursor-pointer group">
            <div className="flex items-center gap-2 mb-1">
              <Target className="size-3 text-primary" />
              <span className="text-[9px] font-bold uppercase tracking-tight">Next Best Action</span>
            </div>
            <p className="text-[10px] text-muted-foreground group-hover:text-foreground">Send Technical FAQ</p>
          </div>
          <div className="p-2.5 rounded-lg border border-border/40 hover:border-primary/40 transition-all cursor-pointer group">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="size-3 text-primary" />
              <span className="text-[9px] font-bold uppercase tracking-tight">Sales Response</span>
            </div>
            <p className="text-[10px] text-muted-foreground group-hover:text-foreground">Generate Objection Reply</p>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-tight mb-2">
            <span>Risk Indicators</span>
            <span className="text-success">Low Risk</span>
          </div>
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-success w-[15%]" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground font-bold uppercase tracking-widest opacity-50 justify-center">
          <ShieldAlert className="size-2" />
          RBAC Restricted Context · AI Interpreted
        </div>
      </div>
    </SectionCard>
  );
}
