import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Filter, Download, MoreHorizontal, Eye, FileText, ChevronLeft, ChevronRight, Printer, Mail } from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoInvoices } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/app/sales/invoices")({
  component: InvoicesPage,
});

function InvoicesPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Financials"
        title="Invoices"
        description="Manage customer invoices, billing cycles and payment reminders."
      />

      <SectionCard>
        <div className="flex items-center justify-between gap-4 mb-6">
          <Input placeholder="Search invoices..." className="h-9 w-64 text-xs" />
          <Button variant="outline" size="sm" className="h-9"><Filter className="h-3.5 w-3.5 mr-2" /> Filters</Button>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-y border-border/60 bg-muted/20">
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Invoice ID</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Customer</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Sale ID</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Amount</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-center">Status</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Due Date</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {demoInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 text-[10px] font-bold text-muted-foreground tracking-widest">{inv.id}</td>
                  <td className="py-4 px-6 text-xs font-bold">{inv.customerName}</td>
                  <td className="py-4 px-6 text-[10px] font-bold text-muted-foreground uppercase">{inv.saleId}</td>
                  <td className="py-4 px-6 text-right font-black text-xs">₹ {inv.amount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={inv.status === 'Paid' ? 'default' : 'secondary'} className="text-[9px] uppercase">{inv.status}</Badge>
                  </td>
                  <td className="py-4 px-6 text-[10px] font-medium">{inv.dueDate}</td>
                  <td className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" /> Preview</DropdownMenuItem>
                        <DropdownMenuItem><Printer className="h-3.5 w-3.5 mr-2" /> Download</DropdownMenuItem>
                        <DropdownMenuItem><Mail className="h-3.5 w-3.5 mr-2" /> Send Email</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}