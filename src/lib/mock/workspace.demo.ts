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
  Fingerprint,
  Link,
  Receipt
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

export type LeadStatus = 'New' | 'Contacted' | 'Interested' | 'Follow-up' | 'Negotiation' | 'Converted' | 'Not Interested' | 'Lost' | 'Active' | 'Pending' | 'Inactive';
export type LeadPriority = 'High' | 'Medium' | 'Low';
export type FollowUpStatus = 'Pending' | 'Completed' | 'Overdue';
export type CallbackStatus = 'Requested' | 'Attempted' | 'Completed' | 'Rescheduled';

export interface DemoLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  business: string;
  status: LeadStatus;
  priority: LeadPriority;
  addedDate: string;
  lastActivity: string;
  assignedTo?: string;
  assignedToName?: string;
  notes?: string;
  nextFollowUp?: string; // ISO Date String
  followUpType?: 'Call' | 'Email' | 'Meeting' | 'WhatsApp';
  followUpStatus?: FollowUpStatus;
  callbackDate?: string; // ISO Date String
  callbackReason?: string;
  callbackStatus?: CallbackStatus;
  requestedBy?: string;
  totalSales?: string;
  pendingPayment?: string;
  customerSince?: string;
}

export const demoLeads: DemoLead[] = [
  {
    id: "lead-1",
    name: "Arjun Sharma",
    email: "arjun.s@example.com",
    phone: "+91 98765 43210",
    source: "Google Search",
    business: "Acme India",
    status: "New",
    priority: "High",
    addedDate: "2026-08-10T10:30:00Z",
    lastActivity: "2026-08-12T14:20:00Z",
    notes: "Interested in Enterprise plan. Needs a demo.",
    nextFollowUp: "2026-08-13T10:00:00Z",
    followUpType: "Call",
    followUpStatus: "Pending"
  },
  {
    id: "lead-2",
    name: "Deepika Rao",
    email: "d.rao@outlook.com",
    phone: "+91 87654 32109",
    source: "LinkedIn",
    business: "Vertex Tech",
    status: "Contacted",
    priority: "Medium",
    addedDate: "2026-08-11T09:15:00Z",
    lastActivity: "2026-08-13T11:45:00Z",
    assignedTo: "user-1",
    assignedToName: "Priya Nair",
    notes: "Follow-up scheduled for next week.",
    nextFollowUp: "2026-08-20T11:00:00Z",
    followUpType: "Meeting",
    followUpStatus: "Pending"
  },
  {
    id: "lead-3",
    name: "Vikram Singh",
    email: "vikram@singh-corp.in",
    phone: "+91 76543 21098",
    source: "Referral",
    business: "Blue Harbour",
    status: "Converted",
    priority: "High",
    addedDate: "2026-08-09T16:45:00Z",
    lastActivity: "2026-08-13T09:30:00Z",
    assignedTo: "user-1",
    assignedToName: "Priya Nair",
    nextFollowUp: "2026-08-15T10:00:00Z",
    notes: "High intent lead. Budget approved.",
    totalSales: "₹ 1.2L",
    pendingPayment: "₹ 0",
    customerSince: "2026-08-12"
  },
  {
    id: "lead-4",
    name: "Sanya Gupta",
    email: "sanya.g@gmail.com",
    phone: "+91 99887 76655",
    source: "Facebook Ads",
    business: "Acme India",
    status: "Negotiation",
    priority: "Medium",
    addedDate: "2026-08-05T11:00:00Z",
    lastActivity: "2026-08-12T16:30:00Z",
    assignedTo: "user-1",
    assignedToName: "Priya Nair",
    callbackDate: "2026-08-13T15:00:00Z",
    callbackReason: "Pricing Discussion",
    callbackStatus: "Requested",
    requestedBy: "Customer",
    notes: "Discussing pricing tiers."
  },
  {
    id: "lead-5",
    name: "Rohan Varma",
    email: "rohan@varma-logistics.com",
    phone: "+91 88776 65544",
    source: "Direct",
    business: "Vertex Tech",
    status: "Follow-up",
    priority: "Low",
    addedDate: "2026-08-08T14:00:00Z",
    lastActivity: "2026-08-13T12:00:00Z",
    assignedTo: "user-2",
    assignedToName: "Rahul Menon",
    notes: "Sent brochure. Waiting for response.",
    nextFollowUp: "2026-08-12T09:00:00Z",
    followUpType: "Email",
    followUpStatus: "Overdue"
  },
  {
    id: "lead-6",
    name: "Ananya Iyer",
    email: "ananya.i@tech-flow.com",
    phone: "+91 77665 54433",
    source: "Webinar",
    business: "Acme India",
    status: "Converted",
    priority: "Medium",
    addedDate: "2026-08-12T15:20:00Z",
    lastActivity: "2026-08-12T15:20:00Z",
    notes: "New inquiry from recent webinar.",
    totalSales: "₹ 85K",
    pendingPayment: "₹ 15K",
    customerSince: "2026-08-13"
  },
  {
    id: "lead-7",
    name: "Rahul Khanna",
    email: "rahul.k@global.com",
    phone: "+91 99000 11223",
    source: "LinkedIn",
    business: "Acme India",
    status: "Converted",
    priority: "High",
    addedDate: "2026-07-20T10:00:00Z",
    lastActivity: "2026-08-10T11:00:00Z",
    assignedTo: "user-1",
    assignedToName: "Priya Nair",
    totalSales: "₹ 4.5L",
    pendingPayment: "₹ 50K",
    customerSince: "2026-07-25"
  },
  {
    id: "lead-8",
    name: "Sneha Patel",
    email: "sneha.p@startup.io",
    phone: "+91 88990 01122",
    source: "Google Search",
    business: "Vertex Tech",
    status: "Converted",
    priority: "Medium",
    addedDate: "2026-08-01T14:30:00Z",
    lastActivity: "2026-08-11T16:00:00Z",
    assignedTo: "user-2",
    assignedToName: "Rahul Menon",
    totalSales: "₹ 2.1L",
    pendingPayment: "₹ 0",
    customerSince: "2026-08-05"
  },
  {
    id: "lead-9",
    name: "Kabir Das",
    email: "kabir.das@edu.in",
    phone: "+91 77889 90011",
    source: "Referral",
    business: "Blue Harbour",
    status: "Interested",
    priority: "Low",
    addedDate: "2026-08-13T09:00:00Z",
    lastActivity: "2026-08-13T09:15:00Z",
    callbackDate: "2026-08-14T10:00:00Z",
    callbackReason: "Feature Inquiry",
    callbackStatus: "Requested",
    requestedBy: "System"
  },
  {
    id: "lead-10",
    name: "Meera Reddy",
    email: "meera.r@health.com",
    phone: "+91 66778 89900",
    source: "Direct",
    business: "Acme India",
    status: "Follow-up",
    priority: "Medium",
    addedDate: "2026-08-05T10:00:00Z",
    lastActivity: "2026-08-10T15:00:00Z",
    nextFollowUp: "2026-08-11T14:00:00Z",
    followUpType: "Call",
    followUpStatus: "Completed"
  }
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

export interface DemoSale {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  email: string;
  business: string;
  planId: string;
  planName: string;
  amount: number;
  discount: number;
  finalAmount: number;
  salesEmployeeId: string;
  salesEmployeeName: string;
  status: 'New' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  paymentStatus: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  created: string;
  lastActivity: string;
  notes?: string;
}

export interface DemoPlan {
  id: string;
  name: string;
  business: string;
  price: number;
  status: 'Active' | 'Inactive';
  created: string;
  updated: string;
  activeSales: number;
}

export interface DemoPaymentLink {
  id: string;
  saleId: string;
  customerName: string;
  phone: string;
  email: string;
  amount: number;
  status: 'Active' | 'Paid' | 'Expired' | 'Disabled';
  created: string;
  expires: string;
  createdBy: string;
}

export interface DemoPayment {
  id: string;
  saleId: string;
  customerId: string;
  customerName: string;
  amount: number;
  method: string;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  date: string;
  reference: string;
}

export interface DemoInvoice {
  id: string;
  saleId: string;
  customerName: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Void';
  issueDate: string;
  dueDate: string;
  paymentStatus: 'Paid' | 'Pending';
}

export const demoPlans: DemoPlan[] = [
  { id: "plan-1", name: "Premium Annual", business: "Acme India", price: 12000, status: 'Active', created: "2024-01-15", updated: "2024-06-10", activeSales: 450 },
  { id: "plan-2", name: "Standard Monthly", business: "Vertex Tech", price: 999, status: 'Active', created: "2024-02-01", updated: "2024-07-01", activeSales: 1200 },
  { id: "plan-3", name: "Enterprise Custom", business: "Blue Harbour", price: 45000, status: 'Active', created: "2024-03-20", updated: "2024-03-20", activeSales: 12 },
];

export const demoSales: DemoSale[] = [
  {
    id: "SALE-1001",
    customerId: "cust-1",
    customerName: "Rahul Verma",
    phone: "+91 98765 43210",
    email: "rahul.v@example.com",
    business: "Acme India",
    planId: "plan-1",
    planName: "Premium Annual",
    amount: 12000,
    discount: 1000,
    finalAmount: 11000,
    salesEmployeeId: "emp-1",
    salesEmployeeName: "Ankit Singh",
    status: 'Won',
    paymentStatus: 'Paid',
    created: "2024-08-01T10:00:00Z",
    lastActivity: "2024-08-01T14:30:00Z",
    notes: "Customer converted from lead-1."
  },
  {
    id: "SALE-1002",
    customerId: "cust-2",
    customerName: "Priya Das",
    phone: "+91 98765 00001",
    email: "priya.d@example.com",
    business: "Vertex Tech",
    planId: "plan-2",
    planName: "Standard Monthly",
    amount: 999,
    discount: 0,
    finalAmount: 999,
    salesEmployeeId: "emp-2",
    salesEmployeeName: "Sonia Kapoor",
    status: 'Proposal',
    paymentStatus: 'Pending',
    created: "2024-08-10T09:15:00Z",
    lastActivity: "2024-08-11T11:00:00Z"
  }
];

export const demoPaymentLinks: DemoPaymentLink[] = [
  {
    id: "LNK-7788",
    saleId: "SALE-1002",
    customerName: "Priya Das",
    phone: "+91 98765 00001",
    email: "priya.d@example.com",
    amount: 999,
    status: 'Active',
    created: "2024-08-10T09:20:00Z",
    expires: "2024-08-17T09:20:00Z",
    createdBy: "Sonia Kapoor"
  }
];

export const demoPayments: DemoPayment[] = [
  {
    id: "PAY-9901",
    saleId: "SALE-1001",
    customerId: "cust-1",
    customerName: "Rahul Verma",
    amount: 11000,
    method: "UPI",
    status: 'Paid',
    date: "2024-08-01T14:25:00Z",
    reference: "RRR123456789"
  }
];

export const demoInvoices: DemoInvoice[] = [
  {
    id: "INV-2024-001",
    saleId: "SALE-1001",
    customerName: "Rahul Verma",
    amount: 11000,
    status: 'Paid',
    issueDate: "2024-08-01",
    dueDate: "2024-08-01",
    paymentStatus: 'Paid'
  }
];

export const demoSalesDocumentTemplate = {
  id: "template-1",
  name: "Standard Sales Document",
  version: "1.2.0",
  lastPublished: "2024-07-20",
  content: "This document outlines the terms of your purchase from {{business_name}}.",
  variables: ["business_name", "customer_name", "plan_name", "amount", "date"]
};

export interface DemoTransaction {
  id: string;
  type: 'Payment' | 'Refund' | 'Adjustment' | 'Other';
  customerName: string;
  saleId: string;
  business: string;
  amount: number;
  method: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  reference: string;
}

export interface DemoRefund {
  id: string;
  paymentId: string;
  customerName: string;
  saleId: string;
  amount: number;
  reason: string;
  status: 'Requested' | 'Processing' | 'Completed' | 'Rejected';
  requestedBy: string;
  requestedDate: string;
  processedDate?: string;
}

export interface DemoExpense {
  id: string;
  category: 'Operations' | 'Marketing' | 'Software' | 'Office' | 'Payroll' | 'Travel' | 'Other';
  description: string;
  amount: number;
  business: string;
  submittedBy: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
}

export interface DemoPayrollRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  role: string;
  business: string;
  baseSalary: number;
  incentive: number;
  deductions: number;
  netSalary: number;
  status: 'Draft' | 'Processing' | 'Paid';
}

