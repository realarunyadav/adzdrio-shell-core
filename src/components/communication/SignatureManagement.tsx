import * as React from "react";
import { 
  Plus, 
  Mail, 
  Trash2, 
  Edit2, 
  FileText,
  User,
  Users,
  Building,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SignatureManagement() {
  return (
    <div className="space-y-6">
      <SectionCard 
        title="Email Signatures" 
        description="Manage personal, team, and company-wide email footers and disclaimers."
        actions={
          <Button size="sm">
            <Plus className="mr-2 size-3.5" />
            Create Signature
          </Button>
        }
        contentClassName="p-0"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Signature Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: "Global Corporate Footer", type: "company", assigned: "All Employees", icon: Building },
              { name: "Finance Team Signature", type: "team", assigned: "Finance & Revenue", icon: Users },
              { name: "Personal Professional", type: "employee", assigned: "Amit Jain", icon: User },
            ].map((sig, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium text-xs">{sig.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-muted-foreground">
                    <sig.icon className="size-3" />
                    {sig.type}
                  </div>
                </TableCell>
                <TableCell className="text-xs">{sig.assigned}</TableCell>
                <TableCell className="text-[10px] text-muted-foreground truncate max-w-[200px] italic">
                  Best regards, {"{{"}sender_name{"}}"}...
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="size-8"><Edit2 className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="size-8 text-danger"><Trash2 className="size-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Signature Editor (Draft)">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="sig-name">Name</Label>
              <Input id="sig-name" placeholder="e.g., Marketing Standard" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sig-content">Content (Rich Text / HTML)</Label>
              <Textarea id="sig-content" className="min-h-[150px] font-mono text-xs" defaultValue={`Best regards,\n\n{{sender_name}}\n{{sender_title}} | ABOS Enterprise\nEmail: {{sender_email}}`} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Signature</Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Signature Policies">
          <div className="space-y-4">
            <div className="flex items-start justify-between p-3 rounded-lg border bg-muted/30">
              <div className="space-y-1">
                <p className="text-sm font-bold">Enforce Corporate Disclaimer</p>
                <p className="text-xs text-muted-foreground">Automatically append the legal disclaimer to all outbound emails.</p>
              </div>
              <StatusBadge tone="success">Active</StatusBadge>
            </div>
            <div className="flex items-start justify-between p-3 rounded-lg border bg-muted/30">
              <div className="space-y-1">
                <p className="text-sm font-bold">Allow Personal Signatures</p>
                <p className="text-xs text-muted-foreground">Employees can create and use their own signatures in addition to team footers.</p>
              </div>
              <StatusBadge tone="success">Enabled</StatusBadge>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
