import type { AuditLogEntry } from "@/components/shared/UniversalAuditLog";
import type { Comment } from "@/components/shared/UniversalComments";
import type { TimelineItem } from "@/components/shared/UniversalActivityTimeline";

/**
 * Presentation-layer records for the HRMS workspace.
 * Replaced by real data sources once backend contracts are wired.
 */

export interface EmployeeRecord {
  id: string;
  code: string;
  name: string;
  initials: string;
  designation: string;
  department: string;
  reportsTo: string;
  location: string;
  email: string;
  phone: string;
  joinedOn: string;
  employmentType: string;
  status: "Active" | "Probation" | "Notice Period";
  shift: string;
}

export const EMPLOYEES: EmployeeRecord[] = [
  {
    id: "emp-1001",
    code: "ADZ-1001",
    name: "Sarah Manager",
    initials: "SM",
    designation: "Senior Sales Executive",
    department: "Sales",
    reportsTo: "Rahul Verma (Team Leader)",
    location: "Mumbai HQ",
    email: "sarah.m@adzdrio.com",
    phone: "+91 98200 41122",
    joinedOn: "12 Jan 2024",
    employmentType: "Full Time",
    status: "Active",
    shift: "General (10:00 - 19:00)",
  },
  {
    id: "emp-1014",
    code: "ADZ-1014",
    name: "Imran Qureshi",
    initials: "IQ",
    designation: "Activation Executive",
    department: "Activation",
    reportsTo: "Neha Kulkarni (Team Leader)",
    location: "Pune Branch",
    email: "imran.q@adzdrio.com",
    phone: "+91 90040 23310",
    joinedOn: "03 Jun 2024",
    employmentType: "Full Time",
    status: "Active",
    shift: "Evening (14:00 - 23:00)",
  },
  {
    id: "emp-1027",
    code: "ADZ-1027",
    name: "Divya Nair",
    initials: "DN",
    designation: "Support Specialist",
    department: "Support",
    reportsTo: "Neha Kulkarni (Team Leader)",
    location: "Kochi Branch",
    email: "divya.n@adzdrio.com",
    phone: "+91 96330 77812",
    joinedOn: "21 Feb 2026",
    employmentType: "Full Time",
    status: "Probation",
    shift: "General (10:00 - 19:00)",
  },
];

export interface AttendanceRow {
  date: string;
  checkIn: string;
  checkOut: string;
  workingHours: string;
  lateMinutes: number;
  overtime: string;
  status: "Present" | "Late" | "Leave" | "Week Off" | "Remote";
}

export const ATTENDANCE_ROWS: AttendanceRow[] = [
  { date: "07 Aug 2026", checkIn: "09:58", checkOut: "19:14", workingHours: "9h 16m", lateMinutes: 0, overtime: "0h 14m", status: "Present" },
  { date: "06 Aug 2026", checkIn: "10:22", checkOut: "19:05", workingHours: "8h 43m", lateMinutes: 22, overtime: "0h 00m", status: "Late" },
  { date: "05 Aug 2026", checkIn: "09:52", checkOut: "20:30", workingHours: "10h 38m", lateMinutes: 0, overtime: "1h 30m", status: "Present" },
  { date: "04 Aug 2026", checkIn: "—", checkOut: "—", workingHours: "0h 00m", lateMinutes: 0, overtime: "0h 00m", status: "Leave" },
  { date: "03 Aug 2026", checkIn: "09:47", checkOut: "19:02", workingHours: "9h 15m", lateMinutes: 0, overtime: "0h 02m", status: "Remote" },
];

/** Day states for the monthly attendance calendar (index 0 = 1st of month). */
export const ATTENDANCE_CALENDAR: Array<"present" | "late" | "leave" | "off" | "remote" | "future"> = [
  "off","present","present","present","late","present","off","off","present","present",
  "present","present","present","off","off","present","remote","present","present","late",
  "present","off","off","remote","present","leave","present","present","off","off","present",
];

export interface LeaveRequest {
  id: string;
  employee: string;
  type: "Sick Leave" | "Casual Leave" | "Privilege Leave" | "Unpaid Leave";
  from: string;
  to: string;
  days: number;
  reason: string;
  stage: "Team Leader" | "Manager" | "HR" | "Completed";
  status: "Pending" | "Approved" | "Rejected";
}

export const LEAVE_REQUESTS: LeaveRequest[] = [
  { id: "LV-2041", employee: "Sarah Manager", type: "Privilege Leave", from: "18 Aug 2026", to: "20 Aug 2026", days: 3, reason: "Family function", stage: "Manager", status: "Pending" },
  { id: "LV-2039", employee: "Divya Nair", type: "Casual Leave", from: "12 Aug 2026", to: "12 Aug 2026", days: 1, reason: "Bank work", stage: "Team Leader", status: "Pending" },
  { id: "LV-2038", employee: "Imran Qureshi", type: "Sick Leave", from: "04 Aug 2026", to: "04 Aug 2026", days: 1, reason: "Fever", stage: "Completed", status: "Approved" },
  { id: "LV-2033", employee: "Divya Nair", type: "Casual Leave", from: "29 Jul 2026", to: "30 Jul 2026", days: 2, reason: "Personal work", stage: "Completed", status: "Rejected" },
];

