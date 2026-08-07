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
  Paperclip
} from "lucide-react";
import * as React from "react";

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
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/modules/crm")({
  component: CRMModule,
});

function CRMModule() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        eyebrow="Business Operations"
        title="CRM"
        description="Unified relationship management, deal tracking, and revenue operations workspace."
        actions={
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 mr-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="size-7 rounded-full border-2 border-background bg-muted overflow-hidden">
                  <div className="flex size-full items-center justify-center text-[10px] font-bold">U</div>
                </div>
              ))}
              <div className="flex size-7 items-center justify-center rounded-full border-2 border-background bg-accent text-[10px] font-bold text-accent-foreground">+2</div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 size-3.5" />
              Export
            </Button>
            <AddLeadDialog />
          </div>
        }
      />

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="h-auto w-full justify-start gap-4 overflow-x-auto bg-transparent p-0 border-b border-border/40 rounded-none">
          <CRMTabTrigger value="dashboard" label="Dashboard" icon={LayoutDashboard} />
          <CRMTabTrigger value="leads" label="Leads" icon={Target} />
          <CRMTabTrigger value="contacts" label="Contacts" icon={Users} />
          <CRMTabTrigger value="companies" label="Companies" icon={Building2} />
          <CRMTabTrigger value="deals" label="Deals" icon={DollarSign} />
          <CRMTabTrigger value="activities" label="Activities" icon={CheckSquare} />
        </TabsList>

        <TabsContent value="dashboard" className="mt-0 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="New Leads" value="0" trend="+0%" icon={Target} />
            <KpiCard title="Pipeline Value" value="₹0.00" trend="+0%" icon={TrendingUp} />
            <KpiCard title="Won Deals" value="0" trend="+0%" icon={ArrowUpRight} />
            <KpiCard title="Conversion Rate" value="0%" trend="+0%" icon={Star} />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <SectionCard title="Revenue Forecast" description="Expected revenue over the next 6 months." className="lg:col-span-2">
              <div className="flex h-[300px] items-center justify-center border-2 border-dashed border-border/50 rounded-lg">
                <p className="text-sm text-muted-foreground italic">No historical data to generate forecast.</p>
              </div>
            </SectionCard>
            <SectionCard title="Recent Activities" description="Updates from your sales team.">
              <EmptyState 
                icon={History} 
                title="No recent activity" 
                description="Your team's interactions will appear here." 
                className="surface-none border-none shadow-none py-12"
              />
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="mt-0 space-y-6">
          <SectionCard
            title="Lead Management"
            description="Track and qualify potential business opportunities."
            contentClassName="p-0"
            actions={
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-muted/30 border border-border rounded-md p-1 mr-2">
                  <Button variant="ghost" size="icon" className="size-7 bg-background shadow-sm">
                    <TableIcon className="size-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-7">
                    <Kanban className="size-3.5" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Filter leads..." className="w-[200px] h-8 pl-9 text-xs" />
                </div>
              </div>
            }
          >
            <div className="min-h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} className="h-64">
                      <EmptyState 
                        icon={Target} 
                        title="Lead bucket is empty" 
                        description="Start by importing or manually adding your sales leads." 
                        className="surface-none border-none shadow-none"
                        action={<AddLeadDialog />}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="deals" className="mt-0">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold">Sales Pipeline</h2>
              <p className="text-xs text-muted-foreground italic">Drag and drop deals to advance them through stages.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm"><Tag className="mr-2 size-3.5" /> Filter Stages</Button>
              <Button size="sm"><Plus className="mr-2 size-3.5" /> New Deal</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-4 min-h-[600px] pb-4">
            <PipelineColumn title="Qualification" value="₹0" />
            <PipelineColumn title="Needs Analysis" value="₹0" />
            <PipelineColumn title="Proposal" value="₹0" />
            <PipelineColumn title="Negotiation" value="₹0" />
            <PipelineColumn title="Closed" value="₹0" />
          </div>
        </TabsContent>
        
        <TabsContent value="contacts" className="mt-0">
          <SectionCard title="Contact Directory" description="Individual relationships within your CRM ecosystem.">
            <EmptyState 
              icon={Users} 
              title="No contacts found" 
              description="Your individual contact records will appear here." 
              className="py-20 surface-none border-none shadow-none"
              action={<Button variant="outline" size="sm"><Plus className="mr-2 size-3.5" /> Add Contact</Button>}
            />
          </SectionCard>
        </TabsContent>

        <TabsContent value="companies" className="mt-0">
          <SectionCard title="Company Directory" description="Enterprise-level accounts and organizational profiles.">
            <EmptyState 
              icon={Building2} 
              title="No companies registered" 
              description="Manage business entities and their associated contacts." 
              className="py-20 surface-none border-none shadow-none"
              action={<Button variant="outline" size="sm"><Plus className="mr-2 size-3.5" /> Add Company</Button>}
            />
          </SectionCard>
        </TabsContent>

        <TabsContent value="activities" className="mt-0">
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="space-y-4">
              <SectionCard title="Plan Activities" description="Filter by type.">
                <div className="space-y-2">
                  <ActivityFilterItem icon={Phone} label="Calls" count={0} />
                  <ActivityFilterItem icon={Video} label="Meetings" count={0} />
                  <ActivityFilterItem icon={CheckSquare} label="Tasks" count={0} />
                  <ActivityFilterItem icon={MessageSquare} label="Follow Ups" count={0} />
                </div>
              </SectionCard>
            </div>
            <div className="lg:col-span-3">
              <SectionCard title="Agenda" description="Scheduled sales activities and tasks.">
                <EmptyState 
                  icon={Calendar} 
                  title="Empty agenda" 
                  description="Nothing scheduled for today. Focus on your leads!" 
                  className="py-20 surface-none border-none shadow-none"
                />
              </SectionCard>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CRMTabTrigger({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return (
    <TabsTrigger 
      value={value} 
      className="rounded-none border-b-2 border-transparent px-1 py-3 text-xs font-bold uppercase tracking-wider data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none flex items-center gap-2"
    >
      <Icon className="size-3.5" />
      {label}
    </TabsTrigger>
  );
}

function KpiCard({ title, value, trend, icon: Icon }: { title: string; value: string; trend: string; icon: any }) {
  return (
    <Card className="border-border/40 shadow-sm glass-surface hover:shadow-md premium-transition overflow-hidden group">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
            <Icon className="size-5 text-primary" />
          </div>
          <Badge variant="outline" className="text-[10px] font-bold text-success border-success/30 bg-success/5 px-2">{trend}</Badge>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">{title}</p>
          <p className="text-2xl font-extrabold tracking-tight mt-1 text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PipelineColumn({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-muted/20 p-4 border border-border/40 glass-surface">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">{title}</h4>
        <Badge variant="secondary" className="text-[10px] bg-background/50 backdrop-blur-sm px-2">{value}</Badge>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border/30 rounded-xl p-8 text-center bg-card/20 group hover:border-primary/20 transition-colors">
        <div className="size-12 rounded-2xl bg-background/50 flex items-center justify-center mb-3 shadow-sm group-hover:bg-primary/5 transition-colors">
          <Plus className="size-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
        </div>
        <p className="text-[11px] text-muted-foreground/60 font-bold uppercase tracking-tight">Empty Stage</p>
      </div>
    </div>
  );
}

function ActivityFilterItem({ icon: Icon, label, count }: { icon: any; label: string; count: number }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group">
      <div className="flex items-center gap-2.5">
        <div className="flex size-7 items-center justify-center rounded-md bg-background border border-border group-hover:border-primary/30 group-hover:text-primary transition-all">
          <Icon className="size-3.5" />
        </div>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <span className="text-[10px] font-bold text-muted-foreground">{count}</span>
    </div>
  );
}

function AddLeadDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <UserPlus className="mr-2 size-3.5" />
          Add Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Sales Lead</DialogTitle>
          <DialogDescription>
            Enter details for a new business opportunity.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Lead Name</Label>
              <Input placeholder="Enter contact name" />
            </div>
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input placeholder="Enter legal company name" />
            </div>
            <div className="space-y-2">
              <Label>Lead Source</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Website Inquiry</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="cold">Cold Outreach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estimated Value (INR)</Label>
              <Input type="number" placeholder="0.00" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Input placeholder="Add any initial discovery notes..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Lead</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
