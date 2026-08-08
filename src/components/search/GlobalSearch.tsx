import * as React from "react";
import { Search, Filter, History, Star, User, Building2, FileText, Package, Briefcase, ChevronRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  type: 'customer' | 'employee' | 'invoice' | 'project' | 'inventory';
  title: string;
  subtitle: string;
  status?: string;
  metadata?: Record<string, string>;
}

const DEMO_RESULTS: SearchResult[] = [
  { id: '1', type: 'customer', title: 'Acme Corporation', subtitle: 'Global Tech Partner', status: 'Active' },
  { id: '2', type: 'employee', title: 'Jane Cooper', subtitle: 'Strategic Account Manager', metadata: { dept: 'Sales' } },
  { id: '3', type: 'invoice', title: 'INV-2024-001', subtitle: '₹ 42,800.00', status: 'Paid' },
  { id: '4', type: 'project', title: 'ABOS Framework', subtitle: 'Internal Infrastructure', status: 'In Progress' },
  { id: '5', type: 'inventory', title: 'SKU-8849: Edge Gateway', subtitle: 'Hub-01 Warehouse', status: 'Low Stock' },
];

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        className="relative group w-full cursor-pointer"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-hover:text-primary" />
        <div className="flex h-10 w-full rounded-md border border-border/50 bg-background/50 px-10 py-2 text-sm text-muted-foreground backdrop-blur-sm transition-all group-hover:bg-background group-hover:border-primary/30 items-center">
          Search ABOS...
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
          <kbd className="text-[10px] font-bold">⌘K</kbd>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput 
            placeholder="Search across Prospects, Customers, Sales, Invoices..." 
            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none border-none focus:ring-0"
            value={query}
            onValueChange={setQuery}
          />
        </div>
        
        <CommandList className="max-h-[450px]">
          <CommandEmpty>No results found for "{query}".</CommandEmpty>
          
          <div className="flex p-2 gap-2 border-b overflow-x-auto no-scrollbar">
            {['All', 'Customers', 'Invoices', 'Projects', 'Employees'].map(filter => (
              <Badge key={filter} variant="outline" className="cursor-pointer hover:bg-primary/10 font-bold text-[10px] uppercase tracking-wider">
                {filter}
              </Badge>
            ))}
          </div>

          <CommandGroup heading="Recent Searches">
            <CommandItem className="flex justify-between">
              <div className="flex items-center">
                <History className="mr-2 h-4 w-4 opacity-50" />
                <span>Acme Corp Renewal</span>
              </div>
              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            </CommandItem>
            <CommandItem>
              <History className="mr-2 h-4 w-4 opacity-50" />
              <span>INV-2024-001</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Results">
            {DEMO_RESULTS.map(result => (
              <CommandItem key={result.id} className="flex items-center gap-3 p-3">
                <div className={cn(
                  "p-2 rounded-lg shrink-0",
                  result.type === 'customer' ? "bg-blue-50 text-blue-600" :
                  result.type === 'invoice' ? "bg-emerald-50 text-emerald-600" :
                  result.type === 'employee' ? "bg-purple-50 text-purple-600" :
                  "bg-slate-50 text-slate-600"
                )}>
                  {result.type === 'customer' ? <Building2 className="size-4" /> :
                   result.type === 'invoice' ? <FileText className="size-4" /> :
                   result.type === 'employee' ? <User className="size-4" /> :
                   result.type === 'project' ? <Briefcase className="size-4" /> :
                   <Package className="size-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-foreground">{result.title}</p>
                    {result.status && (
                      <Badge variant="outline" className="text-[9px] font-bold h-4">
                        {result.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                </div>
                <ChevronRight className="size-4 opacity-30" />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
