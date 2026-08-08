import * as React from "react";
import { Command } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { 
  Users, 
  Briefcase, 
  FileText, 
  Package, 
  Settings, 
  Layout, 
  Zap, 
  Plus, 
  History, 
  Star,
  Search,
  Bell
} from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export function GlobalCommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

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

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search records, modules, and commands..." />
      <CommandList className="max-h-[450px]">
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Global Navigation">
          <CommandItem onSelect={() => runCommand(() => router.navigate({ to: "/" }))}>
            <Layout className="mr-2 h-4 w-4" />
            <span>Executive Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.navigate({ to: "/modules/crm" }))}>
            <Users className="mr-2 h-4 w-4" />
            <span>Sales CRM</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.navigate({ to: "/modules/finance" }))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Finance & Accounts</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.navigate({ to: "/modules/projects" }))}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Enterprise PMO</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.navigate({ to: "/modules/inventory" }))}>
            <Package className="mr-2 h-4 w-4" />
            <span>Inventory System</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => {})}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create New Prospect</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => {})}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Create New Invoice</span>
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => {})}>
            <Zap className="mr-2 h-4 w-4 text-amber-500" />
            <span>Open AI Copilot</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
