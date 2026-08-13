import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { demoIntegrations } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, Settings2, Plus, Share2 } from "lucide-react";
import { useState } from "react";
import { IntegrationModal } from "@/components/admin-studio/IntegrationModal";

export const Route = createFileRoute("/modules/admin/integrations")({
  component: () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

    const openModal = (integration?: any) => {
      setSelectedIntegration(integration || null);
      setIsModalOpen(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <PageHeader
            title="Integration Manager"
            description="Connect and configure enterprise APIs, webhooks, and third-party platforms."
          />
          <Button onClick={() => openModal()} className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-primary">
            <Plus className="size-4" /> Add Integration
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {demoIntegrations.map((integration) => (
            <Card key={integration.id} className="glass-surface border-border/40 group hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-10 rounded-xl bg-accent/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Share2 className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <Badge variant="outline" className={integration.status === 'Connected' ? 'bg-emerald-500/5 text-emerald-600 border-emerald-500/10' : 'bg-red-500/5 text-red-600 border-red-500/10'}>
                    {integration.status}
                  </Badge>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest">{integration.name}</h3>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase mt-1">{integration.category}</p>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Last Sync</span>
                    <span className="font-bold">{integration.lastSync ? new Date(integration.lastSync).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Usage (MTD)</span>
                    <span className="font-bold">{integration.usageCount?.toLocaleString() || 0} calls</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-[9px] font-black uppercase tracking-widest h-8 gap-1.5 border-border/40">
                    <RefreshCw className="size-3" /> Sync
                  </Button>
                  <Button 
                    onClick={() => openModal(integration)}
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-[9px] font-black uppercase tracking-widest h-8 gap-1.5 border-border/40"
                  >
                    <Settings2 className="size-3" /> Config
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <IntegrationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          integration={selectedIntegration} 
        />
      </div>
    );
  },
});
