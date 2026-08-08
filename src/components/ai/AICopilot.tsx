import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Paperclip, 
  Mic, 
  Sparkles, 
  Bot, 
  User, 
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  History,
  Search,
  Maximize2
} from "lucide-react";
import { useState } from "react";

export function AICopilot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your ABOS AI Copilot. I have access to your CRM context, HR policies, and Company SOPs. How can I help you today?', time: '10:00 AM' },
    { role: 'user', content: 'What is the current follow-up status for Deemand Solutions?', time: '10:01 AM' },
    { role: 'assistant', content: 'According to the CRM, the last follow-up with Deemand Solutions was completed yesterday by Sarah. The next action is a technical demo scheduled for tomorrow at 2:00 PM. Would you like me to summarize their previous objections?', time: '10:01 AM' }
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-250px)]">
      {/* Sidebar: History & Search */}
      <div className="lg:col-span-3 hidden lg:flex flex-col gap-4">
        <SectionCard title="Conversations" className="h-full" contentClassName="p-0">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input placeholder="Search chat history..." className="pl-9 h-9 text-xs" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {[
                "Deemand Solutions Follow-up",
                "HR Leave Policy Question",
                "Sales Script for Enterprise",
                "Q3 Revenue Summary",
                "Product Plan Comparison"
              ].map((topic, i) => (
                <button key={i} className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${i === 0 ? 'bg-primary/10 font-bold' : 'hover:bg-muted'}`}>
                  {topic}
                </button>
              ))}
            </div>
          </ScrollArea>
        </SectionCard>
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-9 flex flex-col gap-4">
        <SectionCard className="flex-1 flex flex-col h-full" contentClassName="flex flex-col p-0">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between glass-surface">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-black tracking-tight">Enterprise Copilot</h3>
                <div className="flex items-center gap-1.5">
                  <div className="size-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">Ready with Context</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="size-8"><History className="size-4" /></Button>
              <Button variant="ghost" size="icon" className="size-8"><Maximize2 className="size-4" /></Button>
              <Button variant="ghost" size="icon" className="size-8"><MoreHorizontal className="size-4" /></Button>
            </div>
          </div>

          {/* Chat area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="size-8 mt-1 shrink-0 border border-border/40">
                    <AvatarFallback className={msg.role === 'assistant' ? 'bg-primary/10 text-primary' : 'bg-muted'}>
                      {msg.role === 'assistant' ? <Bot className="size-4" /> : <User className="size-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`space-y-1 flex flex-col ${msg.role === 'user' ? 'items-end' : ''}`}>
                    <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'glass-surface border border-border/40'
                    }`}>
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-tighter">{msg.time}</span>
                      {msg.role === 'assistant' && (
                        <div className="flex gap-1">
                          <button className="text-muted-foreground hover:text-primary transition-colors"><ThumbsUp className="size-3" /></button>
                          <button className="text-muted-foreground hover:text-destructive transition-colors"><ThumbsDown className="size-3" /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input area */}
          <div className="p-4 border-t glass-surface">
            <div className="max-w-3xl mx-auto relative">
              <textarea 
                placeholder="Ask about CRM, Policies, or SOPs..." 
                className="w-full bg-muted/30 border border-border/40 rounded-2xl p-4 pr-32 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px]"
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="size-8 rounded-full"><Paperclip className="size-4 text-muted-foreground" /></Button>
                <Button variant="ghost" size="icon" className="size-8 rounded-full"><Mic className="size-4 text-muted-foreground" /></Button>
                <Button size="icon" className="size-9 rounded-xl shadow-elevated"><Send className="size-4" /></Button>
              </div>
            </div>
            <p className="text-center text-[9px] text-muted-foreground mt-3 uppercase tracking-widest font-bold opacity-50">
              AI-generated content. Verify accuracy with authorized business data.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
