import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus,
  Download,
  Settings2,
  RefreshCw,
  Target,
  History,
  TrendingUp,
  FileText,
  BarChart3
} from 'lucide-react';

import { RenewalCenter } from '@/components/renewals/RenewalCenter';
import { StatusBadge } from '@/components/shared/StatusBadge';

export const Route = createFileRoute('/modules/renewals')({
  head: () => ({
    meta: [
      { title: "Renewal Center — ABOS" },
      {
        name: "description",
        content: "Enterprise renewal management and retention workspace.",
      },
    ],
  }),
  component: RenewalsWorkspace,
});

function RenewalsWorkspace() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <PageHeader 
        eyebrow="Revenue Operations"
        title="Renewal Center" 
        description="Strategic workspace for managing subscription lifecycles, customer retention, and renewal pipeline intelligence."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="glass-surface h-9">
              <Settings2 className="w-4 h-4 mr-2" />
              Workflow Config
            </Button>
            <Button className="shadow-elevated h-9 font-bold bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Renewal Cycle
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="center" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl border border-border/50 w-fit">
          <TabsTrigger value="center" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-[10px] uppercase tracking-widest transition-all">Renewal Dashboard</TabsTrigger>
          <TabsTrigger value="pipeline" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-[10px] uppercase tracking-widest transition-all">Pipeline</TabsTrigger>
          <TabsTrigger value="intelligence" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-[10px] uppercase tracking-widest transition-all">Intelligence</TabsTrigger>
          <TabsTrigger value="templates" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-[10px] uppercase tracking-widest transition-all">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="center" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <RenewalCenter />
        </TabsContent>

        <TabsContent value="pipeline" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
           <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground/40 text-xs italic border-2 border-dashed border-border/40 rounded-2xl">
              <BarChart3 className="size-12 mb-4 opacity-10" />
              Visual Kanban Pipeline View Rendering...
           </div>
        </TabsContent>

        <TabsContent value="intelligence" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
           <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground/40 text-xs italic border-2 border-dashed border-border/40 rounded-2xl">
              <TrendingUp className="size-12 mb-4 opacity-10" />
              Strategic Revenue Intelligence View Rendering...
           </div>
        </TabsContent>

        <TabsContent value="templates" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
           <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground/40 text-xs italic border-2 border-dashed border-border/40 rounded-2xl">
              <FileText className="size-12 mb-4 opacity-10" />
              Notification Template Configurator Rendering...
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
