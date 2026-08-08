import { useState } from "react";
import { Mail, Inbox, Send, FileText, AlertCircle, Search, Plus, Settings } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { EmailComposer } from "@/components/communication/EmailComposer";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function CommunicationCenter() {
  const [isComposing, setIsComposing] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Enterprise Communication"
        title="Communication Center"
        description="Unified workspace for company mailbox management, templated outreach, and audit-ready correspondence."
        actions={
          <Button onClick={() => setIsComposing(true)}>
            <Plus className="mr-2 size-4" />
            Compose
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="space-y-2">
          <NavItem icon={Inbox} label="Inbox" count={12} active />
          <NavItem icon={Send} label="Sent" />
          <NavItem icon={FileText} label="Drafts" count={3} />
          <NavItem icon={AlertCircle} label="Failed" />
          <hr className="my-4 border-border" />
          <NavItem icon={Settings} label="Mailbox Settings" />
        </div>

        <div className="lg:col-span-3">
          <SectionCard title="Inbox" contentClassName="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From/To</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-xs">client@example.com</TableCell>
                  <TableCell className="text-xs">Re: Invoice #INV-2026-001</TableCell>
                  <TableCell><StatusBadge tone="success">Delivered</StatusBadge></TableCell>
                  <TableCell className="text-right text-xs">10:45 AM</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SectionCard>
        </div>
      </div>

      {isComposing && <EmailComposer onClose={() => setIsComposing(false)} />}
    </div>
  );
}

function NavItem({ icon: Icon, label, count, active }: any) {
  return (
    <button className={`flex items-center justify-between w-full p-2 rounded-md text-sm transition-colors ${active ? 'bg-accent font-semibold' : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'}`}>
      <div className="flex items-center gap-3">
        <Icon className="size-4" />
        {label}
      </div>
      {count && <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full">{count}</span>}
    </button>
  );
}
