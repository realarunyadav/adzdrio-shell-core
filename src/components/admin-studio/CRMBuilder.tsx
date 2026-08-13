import { useState } from "react";
import { 
  Plus, 
  Search, 
  Trash2, 
  Settings2,
  ListFilter,
  Briefcase,
  HelpCircle,
  MessageSquare,
  Globe,
  Tag,
  CheckCircle2,
  ChevronRight,
  Database,
  GripVertical,
  Hash,
  Type,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/SectionCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CRMFieldModal } from "./CRMFieldModal";

export function CRMBuilder() {
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<any>(null);

  const openFieldModal = (field?: any) => {
    setSelectedField(field || null);
    setIsFieldModalOpen(true);
  };

  const crmConfigs = [
    { title: "Lead Statuses", count: 8, icon: ListFilter, items: ["New", "In Progress", "Qualified", "Unqualified", "Follow-up", "Converted", "Lost", "Archived"] },
    { title: "Sales Stages", count: 5, icon: Briefcase, items: ["Discovery", "Proposal", "Negotiation", "Closing", "Closed Won"] },
    { title: "Qualification Questions", count: 12, icon: HelpCircle, items: ["Budget Confirmed?", "Authority Verified?", "Need Established?", "Timeline Set?"] },
    { title: "Follow-up Types", count: 6, icon: MessageSquare, items: ["Discovery Call", "Email Follow-up", "Product Demo", "Site Visit"] },
    { title: "Callback Reasons", count: 4, icon: MessageSquare, items: ["Information Request", "Demo Request", "Pricing Inquiry", "Support Needed"] },
    { title: "Lead Sources", count: 10, icon: Globe, items: ["Website Form", "LinkedIn", "Referral", "Cold Outreach", "Events"] },
    { title: "Customer Tags", count: 25, icon: Tag, items: ["VIP", "Enterprise", "Retail", "Legacy", "Strategic"] },
  ];

  const [fields, setFields] = useState([
    { id: "f1", label: "Company Name", type: "Text", required: true, system: true },
    { id: "f2", label: "Annual Revenue", type: "Number", required: false, system: false },
    { id: "f3", label: "Lead Score", type: "Number", required: false, system: false },
    { id: "f4", label: "Next Follow-up", type: "Date", required: true, system: true },
  ]);

  return (
    <div className="space-y-8">
      {/* Pipeline Configs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {crmConfigs.map((config, i) => (
          <SectionCard
            key={i}
            title={config.title}
            description={`Configure ${config.title.toLowerCase()} for the CRM pipeline.`}
            actions={
              <Button variant="ghost" size="icon" className="size-8">
                <Settings2 className="size-4" />
              </Button>
            }
          >
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {config.items.slice(0, 4).map((item, j) => (
                  <Badge key={j} variant="secondary" className="text-[9px] font-bold uppercase tracking-tight bg-accent/30 border-none">
                    {item}
                  </Badge>
                ))}
                {config.count > 4 && (
                  <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tight border-border/40">
                    +{config.count - 4} more
                  </Badge>
                )}
              </div>
              <Separator className="bg-border/40" />
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">{config.count} Values</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-[9px] uppercase font-black tracking-widest">
                  Edit Config <ChevronRight className="ml-1 size-3" />
                </Button>
              </div>
            </div>
          </SectionCard>
        ))}

        <Card className="border-dashed flex flex-col items-center justify-center p-6 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => openFieldModal()}>
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Plus className="size-5 text-primary" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest">Add Field</p>
        </Card>
      </div>

      {/* Field Matrix & Governance */}
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <SectionCard
            title="CRM Field Configuration Matrix"
            description="Global management of lead, opportunity, and account field behaviors."
          >
            <div className="rounded-xl border border-border/40 overflow-hidden">
              <div className="bg-muted/50 p-4 grid grid-cols-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border/40">
                <div>Field Label</div>
                <div>Data Type</div>
                <div>Status</div>
                <div className="text-right">Governance</div>
              </div>
              <div className="divide-y divide-border/40">
                {fields.map((field, i) => (
                  <div key={i} className="p-4 grid grid-cols-4 text-xs items-center hover:bg-accent/10 transition-colors group">
                    <div className="flex items-center gap-2">
                      <GripVertical className="size-3 text-muted-foreground/30" />
                      <span className="font-black uppercase tracking-tight">{field.label}</span>
                    </div>
                    <div className="text-muted-foreground font-bold uppercase text-[10px]">{field.type}</div>
                    <div>
                      {field.required ? (
                        <Badge variant="outline" className="text-[8px] font-black uppercase border-red-500/20 text-red-600 bg-red-500/5 h-4">Required</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[8px] font-black uppercase border-border/40 text-muted-foreground h-4">Optional</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="size-7" onClick={() => openFieldModal(field)}><Settings2 className="size-3.5" /></Button>
                      {!field.system && (
                        <Button variant="ghost" size="icon" className="size-7 text-destructive"><Trash2 className="size-3.5" /></Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="md:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl border border-border/40 bg-navy/5 space-y-6">
            <div className="flex items-center gap-2 border-b border-border/20 pb-4">
              <ShieldCheck className="size-4 text-primary" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Governance Rules</h4>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-[11px] font-bold uppercase tracking-tight">Duplicate Review</Label>
                  <p className="text-[9px] text-muted-foreground font-medium uppercase leading-tight">Manual review for potential duplicates on entry</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-[11px] font-bold uppercase tracking-tight">Validation Audit</Label>
                  <p className="text-[9px] text-muted-foreground font-medium uppercase leading-tight">Enforce strict data entry rules for all staff</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <div className="pt-4 mt-6 border-t border-border/20">
              <Button variant="outline" className="w-full h-10 text-[10px] font-black uppercase tracking-widest gap-2 border-border/40">
                <Database className="size-4" /> Snapshot Logic
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CRMFieldModal 
        isOpen={isFieldModalOpen} 
        onClose={() => setIsFieldModalOpen(false)} 
        field={selectedField}
      />
    </div>
  );
}
