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
  Clock,
  AlertTriangle
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supportService } from "@/lib/api/services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/app/support/knowledge-base")({
  component: KnowledgeBasePage,
});

function KnowledgeBasePage() {
  const [search, setSearch] = React.useState("");

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["support", "categories"],
    queryFn: () => supportService.listCategories(),
  });

  const { data: articlesData, isLoading: isLoadingArticles } = useQuery({
    queryKey: ["support", "articles", { search }],
    queryFn: () => supportService.listArticles({ search, pageSize: 50 }),
  });

  const categories = categoriesData || [];
  const articles = articlesData?.items || [];

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
        {isLoadingCategories ? (
          [...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
        ) : categories.length === 0 ? (
          <div className="col-span-4 p-8 border border-dashed rounded-xl text-center text-muted-foreground">
            No categories defined yet.
          </div>
        ) : (
          categories.slice(0, 4).map((cat) => (
            <div key={cat.id} className="p-4 rounded-xl border border-border bg-background hover:border-primary/40 hover:bg-muted/5 transition-all cursor-pointer group">
              <div className="size-10 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <BookOpen className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-tight">{cat.name}</h4>
              <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest">{cat.status}</p>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <SectionCard title="Knowledge Articles" description="Browse help documentation and technical articles.">
             <div className="flex items-center gap-4 mb-6 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search knowledge base..." 
                  className="h-9 pl-9 text-xs" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              {isLoadingArticles ? (
                [...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
              ) : articles.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground italic text-sm">
                  No articles found.
                </div>
              ) : (
                articles.map((art) => (
                  <div key={art.id} className="flex items-center justify-between p-4 rounded-xl border border-border/60 hover:bg-muted/30 transition-colors group">
                    <div className="flex items-start gap-4">
                      <div className="size-8 rounded-full bg-muted flex items-center justify-center font-bold text-[10px] uppercase text-muted-foreground">
                        KB
                      </div>
                      <div>
                        <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{art.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{art.id.slice(0, 8)}</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase">{art.category_name || 'General'}</span>
                          <Badge variant={art.status === 'published' ? 'default' : 'secondary'} className="text-[8px] uppercase font-black h-4 px-1.5">
                            {art.status}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase">{art.views || 0} Views</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="size-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="size-4" /></Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <SectionCard title="Article Stats">
             <div className="space-y-4 mt-4">
                <div className="p-4 rounded-xl bg-muted/20 border border-border/40">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Articles</p>
                  <p className="text-2xl font-black mt-2 tracking-tighter">{articlesData?.total || 0}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/20 border border-border/40">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Live Articles</p>
                  <p className="text-2xl font-black mt-2 tracking-tighter text-green-600">
                    {articles.filter(a => a.status === 'published').length}
                  </p>
                </div>
             </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
