import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Calendar, 
  LayoutGrid, 
  Settings2,
  Sparkles,
  ShieldCheck,
  ClipboardList,
  AlertOctagon,
  Users,
  Target
} from 'lucide-react';

import { PMODashboard } from '@/components/projects/PMODashboard';
import { ProjectDirectory } from '@/components/projects/ProjectDirectory';
import { TaskManagement } from '@/components/projects/TaskManagement';
import { ResourcePlanning } from '@/components/projects/ResourcePlanning';
import { RiskRegister } from '@/components/projects/RiskRegister';
import { PMOIntelligence } from '@/components/projects/PMOIntelligence';
import { AuditTimeline } from '@/components/projects/AuditTimeline';

export const Route = createFileRoute('/modules/projects')({
  component: ProjectsWorkspace,
});

function ProjectsWorkspace() {
  return (
    <div className="flex flex-col gap-6 p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <PageHeader 
        title="Enterprise PMO" 
        description="Strategic project management office, portfolio orchestration, and delivery excellence."
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm border-slate-200 font-bold text-xs uppercase tracking-widest px-6 h-11">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              Global Timeline
            </Button>
            <Button className="shadow-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest px-6 h-11">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="dashboard" className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1 overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-8">
            {[
              { value: "dashboard", label: "Dashboard", icon: Target },
              { value: "directory", label: "Directory", icon: LayoutGrid },
              { value: "tasks", label: "Global Kanban", icon: ClipboardList },
              { value: "resources", label: "Resource Planning", icon: Users },
              { value: "risks", label: "Risk Register", icon: AlertOctagon },
              { value: "reporting", label: "Intelligence", icon: Sparkles },
              { value: "audit", label: "Audit Trail", icon: ShieldCheck },
            ].map(tab => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="px-0 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all text-xs font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-slate-900 flex items-center gap-2"
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <Button variant="ghost" size="sm" className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
            <Settings2 className="w-3.5 h-3.5" />
            PMO Config
          </Button>
        </div>

        <TabsContent value="dashboard" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <PMODashboard />
        </TabsContent>

        <TabsContent value="directory" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <ProjectDirectory />
        </TabsContent>

        <TabsContent value="tasks" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <TaskManagement />
        </TabsContent>

        <TabsContent value="resources" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <ResourcePlanning />
        </TabsContent>

        <TabsContent value="risks" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <RiskRegister />
        </TabsContent>

        <TabsContent value="reporting" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <PMOIntelligence />
        </TabsContent>

        <TabsContent value="audit" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <AuditTimeline />
        </TabsContent>
      </Tabs>
    </div>
  );
}

