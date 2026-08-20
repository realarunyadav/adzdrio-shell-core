import * as React from "react";
import { 
  ShieldCheck, 
  History, 
  Plus, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  FileText,
  Save,
  Loader2,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SectionCard } from "@/components/shared/SectionCard";
import { legalService } from "@/lib/api/services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LegalVersion, LegalTemplate } from "@/lib/api/legal.types";
import { SkeletonTable } from "@/components/shared/SkeletonLoader";

export function PolicyManager() {
  const [activeTab, setActiveTab] = React.useState<string>('terms_and_conditions');
  const [showNewDialog, setShowNewDialog] = React.useState(false);
  const [previewPolicy, setPreviewPolicy] = React.useState<LegalVersion | null>(null);
  const queryClient = useQueryClient();

  const [newVersion, setNewVersion] = React.useState('');
  const [newContent, setNewContent] = React.useState('');

  // Find the template corresponding to the active tab
  const { data: templates = [] } = useQuery({
    queryKey: ['legal', 'templates'],
    queryFn: () => legalService.listTemplates()
  });

  const activeTemplate = templates.find(t => 
    t.name.toLowerCase().includes(activeTab.replace(/_/g, ' ')) || 
    t.type.toLowerCase().includes(activeTab.replace(/_/g, ' '))
  );

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ['legal', 'versions', activeTemplate?.id],
    queryFn: () => legalService.listVersions(activeTemplate!.id),
    enabled: !!activeTemplate?.id
  });

  const createVersionMutation = useMutation({
    mutationFn: (data: any) => legalService.createVersion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legal', 'versions', activeTemplate?.id] });
      toast.success("New policy version created");
      setShowNewDialog(false);
      setNewVersion('');
      setNewContent('');
    },
    onError: () => toast.error("Failed to create policy version")
  });

  const handleCreate = async () => {
    if (!newVersion || !newContent || !activeTemplate) {
      toast.error("Please provide version, content, and ensure template is selected");
      return;
    }
    
    createVersionMutation.mutate({
      template_id: activeTemplate.id,
      version: newVersion,
      content: newContent,
      status: 'Active',
      effective_from: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tight text-slate-900">Enterprise Policy Governance</h2>
          <p className="text-xs text-muted-foreground font-medium">Manage legal framework, terms, and compliance documentation.</p>
        </div>
        <Button size="sm" className="h-9 shadow-elevated" onClick={() => setShowNewDialog(true)}>
          <Plus className="mr-2 size-3.5" />
          Create New Version
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
        <TabsList className="bg-transparent border-b border-border/40 w-full justify-start rounded-none p-0 mb-6 h-auto">
          <TabsTrigger 
            value="terms_and_conditions" 
            className="rounded-none border-b-2 border-transparent px-4 py-3 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all"
          >
            Terms & Conditions
          </TabsTrigger>
          <TabsTrigger 
            value="refund_policy" 
            className="rounded-none border-b-2 border-transparent px-4 py-3 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all"
          >
            Refund Policy
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0 outline-none">
          <SectionCard title={`${activeTab.replace(/_/g, ' ').toUpperCase()} History`} contentClassName="p-0">
            <div className="min-h-[400px]">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Version</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Effective Date</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="p-0 overflow-hidden">
                        <SkeletonTable />
                      </TableCell>
                    </TableRow>
                  ) : !activeTemplate ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-40 text-center text-muted-foreground italic">
                        Please select or create a template for this policy type first.
                      </TableCell>
                    </TableRow>
                  ) : policies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-40 text-center text-muted-foreground italic">
                        No historical versions found for this policy.
                      </TableCell>
                    </TableRow>
                  ) : (
                    policies.map((p) => (
                      <TableRow key={p.id} className="hover:bg-muted/5 group">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="size-3.5 text-muted-foreground" />
                            <span className="text-xs font-black">v{p.version}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-medium">{new Date(p.effective_from).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-2 h-5",
                            p.status === 'Active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground border-border/40"
                          )} variant="outline">
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest" onClick={() => setPreviewPolicy(p)}>
                            <Eye className="size-3 mr-1.5" /> Preview
                          </Button>
                          {p.status === 'Active' && (
                            <Badge variant="secondary" className="text-[8px] font-black uppercase bg-slate-100 border-slate-200">
                              <Lock className="size-2 mr-1" /> Immutable
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>

      {/* New Version Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="max-w-3xl glass-surface border-border/40">
          <DialogHeader>
            <DialogTitle className="text-xl font-black tracking-tight uppercase">Draft New Policy Version</DialogTitle>
            <DialogDescription className="text-xs font-medium">
              Create a new legal version. Activating this will archive the current version.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Target Version Number</Label>
              <Input placeholder="e.g. 2.1" value={newVersion} onChange={(e) => setNewVersion(e.target.value)} className="glass-surface h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Policy Content (Markdown/Legal Plaintext)</Label>
              <Textarea 
                placeholder="Paste the new policy content here..." 
                className="min-h-[300px] glass-surface text-xs leading-relaxed" 
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="glass-surface font-black text-[10px] uppercase tracking-widest" onClick={() => setShowNewDialog(false)}>Cancel</Button>
            <Button className="shadow-elevated font-black text-[10px] uppercase tracking-widest" onClick={handleCreate}>
              <Save className="size-3.5 mr-2" /> Publish & Activate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewPolicy} onOpenChange={() => setPreviewPolicy(null)}>
        <DialogContent className="max-w-4xl glass-surface border-border/40">
          <DialogHeader>
            <DialogTitle className="text-xl font-black tracking-tight uppercase flex items-center gap-3">
              <ShieldCheck className="size-5 text-primary" />
              Preview: v{previewPolicy?.version}
            </DialogTitle>
            <DialogDescription className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              Effective Date: {previewPolicy && new Date(previewPolicy.effective_from).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[500px] p-6 bg-slate-50/50 rounded-xl border border-border/40">
            <div className="prose prose-slate prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-xs text-slate-700 font-sans leading-relaxed">
                {previewPolicy?.content}
              </pre>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" className="glass-surface font-black text-[10px] uppercase tracking-widest w-full sm:w-auto" onClick={() => setPreviewPolicy(null)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
