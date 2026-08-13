import * as React from "react";
import { Building2, Check, ChevronsUpDown, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { demoBusinesses, type DemoBusiness } from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";

/**
 * Prototype business/brand switcher. State is local only — swap `demoBusinesses`
 * and `onSwitch` for a real tenant service later without changing this UI.
 */
export function BusinessSwitcher({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [current, setCurrent] = React.useState<DemoBusiness>(demoBusinesses[0]!);
  const [recent, setRecent] = React.useState<string[]>([]);
  const [switching, setSwitching] = React.useState<string | null>(null);

  const results = demoBusinesses.filter((b) =>
    b.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const handleSwitch = (business: DemoBusiness) => {
    if (business.id === current.id) {
      setOpen(false);
      return;
    }
    setSwitching(business.id);
    window.setTimeout(() => {
      setRecent((prev) => [current.id, ...prev.filter((id) => id !== current.id)].slice(0, 3));
      setCurrent(business);
      setSwitching(null);
      setOpen(false);
    }, 450);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-9 gap-2 rounded-xl border-border/50 px-2.5", className)}
          aria-label="Switch business"
        >
          <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-[10px] font-black text-primary">
            {current.initials}
          </span>
          <span className="hidden max-w-[9rem] truncate text-xs font-semibold sm:inline">
            {current.name}
          </span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-0">
        <div className="border-b border-border/40 p-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search businesses"
              className="h-8 pl-8 text-xs"
            />
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto p-1.5">
          {results.length === 0 ? (
            <p className="px-2 py-6 text-center text-xs text-muted-foreground">
              No business matches “{query}”.
            </p>
          ) : (
            results.map((business) => (
              <button
                key={business.id}
                onClick={() => handleSwitch(business)}
                disabled={switching !== null}
                className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted/50 disabled:opacity-60"
              >
                <span className="flex size-7 items-center justify-center rounded-md bg-muted text-[10px] font-black">
                  {business.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold">{business.name}</span>
                  <span className="block text-[10px] text-muted-foreground">{business.plan}</span>
                </span>
                {switching === business.id ? (
                  <span className="text-[10px] font-semibold text-primary">Switching…</span>
                ) : business.id === current.id ? (
                  <Check className="size-3.5 text-primary" />
                ) : null}
              </button>
            ))
          )}
        </div>

        {recent.length > 0 ? (
          <div className="border-t border-border/40 px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {recent.map((id) => {
                const business = demoBusinesses.find((item) => item.id === id);
                if (!business) return null;
                return (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="cursor-pointer text-[10px]"
                    onClick={() => handleSwitch(business)}
                  >
                    <Building2 className="mr-1 size-2.5" />
                    {business.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}