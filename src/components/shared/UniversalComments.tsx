import * as React from "react";
import { MessageSquare, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export function UniversalComments({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="size-8">
              <AvatarFallback className="text-[10px] bg-slate-100">{comment.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-800">{comment.user}</span>
                <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
              </div>
              <p className="text-sm text-slate-600">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Textarea placeholder="Add a comment... (Type @ to mention)" className="min-h-[80px] text-sm" />
        <Button size="icon" className="shrink-0"><Send className="size-4" /></Button>
      </div>
    </div>
  );
}
