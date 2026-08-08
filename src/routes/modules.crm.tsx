import { createFileRoute } from "@tanstack/react-router";
import { 
  LayoutDashboard,
  UserPlus,
  Users,
  Building2,
  DollarSign,
  Calendar,
  CheckSquare,
  Phone,
  Video,
  Plus,
  Search,
  Filter,
  Kanban,
  Table as TableIcon,
  MoreHorizontal,
  ArrowUpRight,
  TrendingUp,
  Target,
  FileText,
  History,
  Tag,
  Download,
  Upload,
  ChevronRight,
  Star,
  MessageSquare,
  Paperclip,
  PieChart,
  BarChart3,
  TrendingDown,
  ArrowRight,
  Clock,
  CheckCircle2,
  LayoutGrid,
  Mail,
  Heart,
  AlertCircle,
  AlertTriangle,
  Send,
  ArrowLeft,
  User,
  Zap,
  Loader2,
  Database
} from "lucide-react";
import * as React from "react";
import { Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { UniversalActivityTimeline, TimelineItem } from "@/components/shared/UniversalActivityTimeline";
import { UniversalFileManager } from "@/components/shared/UniversalFileManager";
import { UniversalComments } from "@/components/shared/UniversalComments";
import { UniversalAuditLog } from "@/components/shared/UniversalAuditLog";
import { UniversalTag } from "@/components/shared/UniversalTag";
import { Customer360View } from "@/components/crm/Customer360View";
import { RapidConfirmationManager } from "@/components/crm/RapidConfirmationManager";
import { leadsService } from "@/lib/api/services";

export const Route = createFileRoute("/modules/crm")({
  component: SalesCRMModule,
});

function SalesCRMModule() {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [leads, setLeads] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadCRMData() {
      try {
        setLoading(true);
        const data = await leadsService.getAll();
        setLeads(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCRMData();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-700">
      <PageHeader
        eyebrow="Adzdrio Sales"
        title="CRM Command Center"
        description="Unified workspace for sales acceleration, deal management, and relationship intelligence."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass-surface h-9">
              <Download className="mr-2 size-3.5" />
              Import Leads
            </Button>
            <AddLeadDialog />
          </div>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="h-auto w-full justify-start gap-6 overflow-x-auto bg-transparent p-0 border-b border-border/40 rounded-none pb-0">
          <CRMTabTrigger value="dashboard" label="Sales Dashboard" icon={LayoutDashboard} />
          <CRMTabTrigger value="leads" label="Leads" icon={Target} />
          <CRMTabTrigger value="pipeline" label="Pipeline" icon={Kanban} />
          <CRMTabTrigger value="customers" label="Customer 360" icon={Users} />
          <CRMTabTrigger value="rapid-leads" label="Rapid Confirmation" icon={Zap} />
          <CRMTabTrigger value="renewals" label="Renewal Center" icon={History} />
          <CRMTabTrigger value="activities" label="Activity Hub" icon={CheckSquare} />
          <CRMTabTrigger value="performance" label="Performance" icon={TrendingUp} />
        </TabsList>

        <TabsContent value="dashboard" className="mt-0 space-y-6 outline-none">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardKpiCard title="Today's Revenue" value="₹12,45,000" trend="+14.2%" icon={DollarSign} />
            <DashboardKpiCard title="Today's Follow-ups" value="24" trend="3 pending" icon={Clock} trendNeutral />
            <DashboardKpiCard title="New Leads" value="18" trend="+8%" icon={Target} />
            <DashboardKpiCard title="Deals Won" value="4" trend="+2" icon={Star} />
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-6">
              <SectionCard title="Revenue Performance" description="Monthly progress vs target.">
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-border/50 rounded-xl bg-muted/5">
                   <BarChart3 className="size-10 text-muted-foreground/20 mr-2" />
                   <p className="text-xs text-muted-foreground italic tracking-tight">Financial metrics waiting for live data stream.</p>
                </div>
              </SectionCard>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionCard title="Today's Agenda" actions={<Button variant="ghost" size="sm">Go to Hub</Button>}>
                   <div className="space-y-4 py-2">
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-primary/5 border border-primary/10">
                        <Phone className="size-3.5 text-primary" />
                        <span className="text-xs font-medium">3 Follow-up calls pending</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 border border-border/40">
                        <Video className="size-3.5 text-muted-foreground" />
                        <span className="text-xs font-medium">No meetings scheduled today</span>
                      </div>
                   </div>
                </SectionCard>
                <SectionCard title="Recent Won Deals">
                   <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                      <TrendingUp className="size-8 opacity-10 mb-2" />
                      <p className="text-[10px] uppercase font-bold tracking-widest">No deals won today</p>
                   </div>
                </SectionCard>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <SectionCard title="Sales Leaderboard">
                <div className="space-y-4">
                   <p className="text-[10px] text-muted-foreground uppercase font-black mb-2">Top Performers (This Month)</p>
                   <div className="text-center py-10 opacity-30">
                      <Star className="size-10 mx-auto mb-2" />
                      <p className="text-xs italic">Awaiting first conversion...</p>
                   </div>
                </div>
              </SectionCard>

              <SectionCard title="Win Rate Analysis">
                <div className="flex flex-col items-center justify-center py-6">
                   <div className="relative size-24 flex items-center justify-center mb-4">
                      <svg className="size-full -rotate-90">
                        <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-border/40" />
                        <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="6" strokeDasharray={251} strokeDashoffset={251} className="text-primary" />
                      </svg>
                      <span className="absolute text-xl font-black">0%</span>
                   </div>
                   <p className="text-xs text-muted-foreground font-medium">Base Conversion Rate</p>
                </div>
              </SectionCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="mt-0 space-y-6 outline-none">
          <SectionCard
            title="Adzdrio Lead Directory"
            description="Premium lead tracking with AI-native scoring and status management."
            contentClassName="p-0"
            actions={
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input placeholder="Search leads..." className="w-[240px] h-9 pl-9 text-xs glass-surface" />
                </div>
                <Button variant="outline" size="sm" className="h-9 glass-surface">
                  <Filter className="mr-2 size-3.5" />
                  Advanced Filters
                </Button>
              </div>
            }
          >
            <div className="min-h-[500px]">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[280px]">Lead Entity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Expected Value</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Next Follow-up</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-40 text-center text-muted-foreground animate-pulse">
                        <Loader2 className="size-6 mx-auto mb-2 animate-spin opacity-20" />
                        Accessing Lead Directory...
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-40 text-center">
                        <Database className="size-6 mx-auto mb-2 text-destructive opacity-40" />
                        <p className="text-xs font-bold text-destructive">Backend Connection Required</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{error}</p>
                      </TableCell>
                    </TableRow>
                  ) : leads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-40 text-center text-muted-foreground italic">
                        No active leads found in this view.
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads.map((lead) => (
                      <TableRow key={lead.id} className="hover:bg-muted/5 cursor-pointer group">
                        {/* Map lead data here */}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="pipeline" className="mt-0 outline-none">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h2 className="text-xl font-black tracking-tight">Visual Pipeline</h2>
              <p className="text-xs text-muted-foreground font-medium">Standard Adzdrio Sales Stages</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="glass-surface h-9">
                <Tag className="mr-2 size-3.5" />
                Saved Views
              </Button>
              <Button size="sm" className="h-9 shadow-elevated">
                <Plus className="mr-2 size-3.5" />
                New Deal
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 {[
                   { label: "Prospect", icon: User, active: true },
                   { label: "Qualification", icon: CheckCircle2, active: true },
                   { label: "Callback", icon: Phone },
                   { label: "Follow-up", icon: History },
                   { label: "Payment", icon: DollarSign },
                   { label: "Verification", icon: FileText },
                   { label: "Activation", icon: Zap },
                   { label: "Customer", icon: Users }
                 ].map((step, idx, arr) => (
                   <React.Fragment key={step.label}>
                     <div className="flex flex-col items-center gap-2 group cursor-default">
                        <div className={cn(
                          "size-10 rounded-full flex items-center justify-center transition-all border-2 shadow-sm",
                          step.active ? "bg-primary border-primary text-primary-foreground shadow-primary/20" : "bg-background border-border text-muted-foreground"
                        )}>
                           <step.icon className="size-5" />
                        </div>
                        <span className={cn("text-[9px] font-black uppercase tracking-widest", step.active ? "text-primary" : "text-muted-foreground/60")}>{step.label}</span>
                     </div>
                     {idx < arr.length - 1 && <ArrowRight className="size-4 text-border mb-6" />}
                   </React.Fragment>
                 ))}
              </div>
            </div>

            <ScrollArea className="w-full pb-6">
              <div className="flex gap-4 min-h-[600px]">
                <KanbanColumn title="New" value="0" />
                <KanbanColumn title="Contacted" value="1" />
                <KanbanColumn title="Qualified" value="1" />
                <KanbanColumn title="Proposal" value="0" />
                <KanbanColumn title="Negotiation" value="0" />
                <KanbanColumn title="Won" value="0" tone="success" />
              </div>
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-0 outline-none">
          <Customer360View />
        </TabsContent>

        <TabsContent value="rapid-leads" className="mt-0 outline-none">
          <RapidConfirmationManager />
        </TabsContent>

        <TabsContent value="renewals" className="mt-0 outline-none">
          <RenewalCenter />
        </TabsContent>

        <TabsContent value="activities" className="mt-0 outline-none">
           <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-6">
                 <SectionCard title="Schedule Activity" contentClassName="p-0">
                    <div className="divide-y divide-border/40">
                       <ActivityActionItem icon={Phone} label="Log Call" />
                       <ActivityActionItem icon={Video} label="Schedule Meeting" />
                       <ActivityActionItem icon={CheckSquare} label="Create Task" />
                       <ActivityActionItem icon={MessageSquare} label="Set Follow-up" />
                    </div>
                 </SectionCard>
              </div>
              <div className="lg:col-span-8">
                 <SectionCard title="Agenda / Calendar View">
                    <Tabs defaultValue="list">
                       <TabsList className="glass-surface h-8 p-0.5 mb-6">
                          <TabsTrigger value="list" className="text-[10px] h-7 px-3">Agenda View</TabsTrigger>
                          <TabsTrigger value="calendar" className="text-[10px] h-7 px-3">Calendar View</TabsTrigger>
                       </TabsList>
                       <TabsContent value="list">
                          <EmptyState 
                            icon={Calendar} 
                            title="Agenda Clear" 
                            description="No tasks or meetings scheduled for the upcoming week." 
                            className="py-20 border-none shadow-none surface-none"
                          />
                       </TabsContent>
                    </Tabs>
                 </SectionCard>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-0 outline-none">
           <SectionCard title="Sales Intelligence Hub">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
                    <TrendingUp className="size-6 text-primary mb-2" />
                    <h4 className="text-sm font-black">Conversion Analytics</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">AI-driven analysis of your sales funnel and lead conversion performance.</p>
                 </div>
                 <div className="p-6 rounded-2xl bg-success/5 border border-success/10 flex flex-col gap-2">
                    <CheckCircle2 className="size-6 text-success mb-2" />
                    <h4 className="text-sm font-black">Win Rate Metrics</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Strategic tracking of won vs lost deals across different sales stages.</p>
                 </div>
                 <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10 flex flex-col gap-2">
                    <LayoutGrid className="size-6 text-accent-foreground mb-2" />
                    <h4 className="text-sm font-black">Sales Velocity</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Measurement of how quickly deals move through your sales pipeline.</p>
                 </div>
              </div>
           </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CRMTabTrigger({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return (
    <TabsTrigger 
      value={value} 
      className="rounded-none border-b-2 border-transparent px-1 py-4 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none flex items-center gap-2.5 opacity-60 data-[state=active]:opacity-100 transition-all"
    >
      <Icon className="size-3.5" />
      {label}
    </TabsTrigger>
  );
}

function DashboardKpiCard({ title, value, trend, icon: Icon, trendNeutral }: { title: string; value: string; trend: string; icon: any; trendNeutral?: boolean }) {
  return (
    <Card className="border-border/40 shadow-card glass-surface hover:shadow-elevated premium-transition overflow-hidden group border-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
            <Icon className="size-5 text-primary" />
          </div>
          <Badge variant="outline" className={cn(
            "text-[9px] font-black uppercase tracking-tighter px-2 h-5",
            trendNeutral ? "text-muted-foreground border-border/60" : "text-success border-success/30 bg-success/5"
          )}>{trend}</Badge>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">{title}</p>
          <p className="text-2xl font-black tracking-tighter mt-1 text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function KanbanColumn({ title, value, tone }: { title: string; value: string; tone?: string }) {
  return (
    <div className="flex flex-col gap-4 w-[280px] shrink-0 rounded-2xl bg-muted/20 p-4 border border-border/40 glass-surface">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">{title}</h4>
        <Badge variant="secondary" className="text-[10px] font-black bg-background/80 backdrop-blur-sm px-2 h-5 ring-1 ring-border/20">{value}</Badge>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border/30 rounded-xl p-8 text-center bg-card/10 group hover:border-primary/20 transition-all hover:bg-card/30">
        <div className="size-12 rounded-2xl bg-background/50 flex items-center justify-center mb-4 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          <Plus className="size-5 text-muted-foreground/40 group-hover:text-inherit transition-colors" />
        </div>
        <p className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-widest">No Active Deals</p>
      </div>
    </div>
  );
}

function ActivityActionItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-all cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-background border border-border/60 group-hover:border-primary/30 group-hover:text-primary transition-all">
          <Icon className="size-4" />
        </div>
        <span className="text-xs font-bold tracking-tight">{label}</span>
      </div>
      <ArrowRight className="size-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </div>
  );
}

function AddLeadDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 shadow-elevated">
          <UserPlus className="mr-2 size-3.5" />
          Add Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl glass-surface border-border/40 shadow-elevated">
        <DialogHeader>
          <DialogTitle className="text-xl font-black tracking-tight">New Enterprise Lead</DialogTitle>
          <DialogDescription className="text-xs font-medium">
            Register a new business opportunity into the Adzdrio Sales Ecosystem.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Lead Entity Name</Label>
              <Input placeholder="Legal name of contact or company" className="h-10 glass-surface" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Sales Owner</Label>
              <Select>
                <SelectTrigger className="h-10 glass-surface">
                  <SelectValue placeholder="Assign account owner" />
                </SelectTrigger>
                <SelectContent>
                   <SelectItem value="me">Assigned to Me</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Lead Source</Label>
              <Select>
                <SelectTrigger className="h-10 glass-surface">
                  <SelectValue placeholder="How did they find us?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Website Inquiry</SelectItem>
                  <SelectItem value="linkedin">LinkedIn Ads</SelectItem>
                  <SelectItem value="referral">Direct Referral</SelectItem>
                  <SelectItem value="cold">Cold Outreach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Est. Annual Value (INR)</Label>
              <Input type="number" placeholder="₹ 0.00" className="h-10 glass-surface" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Engagement Notes</Label>
            <Input placeholder="Initial discovery highlights..." className="h-10 glass-surface" />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" className="h-10 glass-surface font-bold text-xs uppercase tracking-widest">Discard</Button>
          <Button className="h-10 shadow-elevated font-bold text-xs uppercase tracking-widest">Register Lead</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Customer360View() {
  const [selectedCustomer, setSelectedCustomer] = React.useState<string | null>("cust-1");

  if (!selectedCustomer) {
    return (
      <SectionCard title="Customer Directory">
        <EmptyState 
          icon={Users} 
          title="No customer selected" 
          description="Select a customer from the directory to view their 360 overview." 
          className="py-24 border-none shadow-none surface-none"
        />
      </SectionCard>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <SectionCard title="Customer Identity" contentClassName="p-0">
          <div className="p-6 text-center border-b border-border/40">
            <Avatar className="size-20 mx-auto mb-4 border-2 border-primary/20 p-1">
              <AvatarImage src="" />
              <AvatarFallback className="text-xl font-black bg-primary/10 text-primary">DS</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-black tracking-tight">Deemand Solutions</h3>
            <p className="text-xs text-muted-foreground font-medium">Subscription: Premium Enterprise</p>
            <div className="flex justify-center gap-2 mt-4">
              <UniversalTag label="Active" color="emerald" />
              <UniversalTag label="High Value" color="blue" />
            </div>
          </div>
          <div className="p-4 space-y-4">
             <InfoItem label="Customer ID" value="CUST-8829" />
             <InfoItem label="Industry" value="Media & Entertainment" />
             <InfoItem label="Location" value="Mumbai, MH" />
             <InfoItem label="Joined" value="Jan 12, 2025" />
          </div>
        </SectionCard>

        <SectionCard title="Subscription Lifecycle" contentClassName="p-4 space-y-4">
           <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Plan</span>
                <Badge variant="outline" className="text-[10px] font-black border-primary/30 text-primary bg-primary/5">GOLD-ULTRA</Badge>
              </div>
              <InfoItem label="Expiry Date" value="Jan 12, 2027" />
              <InfoItem label="Renewal Date" value="Dec 12, 2026" />
              <InfoItem label="Devices" value="15 / 20 Used" />
              <div className="pt-2 border-t border-border/40 space-y-2">
                 <Button variant="outline" size="sm" className="w-full text-[10px] h-8 font-black uppercase tracking-widest glass-surface">Upgrade / Downgrade</Button>
                 <Button variant="ghost" size="sm" className="w-full text-[10px] h-8 font-black uppercase tracking-widest opacity-60">Disable Auto-Renewal</Button>
              </div>
           </div>
        </SectionCard>
      </div>

      <div className="lg:col-span-9 space-y-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-transparent border-b border-border/40 w-full justify-start rounded-none p-0 mb-6 gap-6 overflow-x-auto">
            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent px-1 pb-3 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none opacity-60 data-[state=active]:opacity-100 transition-all">Overview</TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-none border-b-2 border-transparent px-1 pb-3 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none opacity-60 data-[state=active]:opacity-100 transition-all">Timeline</TabsTrigger>
            <TabsTrigger value="communication" className="rounded-none border-b-2 border-transparent px-1 pb-3 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none opacity-60 data-[state=active]:opacity-100 transition-all">Communication</TabsTrigger>
            <TabsTrigger value="docs" className="rounded-none border-b-2 border-transparent px-1 pb-3 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none opacity-60 data-[state=active]:opacity-100 transition-all">Documents</TabsTrigger>
            <TabsTrigger value="billing" className="rounded-none border-b-2 border-transparent px-1 pb-3 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none opacity-60 data-[state=active]:opacity-100 transition-all">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <DashboardKpiCard title="LTV" value="₹ 4,50,000" trend="+12%" icon={DollarSign} />
               <DashboardKpiCard title="Support Tickets" value="2" trend="Pending" icon={AlertCircle} trendNeutral />
               <DashboardKpiCard title="NPS Score" value="9.2" trend="Excellent" icon={Heart} />
            </div>
            
            <SectionCard title="Recent Activity" actions={<Button variant="ghost" size="sm">Log Note</Button>}>
               <UniversalComments comments={[]} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="timeline" className="outline-none">
            <SectionCard title="Customer Journey Timeline">
               <UniversalActivityTimeline items={mockTimelineItems} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="communication" className="outline-none">
             <SectionCard title="Interaction History">
                <div className="space-y-4">
                   <div className="p-4 rounded-xl border border-border/40 glass-surface flex items-start gap-4">
                      <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                         <Phone className="size-4" />
                      </div>
                      <div className="space-y-1">
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Call Log</span>
                            <span className="text-[10px] text-muted-foreground">• 2 days ago</span>
                         </div>
                         <p className="text-sm font-bold">Quarterly Business Review Call</p>
                         <p className="text-xs text-muted-foreground">Discussed expansion of subscription seats for the next quarter. Client requested a demo of the new AI features.</p>
                      </div>
                   </div>
                   <div className="p-4 rounded-xl border border-border/40 glass-surface flex items-start gap-4">
                      <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                         <Mail className="size-4" />
                      </div>
                      <div className="space-y-1">
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</span>
                            <span className="text-[10px] text-muted-foreground">• Last Week</span>
                         </div>
                         <p className="text-sm font-bold">New Policy Updates Acknowledged</p>
                         <p className="text-xs text-muted-foreground">Confirmed receipt of the updated enterprise service level agreement.</p>
                      </div>
                   </div>
                </div>
             </SectionCard>
          </TabsContent>

          <TabsContent value="docs" className="outline-none">
             <UniversalFileManager />
          </TabsContent>

          <TabsContent value="billing" className="outline-none">
             <SectionCard title="Financial Workflow & History">
                <div className="space-y-6">
                   <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center gap-4 text-center">
                      <div className="flex items-center gap-4">
                         <div className="flex flex-col items-center gap-1">
                            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg"><Star className="size-5" /></div>
                            <span className="text-[9px] font-black uppercase">Deal Won</span>
                         </div>
                         <ArrowRight className="size-4 text-primary opacity-40" />
                         <div className="flex flex-col items-center gap-1">
                            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg"><FileText className="size-5" /></div>
                            <span className="text-[9px] font-black uppercase">Invoice</span>
                         </div>
                         <ArrowRight className="size-4 text-primary opacity-40" />
                         <div className="flex flex-col items-center gap-1">
                            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg"><DollarSign className="size-5" /></div>
                            <span className="text-[9px] font-black uppercase">Payment</span>
                         </div>
                         <ArrowRight className="size-4 text-primary opacity-40" />
                         <div className="flex flex-col items-center gap-1">
                            <div className="size-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg"><TrendingUp className="size-5" /></div>
                            <span className="text-[9px] font-black uppercase">Revenue</span>
                         </div>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium max-w-sm">This visual workflow represents the conversion of sales successes into recognized financial growth.</p>
                   </div>
                   
                   <UniversalAuditLog entries={[]} />
                </div>
             </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function RenewalCenter() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <RenewalKpiCard title="Upcoming (30d)" value="12" tone="info" />
        <RenewalKpiCard title="Renewing Today" value="2" tone="warning" />
        <RenewalKpiCard title="Expired (Last 7d)" value="1" tone="danger" />
        <RenewalKpiCard title="Renewal Revenue" value="₹ 8,40,000" tone="success" />
      </div>

      <SectionCard 
        title="Renewal Queue" 
        description="Manage upcoming customer subscription renewals and priority engagement."
        contentClassName="p-0"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest glass-surface">Export List</Button>
          </div>
        }
      >
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[200px]">Customer</TableHead>
              <TableHead>Renewal Date</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Sales Executive</TableHead>
              <TableHead>Reminder Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-muted/5 group">
              <TableCell className="font-bold">Deemand Solutions</TableCell>
              <TableCell className="text-xs font-medium">Dec 12, 2026</TableCell>
              <TableCell><Badge variant="outline" className="text-[9px] font-black border-primary/30">GOLD-ULTRA</Badge></TableCell>
              <TableCell><UniversalTag label="Critical" color="rose" /></TableCell>
              <TableCell className="text-xs">Alex Salesman</TableCell>
              <TableCell><StatusBadge tone="success">Sent</StatusBadge></TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase tracking-widest">Process</Button>
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-muted/5 group">
              <TableCell className="font-bold">Acme Corp</TableCell>
              <TableCell className="text-xs font-medium">Aug 12, 2026</TableCell>
              <TableCell><Badge variant="outline" className="text-[9px] font-black border-slate-300">STANDARD</Badge></TableCell>
              <TableCell><UniversalTag label="Medium" color="amber" /></TableCell>
              <TableCell className="text-xs">Sara Manager</TableCell>
              <TableCell><StatusBadge tone="warning">Pending</StatusBadge></TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase tracking-widest">Process</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}

function RenewalKpiCard({ title, value, tone }: { title: string; value: string; tone: "info" | "warning" | "danger" | "success" }) {
  const tones = {
    info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  return (
    <div className={cn("p-4 rounded-2xl border glass-surface", tones[tone])}>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">{title}</p>
      <p className="text-xl font-black tracking-tight">{value}</p>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-xs font-bold">{value}</span>
    </div>
  );
}

const mockTimelineItems: TimelineItem[] = [
  {
    id: "1",
    type: "LEAD_CREATED",
    title: "converted to Enterprise Lead",
    description: "Lead entity registered via LinkedIn marketing campaign.",
    timestamp: "Jan 01, 2025",
    user: { name: "System Admin", initials: "SA" },
    category: "crm"
  },
  {
    id: "2",
    type: "FOLLOW_UP",
    title: "Discovery Call Completed",
    description: "Initial discovery call with CTO regarding digital transformation goals.",
    timestamp: "Jan 05, 2025",
    user: { name: "Alex Salesman", initials: "AS" },
    category: "crm"
  },
  {
    id: "3",
    type: "PROPOSAL",
    title: "Enterprise Proposal Sent",
    description: "Proposal version 1.2 sent for internal review by client board.",
    timestamp: "Jan 08, 2025",
    user: { name: "Alex Salesman", initials: "AS" },
    category: "crm"
  },
  {
    id: "4",
    type: "INVOICE",
    title: "First Installment Invoiced",
    description: "Invoice #INV-2025-001 generated for activation fee.",
    timestamp: "Jan 10, 2025",
    user: { name: "Finance System", initials: "FS" },
    category: "finance"
  },
  {
    id: "5",
    type: "PAYMENT",
    title: "Payment Received",
    description: "Full payment for invoice #INV-2025-001 confirmed via NEFT.",
    timestamp: "Jan 12, 2025",
    user: { name: "Finance System", initials: "FS" },
    category: "finance"
  },
  {
    id: "6",
    type: "ACTIVATION",
    title: "Subscription Activated",
    description: "Enterprise workspace activated for 20 seats.",
    timestamp: "Jan 12, 2025",
    user: { name: "Provisioning Bot", initials: "PB" },
    category: "system"
  }
];

// (Removed redundant duplicate imports)


