import {
  Building,
  Calendar,
  Globe,
  Grid,
  Hash,
  Layout,
  MapPin,
  Palette,
  ShieldCheck,
  Users,
  Rocket,
  LifeBuoy,
  RefreshCw,
  UserCircle,
  Mail,
  Trophy,
  Database,
  PieChart,
  DollarSign,
  FileText,
  CreditCard,
  MessageSquare,
  Phone,
  Video,
  ClipboardCheck,
  TrendingUp,
  Briefcase,
  Box,
  Settings,
  Bell,
  Lock,
  Eye,
  Server,
  BarChart3
} from "lucide-react";

import { moduleRegistry } from "./registry";
import type { ModuleDefinition, ModuleGroup } from "./types";

export const moduleGroups: ModuleGroup[] = [
  { id: "platform", label: "Platform", order: 10 },
  { id: "operations", label: "Operations", order: 20 },
  { id: "people", label: "People", order: 30 },
  { id: "finance", label: "Finance", order: 40 },
  { id: "intelligence", label: "Intelligence", order: 50 },
];

export const modules: ModuleDefinition[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Enterprise command center for ABOS.",
    icon: Layout,
    group: "platform",
    order: 1,
    status: "available",
    basePath: "/app",
    permission: "platform.dashboard.view",
  },
  {
    id: "crm",
    name: "CRM",
    description: "Customer relationships and lead management.",
    icon: Users,
    group: "operations",
    order: 10,
    status: "available",
    basePath: "/app/crm",
    permission: "operations.crm.view",
    navigation: [
      { id: "crm-dashboard", label: "CRM Dashboard", path: "/app/crm" },
      { id: "lead-pool", label: "Lead Pool", path: "/app/crm/lead-pool" },
      { id: "my-leads", label: "My Leads", path: "/app/crm/my-leads" },
      { id: "customers", label: "Customers", path: "/app/crm/customers" },
      { id: "follow-ups", label: "Follow-ups", path: "/app/crm/follow-ups" },
      { id: "callbacks", label: "Callbacks", path: "/app/crm/callbacks" },
    ]
  },
  {
    id: "sales",
    name: "Sales",
    description: "Sales tracking, plans and invoicing.",
    icon: TrendingUp,
    group: "operations",
    order: 20,
    status: "available",
    basePath: "/app/sales",
    navigation: [
      { id: "sales-dashboard", label: "Sales Dashboard", path: "/app/sales" },
      { id: "sales-deals", label: "Sales / Deals", path: "/app/sales/deals" },
      { id: "sales-plans", label: "Plans", path: "/app/sales/plans" },
      { id: "sales-payment-links", label: "Payment Links", path: "/app/sales/payment-links" },
      { id: "sales-payments", label: "Payments", path: "/app/sales/payments" },
      { id: "sales-invoices", label: "Invoices", path: "/app/sales/invoices" },
      { id: "sales-reports", label: "Sales Reports", path: "/app/sales/reports" },
    ]
  },
  {
    id: "support",
    name: "Support",
    description: "Enterprise multi-channel support and ticket management.",
    icon: LifeBuoy,
    group: "operations",
    order: 30,
    status: "available",
    basePath: "/app/support",
    navigation: [
      { id: "support-dashboard", label: "Support Dashboard", path: "/app/support" },
      { id: "support-tickets", label: "Tickets", path: "/app/support/tickets" },
      { id: "support-customers", label: "Support Customers", path: "/app/support/customers" },
      { id: "support-kb", label: "Knowledge Base", path: "/app/support/knowledge-base" },
      { id: "support-reports", label: "Support Reports", path: "/app/support/reports" },
    ]
  },
  {
    id: "activation",
    name: "Activation",
    description: "Service activation and onboarding.",
    icon: Rocket,
    group: "operations",
    order: 40,
    status: "available",
    basePath: "/app/activation",
    navigation: [
      { id: "activation-dashboard", label: "Activation Dashboard", path: "/app/activation" },
      { id: "activation-queue", label: "Activation Queue", path: "/app/activation/queue" },
      { id: "activation-assignments", label: "Assignments", path: "/app/activation/assignments" },
      { id: "activation-history", label: "Activation History", path: "/app/activation/history" },
    ]
  },
  {
    id: "finance",
    name: "Finance",
    description: "Treasury, payroll and expenses.",
    icon: DollarSign,
    group: "finance",
    order: 50,
    status: "available",
    basePath: "/app/finance",
    navigation: [
      { id: "finance-dashboard", label: "Finance Dashboard", path: "/app/finance" },
      { id: "finance-payments", label: "Payments", path: "/app/finance/payments" },
      { id: "finance-transactions", label: "Transactions", path: "/app/finance/transactions" },
      { id: "finance-refunds", label: "Refunds", path: "/app/finance/refunds" },
      { id: "finance-invoices", label: "Invoices", path: "/app/finance/invoices" },
      { id: "finance-expenses", label: "Expenses", path: "/app/finance/expenses" },
      { id: "finance-revenue", label: "Revenue", path: "/app/finance/revenue" },
      { id: "finance-reconciliation", label: "Reconciliation", path: "/app/finance/reconciliation" },
      { id: "finance-payroll", label: "Payroll", path: "/app/finance/payroll" },
      { id: "finance-reports", label: "Financial Reports", path: "/app/finance/reports" },
    ]
  },
  {
    id: "hr",
    name: "HR",
    description: "Employee lifecycle and attendance.",
    icon: ShieldCheck,
    group: "people",
    order: 60,
    status: "available",
    basePath: "/modules/hrms",
    navigation: [
      { id: "employees", label: "Employees", path: "/modules/hrms/employees" },
      { id: "attendance", label: "Attendance", path: "/modules/hrms/attendance" },
      { id: "leave", label: "Leave", path: "/modules/hrms/leave" },
      { id: "salary", label: "Salary", path: "/modules/hrms/salary" },
      { id: "salary-slips", label: "Salary Slips", path: "/modules/hrms/slips" },
      { id: "incentives", label: "Incentives", path: "/modules/hrms/incentives" },
      { id: "referrals", label: "Referrals", path: "/modules/hrms/referrals" },
    ]
  },
  {
    id: "reports",
    name: "Reports",
    description: "Business intelligence and custom reporting.",
    icon: BarChart3,
    group: "intelligence",
    order: 70,
    status: "available",
    basePath: "/modules/reports",
  },
  {
    id: "documents",
    name: "Documents",
    description: "Enterprise document management and templates.",
    icon: FileText,
    group: "operations",
    order: 80,
    status: "available",
    basePath: "/modules/documents",
  },
  {
    id: "projects",
    name: "Projects",
    description: "Project planning and delivery.",
    icon: Briefcase,
    group: "operations",
    order: 90,
    status: "available",
    basePath: "/modules/projects",
  },
  {
    id: "inventory",
    name: "Inventory",
    description: "Warehouse and stock management.",
    icon: Box,
    group: "operations",
    order: 100,
    status: "available",
    basePath: "/modules/inventory",
  },
  {
    id: "admin",
    name: "Admin Studio",
    description: "Platform configuration and enterprise controls.",
    icon: Settings,
    group: "platform",
    order: 200,
    status: "available",
    basePath: "/modules/admin",
    navigation: [
      { id: "admin-business", label: "Business", path: "/modules/admin/business" },
      { id: "admin-employees", label: "Employees", path: "/modules/admin/employees" },
      { id: "admin-roles", label: "Roles & Permissions", path: "/modules/admin/roles" },
      { id: "admin-crm", label: "CRM Fields", path: "/modules/admin/crm" },
      { id: "admin-legal", label: "Legal Templates", path: "/modules/admin/legal" },
      { id: "admin-device", label: "Device Settings", path: "/modules/admin/device" },
      { id: "admin-incentive", label: "Incentive Rules", path: "/modules/admin/incentive" },
      { id: "admin-notif", label: "Notifications", path: "/modules/admin/notifications" },
      { id: "admin-int", label: "Integrations", path: "/modules/admin/integrations" },
      { id: "admin-sec", label: "Security", path: "/modules/admin/security" },
      { id: "admin-audit", label: "Audit", path: "/modules/admin/audit" },
      { id: "admin-data", label: "Data Center", path: "/modules/admin/data" },
      { id: "admin-sys", label: "System Settings", path: "/modules/admin/system" },
    ]
  },
];

let bootstrapped = false;

export function bootstrapModules(): void {
  if (bootstrapped) return;
  bootstrapped = true;
  moduleRegistry.registerGroups(moduleGroups);
  moduleRegistry.registerAll(modules);
}

// Re-export Lucide components for dynamic use if needed

