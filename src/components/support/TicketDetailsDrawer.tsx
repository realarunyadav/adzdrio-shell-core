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
  ShieldAlert,
  Loader2
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
import { supportService } from "@/lib/api/services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface TicketDetailsDrawerProps {
  ticketId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TicketDetailsDrawer({ ticketId, open, onOpenChange }: TicketDetailsDrawerProps) {
  const queryClient = useQueryClient();
  const [messageContent, setMessageContent] = React.useState("");
  const [isInternal, setIsInternal] = React.useState(false);

  const { data: ticket, isLoading: isLoadingTicket } = useQuery({
    queryKey: ["support", "ticket", ticketId],
    queryFn: () => supportService.getTicketById(ticketId!),
    enabled: !!ticketId && open,
  });

  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ["support", "messages", ticketId],
    queryFn: () => supportService.listMessages(ticketId!),
    enabled: !!ticketId && open,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => supportService.createMessage({
      ticket_id: ticketId!,
      content: content,
      is_internal: isInternal,
      business_id: ticket?.business_id,
      organization_id: ticket?.organization_id
    }),
    onSuccess: () => {
      setMessageContent("");
      queryClient.invalidateQueries({ queryKey: ["support", "messages", ticketId] });
    }
  });

  if (!ticketId) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[700px] p-0 flex flex-col h-full bg-background border-l border-border">
        {isLoadingTicket ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : ticket ? (
          <>
            <SheetHeader className="p-6 border-b border-border/40 bg-muted/5 space-y-0">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">{ticket.id.slice(0, 8)}</span>
                    <Badge variant="outline" className={cn(
                      "text-[9px] font-black uppercase h-5",
                      ticket.priority.toLowerCase() === 'urgent' ? "bg-red-500/10 text-red-700 border-red-500/20" :
                      ticket.priority.toLowerCase() === 'high' ? "bg-orange-500/10 text-orange-700 border-orange-500/20" :
                      "bg-muted border-border/40 text-muted-foreground"
                    )}>
                      {ticket.priority} Priority
                    </Badge>
                  </div>
                  <SheetTitle className="text-xl font-black leading-tight tracking-tight mt-2">{ticket.subject}</SheetTitle>
                  <div className="flex items-center gap-3 text-muted-foreground pt-1">
                    <div className="flex items-center gap-1">
                      <User className="size-3" />
                      <span className="text-[10px] font-bold uppercase">{ticket.customer_name || 'Anonymous'}</span>
                    </div>
                    <Separator orientation="vertical" className="h-3" />
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      <span className="text-[10px] font-bold uppercase">{ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : 'N/A'}</span>
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
                <Separator orientation="vertical" className="h-8 mx-1" />
                <Button size="sm" variant="outline" className="h-8 text-[11px] font-bold uppercase tracking-wider">
                  <StickyNote className="mr-2 h-3.5 w-3.5" /> Note
                </Button>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto">
              <Tabs defaultValue="conversation" className="w-full">
                <div className="px-6 border-b border-border/40 bg-muted/5">
                  <TabsList className="bg-transparent gap-6 h-12 p-0">
                    {['Overview', 'Conversation', 'Customer'].map(tab => (
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
                            ticket.sla_status === 'Healthy' ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                          )}>
                            <ShieldAlert className="size-5" />
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase">{ticket.sla_status}</p>
                            <p className="text-[10px] text-muted-foreground font-bold">Due: {ticket.due_time ? new Date(ticket.due_time).toLocaleString() : 'No Deadline'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</h4>
                        <div className="flex items-center gap-3 p-4 rounded-xl border border-border">
                          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase text-[10px]">
                            {ticket.category_name?.slice(0, 2) || 'SP'}
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase">{ticket.category_name || 'General Support'}</p>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">{ticket.business_name || 'Standard'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Metadata</h4>
                      <pre className="text-[10px] bg-muted/20 p-4 rounded-xl border border-border/40 overflow-auto max-h-40">
                        {JSON.stringify(ticket.metadata, null, 2)}
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="conversation" className="m-0">
                    <div className="space-y-6 mb-8">
                      {isLoadingMessages ? (
                        [...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
                      ) : messages?.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground italic text-xs">No messages yet.</div>
                      ) : (
                        messages?.map((msg) => (
                          <div key={msg.id} className={cn("flex flex-col gap-2", msg.is_internal && "opacity-80")}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase">{msg.sender_name || (msg.sender_employee_id ? 'Support Agent' : 'Customer')}</span>
                                {msg.is_internal && <Badge variant="outline" className="text-[8px] bg-yellow-500/10 text-yellow-700 h-4">INTERNAL</Badge>}
                              </div>
                              <span className="text-[10px] text-muted-foreground font-bold">{msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}</span>
                            </div>
                            <div className={cn(
                              "p-4 rounded-xl border text-sm font-medium",
                              msg.is_internal ? "bg-yellow-500/5 border-yellow-200" : "bg-muted/30 border-border/60"
                            )}>
                              {msg.body}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border/40">
                      <div className="flex items-center gap-2 mb-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={cn("h-8 text-[10px] font-black uppercase", isInternal && "text-primary")}
                          onClick={() => setIsInternal(true)}
                        >
                          Internal Note
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={cn("h-8 text-[10px] font-black uppercase", !isInternal && "text-primary")}
                          onClick={() => setIsInternal(false)}
                        >
                          Customer Reply
                        </Button>
                      </div>
                      <textarea 
                        className="min-h-[100px] w-full p-4 rounded-xl border-2 border-primary/20 bg-primary/5 text-sm font-medium focus:outline-none focus:border-primary transition-all text-foreground resize-none"
                        placeholder={isInternal ? "Write an internal note..." : "Write a reply to the customer..."}
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                      />
                      <div className="flex items-center justify-between mt-4">
                        <Button variant="ghost" size="sm" className="h-8"><Paperclip className="h-4 w-4 mr-2" /> Attach</Button>
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90 font-bold uppercase tracking-wider text-[11px]"
                          disabled={!messageContent || sendMessageMutation.isPending}
                          onClick={() => sendMessageMutation.mutate(messageContent)}
                        >
                          {sendMessageMutation.isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="customer" className="m-0 space-y-6">
                    <div className="p-6 rounded-2xl border border-border bg-muted/5">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Customer Details</h4>
                       <div className="space-y-4">
                         <div>
                            <p className="text-[10px] text-muted-foreground font-black uppercase">Full Name</p>
                            <p className="text-sm font-bold">{ticket.customer_name || 'Anonymous'}</p>
                         </div>
                         <div>
                            <p className="text-[10px] text-muted-foreground font-black uppercase">Business</p>
                            <p className="text-sm font-bold">{ticket.business_name || 'Not Linked'}</p>
                         </div>
                       </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </>
        ) : (
          <div className="p-12 text-center text-muted-foreground">Ticket not found</div>
        )}
      </SheetContent>
    </Sheet>
  );
}
