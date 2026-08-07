import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {
  LifeBuoy,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  AlertCircle,
  ChevronRight,
  User,
  MessageSquare,
  History,
  ShieldCheck,
  Send,
  Paperclip,
  Activity,
  Zap,
  Tag,
  Eye,
  CreditCard,
  Heart,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UniversalAuditLog } from "@/components/shared/UniversalAuditLog";
import { UniversalComments } from "@/components/shared/UniversalComments";
import { UniversalFileManager } from "@/components/shared/UniversalFileManager";
import { UniversalActivityTimeline, TimelineItem } from "@/components/shared/UniversalActivityTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/modules/support")({
  component: SupportModule,
});

function SupportModule() {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [selectedTicket, setSelectedTicket] = React.useState<any>(null);

  const handleTicketClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setActiveTab("detail");
  };

  const MOCK_TICKETS = [
    {
      id: "TIC-2026-442",
      subject: "Unable to stream 4K content on Smart TV",
      customer: "Amit Kumar",
      status: "Open",
      priority: "Critical",
      sla: "00:45:00",
      assigned: "Rahul S.",
      created: "15 mins ago",
      type: "Technical"
    },
    {
      id: "TIC-2026-440",
      subject: "Renewal inquiry for Platinum Plan",
      customer: "Sneha Kapur",
      status: "In Progress",
      priority: "Medium",
      sla: "03:20:00",
      assigned: "Priya V.",
      created: "2 hours ago",
      type: "Billing"
    }
  ];

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-700">
      <PageHeader
        eyebrow="Customer Success"
        title="Support Command Center"
        description="Enterprise service desk for ticket orchestration, SLA management and customer health tracking."
        actions={
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="h-9" onClick={() => setActiveTab("portal")}>
               <Eye className="mr-2 size-3.5" /> Customer Portal Preview
             </Button>
             <Button size="sm" className="shadow-elevated h-9">
               <Plus className="mr-2 size-3.5" /> New Ticket
             </Button>
          </div>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="border-b border-border/40 pb-0 gap-6 w-full justify-start rounded-none bg-transparent p-0 h-auto">
          <TabsTrigger value="dashboard" className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Support Dashboard
          </TabsTrigger>
          <TabsTrigger value="tickets" className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Ticket Queue
          </TabsTrigger>
          {selectedTicket && (
            <TabsTrigger value="detail" className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              Detail: {selectedTicket.id}
            </TabsTrigger>
          )}
          <TabsTrigger value="portal" className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Portal Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="outline-none space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
             <KpiCard title="Active Tickets" value="42" trend="+5" icon={LifeBuoy} />
             <KpiCard title="Critical SLA" value="3" trend="-2" icon={Clock} variant="danger" />
             <KpiCard title="Avg. First Response" value="12m" trend="-4m" icon={Zap} />
             <KpiCard title="CSAT Score" value="4.8/5" trend="+0.2" icon={Heart} />
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
             <div className="lg:col-span-8">
                <SectionCard title="Recent Activity" description="Latest support operations and ticket movements.">
                   <UniversalActivityTimeline items={MOCK_SUPPORT_TIMELINE} />
                </SectionCard>
             </div>
             <div className="lg:col-span-4 space-y-6">
                <SectionCard title="Team Performance">
                   <div className="space-y-4">
                      <TeamMemberPerformance name="Rahul S." resolved={12} csat="4.9" />
                      <TeamMemberPerformance name="Priya V." resolved={9} csat="4.7" />
                      <TeamMemberPerformance name="Amit J." resolved={7} csat="4.8" />
                   </div>
                </SectionCard>
                <SectionCard title="Ticket Volume">
                   <div className="h-[150px] flex items-center justify-center text-muted-foreground/40 text-xs italic">
                      <BarChart3 className="mr-2 size-4" /> Trend data streaming...
                   </div>
                </SectionCard>
             </div>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="outline-none">
          <SectionCard title="Ticket Queue" contentClassName="p-0">
             <div className="p-4 border-b border-border/40 flex items-center justify-between">
                <div className="relative group">
                  <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search tickets..." className="w-[350px] h-9 pl-9 text-xs" />
                </div>
                <div className="flex gap-2">
                   <Button variant="outline" size="sm" className="h-9"><Filter className="mr-2 size-3.5" /> Filters</Button>
                </div>
             </div>
             <Table>
                <TableHeader className="bg-muted/30">
                   <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>SLA</TableHead>
                      <TableHead>Assigned</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                   </TableRow>
                </TableHeader>
                <TableBody>
                   {MOCK_TICKETS.map(ticket => (
                     <TableRow key={ticket.id} className="hover:bg-muted/5 cursor-pointer group" onClick={() => handleTicketClick(ticket)}>
                        <TableCell className="font-medium text-xs text-primary group-hover:underline">{ticket.id}</TableCell>
                        <TableCell className="text-xs font-bold">{ticket.subject}</TableCell>
                        <TableCell className="text-xs">{ticket.customer}</TableCell>
                        <TableCell>
                           <Badge variant="outline" className={cn(
                             "text-[9px] uppercase font-black",
                             ticket.priority === "Critical" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-amber-50 text-amber-600 border-amber-100"
                           )}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell><StatusBadge tone={ticket.status === 'Open' ? 'warning' : 'info'}>{ticket.status}</StatusBadge></TableCell>
                        <TableCell className="text-xs font-bold text-rose-600">{ticket.sla}</TableCell>
                        <TableCell className="text-xs">{ticket.assigned}</TableCell>
                        <TableCell className="text-right"><Button size="icon" variant="ghost"><MoreHorizontal className="size-4" /></Button></TableCell>
                     </TableRow>
                   ))}
                </TableBody>
             </Table>
          </SectionCard>
        </TabsContent>

        {selectedTicket && (
          <TabsContent value="detail" className="outline-none space-y-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("tickets")}>
                     <ArrowRight className="rotate-180 mr-2 size-3.5" /> Back
                  </Button>
                  <h2 className="text-xl font-black">{selectedTicket.subject}</h2>
                  <StatusBadge tone="warning">{selectedTicket.status}</StatusBadge>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-9">Escalate</Button>
                  <Button size="sm" className="h-9">Resolve Ticket</Button>
               </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
               <div className="lg:col-span-8 space-y-6">
                  <SectionCard title="Conversation">
                     <ScrollArea className="h-[400px] pr-4 mb-4">
                        <div className="space-y-6">
                           <ChatMessage 
                              user={selectedTicket.customer} 
                              time="20 mins ago" 
                              message="I have been trying to watch the new series in 4K on my Samsung Smart TV, but it keeps buffering and falling back to 720p. My internet connection is stable at 100Mbps."
                           />
                           <ChatMessage 
                              user="Rahul S. (Support)" 
                              time="10 mins ago" 
                              message="Hi Amit, sorry to hear that. I'm checking your device logs. Can you confirm if you've tried restarting the app?"
                              agent
                           />
                        </div>
                     </ScrollArea>
                     <div className="pt-4 border-t border-border/40">
                        <textarea className="w-full h-24 bg-muted/30 border border-border/40 rounded-xl p-4 text-sm mb-3 outline-none focus:ring-1 focus:ring-primary" placeholder="Type your reply..." />
                        <div className="flex justify-between items-center">
                           <Button variant="ghost" size="sm"><Paperclip className="mr-2 size-4" /> Attach Files</Button>
                           <Button size="sm"><Send className="mr-2 size-3.5" /> Send Reply</Button>
                        </div>
                     </div>
                  </SectionCard>

                  <Tabs defaultValue="notes">
                     <TabsList className="glass-surface h-9 p-0.5">
                        <TabsTrigger value="notes" className="text-[10px] h-8 px-4">Internal Notes</TabsTrigger>
                        <TabsTrigger value="files" className="text-[10px] h-8 px-4">Attachments</TabsTrigger>
                        <TabsTrigger value="timeline" className="text-[10px] h-8 px-4">Ticket History</TabsTrigger>
                        <TabsTrigger value="audit" className="text-[10px] h-8 px-4">Audit Log</TabsTrigger>
                     </TabsList>
                     <div className="mt-4">
                        <TabsContent value="notes"><UniversalComments comments={MOCK_SUPPORT_COMMENTS} /></TabsContent>
                        <TabsContent value="files"><UniversalFileManager /></TabsContent>
                        <TabsContent value="timeline"><UniversalActivityTimeline items={MOCK_SUPPORT_TIMELINE} /></TabsContent>
                        <TabsContent value="audit"><UniversalAuditLog entries={MOCK_SUPPORT_AUDIT} /></TabsContent>
                     </div>
                  </Tabs>
               </div>

               <div className="lg:col-span-4 space-y-6">
                  <SectionCard title="Ticket Context">
                     <div className="space-y-4">
                        <DetailItem label="Priority" value={selectedTicket.priority} />
                        <DetailItem label="SLA Remaining" value={selectedTicket.sla} />
                        <DetailItem label="Ticket Category" value={selectedTicket.type} />
                        <DetailItem label="Channel" value="Mobile App" />
                        <DetailItem label="Last Updated" value="5 mins ago" />
                     </div>
                  </SectionCard>
                  <SectionCard title="Escalation History">
                     <div className="space-y-3">
                        <p className="text-[10px] text-muted-foreground uppercase font-black">Escalation Path</p>
                        <div className="p-3 bg-muted/30 rounded-lg border border-border/40 text-xs italic">No escalations recorded for this ticket.</div>
                     </div>
                  </SectionCard>
               </div>
            </div>
          </TabsContent>
        )}

        <TabsContent value="portal" className="outline-none">
           <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-1000">
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 flex items-center justify-between">
                 <div>
                    <h1 className="text-2xl font-black mb-1 tracking-tight text-primary">Hello, Amit Kumar</h1>
                    <p className="text-sm font-medium text-primary/70">Welcome to your Adzdrio Experience Portal.</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] uppercase font-black tracking-widest text-primary/50 mb-1">Status</p>
                    <Badge className="bg-primary text-primary-foreground font-bold">Premium Active</Badge>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                 <Card className="border-none shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-3 opacity-10"><Zap className="size-16" /></div>
                    <CardContent className="p-6">
                       <p className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-2">Subscription</p>
                       <p className="text-lg font-bold">Enterprise Gold</p>
                       <p className="text-3xl font-black my-4">342 <span className="text-sm font-medium text-white/40">Days Left</span></p>
                       <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold h-9">Manage Plan</Button>
                    </CardContent>
                 </Card>

                 <Card className="border-border/40 shadow-sm">
                    <CardContent className="p-6">
                       <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-4">Service Health</p>
                       <div className="flex flex-col items-center py-2">
                          <div className="size-16 rounded-full border-4 border-emerald-500/20 flex items-center justify-center mb-4">
                             <TrendingUp className="size-8 text-emerald-500" />
                          </div>
                          <p className="text-sm font-bold">All Systems Normal</p>
                          <p className="text-[10px] text-muted-foreground">Region: Bengaluru Hub</p>
                       </div>
                    </CardContent>
                 </Card>

                 <Card className="border-border/40 shadow-sm">
                    <CardContent className="p-6">
                       <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-4">Quick Links</p>
                       <div className="space-y-2">
                          <PortalLink label="View Invoices" icon={CreditCard} />
                          <PortalLink label="Support Tickets" icon={LifeBuoy} active />
                          <PortalLink label="Device Management" icon={Smartphone} />
                       </div>
                    </CardContent>
                 </Card>
              </div>

              <SectionCard title="Active Tickets (1)" actions={<Button variant="ghost" size="sm" className="font-bold">Raise New</Button>}>
                 <div className="p-4 rounded-xl border border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="size-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                          <AlertCircle className="size-5" />
                       </div>
                       <div>
                          <p className="text-sm font-bold">Streaming buffering on Smart TV</p>
                          <p className="text-[10px] text-muted-foreground">Ticket ID: TIC-2026-442 · Open</p>
                       </div>
                    </div>
                    <Button variant="outline" size="sm">View Progress</Button>
                 </div>
              </SectionCard>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function KpiCard({ title, value, trend, icon: Icon, variant = "default" }: { title: string, value: string, trend: string, icon: any, variant?: "default" | "danger" }) {
  return (
    <Card className="border-border/40 shadow-sm overflow-hidden relative group">
       <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
             <div className={cn(
                "size-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110",
                variant === "danger" ? "bg-rose-50 text-rose-600" : "bg-primary/10 text-primary"
             )}>
                <Icon className="size-5" />
             </div>
             <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                variant === "danger" ? "text-rose-600" : "text-primary"
             )}>{trend}</span>
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{title}</p>
          <p className="text-3xl font-black tracking-tight">{value}</p>
       </CardContent>
    </Card>
  );
}

