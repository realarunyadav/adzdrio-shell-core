import { createFileRoute } from "@tanstack/react-router";
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Briefcase, 
  TrendingUp, 
  UserPlus, 
  CreditCard, 
  FileCheck, 
  FileText, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  History,
  GraduationCap,
  Bell,
  BarChart3,
  Timer,
  LayoutDashboard
} from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataToolbar } from "@/components/shared/DataToolbar";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/modules/hrms")({
  component: HRMSPage,
});

function HRMSPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-700">
      <PageHeader
        title="Human Resource Management"
        description="Comprehensive HR operations, payroll, performance and recruitment management."
        eyebrow="Platform People"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass-surface">
              <Download className="mr-2 size-4" />
              HR Reports
            </Button>
            <Button size="sm" className="shadow-elevated">
              <Plus className="mr-2 size-4" />
              Quick Action
            </Button>
          </div>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-8 mb-6">
            <TabsTrigger
              value="dashboard"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 pb-3 pt-0 text-xs font-bold uppercase tracking-wider"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="attendance"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 pb-3 pt-0 text-xs font-bold uppercase tracking-wider"
            >
              Attendance
            </TabsTrigger>
            <TabsTrigger
              value="leave"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 pb-3 pt-0 text-xs font-bold uppercase tracking-wider"
            >
              Leave
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 pb-3 pt-0 text-xs font-bold uppercase tracking-wider"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="payroll"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 pb-3 pt-0 text-xs font-bold uppercase tracking-wider"
            >
              Payroll
            </TabsTrigger>
            <TabsTrigger
              value="recruitment"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 pb-3 pt-0 text-xs font-bold uppercase tracking-wider"
            >
              Recruitment
            </TabsTrigger>
          </TabsList>
        </ScrollArea>

        <TabsContent value="dashboard" className="space-y-6 m-0 outline-none">
          <HRDashboard />
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6 m-0 outline-none">
          <AttendanceWorkspace />
        </TabsContent>

        <TabsContent value="leave" className="space-y-6 m-0 outline-none">
          <LeaveWorkspace />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6 m-0 outline-none">
          <PerformanceWorkspace />
        </TabsContent>

        <TabsContent value="payroll" className="space-y-6 m-0 outline-none">
          <PayrollWorkspace />
        </TabsContent>

        <TabsContent value="recruitment" className="space-y-6 m-0 outline-none">
          <RecruitmentWorkspace />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HRDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Present Today" value="0" subValue="98% Daily Avg" />
        <MetricCard title="Leave Requests" value="0" subValue="Pending approval" />
        <MetricCard title="Open Positions" value="0" subValue="Recruitment active" />
        <MetricCard title="Training Hours" value="0" subValue="Completed this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Recent Announcements" actions={<Button variant="ghost" size="sm">View All</Button>}>
          <div className="py-8 text-center text-muted-foreground">
            <Bell className="size-8 mx-auto mb-2 opacity-20" />
            <p className="text-xs italic">No new announcements at the moment</p>
          </div>
        </SectionCard>
        <SectionCard title="Approvals Queue" actions={<Button variant="ghost" size="sm">Manage</Button>}>
          <div className="py-8 text-center text-muted-foreground">
            <CheckCircle2 className="size-8 mx-auto mb-2 opacity-20" />
            <p className="text-xs italic">All requests have been processed</p>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Platform Compliance Overview">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl glass-surface border border-border/40">
            <h4 className="text-xs font-bold uppercase mb-2">Policy Updates</h4>
            <p className="text-lg font-black">100%</p>
            <p className="text-[10px] text-muted-foreground">Employees acknowledged</p>
          </div>
          <div className="p-4 rounded-xl glass-surface border border-border/40">
            <h4 className="text-xs font-bold uppercase mb-2">Audit Readiness</h4>
            <p className="text-lg font-black text-success">High</p>
            <p className="text-[10px] text-muted-foreground">Last checked 2 days ago</p>
          </div>
          <div className="p-4 rounded-xl glass-surface border border-border/40">
            <h4 className="text-xs font-bold uppercase mb-2">Certification Sync</h4>
            <p className="text-lg font-black">0/0</p>
            <p className="text-[10px] text-muted-foreground">No active tracking needed</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function AttendanceWorkspace() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <MiniMetric title="Present" value="0" tone="success" />
        <MiniMetric title="Absent" value="0" tone="danger" />
        <MiniMetric title="Late" value="0" tone="warning" />
        <MiniMetric title="Remote" value="0" tone="info" />
        <MiniMetric title="Overtime" value="0h" tone="neutral" />
      </div>

      <SectionCard title="Attendance Logs">
        <DataToolbar
          search={<Input placeholder="Search employee logs..." className="max-w-xs glass-surface" />}
          filters={<Button variant="outline" size="sm" className="glass-surface">Date Range</Button>}
        />
        <div className="border rounded-xl overflow-hidden mt-4">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Work Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground italic text-xs">
                  No attendance data available for the selected period
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}

