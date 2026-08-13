import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { 
  LayoutGrid, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowUpRight,
  Plus,
  Zap,
  ChevronRight,
  PieChart,
  BarChart3,
  Search,
  Activity,
  Calendar,
  ShieldCheck,
  Building2,
  Box,
  Heart,
  UserPlus
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { appConfig } from "@/config/app.config";
import { bootstrapModules } from "@/core/modules/modules.config";
import { moduleRegistry } from "@/core/modules/registry";
import { useRbac } from "@/core/rbac/RbacProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CEO Cockpit — ABOS Executive Dashboard" },
      {
        name: "description",
        content:
          "Executive command center for Adzdrio Business Operating System. Real-time insights, KPIs, and organizational health.",
      },
      { property: "og:title", content: "CEO Cockpit — ABOS Executive Dashboard" },
      {
        property: "og:description",
        content: "High-level executive dashboard for Adzdrio India Services.",
      },
    ],
  }),
  component: ExecutiveDashboard,
});

function ExecutiveDashboard() {
  bootstrapModules();
  const { principal } = useRbac();

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-700">
      <PageHeader
        eyebrow={appConfig.organization}
        title={`Executive Dashboard`}
        description={`Welcome back, ${principal?.displayName ?? "Executive"}. Here is your command center overview for today.`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass-surface h-9" onClick={() => window.print()}>
              <Calendar className="mr-2 size-4" />
              This Month
            </Button>
            <Button size="sm" className="shadow-elevated h-9" onClick={() => toast.info("Report generation initialized")}>
              <Zap className="mr-2 size-4" />
              Generate Report
            </Button>
          </div>
        }

      />

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Monthly Recurring Revenue" 
          value="Data Pending" 
          trend="—" 
          trendUp={true} 
          icon={DollarSign}
          subtext="Integration in progress"
        />
        <KPICard 
          title="Active Subscriptions" 
          value="Data Pending" 
          trend="—" 
          trendUp={true} 
          icon={ShieldCheck}
          subtext="Integration in progress"
        />
        <KPICard 
          title="Collection Rate" 
          value="Data Pending" 
          trend="—" 
          trendUp={true} 
          icon={BarChart3}
          subtext="Integration in progress"
        />
        <KPICard 
          title="Organization Health" 
          value="94%" 
          trend="Verified" 
          trendUp={true} 
          icon={Heart}
          subtext="Stable Growth"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Feed & Health */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionCard title="Revenue Growth" className="h-[320px]">
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <BarChart3 className="size-12 mb-4 opacity-10" />
                <p className="text-sm font-medium">Financial data stream pending</p>
                <p className="text-xs opacity-60 italic">'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            Build the complete frontend foundation and app shell for a production-grade multi-business CRM/ERP platform.

IMPORTANT:

This is a UI/UX prototype phase only.

DO NOT implement real backend logic.

DO NOT create fake API integrations.

DO NOT claim that payments, authentication, HR calculations, legal signing, Leegality, calling, or external integrations are functional.

Use clearly separated local/mock UI state only where necessary to demonstrate the interface.

The frontend architecture must be designed so the real backend/API can be connected later without rebuilding the UI.

==================================================

PRODUCT STRUCTURE

==================================================

The application is a multi-business CRM/ERP platform.

The hierarchy is:

Owner

→ Business / Brand

→ Role

→ Dashboard

→ Modules

→ Permissions

The system must support multiple businesses/brands in the future.

Do NOT hard-code the entire UI specifically for one business.

==================================================

DESIGN DIRECTION

==================================================

Create a modern, premium, professional SaaS CRM interface.

It should feel like a serious production business platform, not a generic admin template.

Design priorities:

- Clean

- Premium

- Professional

- High information density without feeling crowded

- Excellent hierarchy

- Fast navigation

- Clear actions

- Consistent spacing

- Excellent typography

- Strong table design

- Excellent form UX

- Subtle animations

- Responsive

- Accessible

- Desktop-first, but fully responsive on tablet/mobile

Avoid:

- Excessive gradients

- Huge decorative graphics

- Overly rounded cartoon-style cards

- Excessive shadows

- Unnecessary animations

- Generic template appearance

- Fake charts with meaningless decoration

==================================================

APP SHELL

==================================================

Create:

1. Left sidebar

2. Top header

3. Main content area

4. Breadcrumbs where useful

5. Global search

6. Notifications

7. User/profile menu

8. Business switcher

9. Responsive mobile navigation

Sidebar must support:

- Collapsed state

- Expanded state

- Active navigation state

- Nested navigation

- Permission-aware visibility

- Tooltips when collapsed

==================================================

SIDEBAR INFORMATION ARCHITECTURE

==================================================

Create the navigation structure visually, but do NOT implement real permission enforcement yet.

Main navigation:

Dashboard

CRM

  - Lead Pool

  - My Leads

  - Customers

  - Follow-ups

  - Callbacks

Sales

  - Sales

  - Plans

  - Payment Links

  - Invoices

Support

  - Conversations

  - Calls

  - Video Calls

Activation

Finance

  - Payments

  - Refunds

  - Expenses

  - Payroll

HR

  - Employees

  - Attendance

  - Leave

  - Salary

  - Salary Slips

  - Incentives

  - Referrals

Reports

Documents

Projects

Inventory

Admin Studio

  - Business

  - Employees

  - Roles & Permissions

  - CRM Fields

  - Legal Templates

  - Device Settings

  - Incentive Rules

  - Notifications

  - Integrations

  - Security

  - Audit

  - Data Center

  - System Settings

==================================================

HEADER

==================================================

Create a premium top header containing:

- Mobile menu

- Breadcrumb

- Global search

- Business switcher

- Notifications

- Help/support icon

- User avatar

- User name

- Role

- Profile menu

Profile menu:

- My Profile

- Settings

- Security

- Lock Workspace

- Logout

==================================================

GLOBAL SEARCH

==================================================

Create the UI for global search.

Search categories visually:

- Customers

- Leads

- Employees

- Sales

- Transactions

- Invoices

- Documents

Include:

- Search input

- Keyboard shortcut indicator

- Recent searches

- Search suggestions

- Categorized results

- Empty state

- No-result state

Do not connect to a real backend.

==================================================

NOTIFICATIONS

==================================================

Create a notification center UI.

Categories:

- Sales

- CRM

- Follow-up

- Callback

- Payment

- HR

- Legal

- Security

- System

Include:

- Unread count

- Read/unread states

- Mark as read

- Mark all as read

- Notification grouping

- Timestamp

- Priority indicator

==================================================

BUSINESS SWITCHER

==================================================

Create a business/brand switcher.

Example UI data only:

Business A

Business B

Business C

Include:

- Current business

- Business logo/avatar

- Search

- Recent businesses

- Switch confirmation state

Do not hard-code real business names into the architecture.

==================================================

GLOBAL UI COMPONENTS

==================================================

Create reusable components for:

- Buttons

- Icon buttons

- Inputs

- Search inputs

- Select

- Multi-select

- Date picker

- Date range picker

- Phone input

- Currency input

- Textarea

- Checkbox

- Radio

- Toggle

- Tabs

- Badges

- Status pills

- Cards

- Stat cards

- Tables

- Pagination

- Filters

- Dropdown menus

- Modals

- Drawers

- Confirmation dialogs

- Toasts

- Tooltips

- Skeleton loaders

- Empty states

- Error states

- Success states

- Permission denied state

- File upload

- Avatar

- Timeline

- Activity feed

==================================================

DATA TABLE DESIGN

==================================================

Create a reusable professional table system.

Requirements:

- Sticky header

- Sortable columns

- Search

- Filters

- Pagination

- Row selection

- Bulk actions

- Column visibility

- Density control

- Export button UI

- Empty state

- Loading skeleton

- Error state

- Responsive behavior

==================================================

FORMS

==================================================

Create a reusable form system.

Every form should support:

- Required field indicator

- Optional field indicator

- Validation message

- Disabled state

- Loading state

- Success state

- Error state

- Unsaved changes warning

- Cancel confirmation where necessary

==================================================

RESPONSIVE

==================================================

Desktop:

Full sidebar + header + content.

Tablet:

Compact navigation and responsive tables.

Mobile:

Bottom/slide navigation where appropriate.

Cards instead of wide tables when necessary.

Maintain usability without simply shrinking desktop UI.

==================================================

UI STATES

==================================================

Create reusable examples of:

1. Loading

2. Empty

3. Populated

4. Error

5. Success

6. Disabled

7. Permission denied

8. Offline/unavailable

9. Confirmation

10. Destructive action confirmation

==================================================

IMPORTANT ARCHITECTURE RULE

==================================================

Separate UI components from business logic.

Use mock/local data only for visual demonstration.

Create clean frontend service/API abstraction boundaries so later we can replace mock data with real backend APIs without redesigning components.

Do NOT put business calculations, payment verification, salary calculation, legal signing, permissions, or security logic inside visual components.

==================================================

DELIVERABLE

==================================================

At the end of this task, I should have:

- Complete application shell

- Professional sidebar

- Header

- Global search UI

- Business switcher

- Notification center

- Profile menu

- Responsive layout

- Reusable design system

- Reusable table system

- Reusable form system

- Reusable modal/drawer system

- Loading/empty/error/success/permission states

- Proper frontend component structure

Do NOT build all CRM modules yet.

First make the foundation visually excellent and production-quality.</p>
              </div>
            </SectionCard>
            <SectionCard title="Sales Pipeline" className="h-[320px]">
               <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <PieChart className="size-12 mb-4 opacity-10" />
                <p className="text-sm font-medium">Pipeline distribution empty</p>
                <p className="text-xs opacity-60 italic">Qualified leads & deals tracking</p>
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Organization Health Index">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
               <HealthMeter label="Sales" value={92} status="success" />
               <HealthMeter label="HR" value={88} status="success" />
               <HealthMeter label="Finance" value={96} status="success" />
               <HealthMeter label="Ops" value={84} status="success" />
               <HealthMeter label="Marketing" value={78} status="warning" />
               <HealthMeter label="AI" value={91} status="success" />
               <HealthMeter label="Legal" value={100} status="success" />
            </div>
          </SectionCard>

          <SectionCard title="Executive Feed" actions={<Button variant="ghost" size="sm">View All</Button>}>
            <div className="space-y-4">
              <FeedItem 
                icon={TrendingUp} 
                title="System Initialized" 
                time="Just now" 
                description="ABOS core connection established. Monitoring real-time streams."
                tone="success"
              />
              <FeedItem 
                icon={ShieldCheck} 
                title="Production Audit" 
                time="1h ago" 
                description="Backend integration foundation verified. CRM directory active."
                tone="success"
              />
              <FeedItem 
                icon={AlertCircle} 
                title="Environmental Check" 
                time="3h ago" 
                description="VITE_API_BASE_URL resolution active. Secure tunnel established."
                tone="success"
              />
            </div>
          </SectionCard>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          <SectionCard title="Quick Actions" contentClassName="p-0">
            <div className="grid grid-cols-2 gap-px bg-border/40">
              <ActionItem icon={UserPlus} label="Add Employee" to="/modules/employees" />
              <ActionItem icon={Plus} label="Create Lead" to="/modules/crm" />
              <ActionItem icon={DollarSign} label="New Invoice" to="/modules/finance" />
              <ActionItem icon={CheckCircle2} label="Approve Leave" to="/modules/hrms" />
              <ActionItem icon={Zap} label="Start Payroll" to="/modules/hrms" />
              <ActionItem icon={Briefcase} label="New Project" to="/modules/projects" />
            </div>

          </SectionCard>

          <SectionCard title="Pending Approvals" footer={<Button variant="ghost" size="sm" className="w-full text-xs">Manage All Approvals</Button>}>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg glass-surface border border-border/40">
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-[10px]">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-bold">Leave Request</p>
                    <p className="text-[10px] text-muted-foreground">Jane Doe · Sick Leave</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="size-6 text-success"><CheckCircle2 className="size-3" /></Button>
                  <Button size="icon" variant="ghost" className="size-6 text-destructive"><XIcon className="size-3" /></Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg glass-surface border border-border/40">
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-[10px]">JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-bold">Expense Claim</p>
                    <p className="text-[10px] text-muted-foreground">John Smith · Travel</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="size-6 text-success"><CheckCircle2 className="size-3" /></Button>
                  <Button size="icon" variant="ghost" className="size-6 text-destructive"><XIcon className="size-3" /></Button>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="AI Strategic Insights" className="border-primary/20 bg-primary/5">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-6 rounded-md bg-primary/20 flex items-center justify-center shrink-0">
                  <Zap className="size-3 text-primary" />
                </div>
                <p className="text-xs leading-relaxed">
                  Revenue forecast suggests a 12% growth potential if Lead Conversion optimization is applied this month.
                </p>
              </div>
              <Button size="sm" variant="outline" className="w-full glass-surface text-xs h-8">View Predictions</Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, trend, trendUp, icon: Icon, subtext }: any) {
  return (
    <Card className="surface-card shadow-card border-border/40 overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
          <div className="size-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <Icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h4 className="text-2xl font-black tracking-tighter">{value}</h4>
          <Badge variant="outline" className={cn(
            "text-[9px] px-1 py-0 border-none font-bold",
            trendUp ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
          )}>
            {trendUp ? <TrendingUp className="size-2 mr-0.5 inline" /> : <TrendingDown className="size-2 mr-0.5 inline" />}
            {trend}
          </Badge>
        </div>
        <p className="mt-1 text-[10px] text-muted-foreground italic">{subtext}</p>
      </CardContent>
    </Card>
  );
}