export interface IncentiveProgram {
  id: string;
  name: string;
  cycle: string;
  metric: string;
  target: number;
  achieved: number;
  unit: string;
  slab: string;
  estimated: string;
  status: "Running" | "Closed" | "Draft";
}

export const INCENTIVE_PROGRAMS: IncentiveProgram[] = [
  { id: "IP-08", name: "August Subscription Drive", cycle: "01 - 31 Aug 2026", metric: "Verified Sales", target: 40, achieved: 27, unit: "sales", slab: "₹450 per verified sale beyond 20", estimated: "₹3,150", status: "Running" },
  { id: "IP-Q3", name: "Quarterly Quality Program", cycle: "Jul - Sep 2026", metric: "AI Call Score", target: 85, achieved: 82, unit: "score", slab: "Flat ₹5,000 at 85+", estimated: "₹0", status: "Running" },
  { id: "IP-07", name: "Renewal Retention Program", cycle: "01 - 31 Jul 2026", metric: "Renewal Revenue (%)", target: 100, achieved: 112, unit: "%", slab: "2 slabs cleared", estimated: "₹6,400", status: "Closed" },
];

export const INCENTIVE_HISTORY = [
  { period: "July 2026", program: "Renewal Retention Program", achieved: "112% of target", payout: "₹6,400", state: "Paid" },
  { period: "June 2026", program: "Mid-Year Acquisition Push", achieved: "94% of target", payout: "₹4,050", state: "Paid" },
  { period: "May 2026", program: "Monthly Subscription Drive", achieved: "78% of target", payout: "₹1,800", state: "Paid" },
];

export const PERFORMANCE_METRICS: Array<{ label: string; value: string; delta: string; tone: "success" | "info" | "warning" | "neutral" }> = [
  { label: "Calls Made", value: "1,284", delta: "+8.2% vs last cycle", tone: "success" },
  { label: "Connected Calls", value: "947", delta: "73.7% connect rate", tone: "info" },
  { label: "Callback Rate", value: "31.4%", delta: "+2.1%", tone: "success" },
  { label: "Follow-up Rate", value: "68.9%", delta: "-1.4%", tone: "warning" },
  { label: "Sales", value: "34", delta: "This cycle", tone: "neutral" },
  { label: "Verified Sales", value: "27", delta: "79.4% verified", tone: "info" },
  { label: "Revenue Generated", value: "₹8.42L", delta: "+12.6%", tone: "success" },
  { label: "Renewal Revenue", value: "₹2.18L", delta: "+4.9%", tone: "success" },
  { label: "Customer Satisfaction", value: "4.6 / 5", delta: "142 responses", tone: "info" },
  { label: "AI Call Score", value: "82 / 100", delta: "Target 85", tone: "warning" },
  { label: "Attendance Score", value: "96%", delta: "1 late this month", tone: "success" },
];

export const EMPLOYEE_DOCUMENTS = [
  { id: "doc-aadhaar", name: "Aadhaar", category: "Identity", status: "Verified", updated: "12 Jan 2024", required: true },
  { id: "doc-pan", name: "PAN", category: "Identity", status: "Verified", updated: "12 Jan 2024", required: true },
  { id: "doc-offer", name: "Offer Letter", category: "Employment", status: "Signed", updated: "05 Jan 2024", required: true },
  { id: "doc-nda", name: "NDA", category: "Legal", status: "Signed", updated: "05 Jan 2024", required: true },
  { id: "doc-bank", name: "Bank Details", category: "Payroll", status: "Verified", updated: "14 Jan 2024", required: true },
  { id: "doc-cert", name: "Certificates", category: "Education", status: "Pending Review", updated: "02 Aug 2026", required: false },
  { id: "doc-other", name: "Other Documents", category: "Miscellaneous", status: "Not Uploaded", updated: "—", required: false },
];

export const CALL_ANALYTICS = [
  { window: "Morning (10:00 - 13:00)", calls: 142, connected: 108, avgDuration: "4m 12s", score: 84 },
  { window: "Afternoon (13:00 - 16:00)", calls: 168, connected: 121, avgDuration: "3m 48s", score: 79 },
  { window: "Evening (16:00 - 19:00)", calls: 131, connected: 104, avgDuration: "5m 02s", score: 88 },
];

