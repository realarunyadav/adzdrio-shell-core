import { createFileRoute } from "@tanstack/react-router";
import {
  Shield,
  ShieldCheck,
  Plus,
  Search,
  Filter,
  Copy,
  Trash2,
  History,
  Lock,
  Globe,
  Building2,
  Users as UsersIcon,
  Layers,
  ChevronRight,
  MoreHorizontal,
  Info,
  Check,
  AlertCircle
} from "lucide-react";
import * as React from "react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/shared/EmptyState";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export const Route = createFileRoute("/modules/roles")({
  component: RolesManagementModule,
});

function RolesManagementModule() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        eyebrow="Core Platform"
        title="Roles & Permissions"
        description="Define and manage enterprise access control levels, permission matrices and resource scoping."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <History className="mr-2 size-3.5" />
              Audit Trail
            </Button>
            <CreateRoleDialog />
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard title="Total Roles" value="0" icon={Shield} />
        <StatsCard title="System Roles" value="0" icon={Lock} />
        <StatsCard title="Custom Roles" value="0" icon={Layers} />
      </div>

      <SectionCard
        title="Role Directory"
        description="Global enterprise roles and their associated permission profiles."
        contentClassName="p-0"
        actions={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                className="w-[250px] pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="size-4" />
            </Button>
          </div>
        }
      >
        <div className="relative min-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Assigned Users</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="h-[400px]">
                  <EmptyState
                    icon={ShieldCheck}
                    title="No roles defined"
                    description="Roles allow you to group permissions and assign them to users."
                    className="surface-none border-none shadow-none"
                    action={<CreateRoleDialog />}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon }: { title: string; value: string; icon: any }) {
  return (
    <Card className="surface-sunken">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-background border border-border">
          <Icon className="size-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}

function CreateRoleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 size-3.5" />
          Create Role
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Enterprise Role</DialogTitle>
          <DialogDescription>
            Define a new access profile and configure its permission matrix.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto pr-2 py-4 space-y-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input id="role-name" placeholder="e.g. Regional Manager" />
            </div>
            <div className="space-y-2">
              <Label>Base Role (Optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Empty Role</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="role-desc">Description</Label>
              <Input id="role-desc" placeholder="Briefly describe the purpose of this role" />
            </div>
          </div>

          <Tabs defaultValue="permissions" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="permissions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">Permissions</TabsTrigger>
              <TabsTrigger value="scope" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">Resource Scope</TabsTrigger>
            </TabsList>

            <TabsContent value="permissions" className="pt-6 space-y-6">
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[300px]">Module / Capability</TableHead>
                      <TableHead className="text-center">View</TableHead>
                      <TableHead className="text-center">Create</TableHead>
                      <TableHead className="text-center">Edit</TableHead>
                      <TableHead className="text-center">Delete</TableHead>
                      <TableHead className="text-center">Manage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <PermissionRow module="Core Platform" capability="Organization Settings" />
                    <PermissionRow module="Core Platform" capability="User Management" />
                    <PermissionRow module="Core Platform" capability="Roles & Permissions" />
                    <PermissionRow module="Business Ops" capability="CRM Operations" />
                    <PermissionRow module="Intelligence" capability="AI Studio Access" />
                  </TableBody>
                </Table>
              </div>
              
              <div className="rounded-md bg-muted/30 p-4 border border-border/50">
                <div className="flex gap-3">
                  <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider">Custom Permissions</p>
                    <p className="text-xs text-muted-foreground">Advanced functional permissions can be configured once specific business modules are implemented.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="scope" className="pt-6 space-y-6">
              <div className="grid gap-6">
                <ScopeSetting 
                  icon={Globe} 
                  title="Branch Access" 
                  description="Limit role visibility to specific organizational branches."
                  placeholder="All Branches (Global)"
                />
                <ScopeSetting 
                  icon={Building2} 
                  title="Department Scope" 
                  description="Restricts access to data within specific departments."
                  placeholder="All Departments"
                />
                <ScopeSetting 
                  icon={UsersIcon} 
                  title="Team Visibility" 
                  description="Fine-grained control over cross-team resource access."
                  placeholder="Inherited from Department"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="pt-4 border-t border-border">
          <Button variant="outline">Cancel</Button>
          <Button>Save Role Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PermissionRow({ module, capability }: { module: string; capability: string }) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-muted-foreground/60 leading-none">{module}</span>
          <span className="text-sm font-medium mt-1">{capability}</span>
        </div>
      </TableCell>
      {[1, 2, 3, 4, 5].map((i) => (
        <TableCell key={i} className="text-center">
          <div className="flex justify-center">
            <Checkbox />
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
}

function ScopeSetting({ icon: Icon, title, description, placeholder }: { icon: any; title: string; description: string; placeholder: string }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border">
      <div className="flex gap-3">
        <div className="flex size-9 items-center justify-center rounded-md bg-muted shrink-0">
          <Icon className="size-4 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="global">Global Access</SelectItem>
          <SelectItem value="restricted">Restricted Selection</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
