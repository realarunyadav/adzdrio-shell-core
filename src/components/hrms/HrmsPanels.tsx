import {
  AlertTriangle,
  Award,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Gauge,
  LogIn,
  LogOut,
  Phone,
  Sparkles,
  Target,
  ThumbsDown,
  ThumbsUp,
  Timer,
  Upload,
  Users,
  XCircle,
} from "lucide-react";

import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { UniversalTag } from "@/components/shared/UniversalTag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  AI_COACH,
  ATTENDANCE_CALENDAR,
  ATTENDANCE_ROWS,
  CALL_ANALYTICS,
  EMPLOYEE_DOCUMENTS,
  INCENTIVE_HISTORY,
  INCENTIVE_PROGRAMS,
  LEAVE_REQUESTS,
  ORG_CHART,
  PERFORMANCE_METRICS,
  type OrgNode,
} from "./hrms-data";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export function MetricTile({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "success" | "info" | "warning" | "neutral" | "danger";
}) {
  const toneText: Record<string, string> = {
    success: "text-success",
    info: "text-info",
    warning: "text-primary",
    danger: "text-destructive",
    neutral: "text-foreground",
  };
  return (
    <div className="surface-card shadow-card border border-border/40 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className={cn("text-xl font-black tracking-tight", toneText[tone])}>{value}</span>
      {hint ? <span className="text-[10px] text-muted-foreground/80 font-medium">{hint}</span> : null}
    </div>
  );
}

function statusTone(status: string): StatusTone {
  switch (status) {
    case "Present":
    case "Approved":
    case "Verified":
    case "Signed":
    case "Paid":
    case "Active":
      return "success";
    case "Late":
    case "Pending":
    case "Pending Review":
    case "Probation":
    case "Running":
      return "warning";
    case "Rejected":
    case "Notice Period":
      return "danger";
    case "Remote":
      return "info";
    default:
      return "neutral";
  }
}

export { statusTone };

/* ------------------------------------------------------------------ */
/* Attendance                                                          */
/* ------------------------------------------------------------------ */

