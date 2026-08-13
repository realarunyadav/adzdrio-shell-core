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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Variable, 
  Eye, 
  Save, 
  Building2, 
  Layers,
  ShieldAlert,
  Search
} from "lucide-react";
import { LegalTemplate, demoProhibitedTerms } from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface LegalTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: LegalTemplate | null;
  onSave: (template: any) => void;
}

export function LegalTemplateModal({ open, onOpenChange, template, onSave }: LegalTemplateModalProps) {
  const [activeTab, setActiveTab] = React.useState("basic");
  const [formData, setFormData] = React.useState<Partial<LegalTemplate>>({
    name: "",
    type: "Service Agreement",
    business: "Acme India",
    applicableTo: "Enterprise Plan",
    status: "Draft",
    content: "",
    variables: []
  });

  const [validationResult, setValidationResult] = React.useState<{
    passed: boolean;
    findings: { term: string; severity: string }[];
  } | null>(null);

  React.useEffect(() => {
    if (template) {
      setFormData(template);
    } else {
      setFormData({
        name: "",
        type: "Service Agreement",
        business: "Acme India",
        applicableTo: "Enterprise Plan",
        status: "Draft",
        content: "",
        variables: []
      });
    }
    setValidationResult(null);
    setActiveTab("basic");
  }, [template, open]);

  const runValidation = () => {
    const findings = demoProhibitedTerms
      .filter(t => t.status === 'Active' && formData.content?.toLowerCase().includes(t.term.toLowerCase()))
      .map(t => ({ term: t.term, severity: t.severity }));

    setValidationResult({
      passed: findings.length === 0,
      findings
    });

    if (findings.length > 0) {
      toast.error(`Validation Failed: ${findings.length} prohibited terms detected.`);
    } else {
      toast.success("Validation Passed: No prohibited terms found.");
    }
  };

  const handleSave = () => {
    if (validationResult?.findings.some(f => f.severity === 'Blocker')) {
      toast.error("Cannot save. Blocker terms detected in validation.");
      setActiveTab("validation");
      return;
    }
    onSave(formData);
    onOpenChange(false);
  };

  const insertVariable = (variable: string) => {
    setFormData(prev => ({
      ...prev,
      content: (prev.content || "") + ` {{${variable}}} `
    }));
  };

  const variables = [
    { label: "Business Name", value: "business_name", icon: Building2 },
    { label: "Customer Name", value: "customer_name", icon: Search },
    { label: "Plan Price", value: "plan_price", icon: Layers },
    { label: "Effective Date", value: "effective_date", icon: Search },
    { label: "Signature Block", value: "signature_block", icon: FileText },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 glass-surface border-border/40 overflow-hidden">
        <DialogHeader className="p-6 border-b border-border/40">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[8px] font-black uppercase tracking-tighter h-4 px-1.5 border-primary/20 text-primary">
              Legal Builder
            </Badge>
          </div>
          <DialogTitle className="text-xl font-black uppercase tracking-tight">
            {template ? "Edit Legal Template" : "Create Legal Template"}
          </DialogTitle>
          <DialogDescription className="text-xs font-medium text-muted-foreground">
            Construct high-fidelity legal agreements with dynamic variables and automated compliance validation.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-6 border-b border-border/40 bg-muted/20">
              <TabsList className="bg-transparent border-none p-0 h-12">
                <TabsTrigger value="basic" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-[10px] font-black uppercase tracking-widest px-4">1. Basic Info</TabsTrigger>
                <TabsTrigger value="content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-[10px] font-black uppercase tracking-widest px-4">2. Template Content</TabsTrigger>
                <TabsTrigger value="validation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-[10px] font-black uppercase tracking-widest px-4">3. Compliance Check</TabsTrigger>
                <TabsTrigger value="preview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-[10px] font-black uppercase tracking-widest px-4">4. Final Preview</TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 p-6">
              <TabsContent value="basic" className="mt-0 space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Template Name</Label>
                    <Input 
                      placeholder="e.g. Standard Service Agreement" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="bg-accent/20 border-border/40 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Template Type</Label>
                    <Select value={formData.type || "Service Agreement"} onValueChange={v => setFormData({...formData, type: v as any})}>
                      <SelectTrigger className="bg-accent/20 border-border/40 font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-surface border-border/40">
                        <SelectItem value="Service Agreement">Service Agreement</SelectItem>
                        <SelectItem value="NDA">NDA</SelectItem>
                        <SelectItem value="Privacy Policy">Privacy Policy</SelectItem>
                        <SelectItem value="Terms of Service">Terms of Service</SelectItem>
                        <SelectItem value="Sales Contract">Sales Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Brand/Business</Label>
                    <Select value={formData.business || "Acme India"} onValueChange={v => setFormData({...formData, business: v})}>
                      <SelectTrigger className="bg-accent/20 border-border/40 font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-surface border-border/40">
                        <SelectItem value="Acme India">Acme India</SelectItem>
                        <SelectItem value="Vertex Tech">Vertex Tech</SelectItem>
                        <SelectItem value="Blue Harbour">Blue Harbour</SelectItem>
                        <SelectItem value="Global">Global / Platform-wide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Applicable Plan/Process</Label>
                    <Input 
                      placeholder="e.g. All Plans, Enterprise Only" 
                      value={formData.applicableTo} 
                      onChange={e => setFormData({...formData, applicableTo: e.target.value})}
                      className="bg-accent/20 border-border/40 font-bold"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="mt-0 space-y-6 animate-in fade-in duration-300">
                <div className="flex gap-6 h-[400px]">
                  <div className="flex-1 space-y-2 flex flex-col">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Document Content</Label>
                    <Textarea 
                      placeholder="Enter legal content here... Use {{variable}} for dynamic fields." 
                      className="flex-1 resize-none bg-accent/10 border-border/40 font-mono text-sm leading-relaxed p-4"
                      value={formData.content}
                      onChange={e => setFormData({...formData, content: e.target.value})}
                    />
                  </div>
                  <div className="w-64 space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Variable className="size-3.5" /> Dynamic Fields
                    </Label>
                    <div className="space-y-1.5">
                      {variables.map((v) => (
                        <Button 
                          key={v.value} 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start text-[9px] font-black uppercase tracking-tighter h-8 gap-2 bg-accent/20 hover:bg-primary/10 border-border/40"
                          onClick={() => insertVariable(v.value)}
                        >
                          <v.icon className="size-3 text-primary" />
                          {v.label}
                        </Button>
                      ))}
                    </div>
                    <div className="p-3 rounded-lg border border-border/40 bg-muted/10 text-[9px] text-muted-foreground leading-relaxed italic">
                      Variables are automatically populated at runtime from the associated Business or Sale record.
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="validation" className="mt-0 space-y-6 animate-in fade-in duration-300">
                <div className="p-8 border-2 border-dashed border-border/40 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                  <div className={cn(
                    "size-16 rounded-full flex items-center justify-center transition-all duration-500",
                    validationResult?.passed === true ? "bg-success/10 text-success" : 
                    validationResult?.passed === false ? "bg-destructive/10 text-destructive" :
                    "bg-accent/30 text-muted-foreground"
                  )}>
                    {validationResult?.passed === true ? <CheckCircle2 className="size-8" /> : 
                     validationResult?.passed === false ? <ShieldAlert className="size-8" /> :
                     <ShieldAlert className="size-8 opacity-40" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest">Compliance Audit</h3>
                    <p className="text-[10px] text-muted-foreground max-w-sm mt-1">
                      Scans document content for prohibited terms, risk clauses, and platform compliance violations.
                    </p>
                  </div>
                  <Button onClick={runValidation} className="h-9 font-black uppercase tracking-widest text-[10px] px-8">
                    Run Strict Validation
                  </Button>
                </div>

                {validationResult && !validationResult.passed && (
                  <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="size-4" />
                      <span className="text-xs font-black uppercase tracking-widest">Policy Violations Detected</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {validationResult.findings.map((f, i) => (
                        <div key={i} className="p-3 rounded-xl border border-destructive/20 bg-destructive/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant={f.severity === 'Blocker' ? 'destructive' : 'secondary'} className="text-[8px] font-black uppercase">
                              {f.severity}
                            </Badge>
                            <span className="text-xs font-bold text-foreground">Prohibited term: <span className="underline decoration-destructive/40 font-mono">"{f.term}"</span> found in content.</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase text-destructive" onClick={() => setActiveTab("content")}>Fix Content</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {validationResult?.passed && (
                  <div className="p-6 rounded-2xl border border-success/20 bg-success/5 flex flex-col items-center text-center space-y-2 animate-in slide-in-from-bottom-2 duration-300">
                    <CheckCircle2 className="size-5 text-success" />
                    <span className="text-xs font-black uppercase tracking-widest text-success">Validation Successful</span>
                    <p className="text-[10px] text-muted-foreground">This template meets all enterprise compliance and legal safety requirements.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="preview" className="mt-0 space-y-6 animate-in fade-in duration-300">
                <div className="glass-surface border border-border/40 rounded-2xl overflow-hidden shadow-2xl">
                   <div className="p-4 bg-muted/30 border-b border-border/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 text-muted-foreground" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Document Prototype Preview</span>
                      </div>
                      <Badge variant="outline" className="text-[8px] font-black uppercase tracking-tighter border-success/30 text-success bg-success/5">Ready to Publish</Badge>
                   </div>
                   <div className="p-8 min-h-[400px] bg-white text-navy-900 font-serif leading-relaxed space-y-6 shadow-inner">
                      <h2 className="text-2xl font-black text-center mb-8 uppercase tracking-tight">{formData.name || "Untitled Agreement"}</h2>
                      <div className="text-sm whitespace-pre-wrap">
                        {formData.content ? (
                           formData.content.split(/(\{\{[a-z_]+\}\})/).map((part, i) => {
                             if (part.startsWith('{{') && part.endsWith('}}')) {
                               return <span key={i} className="bg-yellow-200 px-1 rounded font-mono font-bold text-[10px] border border-yellow-300 mx-0.5 text-navy-900">{part}</span>;
                             }
                             return part;
                           })
                        ) : (
                          <span className="text-muted-foreground italic">No content provided yet.</span>
                        )}
                      </div>
                      <div className="mt-20 pt-10 border-t border-navy-100/50 grid grid-cols-2 gap-20">
                         <div className="space-y-6">
                            <div className="h-10 border-b-2 border-navy-900/10"></div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Company Signature Block</div>
                         </div>
                         <div className="space-y-6">
                            <div className="h-10 border-b-2 border-navy-900/10"></div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Client Signature Block</div>
                         </div>
                      </div>
                   </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        <DialogFooter className="p-6 border-t border-border/40 bg-muted/20 flex items-center justify-between">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-[10px] font-black uppercase tracking-widest">Cancel</Button>
          <div className="flex items-center gap-3">
            {activeTab === 'preview' ? (
              <Button onClick={handleSave} className="h-10 gap-2 px-8 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 bg-primary">
                <Save className="size-4" /> Save & Publish
              </Button>
            ) : (
              <Button onClick={() => {
                const tabs = ["basic", "content", "validation", "preview"];
                const nextIdx = tabs.indexOf(activeTab) + 1;
                if (nextIdx < tabs.length) {
                  const nextTab = tabs[nextIdx];
                  if (nextTab) setActiveTab(nextTab);
                }
              }} className="h-10 gap-2 px-8 font-black uppercase tracking-widest text-[10px]">
                Continue
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
