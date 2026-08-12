import * as React from "react";
import { Send, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export function UniversalComments({ comments, className }: { comments: Comment[], className?: string }) {
  return (
    <div className={cn("space-y-6 animate-in fade-in duration-500", className)}>
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-premium">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <Avatar className="size-9 border border-border/40 shadow-sm shrink-0">
                <AvatarFallback className="text-[10px] font-black bg-muted text-muted-foreground uppercase tracking-widest">
                  {comment.user[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-foreground uppercase tracking-tight">{comment.user}</span>
                  <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">{comment.timestamp}</span>
                </div>
                <div className="bg-muted/30 rounded-2xl rounded-tl-none p-3 border border-border/40 premium-transition group-hover:bg-muted/50 group-hover:border-primary/20 shadow-sm shadow-black/5">
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed">{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center opacity-30 italic">
            <MessageSquare className="size-8 mb-3" />
            <p className="text-xs font-bold uppercase tracking-widest">No internal discussions yet</p>
          </div>
        )}
      </div>
      
      <div className="pt-4 border-t border-border/40">
        <div className="relative">
          <Textarea 
            placeholder="Add a comment... (Type @ to mention team members)" 
            className="min-h-[100px] text-xs font-medium bg-muted/20 border-border/40 focus:ring-1 focus:ring-primary/20 rounded-2xl pr-12 scrollbar-premium" 
          />
          <Button 
            size="icon" 
            className="absolute bottom-3 right-3 size-8 rounded-xl shadow-elevated"
          >
            <Send className="size-3.5" />
          </Button>
        </div>
        <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest mt-2 px-1">
          Comments are internal and visible only to enterprise team members.
        </p>
      </div>
    </div>
  );
}