export function AttendanceDashboard({ scope = "team" }: { scope?: "team" | "employee" }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricTile label="Check In" value="09:58" hint="Today · Mumbai HQ" tone="success" />
        <MetricTile label="Check Out" value="19:14" hint="Today · Mumbai HQ" tone="info" />
        <MetricTile label="Working Hours" value="9h 16m" hint="Avg 9h 04m this month" />
        <MetricTile label="Late Minutes" value="22m" hint="1 late day this month" tone="warning" />
        <MetricTile label="Overtime" value="6h 42m" hint="Cycle to date" tone="success" />
        <MetricTile label="Attendance Score" value="96%" hint="Target 95%" tone="success" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SectionCard
          className="xl:col-span-2"
          title="Attendance Register"
          description={scope === "team" ? "Daily attendance across the workforce." : "Daily attendance for this employee."}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="glass-surface">
                <LogIn className="mr-2 size-3.5" /> Regularise
              </Button>
              <Button variant="outline" size="sm" className="glass-surface">
                <Download className="mr-2 size-3.5" /> Export
              </Button>
            </div>
          }
          contentClassName="p-0"
        >
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Date</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Check In</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Check Out</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Working Hours</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Late</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Overtime</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ATTENDANCE_ROWS.map((row) => (
                <TableRow key={row.date} className="text-xs hover:bg-muted/30">
                  <TableCell className="font-bold">{row.date}</TableCell>
                  <TableCell>{row.checkIn}</TableCell>
                  <TableCell>{row.checkOut}</TableCell>
                  <TableCell className="font-semibold">{row.workingHours}</TableCell>
                  <TableCell className={row.lateMinutes > 0 ? "text-destructive font-bold" : "text-muted-foreground"}>
                    {row.lateMinutes}m
                  </TableCell>
                  <TableCell>{row.overtime}</TableCell>
                  <TableCell>
                    <StatusBadge tone={statusTone(row.status)}>{row.status}</StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Attendance Calendar" description="August 2026">
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={`${d}-${i}`} className="text-[9px] font-black uppercase text-muted-foreground py-1">
                  {d}
                </span>
              ))}
              {ATTENDANCE_CALENDAR.map((state, index) => (
                <div
                  key={index}
                  title={`${index + 1} Aug — ${state}`}
                  className={cn(
                    "aspect-square rounded-md flex items-center justify-center text-[10px] font-bold border",
                    state === "present" && "bg-success/12 text-success border-success/20",
                    state === "remote" && "bg-info/12 text-info border-info/20",
                    state === "late" && "bg-primary/15 text-accent-foreground border-primary/25",
                    state === "leave" && "bg-destructive/10 text-destructive border-destructive/20",
                    state === "off" && "bg-muted text-muted-foreground border-border/40",
                    state === "future" && "bg-transparent text-muted-foreground/40 border-dashed border-border/40",
                  )}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <UniversalTag label="Present" color="emerald" />
              <UniversalTag label="Remote" color="blue" />
              <UniversalTag label="Late" color="amber" />
              <UniversalTag label="Leave" color="rose" />
              <UniversalTag label="Week Off" color="slate" />
            </div>
          </SectionCard>

          <SectionCard title="Attendance Summary" description="Cycle 01 - 31 Aug 2026">
            <div className="space-y-3">
              <SummaryRow icon={CheckCircle2} label="Present Days" value="19" />
              <SummaryRow icon={Clock} label="Late Arrivals" value="2" />
              <SummaryRow icon={Timer} label="Overtime Hours" value="6h 42m" />
              <SummaryRow icon={CalendarDays} label="Leave Days" value="1" />
              <SummaryRow icon={LogOut} label="Early Exits" value="0" />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-3 py-2">
      <span className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </span>
      <span className="text-xs font-black">{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Leave                                                               */
/* ------------------------------------------------------------------ */

const LEAVE_BALANCES = [
  { label: "Sick Leave", used: 3, total: 12 },
  { label: "Casual Leave", used: 4, total: 10 },
  { label: "Privilege Leave", used: 6, total: 18 },
  { label: "Unpaid Leave", used: 0, total: 0 },
];

export function LeaveManagement({ scope = "team" }: { scope?: "team" | "employee" }) {
  const requests = scope === "employee" ? LEAVE_REQUESTS.filter((r) => r.employee === "Sarah Manager") : LEAVE_REQUESTS;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricTile label="Pending Approvals" value="2" hint="Awaiting action" tone="warning" />
        <MetricTile label="Approved This Month" value="7" hint="Across 3 departments" tone="success" />
        <MetricTile label="On Leave Today" value="1" hint="Imran Qureshi" tone="info" />
        <MetricTile label="Leave Utilisation" value="43%" hint="Of annual entitlement" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SectionCard
          className="xl:col-span-2"
          title="Leave Requests"
          description="Requests routed through the configured approval workflow."
          actions={<Button size="sm" className="shadow-elevated">Apply Leave</Button>}
          contentClassName="p-0"
        >
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Request</TableHead>
                {scope === "team" ? (
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Employee</TableHead>
                ) : null}
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Type</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Period</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Days</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Stage</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} className="text-xs hover:bg-muted/30">
                  <TableCell className="font-bold">{request.id}</TableCell>
                  {scope === "team" ? <TableCell>{request.employee}</TableCell> : null}
                  <TableCell>{request.type}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {request.from} → {request.to}
                  </TableCell>
                  <TableCell className="font-semibold">{request.days}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] font-bold">
                      {request.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={statusTone(request.status)}>{request.status}</StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Leave Balance" description="Entitlement vs consumed">
            <div className="space-y-4">
              {LEAVE_BALANCES.map((balance) => (
                <div key={balance.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">{balance.label}</span>
                    <span className="text-muted-foreground">
                      {balance.used} / {balance.total || "—"} days
                    </span>
                  </div>
                  <Progress value={balance.total ? (balance.used / balance.total) * 100 : 0} className="h-1.5" />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Approval Workflow" description="Configured routing for leave requests">
            <div className="space-y-2">
              {["Employee submits request", "Team Leader review", "Manager approval", "HR ledger update"].map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/20 px-3 py-2">
                  <span className="size-6 rounded-full bg-primary/15 text-accent-foreground text-[10px] font-black flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold">{step}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Leave Calendar" description="August 2026">
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {ATTENDANCE_CALENDAR.map((state, index) => (
                <div
                  key={index}
                  className={cn(
                    "aspect-square rounded-md flex items-center justify-center text-[10px] font-bold border",
                    state === "leave"
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : "bg-muted/40 text-muted-foreground border-border/40",
                  )}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Incentive Center                                                    */
/* ------------------------------------------------------------------ */

export function IncentiveCenter() {
  const current = INCENTIVE_PROGRAMS[0];
  const remaining = Math.max(current.target - current.achieved, 0);
  const progress = Math.min((current.achieved / current.target) * 100, 100);

  return (
    <div className="space-y-6">
      <SectionCard
        title="Current Incentive Program"
        description={`${current.name} · ${current.cycle}`}
        actions={
          <div className="flex gap-2">
            <StatusBadge tone={statusTone(current.status)}>{current.status}</StatusBadge>
            <Button variant="outline" size="sm" className="glass-surface">Configure Programs</Button>
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <MetricTile label="Metric" value={current.metric} hint="Program driver" />
          <MetricTile label="Target" value={`${current.target}`} hint={current.unit} />
          <MetricTile label="Achieved" value={`${current.achieved}`} hint={`${progress.toFixed(0)}% of target`} tone="success" />
          <MetricTile label="Remaining" value={`${remaining}`} hint="To reach target" tone="warning" />
          <MetricTile label="Estimated Incentive" value={current.estimated} hint="Projected payout" tone="info" />
        </div>
        <div className="mt-5 space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-[11px] text-muted-foreground font-medium">
            Slab rule: {current.slab}. Payout recalculates as verified records change.
          </p>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionCard
          title="Incentive Programs"
          description="Admin-configurable programs. No fixed commission rates."
          contentClassName="p-0"
        >
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Program</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Metric</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Progress</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Estimated</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INCENTIVE_PROGRAMS.map((program) => (
                <TableRow key={program.id} className="text-xs hover:bg-muted/30">
                  <TableCell>
                    <p className="font-bold">{program.name}</p>
                    <p className="text-[10px] text-muted-foreground">{program.cycle}</p>
                  </TableCell>
                  <TableCell>{program.metric}</TableCell>
                  <TableCell className="font-semibold">
                    {program.achieved} / {program.target}
                  </TableCell>
                  <TableCell className="font-black">{program.estimated}</TableCell>
                  <TableCell>
                    <StatusBadge tone={statusTone(program.status)}>{program.status}</StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard title="Previous Incentives & History" description="Settled payouts by cycle" contentClassName="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Period</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Program</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Achievement</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Payout</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INCENTIVE_HISTORY.map((row) => (
                <TableRow key={row.period} className="text-xs hover:bg-muted/30">
                  <TableCell className="font-bold">{row.period}</TableCell>
                  <TableCell className="text-muted-foreground">{row.program}</TableCell>
                  <TableCell>{row.achieved}</TableCell>
                  <TableCell className="font-black">{row.payout}</TableCell>
                  <TableCell>
                    <StatusBadge tone={statusTone(row.state)}>{row.state}</StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Performance                                                         */
/* ------------------------------------------------------------------ */

export function PerformanceDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {PERFORMANCE_METRICS.map((metric) => (
          <MetricTile key={metric.label} label={metric.label} value={metric.value} hint={metric.delta} tone={metric.tone} />
        ))}
      </div>
    </div>
  );
}

export function CallAnalyticsPanel() {
  return (
    <SectionCard title="Call Analytics" description="Connect rate and quality by calling window" contentClassName="p-0">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest">Window</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest">Calls</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest">Connected</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest">Avg Duration</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest">AI Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {CALL_ANALYTICS.map((row) => (
            <TableRow key={row.window} className="text-xs hover:bg-muted/30">
              <TableCell className="font-bold flex items-center gap-2">
                <Phone className="size-3.5 text-muted-foreground" /> {row.window}
              </TableCell>
              <TableCell>{row.calls}</TableCell>
              <TableCell>
                {row.connected}
                <span className="text-[10px] text-muted-foreground ml-1">
                  ({Math.round((row.connected / row.calls) * 100)}%)
                </span>
              </TableCell>
              <TableCell>{row.avgDuration}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={row.score} className="h-1.5 w-20" />
                  <span className="font-black">{row.score}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* AI Employee Coach                                                   */
/* ------------------------------------------------------------------ */

export function AIEmployeeCoach() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SectionCard
          className="xl:col-span-2"
          title="Weak Areas"
          description="Detected from call transcripts and outcome patterns"
          actions={<Sparkles className="size-4 text-primary" />}
        >
          <div className="space-y-3">
            {AI_COACH.weakAreas.map((item) => (
              <div key={item.area} className="rounded-xl border border-border/40 bg-muted/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold">{item.area}</p>
                  <StatusBadge tone={item.severity === "High" ? "danger" : item.severity === "Medium" ? "warning" : "neutral"}>
                    {item.severity}
                  </StatusBadge>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Goals & Practice" description="Coaching targets for this cycle">
          <div className="space-y-5">
            <GoalRow icon={Target} label="Daily Goal" text={AI_COACH.dailyGoal.label} value={AI_COACH.dailyGoal.progress} />
            <GoalRow icon={Gauge} label="Weekly Goal" text={AI_COACH.weeklyGoal.label} value={AI_COACH.weeklyGoal.progress} />
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">AI Practice</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Run a guided roleplay against the most common objection detected this week.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold">Roleplay Score</span>
                <span className="text-lg font-black text-primary">{AI_COACH.roleplayScore}</span>
              </div>
              <Progress value={AI_COACH.roleplayScore} className="h-1.5" />
              <Button size="sm" className="w-full shadow-elevated mt-2">Start AI Roleplay</Button>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SectionCard title="Best Calls" description="Highest scored conversations">
          <div className="space-y-3">
            {AI_COACH.bestCalls.map((call) => (
              <CallRow key={call.id} {...call} tone="success" />
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Worst Calls" description="Priority review queue">
          <div className="space-y-3">
            {AI_COACH.worstCalls.map((call) => (
              <CallRow key={call.id} {...call} tone="danger" />
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Training Suggestions" description="Generated coaching plan">
          <div className="space-y-3">
            {AI_COACH.training.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-border/40 bg-muted/20 p-3">
                <Award className="size-4 text-primary shrink-0 mt-0.5" />
                <p className="text-[11px] font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function GoalRow({
  icon: Icon,
  label,
  text,
  value,
}: {
  icon: typeof Target;
  label: string;
  text: string;
  value: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <Icon className="size-3.5" /> {label}
        </span>
        <span className="text-xs font-black">{value}%</span>
      </div>
      <p className="text-xs font-semibold">{text}</p>
      <Progress value={value} className="h-1.5" />
    </div>
  );
}

function CallRow({
  id,
  customer,
  score,
  note,
  tone,
}: {
  id: string;
  customer: string;
  score: number;
  note: string;
  tone: "success" | "danger";
}) {
  const Icon = tone === "success" ? ThumbsUp : ThumbsDown;
  return (
    <div className="rounded-xl border border-border/40 bg-muted/20 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-bold">
          <Icon className={cn("size-3.5", tone === "success" ? "text-success" : "text-destructive")} />
          {customer}
        </span>
        <span className={cn("text-sm font-black", tone === "success" ? "text-success" : "text-destructive")}>{score}</span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">
        {id} · {note}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Documents                                                           */
/* ------------------------------------------------------------------ */

export function EmployeeDocuments() {
  return (
    <SectionCard
      title="Employee Documents"
      description="Statutory, employment and supporting records"
      actions={
        <Button size="sm" className="shadow-elevated">
          <Upload className="mr-2 size-3.5" /> Upload Document
        </Button>
      }
      contentClassName="p-0"
    >
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest">Document</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest">Category</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest">Requirement</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest">Last Updated</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest">Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {EMPLOYEE_DOCUMENTS.map((doc) => (
            <TableRow key={doc.id} className="text-xs hover:bg-muted/30">
              <TableCell className="font-bold flex items-center gap-2">
                <FileText className="size-3.5 text-muted-foreground" /> {doc.name}
              </TableCell>
              <TableCell className="text-muted-foreground">{doc.category}</TableCell>
              <TableCell>
                {doc.required ? (
                  <Badge variant="outline" className="text-[9px] font-bold">Mandatory</Badge>
                ) : (
                  <span className="text-[10px] text-muted-foreground">Optional</span>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">{doc.updated}</TableCell>
              <TableCell>
                <StatusBadge tone={statusTone(doc.status)}>{doc.status}</StatusBadge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="text-[10px] font-bold">
                  <Download className="mr-1.5 size-3" /> Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* Organization Chart                                                  */
/* ------------------------------------------------------------------ */

export function OrganizationChart() {
  return (
    <SectionCard
      title="Organization Chart"
      description="Reporting hierarchy — CEO → Managers → Team Leaders → Employees"
      actions={
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <Users className="size-3.5" /> 8 positions
        </span>
      }
    >
      <div className="overflow-x-auto pb-2">
        <OrgBranch node={ORG_CHART} root />
      </div>
    </SectionCard>
  );
}

function OrgBranch({ node, root = false }: { node: OrgNode; root?: boolean }) {
  const levelStyles: Record<OrgNode["level"], string> = {
    CEO: "border-primary/40 bg-primary/10",
    Manager: "border-info/30 bg-info/10",
    "Team Leader": "border-success/30 bg-success/10",
    Employee: "border-border/50 bg-muted/30",
  };

  return (
    <div className={cn("min-w-max", root ? "" : "ml-6 border-l border-border/50 pl-6 relative")}>
      {!root ? <span className="absolute left-0 top-5 w-6 h-px bg-border/60" /> : null}
      <div
        className={cn(
          "inline-flex items-center gap-3 rounded-xl border px-4 py-3 shadow-card premium-transition hover:shadow-elevated",
          levelStyles[node.level],
        )}
      >
        <span className="size-8 rounded-full bg-background/70 border border-border/40 flex items-center justify-center text-[10px] font-black">
          {node.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </span>
        <span className="flex flex-col">
          <span className="text-xs font-black tracking-tight">{node.name}</span>
          <span className="text-[10px] text-muted-foreground font-semibold">{node.role}</span>
        </span>
        <BadgeCheck className="size-3.5 text-muted-foreground/60" />
      </div>
      {node.children.length > 0 ? (
        <div className="mt-3 space-y-3">
          {node.children.map((child) => (
            <OrgBranch key={child.name} node={child} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared empty-guard helpers                                          */
/* ------------------------------------------------------------------ */

export function AlertNote({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-[11px] font-medium text-muted-foreground">
      <AlertTriangle className="size-3.5 text-primary" /> {text}
    </div>
  );
}

export const HrmsIcons = { CheckCircle2, XCircle };
