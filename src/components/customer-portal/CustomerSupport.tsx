import * as React from "react";
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  LifeBuoy,
  Plus,
  Send,
  Paperclip,
  MoreVertical
} from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function CustomerSupport() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <SectionCard title="Active Support Tickets">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="text-xs">
                  <TableCell className="font-bold text-primary">TIC-2026-442</TableCell>
                  <TableCell className="font-medium">Connection latency in Bengaluru North Hub</TableCell>
                  <TableCell><StatusBadge tone="info">Under Review</StatusBadge></TableCell>
                  <TableCell>2 hours ago</TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm">Details</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SectionCard>

          <SectionCard title="New Support Request">
             <div className="space-y-4">
                <Input placeholder="Ticket Subject..." className="text-sm" />
                <Textarea placeholder="Describe your issue in detail..." className="min-h-[150px] text-sm" />
                <div className="flex items-center justify-between">
                   <Button variant="outline" size="sm" className="glass-surface"><Paperclip className="mr-2 size-3.5" /> Attachments</Button>
                   <Button size="sm"><Send className="mr-2 size-3.5" /> Submit Request</Button>
                </div>
             </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-4">
           <SectionCard title="Help Resources" className="h-full">
              <div className="space-y-4">
                 <ResourceItem title="Getting Started Guide" />
                 <ResourceItem title="System Health FAQ" />
                 <ResourceItem title="Common Troubleshooting" />
                 <ResourceItem title="Account Security Best Practices" />
              </div>
           </SectionCard>
        </div>
      </div>
    </div>
  );
}

function ResourceItem({ title }: { title: string }) {
  return (
    <div className="p-3 rounded-lg border border-border/40 bg-muted/20 hover:bg-muted/50 cursor-pointer transition-colors flex items-center justify-between group">
      <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">{title}</span>
      <FileText className="size-3.5 text-muted-foreground" />
    </div>
  );
}