function LeaveWorkspace() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <SectionCard title="Leave Balances">
          <div className="space-y-4">
            <LeaveProgress label="Sick Leave" used={0} total={12} />
            <LeaveProgress label="Privilege Leave" used={0} total={18} />
            <LeaveProgress label="Casual Leave" used={0} total={10} />
          </div>
        </SectionCard>
        <SectionCard title="Holiday Calendar">
          <div className="py-4 text-center">
            <Calendar className="size-6 mx-auto mb-2 opacity-20" />
            <p className="text-xs text-muted-foreground">No upcoming holidays this month</p>
          </div>
        </SectionCard>
      </div>
      <div className="lg:col-span-2 space-y-6">
        <SectionCard title="Leave Requests" actions={<Button size="sm">Apply Leave</Button>}>
          <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
            <FileText className="size-10 mb-2 opacity-10" />
            <p className="text-sm">No active leave requests</p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function PerformanceWorkspace() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SectionCard title="Company Goals">
          <div className="py-8 text-center text-muted-foreground">
            <TrendingUp className="size-8 mx-auto mb-2 opacity-20" />
            <p className="text-xs italic">Strategic goals not yet defined</p>
          </div>
        </SectionCard>
        <SectionCard title="Pending Reviews">
          <div className="py-8 text-center text-muted-foreground">
            <Timer className="size-8 mx-auto mb-2 opacity-20" />
            <p className="text-xs italic">0 reviews scheduled for this week</p>
          </div>
        </SectionCard>
        <SectionCard title="KPI Summary">
          <div className="py-8 text-center text-muted-foreground">
            <BarChart3 className="size-8 mx-auto mb-2 opacity-20" />
            <p className="text-xs italic">Average KPI attainment: 0%</p>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Employee Feedback Timeline">
        <div className="py-12 text-center text-muted-foreground">
          <History className="size-10 mx-auto mb-2 opacity-10" />
          <p className="text-sm">No feedback or appraisal history recorded</p>
        </div>
      </SectionCard>
    </div>
  );
}

function PayrollWorkspace() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SectionCard title="Salary Structures" actions={<Button variant="outline" size="sm">Configure</Button>}>
          <div className="p-4 border border-dashed rounded-lg bg-muted/5 text-center">
            <p className="text-xs text-muted-foreground">Define standard components like Basic, HRA, Allowances</p>
          </div>
        </SectionCard>
        <SectionCard title="Deduction Rules">
          <div className="p-4 border border-dashed rounded-lg bg-muted/5 text-center">
            <p className="text-xs text-muted-foreground">Configure Tax, PF, ESI and other statutory deductions</p>
          </div>
        </SectionCard>
        <SectionCard title="Bonus & Incentives">
          <div className="p-4 border border-dashed rounded-lg bg-muted/5 text-center">
            <p className="text-xs text-muted-foreground">Manage recurring and one-time payout variables</p>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Payroll Processing Timeline">
        <div className="flex items-center gap-8 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="size-10 rounded-full border-2 border-primary flex items-center justify-center font-bold">1</div>
            <p className="text-[10px] uppercase font-bold">Attendance Sync</p>
          </div>
          <div className="h-px bg-border flex-1" />
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="size-10 rounded-full border-2 border-border flex items-center justify-center font-bold">2</div>
            <p className="text-[10px] uppercase font-bold">Component Verify</p>
          </div>
          <div className="h-px bg-border flex-1" />
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="size-10 rounded-full border-2 border-border flex items-center justify-center font-bold">3</div>
            <p className="text-[10px] uppercase font-bold">Generate Payslips</p>
          </div>
          <div className="h-px bg-border flex-1" />
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="size-10 rounded-full border-2 border-border flex items-center justify-center font-bold">4</div>
            <p className="text-[10px] uppercase font-bold">Disbursement</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function RecruitmentWorkspace() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Active Openings" value="0" subValue="Across all departments" />
        <MetricCard title="Total Candidates" value="0" subValue="Applications received" />
        <MetricCard title="Interviews" value="0" subValue="Scheduled for today" />
        <MetricCard title="Hired" value="0" subValue="Last 30 days" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Interview Pipeline" actions={<Button variant="ghost" size="sm">View Board</Button>}>
          <div className="py-12 text-center text-muted-foreground">
            <UserPlus className="size-10 mx-auto mb-2 opacity-10" />
            <p className="text-sm">No active candidates in the pipeline</p>
          </div>
        </SectionCard>
        <SectionCard title="Recent Job Postings" actions={<Button size="sm">Create Job</Button>}>
          <div className="py-12 text-center text-muted-foreground">
            <Briefcase className="size-10 mx-auto mb-2 opacity-10" />
            <p className="text-sm">No active job listings found</p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subValue }: { title: string; value: string; subValue: string }) {
  return (
    <Card className="surface-card shadow-card border-border/40 overflow-hidden">
      <CardContent className="p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-2xl font-black tracking-tight">{value}</h4>
          <span className="text-[10px] font-medium text-muted-foreground uppercase">{subValue}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniMetric({ title, value, tone }: { title: string; value: string; tone: any }) {
  return (
    <div className="p-4 rounded-xl glass-surface border border-border/40 flex flex-col gap-1">
      <span className="text-[10px] font-bold uppercase text-muted-foreground">{title}</span>
      <div className="flex items-center gap-2">
        <span className="text-lg font-black">{value}</span>
        <div className={`size-1.5 rounded-full bg-${tone}`} />
      </div>
    </div>
  );
}

function LeaveProgress({ label, used, total }: { label: string; used: number; total: number }) {
  const percentage = (used / total) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold">{label}</span>
        <span className="text-muted-foreground">{used} / {total} Days</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

import { ScrollArea } from "@/components/ui/scroll-area";
