import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Upload, 
  Search, 
  FileText, 
  Plus, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Settings,
  MoreVertical
} from "lucide-react";

export function KnowledgeBase() {
  const documents = [
    { name: "Standard Operating Procedures (SOP)", category: "Operations", status: "Active", version: "v2.4", updated: "2d ago" },
    { name: "Enterprise Pricing Strategy", category: "Finance", status: "Active", version: "v1.8", updated: "5h ago" },
    { name: "Employee Leave Policy", category: "HR", status: "Active", version: "v3.1", updated: "1w ago" },
    { name: "Customer Objection Handling", category: "Sales", status: "Active", version: "v2.0", updated: "3d ago" },
    { name: "API Technical Documentation", category: "Product", status: "Active", version: "v4.2", updated: "12h ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <SectionCard 
            title="Enterprise Knowledge Engine" 
            actions={
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 glass-surface">
                  <Upload className="size-3 mr-2" />
                  Bulk Upload
                </Button>
                <Button size="sm" className="h-8 shadow-elevated">
                  <Plus className="size-3 mr-2" />
                  Add Document
                </Button>
              </div>
            }
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input placeholder="Search company knowledge..." className="pl-9 text-xs h-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-10 text-xs px-3"><Filter className="size-3 mr-2" /> Category</Button>
                <Button variant="outline" className="h-10 text-xs px-3"><Settings className="size-3 mr-2" /> Configuration</Button>
              </div>
            </div>

            <div className="border border-border/40 rounded-xl overflow-hidden glass-surface">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/30 border-b border-border/40">
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Document Name</th>
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</th>
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Version</th>
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last Updated</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {documents.map((doc, i) => (
                    <tr key={i} className="hover:bg-muted/20 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <FileText className="size-4" />
                          </div>
                          <span className="text-xs font-bold">{doc.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-bold tracking-tight">{doc.category}</Badge>
                      </td>
                      <td className="p-4 text-xs font-medium text-muted-foreground">{doc.version}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <div className="size-1.5 rounded-full bg-success" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter text-success">{doc.status}</span>
                        </div>
                      </td>
                      <td className="p-4 text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{doc.updated}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="icon" className="size-8"><MoreVertical className="size-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-start gap-3">
              <AlertCircle className="size-4 text-primary mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-primary mb-1 tracking-tight">AI Training Index Status</h4>
                <p className="text-[11px] opacity-70 leading-relaxed">
                  Vector database is synchronized. 124,532 tokens indexed across 42 active documents. 
                  Next scheduled maintenance in 14 hours.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
