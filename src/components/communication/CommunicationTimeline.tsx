import * as React from "react";
import { 
  Mail, 
  Send, 
  Paperclip, 
  MessageSquare,
  Clock,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CommunicationTimelineProps {
  entityId: string;
  entityType: string;
}

export function CommunicationTimeline({ entityId, entityType }: CommunicationTimelineProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold tracking-tight uppercase text-muted-foreground flex items-center gap-2">
          <MessageSquare className="size-3.5" />
          Communication History
        </h4>
        <Button variant="outline" size="sm" className="h-7 text-[10px] uppercase font-bold">
          Send Email
        </Button>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-border">
        {[
          {
            type: 'email',
            direction: 'outbound',
            subject: 'Follow-up regarding your proposal',
            snippet: 'Hi, I wanted to follow up on our discussion yesterday...',
            timestamp: '2 hours ago',
            status: 'delivered',
            sender: 'Amit Jain',
            attachments: 1
          },
          {
            type: 'email',
            direction: 'inbound',
            subject: 'Re: Follow-up regarding your proposal',
            snippet: 'Thanks for reaching out! We are reviewing the details now.',
            timestamp: 'Yesterday at 4:30 PM',
            status: 'read',
            sender: 'Customer'
          },
        ].map((item, i) => (
          <div key={i} className="relative group">
            <div className="absolute -left-[23px] top-1 size-6 rounded-full border bg-background flex items-center justify-center z-10">
              <Mail className="size-3 text-muted-foreground" />
            </div>
            
            <Collapsible>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <CollapsibleTrigger asChild>
                    <button className="text-left group/trigger flex items-center gap-2">
                      <span className="text-xs font-bold hover:text-primary transition-colors">
                        {item.subject}
                      </span>
                      <ChevronDown className="size-3 text-muted-foreground group-data-[state=open]/trigger:rotate-180 transition-transform" />
                    </button>
                  </CollapsibleTrigger>
                  <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
                </div>
                
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-muted-foreground">From: <span className="font-semibold text-foreground">{item.sender}</span></span>
                  <div className="size-1 rounded-full bg-border" />
                  <StatusBadge tone={item.status === 'delivered' ? 'success' : 'neutral'}>
                    {item.status}
                  </StatusBadge>
                  {item.attachments && (
                    <div className="flex items-center gap-1 text-primary">
                      <Paperclip className="size-2.5" />
                      <span>{item.attachments} file</span>
                    </div>
                  )}
                </div>

                <CollapsibleContent className="mt-2 text-xs text-muted-foreground leading-relaxed p-3 bg-muted/30 rounded-lg border animate-in fade-in slide-in-from-top-1">
                  {item.snippet}
                  <div className="mt-3 pt-2 border-t flex justify-end">
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] uppercase font-bold text-primary">
                      View Full Thread
                      <ExternalLink className="ml-1.5 size-2.5" />
                    </Button>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
}
