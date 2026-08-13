import * as React from "react";
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminStudioHome } from "@/components/admin-studio/AdminStudioHome";
import { ModuleManagement } from "@/components/admin-studio/ModuleManagement";
import { CRMBuilder } from "@/components/admin-studio/CRMBuilder";
import { WorkflowBuilder } from "@/components/admin-studio/WorkflowBuilder";
import { BrandingBuilder } from "@/components/admin-studio/BrandingBuilder";
import { PolicyManager } from "@/components/admin-studio/PolicyManager";
import { AdminAuditCenter } from "@/components/admin-studio/AdminAuditCenter";
import { LayoutGrid, Database, Layers, GitBranch, Settings, History, ShieldAlert, Search, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalSearchOverlay } from "@/components/shared/GlobalSearchOverlay";
import { Link as RouterLink, useLocation } from "@tanstack/react-router";


export const Route = createFileRoute("/modules/admin")({
  component: AdminStudioModule,
});

function AdminStudioModule() {
  const location = useLocation();
  const isBaseRoute = location.pathname === "/modules/admin" || location.pathname === "/modules/admin/";

  const [searchOpen, setSearchOpen] = React.useState(false);

  // Global search keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!isBaseRoute) {
    return (
      <div className="p-6 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-500">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <GlobalSearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <PageHeader
            eyebrow="PLATFORM GOVERNANCE"
            title="Admin Studio"
            description="Enterprise-wide command center for ABOS configuration and system architecture."
            className="p-0"
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 px-3 gap-2 bg-accent/30 border-border/40 text-muted-foreground hover:text-foreground hidden md:flex"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="size-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Search...</span>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-background border border-border/40 text-[8px]">
              <span className="opacity-50">⌘</span>K
            </div>
          </Button>
        </div>
        <div className="flex items-center gap-2">

          <Badge variant="outline" className="h-6 gap-1 bg-navy/5 text-navy border-navy/10 font-bold text-[10px] uppercase tracking-widest">
            <History className="size-3" />
            Last Synced: 2m ago
          </Badge>
        </div>
      </div>

      <div className="w-full">
        <div className="flex w-full justify-start border-b border-border/40 mb-6 bg-transparent gap-2 overflow-x-auto no-scrollbar">
          <AdminTabLink to="/modules/admin" active={isBaseRoute} icon={LayoutGrid} label="Dashboard" />
          <AdminTabLink to="/modules/admin/modules" active={location.pathname === "/modules/admin/modules"} icon={Layers} label="Modules" />
          <AdminTabLink to="/modules/admin/business" active={location.pathname === "/modules/admin/business"} icon={Settings} label="Business" />
          <AdminTabLink to="/modules/admin/employees" active={location.pathname === "/modules/admin/employees"} icon={Settings} label="People" />
          <AdminTabLink to="/modules/admin/roles" active={location.pathname === "/modules/admin/roles"} icon={ShieldAlert} label="Roles" />
          <AdminTabLink to="/modules/admin/crm" active={location.pathname === "/modules/admin/crm"} icon={Database} label="CRM Config" />
          <AdminTabLink to="/modules/admin/sales" active={location.pathname === "/modules/admin/sales"} icon={Settings} label="Sales" />
          <AdminTabLink to="/modules/admin/incentives" active={location.pathname === "/modules/admin/incentives"} icon={GitBranch} label="Incentives" />
          <AdminTabLink to="/modules/admin/workflows" active={location.pathname === "/modules/admin/workflows"} icon={GitBranch} label="Workflows" />
          <AdminTabLink to="/modules/admin/branding" active={location.pathname === "/modules/admin/branding"} icon={Settings} label="Branding" />
          <AdminTabLink to="/modules/admin/policies" active={location.pathname === "/modules/admin/policies"} icon={ShieldAlert} label="Policies" />
          <AdminTabLink to="/modules/admin/audit" active={location.pathname === "/modules/admin/audit"} icon={History} label="Audit Center" />
          <AdminTabLink to="/modules/admin/security" active={location.pathname === "/modules/admin/security"} icon={ShieldAlert} label="Security" />
          <AdminTabLink to="/modules/admin/data" active={location.pathname === "/modules/admin/data"} icon={Database} label="Data Center" />
          <AdminTabLink to="/modules/admin/integrations" active={location.pathname === "/modules/admin/integrations"} icon={Link} label="Integrations" />
          <AdminTabLink to="/modules/admin/system" active={location.pathname === "/modules/admin/system"} icon={Settings} label="System" />
        </div>

        {isBaseRoute ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <AdminStudioHome />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
function AdminTabLink({ to, active, icon: Icon, label }: { to: string, active: boolean, icon: any, label: string }) {
  return (
    <RouterLink 
      to={to} 
      className={cn(
        "flex items-center gap-2 px-4 py-3 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all shrink-0",
        active 
          ? "border-primary text-primary" 
          : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/10"
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </RouterLink>
  );
}

import { cn } from "@/lib/utils";
