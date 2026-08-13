import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminStudioHome } from "@/components/admin-studio/AdminStudioHome";
import { ModuleManagement } from "@/components/admin-studio/ModuleManagement";
import { CRMBuilder } from "@/components/admin-studio/CRMBuilder";
import { WorkflowBuilder } from "@/components/admin-studio/WorkflowBuilder";
import { BrandingBuilder } from "@/components/admin-studio/BrandingBuilder";
import { PolicyManager } from "@/components/admin-studio/PolicyManager";
import { AdminAuditCenter } from "@/components/admin-studio/AdminAuditCenter";
import { LayoutGrid, Database, Layers, GitBranch, Settings, History, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/modules/admin")({
  component: AdminStudioModule,
});

function AdminStudioModule() {
  return (
    <div className="flex flex-col gap-6 p-6 pb-20 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <PageHeader
          eyebrow="PLATFORM GOVERNANCE"
          title="Admin Studio"
          description="Enterprise-wide command center for ABOS configuration and system architecture."
          className="p-0"
        />
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="h-6 gap-1 bg-navy/5 text-navy border-navy/10 font-bold text-[10px] uppercase tracking-widest">
            <History className="size-3" />
            Last Synced: 2m ago
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger value="home" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">
            <LayoutGrid className="mr-2 size-3.5" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="modules" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">
            <Layers className="mr-2 size-3.5" /> Modules
          </TabsTrigger>
          <TabsTrigger value="crm" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">
            <Database className="mr-2 size-3.5" /> CRM Config
          </TabsTrigger>
          <TabsTrigger value="workflows" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">
            <GitBranch className="mr-2 size-3.5" /> Workflows
          </TabsTrigger>
          <TabsTrigger value="branding" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">
            <Settings className="mr-2 size-3.5" /> Branding
          </TabsTrigger>
          <TabsTrigger value="policies" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">
            <ShieldAlert className="mr-2 size-3.5" /> Policies
          </TabsTrigger>
          <TabsTrigger value="audit" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">
            <History className="mr-2 size-3.5" /> Audit Center
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="pt-6">
          <AdminStudioHome />
        </TabsContent>
        <TabsContent value="modules" className="pt-6">
          <ModuleManagement />
        </TabsContent>
        <TabsContent value="crm" className="pt-6">
          <CRMBuilder />
        </TabsContent>
        <TabsContent value="workflows" className="pt-6">
          <WorkflowBuilder />
        </TabsContent>
        <TabsContent value="branding" className="pt-6">
          <BrandingBuilder />
        </TabsContent>
        <TabsContent value="policies" className="pt-6">
          <PolicyManager />
        </TabsContent>
        <TabsContent value="audit" className="pt-6">
          <AdminAuditCenter />
        </TabsContent>
      </Tabs>
    </div>
  );
}
