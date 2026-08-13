import * as React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Phone, 
  Mail, 
  Building2, 
  Clock, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert,
  GitMerge,
  Copy,
  ChevronRight,
  History,
  Eye
} from "lucide-react";

import { DuplicateCase, demoDuplicateAudit } from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Separator } from "@/components/ui/separator";

interface ConflictResolutionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  duplicateCase: DuplicateCase | null;
  onResolve: (id: string, action: string, result: any) => void;
}

export function ConflictResolutionModal({ open, onOpenChange, duplicateCase, onResolve }: ConflictResolutionModalProps) {
  const [activeTab, setActiveTab] = React.useState("compare");
  const [resolutions, setResolutions] = React.useState<Record<string, 'A' | 'B'>>({});
  const [isMerging, setIsMerging] = React.useState(false);

  React.useEffect(() => {
    if (duplicateCase) {
      setActiveTab("compare");
      // Default to Record A for all fields initially
      const initialResolutions: Record<string, 'A' | 'B'> = {};
      const fields = ['name', 'phone', 'email', 'business', 'status'];
      fields.forEach(field => {
        initialResolutions[field] = 'A';
      });
      setResolutions(initialResolutions);
    }
  }, [duplicateCase, open]);

  if (!duplicateCase) return null;

  const { recordA, recordB } = duplicateCase;

  const compareFields = [
    { label: 'Name', key: 'name', icon: User },
    { label: 'Phone', key: 'phone', icon: Phone },
    { label: 'Email', key: 'email', icon: Mail },
    { label: 'Business', key: 'business', icon: Building2 },
    { label: 'Status', key: 'status', icon: Clock },
  ];

  const handleResolutionSelect = (field: string, source: 'A' | 'B') => {
    setResolutions(prev => ({ ...prev, [field]: source }));
  };

  const handleMerge = () => {
    setIsMerging(true);
    setTimeout(() => {
      const mergedResult = {
        name: resolutions['name'] === 'A' ? recordA.name : recordB.name,
        phone: resolutions['phone'] === 'A' ? recordA.phone : recordB.phone,
        email: resolutions['email'] === 'A' ? recordA.email : recordB.email,
        business: resolutions['business'] === 'A' ? recordA.business : recordB.business,
        status: resolutions['status'] === 'A' ? recordA.status : recordB.status,
      };
      
      onResolve(duplicateCase.id, 'Merged', mergedResult);
      toast.success("Records merged successfully.");
      setIsMerging(false);
      onOpenChange(false);
    }, 1000);
  };

  const handleQuickAction = (action: 'A' | 'B' | 'NotDuplicate') => {
    if (action === 'NotDuplicate') {
      onResolve(duplicateCase.id, 'Marked Not Duplicate', null);
      toast.info("Marked as not a duplicate.");
    } else {
      const retained = action === 'A' ? recordA : recordB;
      onResolve(duplicateCase.id, action === 'A' ? 'Record A Retained' : 'Record B Retained', retained);
      toast.success(`Retained Record ${action} and archived the other.`);
    }
    onOpenChange(false);
  };

  const renderFieldComparison = (field: { label: string, key: string, icon: any }) => {
    const valA = (recordA as any)[field.key];
    const valB = (recordB as any)[field.key];
    const isDifferent = valA !== valB;

    return (
      <div key={field.key} className={cn(
        "grid grid-cols-2 gap-4 p-4 rounded-xl border transition-all",
        isDifferent ? "border-amber-500/20 bg-amber-500/5" : "border-border/40 bg-accent/5"
      )}>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <field.icon className="size-3 text-muted-foreground" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{field.label} (Record A)</span>
          </div>
          <div className={cn("text-xs font-bold", isDifferent && "text-amber-600")}>{valA}</div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <field.icon className="size-3 text-muted-foreground" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{field.label} (Record B)</span>
          </div>
          <div className={cn("text-xs font-bold", isDifferent && "text-amber-600")}>{valB}</div>
        </div>
      </div>
    );
  };

  const renderMergeResolver = (field: { label: string, key: string, icon: any }) => {
    const valA = (recordA as any)[field.key];
    const valB = (recordB as any)[field.key];
    const isDifferent = valA !== valB;
    const selected = resolutions[field.key];

    return (
      <div key={field.key} className="space-y-3 p-4 rounded-xl border border-border/40 bg-accent/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <field.icon className="size-3.5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest">{field.label}</span>
          </div>
          {isDifferent ? (
            <Badge variant="outline" className="text-[8px] font-black uppercase bg-amber-500/10 text-amber-600 border-amber-500/20">Conflict</Badge>
          ) : (
            <Badge variant="outline" className="text-[8px] font-black uppercase bg-success/10 text-success border-success/20">Match</Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => handleResolutionSelect(field.key, 'A')}
            className={cn(
              "p-3 rounded-lg border text-left transition-all",
              selected === 'A' 
                ? "border-primary bg-primary/10 shadow-sm" 
                : "border-border/40 bg-background hover:bg-accent/50"
            )}
          >
            <div className="text-[8px] font-black uppercase text-muted-foreground mb-1">Source A</div>
            <div className="text-xs font-bold truncate">{valA}</div>
          </button>
          <button 
            onClick={() => handleResolutionSelect(field.key, 'B')}
            className={cn(
              "p-3 rounded-lg border text-left transition-all",
              selected === 'B' 
                ? "border-primary bg-primary/10 shadow-sm" 
                : "border-border/40 bg-background hover:bg-accent/50"
            )}
          >
            <div className="text-[8px] font-black uppercase text-muted-foreground mb-1">Source B</div>
            <div className="text-xs font-bold truncate">{valB}</div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] flex flex-col p-0 glass-surface border-border/40 overflow-hidden">
        <DialogHeader className="p-6 border-b border-border/40 bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <GitMerge className="size-5 text-orange-500" />
              </div>
              <div>
                <DialogTitle className="text-xl font-black uppercase tracking-tight">Conflict Resolution</DialogTitle>
                <DialogDescription className="text-xs font-medium text-muted-foreground">
                  Review potential duplicate {duplicateCase.entityType} records and decide how to proceed.
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="h-6 gap-1 border-border/40 font-bold text-[10px] uppercase tracking-widest">
                Confidence: {(duplicateCase.confidence * 100).toFixed(0)}%
              </Badge>
              {duplicateCase.importId && (
                <Badge variant="outline" className="h-6 gap-1 border-border/40 font-bold text-[10px] uppercase tracking-widest bg-primary/5">
                  Import: {duplicateCase.importId}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-6 border-b border-border/40 bg-background">
              <TabsList className="bg-transparent border-none p-0 h-14">
                <TabsTrigger value="compare" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-[10px] font-black uppercase tracking-widest px-6 h-full gap-2">
                  <Copy className="size-3.5" /> 1. Compare Side-by-Side
                </TabsTrigger>
                <TabsTrigger value="resolve" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-[10px] font-black uppercase tracking-widest px-6 h-full gap-2">
                  <GitMerge className="size-3.5" /> 2. Resolve Conflicts
                </TabsTrigger>
                <TabsTrigger value="preview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-[10px] font-black uppercase tracking-widest px-6 h-full gap-2">
                  <Eye className="size-3.5" /> 3. Final Preview
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 p-6">
              <TabsContent value="compare" className="mt-0 space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div className="p-4 rounded-2xl border border-border/40 bg-accent/5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center justify-between">
                      <span>Record A (Existing)</span>
                      <span className="text-xs text-foreground">{recordA.id}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-black">{recordA.name}</div>
                      <div className="text-[10px] font-black uppercase text-primary">{recordA.source}</div>
                    </div>
                    <Separator className="my-4 opacity-40" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[9px] font-black uppercase text-muted-foreground">Created</div>
                        <div className="text-xs font-bold">{new Date(recordA.created).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-black uppercase text-muted-foreground">Status</div>
                        <StatusBadge tone="info" className="h-4 mt-0.5">{recordA.status}</StatusBadge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-border/40 bg-accent/5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center justify-between">
                      <span>Record B (Incoming)</span>
                      <span className="text-xs text-foreground">{recordB.id}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-black">{recordB.name}</div>
                      <div className="text-[10px] font-black uppercase text-primary">{recordB.source}</div>
                    </div>
                    <Separator className="my-4 opacity-40" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[9px] font-black uppercase text-muted-foreground">Created</div>
                        <div className="text-xs font-bold">{new Date(recordB.created).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-black uppercase text-muted-foreground">Status</div>
                        <StatusBadge tone="neutral" className="h-4 mt-0.5">{recordB.status}</StatusBadge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                    <Database className="size-3.5" /> Field Comparison
                  </div>
                  {compareFields.map(renderFieldComparison)}
                </div>

                <div className="p-6 rounded-2xl border border-border/40 bg-muted/10 space-y-4">
                   <div className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                     <History className="size-3.5 text-primary" /> Related Data Safety Check
                   </div>
                   <div className="grid grid-cols-4 gap-4">
                      <RelatedItem count={12} label="Sales" />
                      <RelatedItem count={4} label="Activations" />
                      <RelatedItem count={2} label="Tickets" />
                      <RelatedItem count={8} label="Documents" />
                   </div>
                   <p className="text-[10px] text-muted-foreground italic">Merging records will re-associate all related data to the primary record. No data will be deleted.</p>
                </div>
              </TabsContent>

              <TabsContent value="resolve" className="mt-0 space-y-4 animate-in fade-in duration-300">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3 mb-4">
                  <ShieldAlert className="size-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-primary">Merge Strategy</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Select which value should be retained for each field. Conflicting fields are highlighted in orange.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {compareFields.map(renderMergeResolver)}
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-0 space-y-6 animate-in fade-in duration-300">
                 <div className="text-center space-y-2 mb-8">
                    <div className="size-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
                       <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight">Final Result Preview</h3>
                    <p className="text-xs text-muted-foreground">The following record will be generated after the merge process.</p>
                 </div>

                 <div className="max-w-xl mx-auto glass-surface border border-border/40 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-6 bg-muted/30 border-b border-border/40 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <User className="size-5 text-primary" />
                          <span className="text-sm font-black uppercase tracking-widest">Merged Record</span>
                       </div>
                       <Badge className="bg-success text-white border-none text-[8px] font-black">STABLE</Badge>
                    </div>
                    <div className="p-8 space-y-6">
                       {compareFields.map(field => (
                          <div key={field.key} className="flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <field.icon className="size-3.5 text-muted-foreground" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{field.label}</span>
                             </div>
                             <div className="text-sm font-black text-right">
                                {(resolutions[field.key] === 'A' ? recordA : recordB as any)[field.key]}
                             </div>
                          </div>
                       ))}
                       <Separator className="opacity-40" />
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary ID (Retained)</span>
                          <span className="text-xs font-mono font-bold">{recordA.id}</span>
                       </div>
                    </div>
                 </div>

                 <div className="max-w-xl mx-auto p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center gap-3">
                    <AlertCircle className="size-5 text-amber-600 shrink-0" />
                    <p className="text-[10px] text-amber-700 font-medium">
                      Warning: This action is irreversible. Record B ({recordB.id}) will be archived and its data moved to Record A.
                    </p>
                 </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        <DialogFooter className="p-6 border-t border-border/40 bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-[10px] font-black uppercase tracking-widest h-10">Cancel</Button>
            {activeTab === 'compare' && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => handleQuickAction('NotDuplicate')}
                  className="text-[10px] font-black uppercase tracking-widest h-10 border-border/40"
                >
                  Not Duplicate
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleQuickAction('B')}
                  className="text-[10px] font-black uppercase tracking-widest h-10 border-border/40"
                >
                  Reject New (Keep A)
                </Button>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {activeTab === 'preview' ? (
              <Button 
                onClick={handleMerge} 
                disabled={isMerging}
                className="h-10 gap-2 px-8 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 bg-primary"
              >
                {isMerging ? (
                  <>Merging...</>
                ) : (
                  <>
                    <GitMerge className="size-4" /> Finalize Merge
                  </>
                )}
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  const tabs = ["compare", "resolve", "preview"];
                  const nextIdx = tabs.indexOf(activeTab) + 1;
                  if (nextIdx < tabs.length) setActiveTab(tabs[nextIdx]);
                }} 
                className="h-10 gap-2 px-8 font-black uppercase tracking-widest text-[10px]"
              >
                Next Step <ChevronRight className="size-4" />
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RelatedItem({ count, label }: { count: number, label: string }) {
  return (
    <div className="flex flex-col items-center p-3 rounded-xl bg-background border border-border/40 shadow-sm">
      <span className="text-lg font-black text-primary">{count}</span>
      <span className="text-[9px] font-black uppercase text-muted-foreground tracking-tighter">{label}</span>
    </div>
  );
}
