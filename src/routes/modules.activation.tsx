import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {
  Rocket,
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
  Zap,
  Tag,
  History,
  ShieldCheck,
  Smartphone,
  Laptop,
  Monitor,
  Tv,
  Tablet,
  Box,
  CreditCard,
  MessageSquare,
  FileSearch,
  Settings,
  Headphones,
  CheckSquare,
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
import { UniversalTag } from "@/components/shared/UniversalTag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/modules/activation")({
  component: ActivationModule,
});

function ActivationModule() {
  const [activeTab, setActiveTab] = React.useState("queue");
  const [selectedActivation, setSelectedActivation] = React.useState<any>(null);

  const handleActivationClick = (activation: any) => {
    setSelectedActivation(activation);
    setActiveTab("detail");
  };

  const MOCK_ACTIVATIONS = [
    {
      id: "SALE-2026-001",
      customer: "Deemand Solutions",
      plan: "Enterprise Premium",
      paymentStatus: "Verified",
      activationStatus: "In Progress",
      priority: "High",
      sla: "04:30:00",
      executive: "Amit Jain",
      created: "Aug 07, 10:00 AM",
      expected: "Aug 07, 04:00 PM"
    },
    {
      id: "SALE-2026-005",
      customer: "Acme Global",
      plan: "Standard Plan",
      paymentStatus: "Verified",
      activationStatus: "Pending",
      priority: "Medium",
      sla: "08:15:00",
      executive: "Sarah Williams",
      created: "Aug 07, 11:30 AM",
      expected: "Aug 07, 07:30 PM"
    }
  ];

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-700">
      <PageHeader
        eyebrow="Operations"
        title="Activation Workspace"
        description="Unified queue for enterprise onboarding, device provisioning and SLA compliance."
        actions={
          <Button size="sm" className="shadow-elevated h-9">
            <Plus className="mr-2 size-3.5" />
            New Activation
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="border-b border-border/40 pb-0 gap-6 w-full justify-start rounded-none bg-transparent p-0 h-auto">
          <TabsTrigger value="queue" className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Activation Queue
          </TabsTrigger>
          {selectedActivation && (
            <TabsTrigger value="detail" className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              Detail: {selectedActivation.id}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="queue" className="outline-none">
          <SectionCard title="Active Activations" contentClassName="p-0">
            <div className="p-4 border-b border-border/40 flex items-center justify-between">
              <div className="relative group">
                <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search activations by ID or Customer..." className="w-[350px] h-9 pl-9 text-xs" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 size-3.5" /> Filter
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>Sale ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>SLA Countdown</TableHead>
                  <TableHead>Executive</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_ACTIVATIONS.map((act) => (
                  <TableRow 
                    key={act.id} 
                    className="hover:bg-muted/5 cursor-pointer group"
                    onClick={() => handleActivationClick(act)}
                  >
                    <TableCell className="font-medium text-xs text-primary group-hover:underline">{act.id}</TableCell>
                    <TableCell>
                      <p className="text-xs font-bold">{act.customer}</p>
                    </TableCell>
                    <TableCell className="text-xs">{act.plan}</TableCell>
                    <TableCell>
                      <StatusBadge tone="success">{act.paymentStatus}</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge tone={act.activationStatus === "In Progress" ? "info" : "warning"}>
                        {act.activationStatus}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        "text-[9px] uppercase font-black",
                        act.priority === "High" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-amber-50 text-amber-600 border-amber-100"
                      )}>
                        {act.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-bold font-mono text-rose-600">
                      {act.sla}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                          {act.executive.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-medium">{act.executive}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" className="size-8">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </TabsContent>

        {selectedActivation && (
          <TabsContent value="detail" className="outline-none space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("queue")}>
                  <ArrowRight className="rotate-180 mr-2 size-3.5" /> Back
                </Button>
                <h2 className="text-xl font-black tracking-tight">{selectedActivation.customer} <span className="text-muted-foreground font-medium">({selectedActivation.id})</span></h2>
                <StatusBadge tone="info">{selectedActivation.activationStatus}</StatusBadge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-9">
                  <Headphones className="mr-2 size-3.5" /> Support Handover
                </Button>
                <Button size="sm" className="h-9">Complete Activation</Button>
              </div>
            </div>

            <SectionCard title="Activation Lifecycle">
              <div className="relative pt-6 pb-2">
                <div className="absolute left-0 right-0 top-[42px] h-0.5 bg-border/40" />
                <div className="relative flex justify-between items-start">
                  {[
                    { label: "Payment Received", status: "completed" },
                    { label: "Payment Verified", status: "completed" },
                    { label: "Sale Created", status: "completed" },
                    { label: "Executive Assigned", status: "completed" },
                    { label: "In Progress", status: "current" },
                    { label: "Activated", status: "pending" },
                    { label: "Support Handover", status: "pending" },
                    { label: "Completed", status: "pending" }
                  ].map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3 z-10 w-full">
                      <div className={cn(
                        "size-8 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                        step.status === "completed" ? "bg-primary border-primary text-primary-foreground" :
                        step.status === "current" ? "bg-background border-primary text-primary animate-pulse" :
                        "bg-background border-border text-muted-foreground"
                      )}>
                        {step.status === "completed" ? <CheckCircle2 className="size-4" /> : <div className="size-2 rounded-full bg-current" />}
                      </div>
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-wider text-center max-w-[80px]",
                        step.status === "pending" ? "text-muted-foreground/60" : "text-foreground"
                      )}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-muted/50 p-1 rounded-xl h-10 w-full justify-start overflow-x-auto">
                <TabsTrigger value="overview" className="text-xs h-8 px-4 rounded-lg">Overview</TabsTrigger>
                <TabsTrigger value="customer" className="text-xs h-8 px-4 rounded-lg">Customer</TabsTrigger>
                <TabsTrigger value="subscription" className="text-xs h-8 px-4 rounded-lg">Subscription</TabsTrigger>
                <TabsTrigger value="devices" className="text-xs h-8 px-4 rounded-lg">Devices</TabsTrigger>
                <TabsTrigger value="checklist" className="text-xs h-8 px-4 rounded-lg">Checklist</TabsTrigger>
                <TabsTrigger value="files" className="text-xs h-8 px-4 rounded-lg">Files</TabsTrigger>
                <TabsTrigger value="timeline" className="text-xs h-8 px-4 rounded-lg">Timeline</TabsTrigger>
                <TabsTrigger value="audit" className="text-xs h-8 px-4 rounded-lg">Audit Log</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="overview" className="mt-0 outline-none space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="border-border/40 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">SLA Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-black text-rose-600">04:28:45</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Time remaining for activation</p>
                      </CardContent>
                    </Card>
                    <Card className="border-border/40 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-black">65%</p>
                        <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-primary w-[65%]" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-border/40 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Assigned To</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">AJ</div>
                          <div>
                            <p className="text-sm font-bold">Amit Jain</p>
                            <p className="text-[10px] text-muted-foreground">Activation Executive</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <SectionCard title="Primary Details">
                      <div className="space-y-4">
                        <DetailItem label="Sale Reference" value={selectedActivation.id} />
                        <DetailItem label="Customer Entity" value={selectedActivation.customer} />
                        <DetailItem label="Subscription Plan" value={selectedActivation.plan} />
                        <DetailItem label="Created At" value={selectedActivation.created} />
                        <DetailItem label="Expected Completion" value={selectedActivation.expected} />
                      </div>
                    </SectionCard>
                    <SectionCard title="Internal Summary">
                      <textarea 
                        className="w-full min-h-[120px] bg-muted/30 border border-border/40 rounded-xl p-4 text-sm focus:ring-1 focus:ring-primary outline-none"
                        placeholder="Add activation notes or summary for support handover..."
                      />
                    </SectionCard>
                  </div>
                </TabsContent>

                <TabsContent value="devices" className="mt-0 outline-none space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Registered Devices</h3>
                    <DeviceRegistrationDialog />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DeviceCard type="TV" brand="Samsung" model="QLED 4K 55\" nickname="Living Room" primary />
                    <DeviceCard type="Smartphone" brand="Apple" model="iPhone 15 Pro" nickname="Personal" />
                    <DeviceCard type="Laptop" brand="MacBook" model="Air M2" nickname="Office" />
                  </div>
                </TabsContent>

                <TabsContent value="checklist" className="mt-0 outline-none">
                  <SectionCard title="Onboarding Requirements">
                    <div className="space-y-2">
                      <ChecklistItem label="Payment Verification" completed />
                      <ChecklistItem label="Credentials Generation" completed />
                      <ChecklistItem label="Panel Allocation" completed />
                      <ChecklistItem label="Mac/IP Whitelisting" current />
                      <ChecklistItem label="Device Testing" />
                      <ChecklistItem label="Welcome Email Sent" />
                      <ChecklistItem label="Support Handover Done" />
                    </div>
                  </SectionCard>
                </TabsContent>

                <TabsContent value="files" className="mt-0 outline-none">
                  <UniversalFileManager />
                </TabsContent>

                <TabsContent value="timeline" className="mt-0 outline-none">
                  <UniversalActivityTimeline items={MOCK_TIMELINE} />
                </TabsContent>

                <TabsContent value="audit" className="mt-0 outline-none">
                  <UniversalAuditLog entries={MOCK_AUDIT} />
                </TabsContent>
              </div>
            </Tabs>
          </TabsContent>
        )}
      </Tabs>
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

function DeviceCard({ type, brand, model, nickname, primary = false }: { type: string, brand: string, model: string, nickname: string, primary?: boolean }) {
  const icons: Record<string, any> = {
    "TV": Tv,
    "Smartphone": Smartphone,
    "Laptop": Laptop,
    "Tablet": Tablet,
  };
  const Icon = icons[type] || Box;

  return (
    <Card className="border-border/40 shadow-sm hover:shadow-md transition-all group overflow-hidden">
      <div className="p-4 flex gap-4">
        <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Icon className="size-5" />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">{type}</p>
            {primary && <Badge className="text-[9px] h-4 bg-primary/10 text-primary border-primary/20">Primary</Badge>}
          </div>
          <p className="text-sm font-bold truncate">{nickname}</p>
          <p className="text-[10px] text-muted-foreground truncate">{brand} · {model}</p>
        </div>
      </div>
      <div className="bg-muted/30 px-4 py-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold px-2">Edit</Button>
        <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold text-rose-600 px-2">Remove</Button>
      </div>
    </Card>
  );
}

function ChecklistItem({ label, completed = false, current = false }: { label: string, completed?: boolean, current?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-xl border transition-all",
      completed ? "bg-primary/5 border-primary/20" : 
      current ? "bg-amber-50/50 border-amber-200" : 
      "bg-transparent border-border/40"
    )}>
      <div className={cn(
        "size-5 rounded flex items-center justify-center border-2",
        completed ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30"
      )}>
        {completed && <CheckCircle2 className="size-3" />}
      </div>
      <span className={cn(
        "text-sm font-medium",
        completed ? "text-primary/70 line-through" : "text-foreground"
      )}>{label}</span>
      {current && <Badge variant="outline" className="ml-auto text-[9px] font-bold bg-amber-50 text-amber-600 border-amber-200">Processing</Badge>}
    </div>
  );
}

function DeviceRegistrationDialog() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" className="h-8">
        <Plus className="mr-2 size-3.5" /> Register Device
      </Button>
    </div>
  );
}

const MOCK_TIMELINE: TimelineItem[] = [
  {
    id: "1",
    type: "status_change",
    title: "moved to In Progress",
    description: "Executive started the configuration and device provisioning.",
    timestamp: "2 hours ago",
    user: { name: "Amit Jain", initials: "AJ" },
    category: "system"
  },
  {
    id: "2",
    type: "checklist",
    title: "completed Payment Verification",
    description: "Finance confirmed receipt of ₹45,000 for Sale ID SALE-2026-001.",
    timestamp: "4 hours ago",
    user: { name: "Sarah Finance", initials: "SF" },
    category: "finance"
  }
];

const MOCK_AUDIT = [
  { id: "1", user: "Amit Jain", action: "UPDATE_STATUS", entity: "Activation: SALE-2026-001", timestamp: "Aug 07, 2026 12:45 PM" },
  { id: "2", user: "System", action: "ASSIGN_EXECUTIVE", entity: "Activation: SALE-2026-001", timestamp: "Aug 07, 2026 11:30 AM" }
];
