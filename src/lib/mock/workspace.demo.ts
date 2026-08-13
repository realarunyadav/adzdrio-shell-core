import { 
  DollarSign, 
  Users, 
  Target, 
  CreditCard, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  MessageSquare, 
  PhoneCall, 
  Video, 
  Clock, 
  UserPlus, 
  CheckCircle2, 
  FileText, 
  Key,
  Building2,
  Package,
  Settings,
  Scale,
  Activity,
  Briefcase,
  PieChart,
  Globe,
  Database,
  Lock,
  Smartphone,
  Gift,
  Share2,
  HelpCircle,
  HardDrive,
  RefreshCw,
  Bell,
  Fingerprint
} from "lucide-react";

/**
 * PROTOTYPE DEMO DATA — not backend data.
 */

export const DEMO_DATA_NOTICE = "Demo data — not connected to a backend";

export interface DemoBusiness {
  id: string;
  name: string;
  initials: string;
  plan: string;
  revenue: string;
  sales: number;
  leads: number;
  conversion: string;
  pendingPayments: string;
  teamSize: number;
  status: 'active' | 'warning' | 'paused';
}

export const demoBusinesses: DemoBusiness[] = [
  { id: "biz-a", name: "Acme India", initials: "AI", plan: "Enterprise", revenue: "₹ 12.4L", sales: 48, leads: 240, conversion: "20%", pendingPayments: "₹ 42K", teamSize: 12, status: 'active' },
  { id: "biz-b", name: "Vertex Tech", initials: "VT", plan: "Growth", revenue: "₹ 8.2L", sales: 32, leads: 180, conversion: "17.8%", pendingPayments: "₹ 12K", teamSize: 8, status: 'active' },
  { id: "biz-c", name: "Blue Harbour", initials: "BH", plan: "Starter", revenue: "₹ 4.1L", sales: 15, leads: 90, conversion: "16.7%", pendingPayments: "₹ 8.5K", teamSize: 5, status: 'warning' },
];

export interface DemoKpi {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  caption: string;
  icon: any;
}

export const demoKpis: DemoKpi[] = [
  { id: "rev", label: "Total Revenue", value: "₹ 24.7L", delta: "+12.4%", trend: "up", caption: "vs previous month", icon: DollarSign },
  { id: "sales", label: "Paid Sales", value: "95", delta: "+8.2%", trend: "up", caption: "this month", icon: Zap },
  { id: "cust", label: "Active Customers", value: "1,284", delta: "+4.1%", trend: "up", caption: "total growth", icon: Users },
  { id: "leads", label: "New Leads", value: "510", delta: "+22.5%", trend: "up", caption: "last 30 days", icon: Target },
  { id: "conv", label: "Conversion Rate", value: "18.6%", delta: "-1.2%", trend: "down", caption: "lead → sale", icon: TrendingUp },
  { id: "pending", label: "Pending Payments", value: "₹ 62.5K", delta: "+15.2%", trend: "up", caption: "action required", icon: CreditCard },
];

export const demoTeamPerformance = [
  { id: 1, name: "Priya Nair", role: "Sales Lead", business: "Acme India", leads: 42, sales: 12, revenue: "₹ 4.8L", conversion: "28.5%", performance: 95 },
  { id: 2, name: "Rahul Menon", role: "Sr. Associate", business: "Vertex Tech", leads: 38, sales: 8, revenue: "₹ 3.2L", conversion: "21.1%", performance: 88 },
  { id: 3, name: "Aisha Khan", role: "Associate", business: "Acme India", leads: 45, sales: 7, revenue: "₹ 2.5L", conversion: "15.6%", performance: 82 },
  { id: 4, name: "Vikram Rao", role: "Sales Lead", business: "Blue Harbour", leads: 25, sales: 5, revenue: "₹ 2.1L", conversion: "20.0%", performance: 90 },
  { id: 5, name: "Sana Iqbal", role: "Associate", business: "Vertex Tech", leads: 30, sales: 4, revenue: "₹ 1.8L", conversion: "13.3%", performance: 75 },
];

export const demoFinanceSnapshot = {
  paid: "₹ 22.4L",
  pending: "₹ 62.5K",
  failed: "₹ 12.2K",
  refunds: "₹ 4.8K",
  revenue: "₹ 24.7L",
  expenses: "₹ 12.8L",
  net: "₹ 11.9L"
};

