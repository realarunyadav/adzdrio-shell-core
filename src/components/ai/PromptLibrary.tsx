import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Terminal, 
  Plus, 
  Search, 
  Code2, 
  Copy, 
  Play, 
  History,
  Tag,
  Variable,
  MoreVertical
} from "lucide-react";

export function PromptLibrary() {
  const prompts = [
    { name: "Customer Risk Summary", module: "CRM", version: "v4", status: "Active" },
    { name: "Sales Response Generator", module: "Sales", version: "v2", status: "Active" },
    { name: "Policy Q&A Extractor", module: "HR", version: "v7", status: "Testing" },
    { name: "Invoice Extraction", module: "Finance", version: "v1", status: "Inactive" },
    { name: "SOP Assistant Base", module: "Knowledge", version: "v12", status: "Active" }
  ];

  return (
    <div className="space-y-6">
      <SectionCard 
        title="AI Prompt Engineering Hub" 
        actions={<Button size="sm" className="h-8 shadow-elevated"><Plus className="size-3 mr-2" /> New Prompt</Button>}
      >
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input placeholder="Search system prompts..." className="pl-9 h-10 text-xs" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prompts.map((p, i) => (
            <div key={i} className="p-4 rounded-xl glass-surface border border-border/40 hover:border-primary/40 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="size-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Terminal className="size-5" />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge variant="outline" className="text-[9px] px-1 py-0">{p.status}</Badge>
                  <span className="text-[10px] text-muted-foreground font-bold">{p.version}</span>
                </div>
              </div>
              
              <h4 className="text-sm font-bold mb-1 tracking-tight">{p.name}</h4>
              <div className="flex items-center gap-2 mb-4">
                <Tag className="size-3 text-muted-foreground opacity-50" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">{p.module}</span>
              </div>

              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" className="h-7 text-[10px] uppercase font-bold tracking-tight flex-1">
                  <Code2 className="size-3 mr-2" /> Edit
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-[10px] uppercase font-bold tracking-tight flex-1">
                  <Play className="size-3 mr-2" /> Test
                </Button>
                <Button size="icon" variant="ghost" className="size-7"><MoreVertical className="size-3" /></Button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Prompt Variables (Universal)">
        <div className="flex flex-wrap gap-2">
          {["employee_name", "customer_context", "sop_reference", "current_date", "rbac_role", "module_scope"].map((v, i) => (
            <Badge key={i} variant="secondary" className="bg-muted/50 border-border/40 text-[10px] px-2 py-1 flex items-center gap-2">
              <Variable className="size-3 opacity-50" />
              {v}
            </Badge>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
