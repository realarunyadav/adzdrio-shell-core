import * as React from "react";
import { 
  X, 
  MessageSquare, 
  Phone, 
  UserPlus, 
  ArrowRightLeft, 
  Clock, 
  Paperclip, 
  FileText, 
  ExternalLink,
  History,
  ShieldAlert,
  MoreVertical,
  Reply,
  StickyNote
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  DemoSupportTicket, 
  demoSupportActivities 
} from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";

interface TicketDetailsDrawerProps {
  ticket: DemoSupportTicket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TicketDetailsDrawer({ ticket, open, onOpenChange }: TicketDetailsDrawerProps) {
  if (!ticket) return null;

  const activities = demoSupportActivities.filter(a => a.ticketId === ticket.id);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl p-0 overflow-hidden flex flex-col border-l-border/60">
        <SheetHeader className="p-6 border-b border-border/40 bg-muted/20 shrink-0">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{ticket.id}</span>
                <Badge variant="outline" className={cn(
                  "text-[9px] uppercase font-bold",
                  ticket.status === 'Resolved' ? "bg-green-500/10 text-green-700 border-green-500/20" :
                  ticket.status === 'In Progress' ? "bg-blue-500/10 text-blue-700 border-blue-500/20" :
                  "bg-orange-500/10 text-orange-700 border-orange-500/20"
                )}>
                  {ticket.status}
                </Badge>
                <Badge variant="outline" className={cn(
                  "text-[9px] uppercase font-bold",
                  ticket.priority === 'Critical' ? "bg-red-500/10 text-red-700 border-red-500/20" :
                  "bg-muted border-border/40 text-muted-foreground"
                )}>
                  {ticket.priority}
                </Badge>
              </div>
              <SheetTitle className="text-xl font-black leading-tight tracking-tight mt-2">
                {ticket.subject}
              </SheetTitle>
              <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-wide">
                <span>Customer: <span className="text-foreground">{ticket.customerName}</span></span>
                <span>Business: <span className="text-foreground">{ticket.business}</span></span>
                <span>Agent: <span className="text-foreground">{ticket.assignedToName}</span></span>
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
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Timeline</h4>
                    <div className="space-y-2">
                       <div className="flex items-center justify-between text-[10px]">
                         <span className="text-muted-foreground font-bold uppercase">Created</span>
                         <span className="font-black">{new Date(ticket.created).toLocaleString()}</span>
                       </div>
                       <div className="flex items-center justify-between text-[10px]">
                         <span className="text-muted-foreground font-bold uppercase">Last Activity</span>
                         <span className="font-black">{new Date(ticket.lastActivity).toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Original Request</h4>
                  <div className="p-4 rounded-xl border border-border bg-background text-sm font-medium leading-relaxed">
                    {ticket.subject} - Customer needs immediate assistance with processing a bulk payment. Reference ID was SALE-1001.
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="conversation" className="m-0 space-y-6">
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
                  {activities.filter(a => a.type === 'comment').map((activity) => (
                    <div key={activity.id} className="relative pl-12">
                      <div className="absolute left-0 size-10 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center font-bold text-primary text-[10px]">
                        {activity.actor[0]}
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-background shadow-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase">{activity.actor}</span>
                          <span className="text-[10px] text-muted-foreground">{new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-xs font-medium leading-relaxed">{activity.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-border/40">
                  <div className="flex items-center gap-2 mb-4">
                    <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase">Internal Note</Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase text-primary">Customer Reply</Button>
                  </div>
                  <div className="min-h-[100px] w-full p-4 rounded-xl border-2 border-primary/20 bg-primary/5 text-sm font-medium focus-within:border-primary transition-all">
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
                  {activities.map((activity) => (
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
