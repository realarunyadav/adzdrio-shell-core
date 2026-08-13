import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Plus, 
  FileText, 
  Eye, 
  Edit3, 
  ChevronRight, 
  ExternalLink,
  BookOpen,
  TrendingUp,
  Clock
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { demoSupportArticles } from "@/lib/mock/workspace.demo";

export const Route = createFileRoute("/app/support/knowledge-base")({
  component: KnowledgeBasePage,
});

function KnowledgeBasePage() {
  const categories = [
    { name: 'Getting Started', count: 12, icon: BookOpen },
    { name: 'Technical Docs', count: 24, icon: FileText },
    { name: 'Billing & Payments', count: 8, icon: TrendingUp },
    { name: 'Account Security', count: 15, icon: Clock },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Support Module"
        title="Knowledge Base"
        description="Self-service portal and agent documentation workspace."
        actions={
          <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold">
            <Plus className="mr-2 h-4 w-4" />
            Create Article
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.name} className="p-4 rounded-xl border border-border bg-background hover:border-primary/40 hover:bg-muted/5 transition-all cursor-pointer group">
            <div className="size-10 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <cat.icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h4 className="text-xs font-black uppercase tracking-tight">{cat.name}</h4>
            <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest">{cat.count} Articles</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <SectionCard title="Recent Articles" description="Latest updates and documentation additions.">
             <div className="flex items-center gap-4 mb-6 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search knowledge base..." className="h-9 pl-9 text-xs" />
              </div>
            </div>

            <div className="space-y-4">
              {demoSupportArticles.map((art) => (
                <div key={art.id} className="flex items-center justify-between p-4 rounded-xl border border-border/60 hover:bg-muted/30 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="size-8 rounded-full bg-muted flex items-center justify-center font-bold text-[10px] uppercase text-muted-foreground">
                      KB
                    </div>
                    <div>
                      <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{art.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{art.id}</span>
                        <Separator />
                        <span className="text-[10px] text-muted-foreground font-bold uppercase">{art.category}</span>
                        <Separator />
                        <Badge variant={art.status === 'Published' ? 'default' : 'secondary'} className="text-[8px] uppercase font-black h-4 px-1.5">
                          {art.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="size-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="size-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <SectionCard title="Article Analytics">
             <div className="space-y-4 mt-4">
                <div className="p-4 rounded-xl bg-muted/20 border border-border/40">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Most Viewed</p>
                  <p className="text-xs font-bold mt-2 truncate">Configuring Multi-Business Workspaces</p>
                  <p className="text-[10px] font-black text-primary mt-1">1,240 Views</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/20 border border-border/40">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Needs Review</p>
                  <p className="text-xs font-bold mt-2 truncate">Troubleshooting Gateway 502 Errors</p>
                  <p className="text-[10px] font-black text-orange-600 mt-1">Updated 12 days ago</p>
                </div>
             </div>
          </SectionCard>
          
          <SectionCard title="KB Contributors">
             <div className="space-y-3 mt-4">
                {['Ankit Singh', 'Sonia Kapoor', 'Rahul Menon'].map((name) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-black text-primary uppercase">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-bold">{name}</span>
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground">8 Arts</span>
                  </div>
                ))}
             </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function Separator() {
  return <div className="h-1 w-1 rounded-full bg-border" />;
}
