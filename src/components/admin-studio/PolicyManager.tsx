import * as React from "react";
import { adminService, PolicyVersion } from "@/lib/api/services";
import { SectionCard } from "@/components/shared/SectionCard";
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

export function PolicyManager() {
  const [activeTab, setActiveTab] = React.useState<PolicyVersion['type']>('terms_and_conditions');
  const [policies, setPolicies] = React.useState<PolicyVersion[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showNewDialog, setShowNewDialog] = React.useState(false);
  const [previewPolicy, setPreviewPolicy] = React.useState<PolicyVersion | null>(null);

  const [newVersion, setNewVersion] = React.useState('');
  const [newContent, setNewContent] = React.useState('');

  React.useEffect(() => {
    async function fetchPolicies() {
      try {
        setLoading(true);
        const data = await adminService.getPolicyVersions(activeTab);
        setPolicies(data);
      } catch (err: any) {
        console.error("Failed to fetch policies", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPolicies();
  }, [activeTab]);

  const handleCreate = async () => {
    if (!newVersion || !newContent) {
      toast.error("Please provide version and content");
      return;
    }
    try {
      await adminService.updatePolicy(activeTab, newContent);
      toast.success("New policy version created");
      setShowNewDialog(false);
      // Refresh list
      const data = await adminService.getPolicyVersions(activeTab);
      setPolicies(data);
    } catch (err) {
      toast.error("Failed to create policy version");
    }
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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-40 text-center animate-pulse">
                        <Loader2 className="size-6 mx-auto mb-2 animate-spin text-primary opacity-20" />
                        Accessing Historical Vault...
                      </TableCell>
                    </TableRow>
                  ) : policies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-40 text-center text-muted-foreground italic">
                        No historical versions found for this policy type.
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
                        <TableCell className="text-xs font-medium">{new Date(p.effectiveDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-2 h-5",
                            p.isActive ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground border-border/40"
                          )} variant="outline">
                            {p.isActive ? 'Active' : 'Archived'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest" onClick={() => setPreviewPolicy(p)}>
                            <Eye className="size-3 mr-1.5" /> Preview
                          </Button>
                          {p.isActive && (
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
              Effective Date: {previewPolicy && new Date(previewPolicy.effectiveDate).toLocaleDateString()}
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