export const demoTransactions: DemoTransaction[] = [
  { id: "TXN-5001", type: 'Payment', customerName: "Rahul Verma", saleId: "SALE-1001", business: "Acme India", amount: 11000, method: "UPI", status: 'Completed', date: "2024-08-01T14:25:00Z", reference: "RRR123456789" },
  { id: "TXN-5002", type: 'Refund', customerName: "Amit Patel", saleId: "SALE-995", business: "Vertex Tech", amount: 2500, method: "Bank Transfer", status: 'Completed', date: "2024-08-05T10:00:00Z", reference: "REF990011" },
];

export const demoRefunds: DemoRefund[] = [
  { id: "RFD-2001", paymentId: "PAY-9000", customerName: "Amit Patel", saleId: "SALE-995", amount: 2500, reason: "Service cancellation", status: 'Completed', requestedBy: "Sonia Kapoor", requestedDate: "2024-08-04", processedDate: "2024-08-05" },
  { id: "RFD-2002", paymentId: "PAY-9901", customerName: "Rahul Verma", saleId: "SALE-1001", amount: 1000, reason: "Duplicate charge", status: 'Requested', requestedBy: "Ankit Singh", requestedDate: "2024-08-12" },
];

export const demoExpenses: DemoExpense[] = [
  { id: "EXP-3001", category: 'Software', description: "AWS Cloud Services", amount: 45000, business: "Platform", submittedBy: "Tech Admin", date: "2024-08-01", status: 'Approved', approvedBy: "Owner" },
  { id: "EXP-3002", category: 'Operations', description: "Office Rent - Mumbai", amount: 125000, business: "Acme India", submittedBy: "Admin", date: "2024-08-02", status: 'Pending' },
];

export const demoPayroll: DemoPayrollRecord[] = [
  { id: "PAYROLL-001", employeeName: "Ankit Singh", employeeId: "EMP-001", role: "Sales Manager", business: "Acme India", baseSalary: 45000, incentive: 12500, deductions: 2500, netSalary: 55000, status: 'Paid' },
  { id: "PAYROLL-002", employeeName: "Sonia Kapoor", employeeId: "EMP-002", role: "Sales Executive", business: "Vertex Tech", baseSalary: 35000, incentive: 8200, deductions: 1800, netSalary: 41400, status: 'Draft' },
];

export const demoReconciliation = [
  { id: "REC-4001", saleId: "SALE-1001", paymentId: "PAY-9901", invoiceId: "INV-2024-001", expectedAmount: 11000, receivedAmount: 11000, difference: 0, status: 'Matched', date: "2024-08-01" },
  { id: "REC-4002", saleId: "SALE-1050", paymentId: "PAY-9950", invoiceId: "INV-2024-050", expectedAmount: 15000, receivedAmount: 14500, difference: 500, status: 'Mismatch', date: "2024-08-10" },
];
