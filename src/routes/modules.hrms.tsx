import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Download, Plus } from "lucide-react";
import { useState } from "react";

import {
  AIEmployeeCoach,
  AttendanceDashboard,
  CallAnalyticsPanel,
  IncentiveCenter,
  LeaveManagement,
  MetricTile,
  OrganizationChart,
  PerformanceDashboard,
} from "@/components/hrms/HrmsPanels";
import { EMPLOYEE_AUDIT, EMPLOYEE_TIMELINE } from "@/components/hrms/hrms-data";
import { EmployeeDirectoryLive } from "@/components/hrms/EmployeeDirectoryLive";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { UniversalActivityTimeline } from "@/components/shared/UniversalActivityTimeline";
import { UniversalAuditLog } from "@/components/shared/UniversalAuditLog";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/modules/hrms")({
  head: () => ({
    meta: [
      { title: "HRMS Workspace — ABOS" },
      { name: "description", content: "Enterprise HRMS: attendance, leave, incentives, performance, AI coaching and organization chart." },
      { property: "og:title", content: "HRMS Workspace — ABOS" },
      { property: "og:description", content: "Enterprise HRMS: attendance, leave, incentives, performance, AI coaching and organization chart." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HRMSPage,
});

const TABS = [
  { value: "dashboard", label: "Dashboard" },
  { value: "directory", label: "Directory" },
  { value: "attendance", label: "Attendance" },
  { value: "leave", label: "Leave" },
  { value: "incentives", label: "Incentive Center" },
  { value: "performance", label: "Performance" },
  { value: "coach", label: "AI Coach" },
  { value: "org", label: "Organization Chart" },
  { value: "payroll", label: "Payroll" },
  { value: "recruitment", label: "Recruitment" },
];

function HRMSPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Platform People"
        title="Human Resource Management"
        description="Attendance, leave, incentive programs, performance intelligence and workforce structure."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass-surface">
              <Download className="mr-2 size-4" /> HR Reports
            </Button>
            <Button size="sm" className="shadow-elevated">
              <Plus className="mr-2 size-4" /> Quick Action
            </Button>
          </div>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-6 mb-6">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 pb-3 pt-0 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="dashboard" className="m-0 outline-none space-y-6">
          <HRDashboard />
        </TabsContent>

        <TabsContent value="directory" className="m-0 outline-none">
          <EmployeeDirectoryLive />
        </TabsContent>

        <TabsContent value="attendance" className="m-0 outline-none">
          <AttendanceDashboard />
        </TabsContent>

        <TabsContent value="leave" className="m-0 outline-none">
          <LeaveManagement />
        </TabsContent>

        <TabsContent value="incentives" className="m-0 outline-none">
          <IncentiveCenter />
        </TabsContent>

        <TabsContent value="performance" className="m-0 outline-none space-y-6">
          <PerformanceDashboard />
          <CallAnalyticsPanel />
        </TabsContent>

        <TabsContent value="coach" className="m-0 outline-none">
          <AIEmployeeCoach />
        </TabsContent>

        <TabsContent value="org" className="m-0 outline-none">
          <OrganizationChart />
        </TabsContent>

        <TabsContent value="payroll" className="m-0 outline-none">
          <PayrollWorkspace />
        </TabsContent>

        <TabsContent value="recruitment" className="m-0 outline-none">
          <RecruitmentWorkspace />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HRDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricTile label="Headcount" value="126" hint="Across 4 locations" />
        <MetricTile label="Present Today" value="118" hint="93.6% attendance" tone="success" />
        <MetricTile label="On Leave" value="4" hint="1 pending approval" tone="warning" />
        <MetricTile label="Avg AI Call Score" value="80" hint="Target 85" tone="info" />
        <MetricTile label="Incentive Pool (Aug)" value="₹2.4L" hint="Projected payout" tone="info" />
        <MetricTile label="Open Positions" value="6" hint="Recruitment active" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SectionCard className="xl:col-span-2" title="Workforce Activity" description="Recent HR events across modules">
          <UniversalActivityTimeline items={EMPLOYEE_TIMELINE} />
        </SectionCard>
        <SectionCard title="Compliance Overview" description="Policy and audit readiness">
          <div className="space-y-4">
            <MetricTile label="Policy Acknowledgement" value="100%" hint="126 of 126 employees" tone="success" />
            <MetricTile label="Document Verification" value="94%" hint="8 documents pending review" tone="warning" />
            <MetricTile label="Audit Readiness" value="High" hint="Last checked 2 days ago" tone="success" />
          </div>
        </SectionCard>
      </div>

      <SectionCard title="HR Audit Log" description="Recent administrative actions" contentClassName="p-0">
        <UniversalAuditLog entries={EMPLOYEE_AUDIT} />
      </SectionCard>
    </div>
  );
}

function PayrollWorkspace() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricTile label="Payroll Cycle" value="Aug 2026" hint="Locks on 28 Aug" />
        <MetricTile label="Gross Payroll" value="₹68.4L" hint="Pre-deduction" tone="info" />
        <MetricTile label="Incentive Component" value="₹2.4L" hint="From active programs" tone="success" />
        <MetricTile label="Payslips Generated" value="0 / 126" hint="Awaiting attendance lock" tone="warning" />
      </div>

      <SectionCard title="Payroll Processing Timeline" description="Sequential steps for the current cycle">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {["Attendance Sync", "Component Verify", "Incentive Merge", "Generate Payslips", "Disbursement"].map((step, index) => (
            <div key={step} className="flex flex-1 items-center gap-3">
              <div
                className={
                  index === 0
                    ? "size-9 rounded-full border-2 border-primary flex items-center justify-center text-xs font-black"
                    : "size-9 rounded-full border-2 border-border flex items-center justify-center text-xs font-black text-muted-foreground"
                }
              >
                {index + 1}
              </div>
              <span className={index === 0 ? "text-[11px] font-bold uppercase" : "text-[11px] font-bold uppercase text-muted-foreground"}>
                {step}
              </span>
              {index < 4 ? <div className="hidden md:block h-px flex-1 bg-border" /> : null}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function RecruitmentWorkspace() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricTile label="Active Openings" value="6" hint="3 departments" />
        <MetricTile label="Candidates In Pipeline" value="41" hint="12 in interview" tone="info" />
        <MetricTile label="Offers Extended" value="4" hint="2 accepted" tone="success" />
        <MetricTile label="Avg Time To Hire" value="21 d" hint="Target 25 d" tone="success" />
      </div>

      <SectionCard title="Interview Pipeline" description="Stage-wise candidate distribution">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <MetricTile label="Applied" value="41" />
          <MetricTile label="Screened" value="24" />
          <MetricTile label="Interview" value="12" tone="info" />
          <MetricTile label="Offer" value="4" tone="warning" />
          <MetricTile label="Joined" value="2" tone="success" />
        </div>
        <div className="mt-5 flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
          <Briefcase className="size-3.5" /> Job requisitions and offer templates are configured under HR settings.
        </div>
      </SectionCard>
    </div>
  );
}
