import * as React from "react";
import { 
  Search, 
  User, 
  Building2, 
  Phone, 
  Hash, 
  CreditCard, 
  Command, 
  X,
  ArrowRight,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { demoEmployees, demoBusinesses, demoActivations } from "@/lib/mock/workspace.demo";

export function GlobalSearchOverlay({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Handle escape key
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const results = React.useMemo(() => {
    if (!query || query.length < 2) return [];
    
    const q = query.toLowerCase();
    const matches: any[] = [];

    // Search Employees
    demoEmployees.forEach(emp => {
      if (emp.name.toLowerCase().includes(q) || emp.code.toLowerCase().includes(q) || emp.phone.includes(q)) {
        matches.push({ type: 'employee', ...emp });
      }
    });

    // Search Businesses
    demoBusinesses.forEach(biz => {
      if (biz.name.toLowerCase().includes(q)) {
        matches.push({ type: 'business', ...biz });
      }
    });

    // Search Activations/IDs
    demoActivations.forEach(act => {
      if (act.id.toLowerCase().includes(q) || act.customerName.toLowerCase().includes(q)) {
        matches.push({ type: 'activation', ...act });
      }
    });

    return matches.slice(0, 8);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={() => onOpenChange(false)}
      />
      
      <div className="relative w-full max-w-2xl bg-card border border-border/60 shadow-2xl rounded-2xl overflow-hidden glass-surface flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-4 border-b border-border/40 flex items-center gap-3">
          <Search className="size-5 text-muted-foreground" />
          <Input 
            ref={inputRef}
            placeholder="Search employees, businesses, IDs, or phone numbers..." 
            className="flex-1 border-none bg-transparent focus-visible:ring-0 text-base h-10 font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-accent/50 border border-border/40">
            <Command className="size-3 text-muted-foreground" />
            <span className="text-[10px] font-black uppercase text-muted-foreground">K</span>
          </div>
          <Button variant="ghost" size="icon" className="size-8" onClick={() => onOpenChange(false)}>
            <X className="size-4" />
          </Button>
        </div>

        <div className="flex-1 max-h-[60vh] overflow-y-auto scrollbar-thin">
          {query.length < 2 ? (
            <div className="p-8 text-center space-y-4">
              <div className="size-12 rounded-2xl bg-accent/30 flex items-center justify-center mx-auto">
                <ShieldCheck className="size-6 text-primary/40" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-widest">Enterprise Global Search</p>
                <p className="text-xs text-muted-foreground">Type at least 2 characters to search across all brands and modules.</p>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((res, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/50 cursor-pointer group transition-all"
                >
                  <div className="size-10 rounded-lg bg-background border border-border/40 flex items-center justify-center shrink-0">
                    {res.type === 'employee' ? <User className="size-5 text-blue-500" /> :
                     res.type === 'business' ? <Building2 className="size-5 text-emerald-500" /> :
                     <Briefcase className="size-5 text-amber-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black truncate">{res.name || res.customerName}</span>
                      <Badge variant="outline" className="text-[8px] font-black uppercase tracking-tighter h-4 px-1.5">
                        {res.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-[10px] text-muted-foreground font-medium">
                      {res.code && <span className="flex items-center gap-1"><Hash className="size-3" /> {res.code}</span>}
                      {res.phone && <span className="flex items-center gap-1"><Phone className="size-3" /> {res.phone}</span>}
                      {res.id && <span className="flex items-center gap-1"><Command className="size-3" /> {res.id}</span>}
                    </div>
                  </div>
                  <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground italic text-xs">
              No results found for "{query}"
            </div>
          )}
        </div>

        <div className="p-3 border-t border-border/40 bg-accent/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><ArrowRight className="size-3" /> Select</span>
            <span className="flex items-center gap-1.5"><Command className="size-3" /> Filters</span>
          </div>
          <span>Enterprise Index v1.2</span>
        </div>
      </div>
    </div>
  );
}