export const demoHrSnapshot = {
  total: 25,
  active: 22,
  onLeave: 3,
  attendance: "94.2%",
  openLeaves: 2,
  newEmployees: 1,
  needingAttention: 2
};

export const demoSupportSnapshot = {
  conversations: 24,
  calls: 12,
  videoCalls: 4,
  pendingIssues: 8,
  resolutionRate: "92.5%",
  activationsPending: 15,
  activationsCompleted: 142,
  failedActivations: 2
};

export const demoAlerts = [
  { id: "al-1", severity: "high", title: "Payment Webhook Failure", desc: "Razorpay webhook for Acme India failing (404)", module: "Integrations", time: "12m ago" },
  { id: "al-2", severity: "medium", title: "Pending Approval", desc: "Expense claim from Rahul Menon (₹ 4,500)", module: "Finance", time: "45m ago" },
  { id: "al-3", severity: "high", title: "Security Alert", desc: "Unauthorized login attempt from Moscow (IP: 92.x.x.x)", module: "Security", time: "1h ago" },
  { id: "al-4", severity: "medium", title: "Overdue Follow-up", desc: "Enterprise Lead: Tata Motors (₹ 12L)", module: "CRM", time: "2h ago" },
];

export const demoActivities = [
  { id: "act-1", actor: "System", action: "granted permission", target: "Admin Access", time: "5m ago", business: "Acme India", status: "success" },
  { id: "act-2", actor: "Priya Nair", action: "created sale", target: "₹ 1.2L - Tata Motors", time: "15m ago", business: "Acme India", status: "success" },
  { id: "act-3", actor: "Vikram Rao", action: "changed setting", target: "Taxation Rules", time: "45m ago", business: "Blue Harbour", status: "neutral" },
  { id: "act-4", actor: "Rahul Menon", action: "assigned lead", target: "Global Exports", time: "1h ago", business: "Vertex Tech", status: "neutral" },
  { id: "act-5", actor: "System", action: "logged security event", target: "Password Reset", time: "3h ago", business: "Global", status: "warning" },
];

export const adminCategories = [
  {
    id: "org",
    title: "ORGANIZATION",
    icon: Building2,
    desc: "Manage businesses, branch networks and corporate branding.",
    modules: ["Businesses", "Business Settings", "Branding"]
  },
  {
    id: "people",
    title: "PEOPLE & ACCESS",
    icon: Users,
    desc: "Control who can access what across the entire platform.",
    modules: ["Employees", "Roles & Permissions", "Access Control"]
  },
  {
    id: "crm",
    title: "CRM",
    icon: Target,
    desc: "Define lead lifecycle, custom fields and customer workflows.",
    modules: ["CRM Fields", "Lead Settings", "Customer Settings"]
  },
  {
    id: "sales",
    title: "SALES",
    icon: Zap,
    desc: "Manage pricing plans, payment links and invoice logic.",
    modules: ["Plans", "Payment Settings", "Sales Settings"]
  },
  {
    id: "hr",
    title: "HR & INCENTIVES",
    icon: Briefcase,
    desc: "Setup payroll logic, incentive engines and referral rules.",
    modules: ["Incentive Rules", "Referral Rules", "Payroll Config"]
  },
  {
    id: "legal",
    title: "LEGAL",
    icon: Scale,
    desc: "Manage contract templates and electronic signing settings.",
    modules: ["Legal Templates", "Legal Settings"]
  },
  {
    id: "comm",
    title: "COMMUNICATION",
    icon: MessageSquare,
    desc: "Configure automated notifications, calling and video systems.",
    modules: ["Notifications", "Calling", "Video"]
  },
  {
    id: "int",
    title: "INTEGRATIONS",
    icon: Globe,
    desc: "Connect external APIs, payment gateways and webhooks.",
    modules: ["Payment Gateways", "Leegality", "APIs", "Webhooks"]
  },
  {
    id: "security",
    title: "SECURITY",
    icon: ShieldCheck,
    desc: "Monitor system health, active sessions and audit logs.",
    modules: ["Security Settings", "Sessions", "Audit"]
  },
  {
    id: "data",
    title: "DATA",
    icon: Database,
    desc: "Master controls for data import, exports and backups.",
    modules: ["Import", "Export", "Backup", "Recovery"]
  },
  {
    id: "system",
    title: "SYSTEM",
    icon: Settings,
    desc: "General workspace localization and technical settings.",
    modules: ["System Settings", "Localization"]
  }
];