function TeamMemberPerformance({ name, resolved, csat }: { name: string, resolved: number, csat: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border/40">
       <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-muted flex items-center justify-center font-bold text-[10px]">{name.split(' ').map(n => n[0]).join('')}</div>
          <span className="text-xs font-bold">{name}</span>
       </div>
       <div className="flex items-center gap-4">
          <div className="text-right">
             <p className="text-[10px] text-muted-foreground font-black uppercase">Res</p>
             <p className="text-xs font-bold">{resolved}</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] text-muted-foreground font-black uppercase">CSAT</p>
             <p className="text-xs font-bold text-emerald-600">{csat}</p>
          </div>
       </div>
    </div>
  );
}

function ChatMessage({ user, time, message, agent = false }: { user: string, time: string, message: string, agent?: boolean }) {
  return (
    <div className={cn("flex gap-4", agent ? "flex-row-reverse" : "flex-row")}>
       <Avatar className="size-10 shadow-sm shrink-0">
          <AvatarFallback className={cn("text-xs font-bold", agent ? "bg-primary text-primary-foreground" : "bg-slate-100")}>{user[0]}</AvatarFallback>
       </Avatar>
       <div className={cn(
          "flex flex-col max-w-[80%]",
          agent ? "items-end text-right" : "items-start text-left"
       )}>
          <div className="flex items-center gap-2 mb-1">
             <span className="text-xs font-black">{user}</span>
             <span className="text-[10px] text-muted-foreground">{time}</span>
          </div>
          <div className={cn(
             "p-4 rounded-2xl text-sm leading-relaxed border shadow-sm",
             agent ? "bg-primary text-primary-foreground border-primary" : "bg-white border-border/40"
          )}>
             {message}
          </div>
       </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-2">
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <span className="text-xs font-bold">{value}</span>
    </div>
  );
}

