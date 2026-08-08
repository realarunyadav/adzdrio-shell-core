import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Building2, CalendarDays, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import {
  AIEmployeeCoach,
  AttendanceDashboard,
  CallAnalyticsPanel,
  EmployeeDocuments,
  IncentiveCenter,
  LeaveManagement,
  MetricTile,
  PerformanceDashboard,
  statusTone,
} from "@/components/hrms/HrmsPanels";
import {
  EMPLOYEES,
  EMPLOYEE_AUDIT,
  EMPLOYEE_COMMENTS,
  EMPLOYEE_TIMELINE,
} from "@/components/hrms/hrms-data";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { UniversalActivityTimeline } from "@/components/shared/UniversalActivityTimeline";
import { UniversalAuditLog } from "@/components/shared/UniversalAuditLog";
import { UniversalComments } from "@/components/shared/UniversalComments";
import { UniversalFileManager } from "@/components/shared/UniversalFileManager";
import { UniversalTag } from "@/components/shared/UniversalTag";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/modules/hrms/employee")({
  head: () => ({
    meta: [
      { title: "Employee 360 — ABOS HRMS" },
      { name: "description", content: "Complete employee profile with performance, attendance, incentives and AI coaching." },
      { property: "og:title", content: "Employee 360 — ABOS HRMS" },
      { property: "og:description", content: "Complete employee profile with performance, attendance, incentives and AI coaching." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmployeeProfilePage,
});

const TABS = [
  "Overview",
  "Performance",
  "Attendance",
  "Incentives",
  "Sales Metrics",
  "Call Analytics",
  "AI Coaching",
  "Documents",
  "Leave",
  "Activity Timeline",
  "Audit Log",
];

function slug(tab: string) {
  return tab.toLowerCase().replace(/\s+/g, "-");
}

function EmployeeProfilePage() {
  const employee = EMPLOYEES[0]!;

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link to="/modules/hrms">
            <ArrowLeft className="mr-2 size-4" /> Back to HRMS
          </Link>
        </Button>
      </div>

      <PageHeader
        eyebrow="Employee 360"
        title={employee.name}
        description={`${employee.designation} · ${employee.department} · ${employee.code}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={statusTone(employee.status)}>{employee.status}</StatusBadge>
            <Button variant="outline" size="sm" className="glass-surface">Edit Profile</Button>
            <Button size="sm" className="shadow-elevated">Run Review</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricTile label="Attendance Score" value="96%" hint="Aug 2026" tone="success" />
        <MetricTile label="AI Call Score" value="82" hint="Target 85" tone="warning" />
        <MetricTile label="Verified Sales" value="27" hint="This cycle" tone="info" />
        <MetricTile label="Revenue Generated" value="₹8.42L" hint="+12.6%" tone="success" />
        <MetricTile label="Estimated Incentive" value="₹3,150" hint="August program" tone="info" />
        <MetricTile label="Leave Balance" value="27 d" hint="Across all types" />
      </div>

      <Tabs defaultValue={slug(TABS[0]!)} className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-6 mb-6">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={slug(tab)}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 pb-3 pt-0 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="overview" className="m-0 outline-none space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <SectionCard className="xl:col-span-2" title="Employment Profile" description="Core identity and reporting details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow icon={Mail} label="Work Email" value={employee.email} />
                <InfoRow icon={Phone} label="Contact" value={employee.phone} />
                <InfoRow icon={Building2} label="Department" value={employee.department} />
                <InfoRow icon={ShieldCheck} label="Reports To" value={employee.reportsTo} />
                <InfoRow icon={MapPin} label="Work Location" value={employee.location} />
                <InfoRow icon={CalendarDays} label="Date of Joining" value={employee.joinedOn} />
                <InfoRow icon={ShieldCheck} label="Employment Type" value={employee.employmentType} />
                <InfoRow icon={CalendarDays} label="Shift" value={employee.shift} />
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                <UniversalTag label="Top Performer" color="emerald" />
                <UniversalTag label="Renewal Specialist" color="blue" />
                <UniversalTag label="Quality Watchlist" color="amber" />
              </div>
            </SectionCard>

            <SectionCard title="Internal Notes" description="Universal comments on this employee">
              <UniversalComments comments={EMPLOYEE_COMMENTS} />
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="m-0 outline-none space-y-6">
          <PerformanceDashboard />
        </TabsContent>

        <TabsContent value="attendance" className="m-0 outline-none">
          <AttendanceDashboard scope="employee" />
        </TabsContent>

        <TabsContent value="incentives" className="m-0 outline-none">
          <IncentiveCenter />
        </TabsContent>

        <TabsContent value="sales-metrics" className="m-0 outline-none space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricTile label="Sales" value="34" hint="This cycle" />
            <MetricTile label="Verified Sales" value="27" hint="79.4% verified" tone="info" />
            <MetricTile label="Revenue Generated" value="₹8.42L" hint="+12.6%" tone="success" />
            <MetricTile label="Renewal Revenue" value="₹2.18L" hint="+4.9%" tone="success" />
          </div>
          <SectionCard title="Pipeline Contribution" description="Sales stages owned by this employee">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <MetricTile label="Prospects" value="86" />
              <MetricTile label="Qualified" value="52" />
              <MetricTile label="Payment Received" value="34" />
              <MetricTile label="Verified" value="27" tone="success" />
              <MetricTile label="Activated" value="25" tone="info" />
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="call-analytics" className="m-0 outline-none space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricTile label="Calls Made" value="1,284" hint="+8.2%" tone="success" />
            <MetricTile label="Connected Calls" value="947" hint="73.7% connect" tone="info" />
            <MetricTile label="Callback Rate" value="31.4%" hint="+2.1%" tone="success" />
            <MetricTile label="Follow-up Rate" value="68.9%" hint="-1.4%" tone="warning" />
          </div>
          <CallAnalyticsPanel />
        </TabsContent>

        <TabsContent value="ai-coaching" className="m-0 outline-none">
          <AIEmployeeCoach />
        </TabsContent>

        <TabsContent value="documents" className="m-0 outline-none space-y-6">
          <EmployeeDocuments />
          <SectionCard title="Attachments" description="Universal file manager">
            <UniversalFileManager />
          </SectionCard>
        </TabsContent>

        <TabsContent value="leave" className="m-0 outline-none">
          <LeaveManagement scope="employee" />
        </TabsContent>

        <TabsContent value="activity-timeline" className="m-0 outline-none">
          <SectionCard title="Activity Timeline" description="Cross-module employee activity">
            <UniversalActivityTimeline items={EMPLOYEE_TIMELINE} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="audit-log" className="m-0 outline-none space-y-4">
          <UniversalAuditLog entries={EMPLOYEE_AUDIT} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border/40 bg-muted/20 p-3">
      <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
        <Icon className="size-3" /> {label}
      </span>
      <span className="text-xs font-bold">{value}</span>
    </div>
  );
}
