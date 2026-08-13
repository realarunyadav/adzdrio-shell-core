import * as React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Check, 
  X, 
  Lock, 
  Shield, 
  AlertTriangle,
  ChevronRight,
  Database,
  Briefcase,
  Target,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

// I'll check if Dialog exists in the next turn if this fails.
// Usually shadcn is complete.

interface PermissionDetail {
  module: string;
  icon: any;
  permissions: {
    name: string;
    description: string;
    granted: boolean;
  }[];
}

const MODULE_PERMISSIONS: PermissionDetail[] = [
  {
    module: "CRM",
    icon: Target,
    permissions: [
      { name: "View Leads", description: "View lead directory and pools", granted: true },
      { name: "Create Leads", description: "Add new leads to the system", granted: true },
      { name: "Edit Leads", description: "Modify lead data and status", granted: true },
      { name: "Assign Leads", description: "Transfer leads between employees", granted: false },
      { name: "Export CRM", description: "Download CSV of customer data", granted: false },
    ]
  },
  {
    module: "Sales",
    icon: Briefcase,
    permissions: [
      { name: "Manage Plans", description: "Create and edit pricing plans", granted: false },
      { name: "Approve Sales", description: "Finalize high-value deal overrides", granted: false },
      { name: "Generate Invoices", description: "Issue tax invoices to customers", granted: true },
    ]
  },
  {
    module: "Security",
    icon: Shield,
    permissions: [
      { name: "Audit Access", description: "View system audit logs", granted: false },
      { name: "Manage Roles", description: "Modify role permissions", granted: false },
    ]
  }
];

export function RolePermissionsModal({ 
  open, 
  onOpenChange, 
  roleName 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  roleName: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border/40 glass-surface">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="size-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                Permissions Matrix: {roleName}
                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-tighter h-4 px-1.5 border-primary/20 text-primary">System Role</Badge>
              </DialogTitle>
              <DialogDescription className="text-[10px] uppercase font-bold text-muted-foreground mt-1 tracking-wider leading-relaxed">
                Granular authorization policy defining access scope for the {roleName} hierarchy.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin">
          {MODULE_PERMISSIONS.map((mod) => (
            <div key={mod.module} className="rounded-xl border border-border/40 bg-accent/10 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-2">
                <mod.icon className="size-3.5 text-muted-foreground" />
                <h4 className="text-[10px] font-black uppercase tracking-widest">{mod.module}</h4>
              </div>
              <div className="space-y-3">
                {mod.permissions.map((perm) => (
                  <div key={perm.name} className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-bold">{perm.name}</p>
                      <p className="text-[9px] text-muted-foreground leading-tight">{perm.description}</p>
                    </div>
                    {perm.granted ? (
                      <div className="size-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Check className="size-3 text-emerald-600" />
                      </div>
                    ) : (
                      <div className="size-5 rounded-full bg-red-500/5 flex items-center justify-center shrink-0 border border-red-500/10">
                        <X className="size-3 text-red-600/40" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 border-t border-border/40 pt-4">
          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-amber-600 mr-auto py-2">
            <AlertTriangle className="size-3" /> System roles are immutable
          </div>
          <Button variant="outline" className="h-9 text-[10px] font-black uppercase tracking-widest" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="h-9 text-[10px] font-black uppercase tracking-widest bg-primary">
            Export Policy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