function PortalLink({ label, icon: Icon, active = false }: { label: string, icon: any, active?: boolean }) {
  return (
    <div className={cn(
       "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
       active ? "bg-primary/5 border-primary/30" : "bg-transparent border-border/40 hover:bg-muted/30"
    )}>
       <div className="flex items-center gap-3">
          <Icon className={cn("size-4", active ? "text-primary" : "text-muted-foreground")} />
          <span className={cn("text-xs font-bold", active ? "text-primary" : "text-foreground")}>{label}</span>
       </div>
       <ChevronRight className={cn("size-3.5", active ? "text-primary" : "text-muted-foreground")} />
    </div>
  );
}

const MOCK_SUPPORT_TIMELINE: TimelineItem[] = [
  {
    id: "1",
    type: "ticket_assigned",
    title: "Ticket assigned to Rahul S.",
    description: "System automatically assigned ticket based on Technical category and current workload.",
    timestamp: "12 mins ago",
    user: { name: "Adzdrio AI", initials: "AI" },
    category: "system"
  },
  {
    id: "2",
    type: "customer_message",
    title: "New message from customer",
    description: "Amit Kumar reported 4K streaming buffering issues on Samsung Smart TV.",
    timestamp: "15 mins ago",
    user: { name: "Amit Kumar", initials: "AK" },
    category: "crm"
  }
];

const MOCK_SUPPORT_AUDIT = [
  { id: "1", user: "Rahul S.", action: "UPDATE_STATUS", entity: "Ticket: TIC-2026-442", timestamp: "Aug 07, 2026 12:45 PM" },
  { id: "2", user: "System", action: "ASSIGN_AGENT", entity: "Ticket: TIC-2026-442", timestamp: "Aug 07, 2026 12:43 PM" }
];

const MOCK_SUPPORT_COMMENTS = [
  { id: "1", user: "Rahul S.", text: "Customer's region (Bengaluru) shows some peak load on Hub 4. Might be related.", timestamp: "10 mins ago" },
  { id: "2", user: "Priya V.", text: "Checked CDN health, looking normal. Likely a device-side cache issue.", timestamp: "5 mins ago" }
];

const Smartphone = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>;
