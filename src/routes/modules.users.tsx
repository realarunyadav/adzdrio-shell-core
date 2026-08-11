import { createFileRoute } from "@tanstack/react-router";
import {
  MoreHorizontal,
  Plus,
  Search,
  UserPlus,
  Filter,
  Download,
  Mail,
  Shield,
  History,
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  Ban,
  Building2,
  MapPin,
  Briefcase,
  Users as UsersIcon,
  ChevronRight,
  Eye,
  Pencil,
  RotateCcw,
  LogOut,
  ExternalLink
} from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/modules/users")({
  component: UserManagementModule,
});

function UserManagementModule() {
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        eyebrow="People & Identity"
        title="User Management"
        description="Manage enterprise users, security profiles, and organizational assignments."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 size-3.5" />
              Export
            </Button>
            <InviteUserDialog />
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Users" value="156" icon={UsersIcon} />
        <StatsCard title="Active" value="142" icon={CheckCircle2} />
        <StatsCard title="Pending" value="12" icon={Clock} />
        <StatsCard title="Locked/Suspended" value="2" icon={Ban} />
      </div>

      <SectionCard
        title="User Directory"
        description="All registered enterprise users across the organization."
        contentClassName="p-0"
        actions={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="w-[250px] pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="size-4" />
            </Button>
          </div>
        }
      >
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              {selectedUsers.length} users selected
            </span>
            {selectedUsers.length > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] uppercase font-bold tracking-wider">
                  Activate
                </Button>
                <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] uppercase font-bold tracking-wider">
                  Deactivate
                </Button>
                <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] uppercase font-bold tracking-wider text-destructive">
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
            Sort by: <span className="text-foreground">Latest First</span>
          </div>
        </div>

        <div className="relative min-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox 
                    checked={false} 
                    onCheckedChange={() => {}}
                  />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role & Org</TableHead>
                <TableHead>Security</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Amit Jain", email: "amit.jain@adzdrio.com", role: "ADMIN", status: "Active", dept: "Engineering", location: "Bangalore HQ" },
                { name: "Sarah Williams", email: "s.williams@adzdrio.com", role: "MANAGER", status: "Active", dept: "Operations", location: "Mumbai Hub" },
                { name: "Rajesh Kumar", email: "r.kumar@adzdrio.com", role: "SALES", status: "Pending", dept: "Sales", location: "Bangalore HQ" },
                { name: "David Chen", email: "d.chen@adzdrio.com", role: "VIEWER", status: "Locked", dept: "Finance", location: "Remote" },
              ].map((user) => (
                <TableRow key={user.email} className="hover:bg-muted/5 group cursor-pointer">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8 border border-border/40">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-bold group-hover:text-primary transition-colors">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={user.status === "Active" ? "success" : user.status === "Pending" ? "warning" : "danger"}>
                      {user.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-xs font-bold">{user.role}</p>
                      <p className="text-[10px] text-muted-foreground">{user.dept} · {user.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className={cn("size-3.5", user.status === "Active" ? "text-success" : "text-muted-foreground")} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">MFA Enabled</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="size-8"><MoreHorizontal className="size-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Showing 0 of 0 users
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
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

function InviteUserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <UserPlus className="mr-2 size-3.5" />
          Invite User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Invite New User</DialogTitle>
          <DialogDescription>
            Grant an enterprise member access to the ABOS platform. An invitation email will be sent.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="Enter first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Enter last name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" placeholder="email@adzdrio.com" />
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Organization Unit</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hq">Headquarters (Default)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Not Assigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Enterprise Role</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select access role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">ADMIN</SelectItem>
                <SelectItem value="manager">MANAGER</SelectItem>
                <SelectItem value="sales">SALES</SelectItem>
                <SelectItem value="support">SUPPORT</SelectItem>
                <SelectItem value="viewer">VIEWER</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground italic">
              Permissions are governed by the global RBAC system.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Send Invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function UserDetailPanel({ user }: { user: any }) {
  // This would be shown in a Sheet or Dialog when a user is clicked
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="size-16 border-2 border-background shadow-sm">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary-soft text-accent-foreground text-xl">
            JD
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-bold">John Doe</h3>
          <p className="text-sm text-muted-foreground">j.doe@adzdrio.com</p>
          <div className="mt-2 flex gap-2">
            <StatusBadge tone="success">Active</StatusBadge>
            <Badge variant="outline" className="rounded-sm font-normal text-[10px] uppercase">Administrator</Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger value="info" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">Info</TabsTrigger>
          <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">Security</TabsTrigger>
          <TabsTrigger value="audit" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">Audit Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="pt-4 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase text-muted-foreground">Employee Link</Label>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="size-3.5 text-muted-foreground" />
                <span className="text-muted-foreground italic">Not linked to HRMS profile</span>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]">Link Now</Button>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase text-muted-foreground">Direct Manager</Label>
              <div className="flex items-center gap-2 text-sm">
                <UsersIcon className="size-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Not assigned</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase text-muted-foreground">Department</Label>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Building2 className="size-3.5 text-muted-foreground" />
                Operations
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase text-muted-foreground">Location</Label>
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="size-3.5 text-muted-foreground" />
                Headquarters
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="pt-4 space-y-4">
          <div className="rounded-lg border border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Account Status</p>
                  <p className="text-xs text-muted-foreground">Login status and security health.</p>
                </div>
              </div>
              <StatusBadge tone="success">Active</StatusBadge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Identity & Authentication</p>
                  <p className="text-xs text-muted-foreground">Employee ID: ADZ-EMP-442. Password last reset 14 days ago.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Force Reset</Button>
                <Button variant="destructive" size="sm">Lock Account</Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Sessions</h4>
              <Button variant="ghost" className="h-6 text-[10px] text-danger">Revoke All</Button>
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-xs font-medium">Chrome on Windows</TableCell>
                    <TableCell className="text-xs text-muted-foreground">192.168.1.45 (Bangalore, IN)</TableCell>
                    <TableCell className="text-xs text-success">Active Now</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="size-7"><LogOut className="size-3" /></Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs font-medium">Safari on iPhone 15</TableCell>
                    <TableCell className="text-xs text-muted-foreground">172.16.0.12 (Mumbai, IN)</TableCell>
                    <TableCell className="text-xs text-muted-foreground">2h ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="size-7 text-danger"><LogOut className="size-3" /></Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="pt-4">
          <EmptyState
            icon={History}
            title="No audit logs"
            description="System activity for this user will be tracked here."
            className="surface-none border-none shadow-none py-12"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
