import { 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/SectionCard";
import { adminCategories } from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export function AdminStudioHome() {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      {/* Hero Warning */}
      <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-red-500/20 transition-all">
        <div className="size-14 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <ShieldCheck className="size-7 text-red-600" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-red-600">Enterprise Control Environment</h4>
            <Badge className="bg-red-500 text-white border-none text-[8px] font-black uppercase tracking-tighter h-4 w-fit mx-auto md:mx-0">Restricted</Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
            You are currently in the <span className="text-foreground font-bold">Admin Studio</span>. Changes here impact global system behavior, business logic, and security policies across all brands. Proceed with extreme caution.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 text-[10px] font-black uppercase tracking-widest border-red-500/20 text-red-600 hover:bg-red-500/5">System Audit</Button>
          <Button className="h-9 text-[10px] font-black uppercase tracking-widest bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20">Security Hub</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {adminCategories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>

      {/* Footer Info */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 gap-4">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
          <AlertCircle className="size-3.5" />
          Last System-wide Update: 4 hours ago by SuperAdmin
        </div>
        <div className="flex items-center gap-6">
          <Link to="/settings/audit" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Global Audit Center</Link>
          <Link to="/settings/security" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Enterprise Security</Link>
          <Link to="/platform/activity" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Developer Portal</Link>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ title, icon: Icon, desc, modules }: any) {
  return (
    <Card className="glass-surface border-border/40 shadow-sm overflow-hidden group hover:shadow-xl hover:border-primary/20 transition-all duration-500 cursor-pointer flex flex-col h-full">
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="size-12 rounded-2xl bg-accent/30 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
            <Icon className="size-6 transition-transform group-hover:scale-110" />
          </div>
          <ArrowRight className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary" />
        </div>
        
        <div className="space-y-2 flex-1">
          <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-foreground group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed opacity-80">{desc}</p>
        </div>

        <div className="mt-6 pt-6 border-t border-border/40 space-y-2">
          <div className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-3">Available Modules</div>
          <div className="flex flex-wrap gap-1.5">
            {modules.map((mod: string) => (
              <Badge key={mod} variant="secondary" className="bg-accent/50 text-muted-foreground border-none text-[8px] font-black uppercase tracking-tighter hover:bg-primary/10 hover:text-primary transition-colors">
                {mod}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
