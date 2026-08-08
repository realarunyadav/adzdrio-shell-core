import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ToggleLeft, 
  Eye, 
  Shield, 
  Navigation,
  Lock,
  Settings2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SectionCard } from "@/components/shared/SectionCard";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function ModuleManagement() {
  const modules = [
    { name: "CRM & Sales", status: "Active", visibility: "Global", icon: Eye, type: "Business" },
    { name: "Finance & Revenue", status: "Active", visibility: "Departmental", icon: Lock, type: "Business" },
    { name: "HRMS & Payroll", status: "Active", visibility: "Restricted", icon: Shield, type: "Business" },
    { name: "Inventory & SC", status: "Active", visibility: "Global", icon: Eye, type: "Business" },
    { name: "Projects & PMO", status: "Active", visibility: "Global", icon: Eye, type: "Business" },
    { name: "Platform Security", status: "Active", visibility: "System", icon: Lock, type: "Critical" },
    { name: "Audit & Compliance", status: "Active", visibility: "System", icon: Shield, type: "System" },
    { name: "Activation Ops", status: "Inactive", visibility: "None", icon: Eye, type: "Business" },
  ];

  return (
    <div className="space-y-6">
      <SectionCard
        title="Module Directory"
        description="Enable, disable, and configure visibility for enterprise-wide modules."
        contentClassName="p-0"
        actions={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search modules..."
                className="w-[250px] pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="size-4" />
            </Button>
            <Button size="sm">
              <Plus className="mr-2 size-3.5" />
              Add Custom Module
            </Button>
          </div>
        }
      >
        <div className="relative">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Navigation</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map((module) => (
                <TableRow key={module.name} className="hover:bg-muted/5 group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
                        <module.icon className="size-4 text-muted-foreground" />
                      </div>
                      <span className="font-bold">{module.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-sm font-bold text-[10px] uppercase">
                      {module.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={module.status === 'Active' ? 'success' : 'muted'}>
                      {module.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-xs font-medium">{module.visibility}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] uppercase font-bold">
                      <Navigation className="mr-1.5 size-3" /> Configure
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Module Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Settings2 className="mr-2 size-4 text-muted-foreground" /> Configure Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 size-4 text-muted-foreground" /> Manage Permissions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={module.type === 'Critical' ? 'opacity-50 cursor-not-allowed' : 'text-danger'}>
                          <ToggleLeft className="mr-2 size-4" /> {module.status === 'Active' ? 'Disable Module' : 'Enable Module'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard
          title="Navigation Configuration"
          description="Define the global sidebar structure and module ordering."
        >
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-4 italic">Drag and drop to reorder the enterprise navigation hierarchy.</p>
            {[
              "Executive Dashboard",
              "Business Operations",
              "Resource Management",
              "Intelligence & Analytics",
              "System Administration"
            ].map((nav, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded border border-border bg-background">
                <span className="text-sm font-medium">{nav}</span>
                <Button variant="ghost" size="icon" className="size-6 cursor-move">
                  <MoreHorizontal className="rotate-90 size-3" />
                </Button>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Default Permissions"
          description="Configure module access defaults for new roles."
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-enable core modules for new roles</span>
              <ToggleLeft className="size-5 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Restrict sensitive modules by default</span>
              <ToggleLeft className="size-5 text-primary" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Allow custom field creation by module owners</span>
              <ToggleLeft className="size-5 text-muted-foreground" />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
