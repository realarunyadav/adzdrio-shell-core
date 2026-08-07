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
  LayoutDashboard,
  User,
  Zap,
  Tag,
  History,
  ShieldCheck,
  Smartphone,
  Laptop,
  Monitor,
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
import { UniversalActivityTimeline } from "@/components/shared/UniversalActivityTimeline";
import { UniversalTag } from "@/components/shared/UniversalTag";

export const Route = createFileRoute("/modules/activation")({
  component: ActivationModule,
});

function ActivationModule() {
  const [activeTab, setActiveTab] = React.useState("queue");

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
        </TabsList>

        <TabsContent value="queue" className="outline-none">
          <SectionCard title="Active Activations" contentClassName="p-0">
            <div className="p-4 border-b border-border/40 flex items-center justify-between">
              <div className="relative group">
                <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search activations..." className="w-[300px] h-9 pl-9 text-xs" />
              </div>
            </div>
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>Sale ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>SLA</TableHead>
                  <TableHead>Executive</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-muted/5 cursor-pointer" onClick={() => setActiveTab("detail")}>
                  <TableCell className="font-medium text-xs">SALE-2026-001</TableCell>
                  <TableCell>
                    <p className="text-xs font-bold">Deemand Solutions</p>
                    <p className="text-[10px] text-muted-foreground">Premium Plan</p>
                  </TableCell>
                  <TableCell className="text-xs">Enterprise Premium</TableCell>
                  <TableCell><StatusBadge tone="info">In Progress</StatusBadge></TableCell>
                  <TableCell><Badge variant="outline" className="text-[9px] bg-amber-50 text-amber-600">High</Badge></TableCell>
                  <TableCell className="text-xs text-amber-600 font-bold">04:30:00</TableCell>
                  <TableCell className="text-xs font-medium">Amit Jain</TableCell>
                  <TableCell className="text-right"><Button size="icon" variant="ghost"><MoreHorizontal className="size-4" /></Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SectionCard>
        </TabsContent>

        <TabsContent value="detail" className="outline-none">
          <Button variant="ghost" className="mb-4 text-xs" onClick={() => setActiveTab("queue")}>
            <ArrowRight className="rotate-180 mr-2 size-3.5" /> Back to Queue
          </Button>
          
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <SectionCard title="Activation Workflow">
                 <div className="flex items-center justify-between py-6">
                   {[
                     { label: "Paid", active: true },
                     { label: "Verified", active: true },
                     { label: "Sale", active: true },
                     { label: "Assigned", active: true },
                     { label: "Progress", active: true },
                     { label: "Activated", active: false },
                     { label: "Handover", active: false },
                     { label: "Done", active: false },
                   ].map((step, idx) => (
                     <React.Fragment key={step.label}>
                       <div className="flex flex-col items-center gap-2">
                         <div className={`size-8 rounded-full flex items-center justify-center border-2 ${step.active ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-muted-foreground/20"}`}>
                           {step.active ? <CheckCircle2 className="size-4" /> : <div className="size-2 rounded-full bg-muted-foreground" />}
                         </div>
                         <span className="text-[9px] font-bold uppercase">{step.label}</span>
                       </div>
                       {idx < 7 && <div className="h-px bg-border w-full -mt-6 mx-2" />}
                     </React.Fragment>
                   ))}
                 </div>
              </SectionCard>
              
              <SectionCard title="Activation Checklist">
                 <div className="space-y-3">
                   {["Payment Verified", "Credentials Generated", "Panel Assigned", "Device Activated"].map(task => (
                     <div key={task} className="flex items-center gap-3 p-3 rounded-lg border border-border/40 hover:bg-muted/30">
                       <input type="checkbox" className="size-4 rounded border-border" />
                       <span className="text-sm">{task}</span>
                     </div>
                   ))}
                 </div>
              </SectionCard>
            </div>
            
            <div className="lg:col-span-4 space-y-6">
              <SectionCard title="Device Registration">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start"><Smartphone className="mr-2 size-4" /> Register Mobile</Button>
                  <Button variant="outline" className="w-full justify-start"><Monitor className="mr-2 size-4" /> Register Desktop</Button>
                  <Button variant="outline" className="w-full justify-start"><Laptop className="mr-2 size-4" /> Register Laptop</Button>
                </div>
              </SectionCard>
              <SectionCard title="Internal Notes">
                <textarea className="w-full h-32 text-sm p-3 border border-border/40 rounded-xl" placeholder="Add activation notes..." />
              </SectionCard>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
