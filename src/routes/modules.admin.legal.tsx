import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Scale, Plus, Eye, History, FileText, CheckCircle2, AlertCircle, ShieldAlert, Edit } from "lucide-react";
import { demoLegalTemplates, demoLegalVersions, demoProhibitedTerms, demoEsignatureConfig, LegalTemplate } from "@/lib/mock/workspace.demo";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { LegalTemplateModal } from "@/components/admin-studio/modals/LegalTemplateModal";
import { toast } from "sonner";

export const Route = createFileRoute("/modules/admin/legal")({
  component: LegalManagement,
});

function LegalManagement() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState<LegalTemplate | null>(null);
  const [templates, setTemplates] = React.useState(demoLegalTemplates);

  const handleCreate = () => {
    setSelectedTemplate(null);
    setModalOpen(true);
  };

  const handleEdit = (template: LegalTemplate) => {
    setSelectedTemplate(template);
    setModalOpen(true);
  };

  const handleSave = (templateData: any) => {
    if (selectedTemplate) {
      setTemplates(prev => prev.map(t => t.id === selectedTemplate.id ? { ...t, ...templateData, lastUpdated: new Date().toISOString().split('T')[0] } : t));
      toast.success("Legal template updated successfully.");
    } else {
      const newTemplate = {
        ...templateData,
        id: `leg-${Math.random().toString(36).substr(2, 9)}`,
        version: "1.0.0",
        effectiveDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        createdBy: "SuperAdmin"
      };
      setTemplates(prev => [newTemplate, ...prev]);
      toast.success("New legal template created and published.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <LegalTemplateModal 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
        template={selectedTemplate}
        onSave={handleSave}
      />

      <PageHeader
        eyebrow="OWNER/ADMIN — LEGAL SUITE"
        title="Legal Management"
        description="Configure contract templates, compliance rules, and e-signature integrations."
        actions={
          <Button onClick={handleCreate} className="h-9 gap-2 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 bg-primary">
            <Plus className="size-4" /> Create New Template
          </Button>
        }
      />

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="bg-muted/30 border border-border/40 p-1 mb-6">
          <TabsTrigger value="templates" className="text-[10px] font-black uppercase tracking-widest px-6 py-2">Templates</TabsTrigger>
          <TabsTrigger value="validation" className="text-[10px] font-black uppercase tracking-widest px-6 py-2">Prohibited Terms</TabsTrigger>
          <TabsTrigger value="esign" className="text-[10px] font-black uppercase tracking-widest px-6 py-2">E-signature Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Card className="glass-surface border-border/40 p-0 overflow-hidden shadow-xl">
            <Table>
              <TableHeader>
                <TableRow className="border-border/40 bg-muted/20">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Name</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Type</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Business</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Version</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((t) => (
                  <TableRow key={t.id} className="border-border/40 hover:bg-accent/30 transition-colors group">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="size-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs font-black group-hover:text-primary transition-colors">{t.name}</div>
                          <div className="text-[9px] text-muted-foreground uppercase font-medium">Modified: {t.lastUpdated}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[9px] uppercase font-black text-muted-foreground">{t.type}</TableCell>
                    <TableCell className="text-[10px] font-black uppercase tracking-tight text-center">{t.business}</TableCell>
                    <TableCell className="text-[10px] font-black text-center">
                      <Badge variant="outline" className="h-5 text-[9px] px-2 border-border/60">v{t.version}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge tone={t.status === 'Active' ? 'success' : t.status === 'Draft' ? 'warning' : 'neutral'} className="h-5 text-[8px]">
                        {t.status}
                      </StatusBadge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="size-8 hover:bg-primary/10 hover:text-primary" onClick={() => handleEdit(t)}>
                          <Edit className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8 hover:bg-primary/10 hover:text-primary">
                          <Eye className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8 hover:bg-primary/10 hover:text-primary">
                          <History className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {templates.length === 0 && (
              <div className="p-20 text-center space-y-4">
                <div className="size-16 rounded-2xl bg-accent/30 flex items-center justify-center mx-auto">
                  <FileText className="size-8 text-muted-foreground opacity-20" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase tracking-widest">No Templates Found</p>
                  <p className="text-xs text-muted-foreground">Start by creating your first legal agreement template.</p>
                </div>
                <Button onClick={handleCreate} size="sm" className="h-9 font-black uppercase tracking-widest text-[10px]">Create Template</Button>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Card className="glass-surface border-border/40 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <ShieldAlert className="size-4 text-primary" /> Blocked Term Configuration
                  </h3>
                  <p className="text-[10px] text-muted-foreground mt-1 font-medium">Define terminology that is prohibited or flagged during legal template validation.</p>
                </div>
                <Button size="sm" className="text-[10px] font-black uppercase tracking-widest gap-2 h-9 px-4">
                  <Plus className="size-3.5" /> Add Blocked Term
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {demoProhibitedTerms.map((term) => (
                    <div key={term.id} className="p-4 rounded-xl border border-border/40 bg-accent/10 hover:border-primary/20 transition-all group">
                        <div className="flex items-center justify-between mb-3">
                            <Badge variant={term.severity === 'Blocker' ? 'destructive' : 'secondary'} className="text-[8px] font-black uppercase tracking-tighter h-4 px-1.5">
                              {term.severity}
                            </Badge>
                            <StatusBadge tone={term.status === 'Active' ? 'success' : 'neutral'} className="h-4 text-[7px] border-none bg-transparent">
                              {term.status}
                            </StatusBadge>
                        </div>
                        <div className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{term.term}</div>
                        <div className="text-[9px] uppercase text-muted-foreground font-medium mt-1 tracking-widest">{term.category} Policy</div>
                    </div>
                ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="esign" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="glass-surface border-border/40 p-6 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-6">
                   <div className="size-20 bg-primary/5 rounded-full flex items-center justify-center animate-pulse">
                      <Scale className="size-10 text-primary opacity-20" />
                   </div>
                </div>

                <div className="max-w-2xl relative z-10">
                  <h3 className="text-xs font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                    E-signature Integration Foundation
                  </h3>
                  <p className="text-[10px] text-muted-foreground mb-8 font-medium italic">Configure the underlying infrastructure for electronic signing services.</p>
                  
                  <div className="grid grid-cols-1 gap-3">
                      <IntegrationRow label="Provider Service" value={demoEsignatureConfig.provider} />
                      <IntegrationRow label="Connection Status" value={demoEsignatureConfig.status} status="success" />
                      <IntegrationRow label="Active Environment" value={demoEsignatureConfig.environment} />
                      <IntegrationRow label="Last Event Recorded" value={demoEsignatureConfig.lastEvent} />
                      <IntegrationRow label="Webhook Endpoint Status" value={demoEsignatureConfig.webhookStatus} status="success" />
                  </div>

                  <div className="mt-8 pt-8 border-t border-border/40 flex items-center gap-3">
                    <Button variant="outline" className="text-[10px] font-black uppercase tracking-widest h-9 px-6 bg-accent/20 border-border/40">Test Connection</Button>
                    <Button className="text-[10px] font-black uppercase tracking-widest h-9 px-6 shadow-lg shadow-primary/20 bg-primary">Configure Settings</Button>
                  </div>
                </div>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function IntegrationRow({ label, value, status }: { label: string, value: string, status?: any }) {
  return (
    <div className="flex items-center justify-between p-4 bg-accent/10 border border-border/40 rounded-xl hover:bg-accent/20 transition-all">
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {status ? (
          <StatusBadge tone={status as any} className="h-5 text-[8px] font-black uppercase">{value}</StatusBadge>
        ) : (
          <span className="text-xs font-black text-foreground">{value}</span>
        )}
      </div>
    </div>
  );
}

