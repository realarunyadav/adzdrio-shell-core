import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminStudioHome } from "@/components/admin-studio/AdminStudioHome";
import { ModuleManagement } from "@/components/admin-studio/ModuleManagement";
import { CRMBuilder } from "@/components/admin-studio/CRMBuilder";
import { WorkflowBuilder } from "@/components/admin-studio/WorkflowBuilder";
import { BrandingBuilder } from "@/components/admin-studio/BrandingBuilder";
import { AdminAuditCenter } from "@/components/admin-studio/AdminAuditCenter";
import { LayoutGrid, Database, Layers, GitBranch, Settings, History } from "lucide-react";

export const Route = createFileRoute("/modules/admin")({
  component: AdminStudioModule,
});

function AdminStudioModule() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        eyebrow="System Administration"
        title="Admin Studio"
        description="Centralized command center for ABOS enterprise configuration and platform governance."
      />

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
        <TabsContent value="audit" className="pt-6">
          <AdminAuditCenter />
        </TabsContent>
      </Tabs>
    </div>
  );
}
