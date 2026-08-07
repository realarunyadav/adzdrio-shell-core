import { Command } from "lucide-react";
import * as React from "react";
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
  Star 
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
      <CommandInput placeholder="Type a command or search ABOS..." />
      <CommandList className="max-h-[450px]">
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => {})}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create New Lead</span>
            <CommandShortcut>⌘L</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => {})}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Generate Invoice</span>
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => {})}>
            <Zap className="mr-2 h-4 w-4 text-amber-500" />
            <span>Approve Pending Requests</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
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
          <CommandItem onSelect={() => runCommand(() => router.navigate({ to: "/modules/inventory" }))}>
            <Package className="mr-2 h-4 w-4" />
            <span>Inventory System</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.navigate({ to: "/modules/projects" }))}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Enterprise PMO</span>
          </GroupItem>
          <CommandItem onSelect={() => runCommand(() => router.navigate({ to: "/settings" }))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Platform Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent Activity">
          <CommandItem>
            <History className="mr-2 h-4 w-4" />
            <span>Modified: Invoice #INV-2024-001</span>
          </CommandItem>
          <CommandItem>
            <History className="mr-2 h-4 w-4" />
            <span>Viewed: Project - ABOS Framework</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Favorites">
          <CommandItem>
            <Star className="mr-2 h-4 w-4 text-amber-500 fill-amber-500" />
            <span>Lead: Global Tech Solutions</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