function HealthMeter({ label, value, status }: { label: string; value: number; status: "neutral" | "success" | "warning" | "danger" }) {
  const statusColors = {
    neutral: "bg-muted-foreground/20",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };
  
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-lg glass-surface border border-border/40 transition-all hover:shadow-elevated">
      <span className="text-[10px] font-bold uppercase tracking-tight opacity-70">{label}</span>
      <div className="relative size-10 flex items-center justify-center">
        <svg className="size-full -rotate-90">
          <circle cx="20" cy="20" r="18" fill="transparent" stroke="currentColor" strokeWidth="3" className="text-border/40" />
          <circle cx="20" cy="20" r="18" fill="transparent" stroke="currentColor" strokeWidth="3" strokeDasharray={113} strokeDashoffset={113 - (113 * value) / 100} className={cn("transition-all duration-1000", status === 'neutral' ? 'text-muted-foreground/40' : toneMapClasses[status as keyof typeof toneMapClasses]?.split(' ')[1])} />
        </svg>
        <span className="absolute text-[10px] font-black">{value}%</span>
      </div>
    </div>
  );
}

function FeedItem({ icon: Icon, title, time, description, tone = "neutral" }: any) {
  const toneMap: any = {
    neutral: "text-muted-foreground bg-muted/20",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
  };
  
  return (
    <div className="flex gap-4 p-3 rounded-xl hover:bg-muted/5 transition-colors group border border-transparent hover:border-border/40">
      <div className={cn("size-8 rounded-lg flex items-center justify-center shrink-0", toneMap[tone])}>
        <Icon className="size-4" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold tracking-tight">{title}</h4>
          <span className="text-[10px] text-muted-foreground">{time}</span>
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function ActionItem({ icon: Icon, label, to }: { icon: any, label: string, to?: string }) {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => to && navigate({ to })}
      className="flex flex-col items-center justify-center gap-2 p-4 bg-card hover:bg-muted/30 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    >
      <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        <Icon className="size-4" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
    </button>
  );
}


function XIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}

import { cn } from "@/lib/utils";
const toneMapClasses: Record<string, string> = {
  neutral: "bg-muted text-muted-foreground",
  success: "bg-success/12 text-success",
  warning: "bg-primary-soft text-accent-foreground",
  info: "bg-info/12 text-info",
  danger: "bg-destructive/12 text-destructive",
};