export const AI_COACH = {
  weakAreas: [
    { area: "Objection handling on pricing", severity: "High", detail: "Discount requested in 42% of lost calls without value framing." },
    { area: "Call closing clarity", severity: "Medium", detail: "Next step not confirmed in 3 of 10 sampled calls." },
    { area: "Discovery depth", severity: "Low", detail: "Device usage question skipped in 18% of calls." },
  ],
  bestCalls: [
    { id: "CALL-7781", customer: "Deemand Solutions", score: 94, note: "Strong qualification and clean close." },
    { id: "CALL-7742", customer: "Nova Retail", score: 91, note: "Excellent objection reframing." },
  ],
  worstCalls: [
    { id: "CALL-7716", customer: "Skyline Traders", score: 51, note: "Interrupted customer twice, no next step agreed." },
    { id: "CALL-7690", customer: "Pinnacle Media", score: 58, note: "Pricing conceded without approval." },
  ],
  training: [
    "Complete the Value-Based Pricing module (18 min).",
    "Shadow two evening calls from the top performer this week.",
    "Practise the renewal objection roleplay twice before Friday.",
  ],
  dailyGoal: { label: "60 dials · 4 qualified prospects", progress: 72 },
  weeklyGoal: { label: "9 verified sales · AI score 85+", progress: 58 },
  roleplayScore: 76,
};

export interface OrgNode {
  name: string;
  role: string;
  level: "CEO" | "Manager" | "Team Leader" | "Employee";
  children: OrgNode[];
}

export const ORG_CHART: OrgNode = {
  name: "Arjun Mehta",
  role: "Chief Executive Officer",
  level: "CEO",
  children: [
    {
      name: "Priya Sharma",
      role: "Manager — Revenue",
      level: "Manager",
      children: [
        {
          name: "Rahul Verma",
          role: "Team Leader — Sales",
          level: "Team Leader",
          children: [
            { name: "Sarah Manager", role: "Senior Sales Executive", level: "Employee", children: [] },
            { name: "Karan Bhatt", role: "Sales Executive", level: "Employee", children: [] },
          ],
        },
      ],
    },
    {
      name: "Vikram Iyer",
      role: "Manager — Service Delivery",
      level: "Manager",
      children: [
        {
          name: "Neha Kulkarni",
          role: "Team Leader — Activation & Support",
          level: "Team Leader",
          children: [
            { name: "Imran Qureshi", role: "Activation Executive", level: "Employee", children: [] },
            { name: "Divya Nair", role: "Support Specialist", level: "Employee", children: [] },
          ],
        },
      ],
    },
  ],
};

export const EMPLOYEE_TIMELINE: TimelineItem[] = [
  { id: "t1", type: "performance", title: "closed a verified subscription sale", description: "Deemand Solutions — Annual Enterprise plan, ₹1,24,000.", timestamp: "07 Aug, 16:20", user: { name: "Sarah Manager", initials: "SM" }, category: "crm" },
  { id: "t2", type: "attendance", title: "checked in for the general shift", description: "Check-in 09:58 from Mumbai HQ, no late minutes recorded.", timestamp: "07 Aug, 09:58", user: { name: "Sarah Manager", initials: "SM" }, category: "hrms" },
  { id: "t3", type: "coaching", title: "completed an AI coaching roleplay", description: "Pricing objection scenario — roleplay score 76/100.", timestamp: "06 Aug, 18:05", user: { name: "AI Employee Coach", initials: "AI" }, category: "system" },
  { id: "t4", type: "leave", title: "submitted a privilege leave request", description: "18 Aug to 20 Aug, awaiting manager approval.", timestamp: "05 Aug, 11:32", user: { name: "Sarah Manager", initials: "SM" }, category: "hrms" },
];

export const EMPLOYEE_AUDIT: AuditLogEntry[] = [
  { id: "a1", user: "HR Admin", action: "Updated incentive program mapping", entity: "Employee ADZ-1001", timestamp: "07 Aug 2026, 10:12" },
  { id: "a2", user: "Priya Sharma", action: "Approved attendance regularisation", entity: "Attendance 06 Aug 2026", timestamp: "06 Aug 2026, 19:40" },
  { id: "a3", user: "System", action: "Recalculated attendance score", entity: "Performance Cycle Aug 2026", timestamp: "06 Aug 2026, 00:05" },
  { id: "a4", user: "HR Admin", action: "Verified bank details document", entity: "Document doc-bank", timestamp: "14 Jan 2024, 15:22" },
];

export const EMPLOYEE_COMMENTS: Comment[] = [
  { id: "c1", user: "Priya Sharma", text: "Strong month on acquisition. Let's push the AI call score above 85 before the quarterly cut-off.", timestamp: "07 Aug, 17:10" },
  { id: "c2", user: "Rahul Verma", text: "Scheduled two shadow sessions on evening calls for next week.", timestamp: "06 Aug, 12:44" },
];
