/**
 * PROTOTYPE DEMO DATA — not backend data.
 * This module is the single boundary for the /app shell prototype. Replace the
 * exports here with real API/service calls without touching the components.
 */

export const DEMO_DATA_NOTICE = "Demo data — not connected to a backend";

export interface DemoBusiness {
  id: string;
  name: string;
  initials: string;
  plan: string;
}

export const demoBusinesses: DemoBusiness[] = [
  { id: "biz-a", name: "Business A", initials: "BA", plan: "Enterprise" },
  { id: "biz-b", name: "Business B", initials: "BB", plan: "Growth" },
  { id: "biz-c", name: "Business C", initials: "BC", plan: "Starter" },
];

export interface DemoKpi {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  caption: string;
}

export const demoKpis: DemoKpi[] = [
  { id: "revenue", label: "Revenue (MTD)", value: "₹ 18,42,000", delta: "+12.4%", trend: "up", caption: "vs previous month" },
  { id: "leads", label: "Active Leads", value: "348", delta: "+26", trend: "up", caption: "across all queues" },
  { id: "conversion", label: "Conversion Rate", value: "21.8%", delta: "-1.2%", trend: "down", caption: "lead → customer" },
  { id: "collections", label: "Collections", value: "₹ 9,10,500", delta: "+8.1%", trend: "up", caption: "settled this month" },
];

export interface DemoPipelineStage {
  id: string;
  stage: string;
  count: number;
  value: string;
  share: number;
}

export const demoPipeline: DemoPipelineStage[] = [
  { id: "new", stage: "New", count: 128, value: "₹ 6,40,000", share: 100 },
  { id: "qualified", stage: "Qualified", count: 82, value: "₹ 4,92,000", share: 64 },
  { id: "proposal", stage: "Proposal", count: 46, value: "₹ 3,68,000", share: 36 },
  { id: "negotiation", stage: "Negotiation", count: 24, value: "₹ 2,16,000", share: 19 },
  { id: "won", stage: "Won", count: 17, value: "₹ 1,70,000", share: 13 },
];

export interface DemoActivity {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  tone: "neutral" | "success" | "warning";
}

export const demoActivity: DemoActivity[] = [
  { id: "a1", actor: "Priya Nair", action: "moved lead to", target: "Negotiation", time: "6m ago", tone: "success" },
  { id: "a2", actor: "Rahul Menon", action: "logged a call with", target: "Acme Retail", time: "24m ago", tone: "neutral" },
  { id: "a3", actor: "System", action: "flagged duplicate for", target: "Vertex Foods", time: "1h ago", tone: "warning" },
  { id: "a4", actor: "Aisha Khan", action: "shared proposal with", target: "Northwind Ltd", time: "2h ago", tone: "neutral" },
  { id: "a5", actor: "Vikram Rao", action: "closed deal with", target: "Blue Harbour", time: "4h ago", tone: "success" },
];

export interface DemoFollowUp {
  id: string;
  contact: string;
  company: string;
  due: string;
  owner: string;
  priority: "high" | "medium" | "low";
}

export const demoFollowUps: DemoFollowUp[] = [
  { id: "f1", contact: "Neha Sharma", company: "Acme Retail", due: "Today · 11:30", owner: "Priya", priority: "high" },
  { id: "f2", contact: "Arjun Desai", company: "Vertex Foods", due: "Today · 15:00", owner: "Rahul", priority: "medium" },
  { id: "f3", contact: "Sana Iqbal", company: "Northwind Ltd", due: "Tomorrow · 10:15", owner: "Aisha", priority: "low" },
];

export interface DemoCallback {
  id: string;
  contact: string;
  phone: string;
  slot: string;
  reason: string;
}

export const demoCallbacks: DemoCallback[] = [
  { id: "c1", contact: "Manish Gupta", phone: "+91 90000 •• 12", slot: "Today · 13:00", reason: "Pricing clarification" },
  { id: "c2", contact: "Divya Rao", phone: "+91 90000 •• 47", slot: "Today · 17:45", reason: "Renewal discussion" },
  { id: "c3", contact: "Karan Patel", phone: "+91 90000 •• 83", slot: "Tomorrow · 09:30", reason: "Device activation" },
];

export interface DemoPayment {
  id: string;
  customer: string;
  amount: string;
  method: string;
  status: "settled" | "pending" | "failed";
  time: string;
}

export const demoPayments: DemoPayment[] = [
  { id: "p1", customer: "Acme Retail", amount: "₹ 48,000", method: "UPI", status: "settled", time: "Today · 09:12" },
  { id: "p2", customer: "Vertex Foods", amount: "₹ 1,20,000", method: "NEFT", status: "pending", time: "Today · 08:40" },
  { id: "p3", customer: "Blue Harbour", amount: "₹ 22,500", method: "Card", status: "settled", time: "Yesterday · 18:05" },
  { id: "p4", customer: "Northwind Ltd", amount: "₹ 9,800", method: "UPI", status: "failed", time: "Yesterday · 16:22" },
];

export interface DemoNotification {
  id: string;
  category: string;
  title: string;
  time: string;
}

export const demoNotifications: DemoNotification[] = [
  { id: "n1", category: "Sales", title: "Deal ‘Blue Harbour’ marked as won", time: "10m ago" },
  { id: "n2", category: "Payment", title: "NEFT of ₹ 1,20,000 awaiting settlement", time: "45m ago" },
  { id: "n3", category: "HR", title: "2 leave requests awaiting approval", time: "2h ago" },
  { id: "n4", category: "Security", title: "New device signed in from Kochi", time: "5h ago" },
];