import * as React from "react";
import { 
  Plus, 
  FileText, 
  Trash2, 
  Edit2, 
  Copy,
  Tag,
  CheckCircle2,
  XCircle
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

export function TemplateManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <div className="relative flex-1">
          <Input placeholder="Search templates..." className="pl-9" />
          <Tag className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          New Template
        </Button>
      </div>

      <SectionCard contentClassName="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template Name</TableHead>
              <TableHead>Subject Line</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Variables</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { 
                name: "Welcome Email", 
                subject: "Welcome to {{company_name}}!", 
                category: "Onboarding", 
                vars: 3,
                status: "active" 
              },
              { 
                name: "Invoice Overdue", 
                subject: "Payment Reminder: Invoice {{invoice_number}}", 
                category: "Finance", 
                vars: 4,
                status: "active" 
              },
              { 
                name: "Proposal Follow-up", 
                subject: "Following up on our discussion", 
                category: "Sales", 
                vars: 2,
                status: "inactive" 
              },
            ].map((template, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium text-xs">{template.name}</TableCell>
                <TableCell className="text-xs text-muted-foreground italic truncate max-w-[200px]">
                  {template.subject}
                </TableCell>
                <TableCell>
                  <StatusBadge tone="neutral">{template.category}</StatusBadge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {Array.from({ length: template.vars }).map((_, j) => (
                      <div key={j} className="size-1.5 rounded-full bg-primary/40" />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {template.status === 'active' ? (
                    <StatusBadge tone="success">Active</StatusBadge>
                  ) : (
                    <StatusBadge tone="neutral">Draft</StatusBadge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="size-8"><Edit2 className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="size-8"><Copy className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="size-8 text-danger"><Trash2 className="size-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-3">
        <SectionCard title="Variables Help">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase text-muted-foreground">Available System Fields</p>
            <div className="flex flex-wrap gap-1.5">
              {['customer_name', 'invoice_number', 'plan_name', 'expiry_date', 'total_amount'].map(v => (
                <code key={v} className="text-[10px] px-1.5 py-0.5 bg-muted rounded border">{"{{"}{v}{"}}"}</code>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 italic">Variables only resolve when underlying record data is present.</p>
          </div>
        </SectionCard>
        
        <SectionCard title="Email Signatures" className="md:col-span-2" actions={<Button variant="outline" size="sm">Manage Signatures</Button>}>
          <div className="space-y-4">
            <div className="p-3 rounded-lg border border-dashed bg-muted/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase">Standard Company Footer</span>
                <StatusBadge tone="success">Enforced</StatusBadge>
              </div>
              <div className="text-[10px] text-muted-foreground">
                © 2026 ABOS Enterprise. All rights reserved. Confidentiality Notice...
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
