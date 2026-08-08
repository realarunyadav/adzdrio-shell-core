import * as React from "react";
import { 
  Plus, 
  Settings, 
  ShieldCheck, 
  Trash2, 
  Power,
  Server,
  Mail,
  Edit2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";

export function MailboxManagement() {
  return (
    <div className="space-y-6">
      <SectionCard 
        title="Mailbox Identities" 
        description="Configure company-wide sender identities and Hostinger/IMAP/SMTP connections."
        actions={
          <Button size="sm">
            <Plus className="mr-2 size-3.5" />
            Add Mailbox
          </Button>
        }
        contentClassName="p-0"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Display Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-xs">ABOS Finance</TableCell>
              <TableCell className="text-xs">finance@adzdrio.com</TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-muted-foreground">
                  <Server className="size-3" />
                  Hostinger
                </div>
              </TableCell>
              <TableCell className="text-xs">Finance & Treasury</TableCell>
              <TableCell><StatusBadge tone="success">Active</StatusBadge></TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" className="size-8"><Edit2 className="size-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="size-8 text-danger"><Trash2 className="size-3.5" /></Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard title="Global Configuration">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Default Sender Identity</Label>
                <p className="text-xs text-muted-foreground">Primary fallback for system-generated mail.</p>
              </div>
              <Button variant="outline" size="sm">support@adzdrio.com</Button>
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Audit Send-As Operations</Label>
                <p className="text-xs text-muted-foreground">Log every instance of employees sending as another identity.</p>
              </div>
              <Switch checked />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Communication Security">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
              <ShieldCheck className="size-5 text-success" />
              <div>
                <p className="text-sm font-bold">Credential Hardening</p>
                <p className="text-xs text-muted-foreground">SMTP/IMAP passwords are encrypted and never exposed in the UI.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-border">
              <Mail className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-bold">Hostinger Integration</p>
                <p className="text-xs text-muted-foreground">Webmail connectivity is managed through a secure backend proxy.</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
