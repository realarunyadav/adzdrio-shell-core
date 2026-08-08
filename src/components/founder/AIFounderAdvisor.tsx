import React, { useState } from 'react';
import { SectionCard } from '@/components/shared/SectionCard';
import { 
  Plus, 
  Search, 
  Filter, 
  MessageSquare, 
  Mic, 
  Paperclip,
  Send,
  Zap,
  Target,
  FileText,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const AIFounderAdvisor: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello, Executive. I am your ABOS Founder Advisor. I have real-time access to Finance, CRM, HR, and Operations data. How can I help you today?',
      citations: []
    }
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      <div className="lg:col-span-3 flex flex-col gap-4">
        <SectionCard 
          title="Founder OS Intelligence Hub" 
          description="Context-aware AI Advisor with multi-module data access"
          contentClassName="p-0 flex flex-col h-[500px]"
          className="flex-1"
        >
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex gap-4",
                  m.role === 'user' ? 'flex-row-reverse' : ''
                )}>
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className={cn(
                      "text-[10px] font-bold",
                      m.role === 'assistant' ? 'bg-primary/20 text-primary' : 'bg-muted'
                    )}>
                      {m.role === 'assistant' ? 'AI' : 'EX'}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "space-y-2 max-w-[80%]",
                    m.role === 'user' ? 'text-right' : ''
                  )}>
                    <div className={cn(
                      "p-3 rounded-2xl text-xs leading-relaxed",
                      m.role === 'assistant' ? 'glass-surface border border-border/40' : 'bg-primary text-primary-foreground'
                    )}>
                      {m.content}
                    </div>
                    {m.citations.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-start">
                        {m.citations.map((c, ci) => (
                          <Badge key={ci} variant="outline" className="text-[9px] bg-muted/50 border-none px-1.5 py-0">
                            {c}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t border-border/40 bg-muted/5">
            <div className="relative">
              <Input 
                placeholder="Ask about revenue trends, at-risk renewals, or team performance..." 
                className="pr-24 h-11 text-xs glass-surface border-border/40 focus-visible:ring-primary/20"
              />
              <div className="absolute right-2 top-1.5 flex gap-1">
                <Button size="icon" variant="ghost" className="size-8 text-muted-foreground"><Paperclip className="size-4" /></Button>
                <Button size="icon" variant="ghost" className="size-8 text-muted-foreground"><Mic className="size-4" /></Button>
                <Button size="icon" className="size-8 bg-primary"><Send className="size-4" /></Button>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="space-y-6">
        <SectionCard title="Suggested Queries" contentClassName="px-3">
          <div className="space-y-2">
            <QueryButton label="What happened today?" icon={Zap} />
            <QueryButton label="Which renewals are at risk?" icon={AlertCircle} />
            <QueryButton label="Top performing sales team?" icon={Target} />
            <QueryButton label="Revenue forecast for Q3?" icon={DollarSign} />
            <QueryButton label="Employee attendance summary" icon={FileText} />
          </div>
        </SectionCard>

        <SectionCard title="Advisor Context" className="bg-primary/5 border-primary/20">
           <div className="space-y-3">
             <ContextStatus label="Finance Data" status="active" />
             <ContextStatus label="CRM Pipeline" status="active" />
             <ContextStatus label="HR / Attendance" status="active" />
             <ContextStatus label="Support SLA" status="active" />
             <ContextStatus label="Market Intelligence" status="warning" />
           </div>
        </SectionCard>
      </div>
    </div>
  );
};

const QueryButton = ({ label, icon: Icon }: any) => (
  <button className="w-full text-left p-2.5 rounded-lg hover:bg-muted/50 transition-all text-xs flex items-center gap-3 border border-transparent hover:border-border/40 group">
    <Icon className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
    <span className="flex-1 truncate">{label}</span>
  </button>
);

const ContextStatus = ({ label, status }: any) => (
  <div className="flex items-center justify-between text-[10px]">
    <span className="text-muted-foreground">{label}</span>
    <Badge variant="outline" className={cn(
      "text-[8px] px-1 py-0 border-none",
      status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
    )}>
      {status === 'active' ? 'Verified' : 'Limited'}
    </Badge>
  </div>
);
