import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Layout,
  Zap,
  ShieldCheck,
  Settings,
  Download,
  Calendar,
  Sparkles
} from 'lucide-react';

// Specialized Founder Components
import { FounderDashboard } from '@/components/founder/FounderDashboard';
import { BusinessBrief } from '@/components/founder/BusinessBrief';
import { AIFounderAdvisor } from '@/components/founder/AIFounderAdvisor';
import { ExecutiveControls } from '@/components/founder/ExecutiveControls';

export const Route = createFileRoute('/modules/founder')({
  component: FounderWorkspace,
});

function FounderWorkspace() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <PageHeader 
        eyebrow="ABOS Executive Office"
        title="Founder OS & CEO Cockpit" 
        description="Strategic command center for organizational intelligence and real-time decision support."
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm border-border/50 bg-card/50">
              <Calendar className="w-4 h-4 mr-2" />
              Q3 Targets
            </Button>
            <Button variant="outline" className="shadow-sm border-border/50 bg-card/50">
              <Download className="w-4 h-4 mr-2" />
              Executive Report
            </Button>
            <Button className="shadow-elevated font-bold bg-primary hover:bg-primary/90">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Insight
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl border border-border/50 w-fit overflow-x-auto max-w-full">
          <TabsTrigger value="dashboard" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-tight transition-all">
            <Layout className="w-3 h-3 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="brief" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-tight transition-all">
            <Zap className="w-3 h-3 mr-2" />
            Today's Brief
          </TabsTrigger>
          <TabsTrigger value="advisor" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-tight transition-all">
            <Sparkles className="w-3 h-3 mr-2" />
            AI Advisor
          </TabsTrigger>
          <TabsTrigger value="controls" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-tight transition-all">
            <ShieldCheck className="w-3 h-3 mr-2" />
            Controls & Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <FounderDashboard />
        </TabsContent>

        <TabsContent value="brief" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <BusinessBrief />
        </TabsContent>

        <TabsContent value="advisor" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <AIFounderAdvisor />
        </TabsContent>

        <TabsContent value="controls" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <ExecutiveControls />
        </TabsContent>
      </Tabs>
    </div>
  );
}
