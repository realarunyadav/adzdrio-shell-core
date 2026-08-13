import * as React from "react";
import { 
  X, 
  MessageSquare, 
  Clock, 
  AlertTriangle, 
  User, 
  Calendar, 
  Paperclip, 
  Send,
  MoreVertical,
  History,
  CheckCircle2,
  Reply,
  Phone,
  UserPlus,
  StickyNote,
  ArrowRightLeft,
  ShieldAlert
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { 
  DemoSupportTicket, 
  demoSupportActivities, 
  DemoSupportActivity 
} from "@/lib/mock/workspace.demo";

interface TicketDetailsDrawerProps {
  ticket: DemoSupportTicket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TicketDetailsDrawer({ ticket, open, onOpenChange }: TicketDetailsDrawerProps) {
  if (!ticket) return null;

  const activities = demoSupportActivities.filter((a: DemoSupportActivity) => a.ticketId === ticket.id);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[700px] p-0 flex flex-col h-full bg-background border-l border-border">
        <SheetHeader className="p-6 border-b border-border/40 bg-muted/5 space-y-0">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">{ticket.id}</span>
                <Badge variant="outline" className={cn(
                  "text-[9px] font-black uppercase h-5",
                  ticket.priority === 'Critical' ? "bg-red-500/10 text-red-700 border-red-500/20" :
                  ticket.priority === 'High' ? "bg-orange-500/10 text-orange-700 border-orange-500/20" :
                  "bg-muted border-border/40 text-muted-foreground"
                )}>
                  {ticket.priority} Priority
                </Badge>
              </div>
              <SheetTitle className="text-xl font-black leading-tight tracking-tight mt-2">{ticket.subject}</SheetTitle>
              <div className="flex items-center gap-3 text-muted-foreground pt-1">
                <div className="flex items-center gap-1">
                  <User className="size-3" />
                  <span className="text-[10px] font-bold uppercase">{ticket.customerName}</span>
                </div>
                <Separator orientation="vertical" className="h-3" />
                <div className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  <span className="text-[10px] font-bold uppercase">{new Date(ticket.created).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8"><X className="h-4 w-4" /></Button>
              </SheetClose>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold h-8 text-[11px] uppercase tracking-wider">
              <Reply className="mr-2 h-3.5 w-3.5" /> Reply
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-[11px] font-bold uppercase tracking-wider">
              <Phone className="mr-2 h-3.5 w-3.5" /> Call
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-[11px] font-bold uppercase tracking-wider">
              <UserPlus className="mr-2 h-3.5 w-3.5" /> Assign
            </Button>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <Button size="sm" variant="outline" className="h-8 text-[11px] font-bold uppercase tracking-wider">
              Status <ArrowRightLeft className="ml-2 h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-[11px] font-bold uppercase tracking-wider">
              <StickyNote className="mr-2 h-3.5 w-3.5" /> Note
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="conversation" className="w-full">
            <div className="px-6 border-b border-border/40 bg-muted/5">
              <TabsList className="bg-transparent gap-6 h-12 p-0">
                {['Overview', 'Conversation', 'Activity', 'Customer', 'Attachments'].map(tab => (
                  <TabsTrigger 
                    key={tab} 
                    value={tab.toLowerCase()}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[10px] font-black uppercase tracking-widest px-0 h-12"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="overview" className="m-0 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">SLA Health</h4>
                    <div className="p-4 rounded-xl border border-border bg-muted/10 flex items-center gap-3">
                      <div className={cn(
                        "size-10 rounded-full flex items-center justify-center",
                        ticket.slaStatus === 'Healthy' ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                      )}>
                        <ShieldAlert className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase">{ticket.slaStatus}</p>
                        <p className="text-[10px] text-muted-foreground font-bold">Expires: {new Date(ticket.dueTime).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assigned Agent</h4>
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-border">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase">
                        {ticket.assignedToName.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase">{ticket.assignedToName}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase">Senior Lead</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</h4>
                  <p className="text-sm font-medium leading-relaxed bg-muted/20 p-4 rounded-xl border border-border/40">
                    The customer is reporting persistent 403 Forbidden errors when attempting to access the billing dashboard. 
                    This started occurring after the last system maintenance window on August 12th. 
                    They have tried clearing browser cache and using a different administrator account, but the issue persists.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="conversation" className="m-0">
                <div className="space-y-6">
                  {activities.filter((a: DemoSupportActivity) => a.action.includes('created') || a.action.includes('reply')).map((activity: DemoSupportActivity) => (
                    <div key={activity.id} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase">{activity.actor}</span>
                        <span className="text-[10px] text-muted-foreground font-bold">{new Date(activity.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 border border-border/60 text-sm font-medium">
                        {activity.action === 'created ticket' ? 
                          "Hi Support, I'm unable to access the billing dashboard. It keeps saying '403 Forbidden'. Can you please help?" :
                          "Thank you for the update. Let me check the server logs."
                        }
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-border/40">
                  <div className="flex items-center gap-2 mb-4">
                    <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase">Internal Note</Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase text-primary">Customer Reply</Button>
                  </div>
                  <div className="min-h-[100px] w-full p-4 rounded-xl border-2 border-primary/20 bg-primary/5 text-sm font-medium focus-within:border-primary transition-all text-muted-foreground">
                    Type your message here...
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Button variant="ghost" size="sm" className="h-8"><Paperclip className="h-4 w-4 mr-2" /> Attach</Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold uppercase tracking-wider text-[11px]">Send Message</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="m-0">
                 <div className="space-y-4">
                  {activities.map((activity: DemoSupportActivity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2">
                      <div className="size-6 rounded-full bg-muted flex items-center justify-center">
                        <History className="size-3 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">
                          <span className="text-primary">{activity.actor}</span> {activity.action}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(activity.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}