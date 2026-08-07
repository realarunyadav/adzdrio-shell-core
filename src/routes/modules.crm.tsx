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
  LayoutGrid
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
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/modules/crm")({
  component: SalesCRMModule,
});

function SalesCRMModule() {
  const [activeTab, setActiveTab] = React.useState("dashboard");

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
          <CRMTabTrigger value="renewals" label="Renewal Center" icon={History} />
          <CRMTabTrigger value="activities" label="Activity Hub" icon={CheckSquare} />
          <CRMTabTrigger value="performance" label="Performance" icon={TrendingUp} />
        </TabsList>

        <TabsContent value="dashboard" className="mt-0 space-y-6 outline-none">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardKpiCard title="Today's Revenue" value="₹0.00" trend="+0%" icon={DollarSign} />
            <DashboardKpiCard title="Today's Follow-ups" value="0" trend="0 pending" icon={Clock} trendNeutral />
            <DashboardKpiCard title="New Leads" value="0" trend="+0%" icon={Target} />
            <DashboardKpiCard title="Deals Won" value="0" trend="+0%" icon={Star} />
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
                  <TableRow className="hover:bg-muted/5 cursor-pointer group">
                    <TableCell>
                      <Link to="/modules/leads" className="flex items-center gap-3">
                         <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-[10px]">AC</div>
                         <div>
                            <p className="text-xs font-bold group-hover:text-primary transition-colors">Acme Corp</p>
                            <p className="text-[10px] text-muted-foreground">John Doe · LinkedIn</p>
                         </div>
                      </Link>
                    </TableCell>
                    <TableCell><StatusBadge tone="info">Contacted</StatusBadge></TableCell>
                    <TableCell><Badge variant="secondary" className="text-[9px] font-black uppercase">High</Badge></TableCell>
                    <TableCell className="font-medium text-xs">₹ 50,00,000</TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2">
                          <span className="text-xs font-black">85</span>
                          <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                             <div className="h-full bg-success w-[85%]" />
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="text-xs font-medium">Aug 12, 2026</TableCell>
                    <TableCell className="text-right">
                       <Button size="icon" variant="ghost" className="size-7"><MoreHorizontal className="size-3.5" /></Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7} className="h-64">
                      <EmptyState 
                        icon={Target} 
                        title="Search yields no results" 
                        description="Try adjusting your filters or adding a new lead." 
                        className="surface-none border-none shadow-none py-12"
                      />
                    </TableCell>
                  </TableRow>
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
          
          <ScrollArea className="w-full pb-6">
            <div className="flex gap-4 min-h-[600px]">
              <KanbanColumn title="New" value="0" />
              <KanbanColumn title="Contacted" value="0" />
              <KanbanColumn title="Qualified" value="0" />
              <KanbanColumn title="Proposal" value="0" />
              <KanbanColumn title="Negotiation" value="0" />
              <KanbanColumn title="Won" value="0" tone="success" />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="customers" className="mt-0 outline-none">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="space-y-6">
                 <SectionCard title="Customer Insights">
                    <div className="space-y-4">
                       <div className="p-3 rounded-lg glass-surface border border-border/40">
                          <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Total Active Customers</p>
                          <p className="text-lg font-black tracking-tighter">0</p>
                       </div>
                       <div className="p-3 rounded-lg glass-surface border border-border/40">
                          <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Customer Retention</p>
                          <p className="text-lg font-black tracking-tighter">0%</p>
                       </div>
                    </div>
                 </SectionCard>
              </div>
              <div className="lg:col-span-3">
                 <SectionCard title="Customer 360 Directory">
                    <EmptyState 
                      icon={Users} 
                      title="No customers yet" 
                      description="Customers will appear here once leads are converted." 
                      className="py-24 border-none shadow-none surface-none"
                    />
                 </SectionCard>
              </div>
           </div>
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

import { ScrollArea } from "@/components/ui/scroll-area";
