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
    basePath: "/modules/sales",
    navigation: [
      { id: "sales-list", label: "Sales", path: "/modules/sales/list" },
      { id: "plans", label: "Plans", path: "/modules/sales/plans" },
      { id: "payment-links", label: "Payment Links", path: "/modules/sales/links" },
      { id: "invoices", label: "Invoices", path: "/modules/sales/invoices" },
    ]
  },
  {
    id: "support",
    name: "Support",
    description: "Multi-channel support and communication.",
    icon: LifeBuoy,
    group: "operations",
    order: 30,
    status: "available",
    basePath: "/modules/support",
    navigation: [
      { id: "conversations", label: "Conversations", path: "/modules/support/chat" },
      { id: "calls", label: "Calls", path: "/modules/support/calls" },
      { id: "video-calls", label: "Video Calls", path: "/modules/support/video" },
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
    basePath: "/modules/activation",
  },
  {
    id: "finance",
    name: "Finance",
    description: "Treasury, payroll and expenses.",
    icon: DollarSign,
    group: "finance",
    order: 50,
    status: "available",
    basePath: "/modules/finance",
    navigation: [
      { id: "payments", label: "Payments", path: "/modules/finance/payments" },
      { id: "refunds", label: "Refunds", path: "/modules/finance/refunds" },
      { id: "expenses", label: "Expenses", path: "/modules/finance/expenses" },
      { id: "payroll", label: "Payroll", path: "/modules/finance/payroll" },
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

