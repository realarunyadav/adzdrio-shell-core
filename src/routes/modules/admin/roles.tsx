import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Shield, Key, Eye, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RolePermissionsModal } from "@/components/admin-studio/modals/RolePermissionsModal";

export const Route = createFileRoute("/modules/admin/roles")({
  component: RolesPermissionsPage,
});

function RolesPermissionsPage() {
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleViewPermissions = (roleName: string) => {
    setSelectedRole(roleName);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <RolePermissionsModal 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
        roleName={selectedRole || ""} 
      />
      
      <div className="flex justify-between items-end">
        <PageHeader
          title="Roles & Permissions"
          description="Define access hierarchies, granular permissions, and authorization policies across all modules."
        />
        <Button className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-primary">
          <Key className="size-4" /> Create Custom Role
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RoleStatCard title="System Roles" value="06" icon={Shield} />
        <RoleStatCard title="Total Permissions" value="142" icon={Lock} />
        <RoleStatCard title="Role Conflicts" value="0" icon={AlertTriangle} tone="success" />
      </div>

      <div className="rounded-xl border border-border/40 bg-accent/10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Role Name</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Module Access</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Assigned Users</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Type</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <RoleRow name="Owner" access="Full Access" users="01" type="System" onView={() => handleViewPermissions("Owner")} />
            <RoleRow name="Admin" access="Management + Config" users="02" type="System" onView={() => handleViewPermissions("Admin")} />
            <RoleRow name="Sales Manager" access="Sales, CRM, Finance (Limited)" users="04" type="Custom" onView={() => handleViewPermissions("Sales Manager")} />
            <RoleRow name="Support Agent" access="Support, CRM (Read)" users="12" type="Custom" onView={() => handleViewPermissions("Support Agent")} />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function RoleStatCard({ title, value, icon: Icon, tone = "default" }: any) {
  return (
    <Card className="glass-surface border-border/40">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{title}</p>
            <h4 className="text-2xl font-black">{value}</h4>
          </div>
          <div className="size-10 rounded-xl bg-accent/50 flex items-center justify-center">
            <Icon className="size-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RoleRow({ name, access, users, type, onView }: any) {
  return (
    <TableRow className="border-border/40 hover:bg-accent/30 transition-colors">
      <TableCell>
        <div className="text-xs font-black uppercase tracking-wider">{name}</div>
      </TableCell>
      <TableCell className="text-xs font-medium text-muted-foreground">{access}</TableCell>
      <TableCell className="text-xs font-bold">{users}</TableCell>
      <TableCell>
        <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter h-5 border-primary/20 text-primary">
          {type}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-[9px] font-black uppercase tracking-widest h-8 gap-1.5"
          onClick={onView}
        >
          <Eye className="size-3" /> View Permissions
        </Button>
      </TableCell>
    </TableRow>
  );
}
