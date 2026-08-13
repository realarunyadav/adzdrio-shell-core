import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Filter, Download, Eye, FileText, ChevronRight, Mail, Printer } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoInvoices } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/app/finance/invoices")({
  component: InvoicesPage,
});

function InvoicesPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Invoices"
        description="Manage customer billing, payment tracking and invoice issuance."
        actions={<Button size="sm" variant="outline"><Download className="mr-2 h-4 w-4" /> Export All</Button>}
      />

      <SectionCard>
        <Tabs defaultValue="all">
          <TabsList className="bg-muted/30 p-1 mb-6">
            {['all', 'paid', 'pending', 'overdue', 'cancelled'].map((t) => (
              <TabsTrigger key={t} value={t} className="capitalize text-xs font-bold px-4 py-1.5 data-[state=active]:bg-background">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex items-center gap-4 mb-6">
            <Input placeholder="Search invoices..." className="h-9 w-64 text-xs" />
            <Button variant="outline" size="sm" className="h-9"><Filter className="h-3.5 w-3.5 mr-2" /> Filters</Button>
          </div>

          <TabsContent value="all" className="m-0">
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
                      <td className="py-4 px-6 text-[10px] font-black text-muted-foreground tracking-widest">{inv.id}</td>
                      <td className="py-4 px-6 text-xs font-bold">{inv.customerName}</td>
                      <td className="py-4 px-6 text-[10px] font-bold text-muted-foreground uppercase">{inv.saleId}</td>
                      <td className="py-4 px-6 text-right font-black text-xs">₹ {inv.amount.toLocaleString()}</td>
                      <td className="py-4 px-6 text-center">
                        <Badge variant={inv.status === 'Paid' ? 'default' : 'secondary'} className="text-[9px] uppercase font-bold">{inv.status}</Badge>
                      </td>
                      <td className="py-4 px-6 text-[10px] font-medium">{inv.dueDate}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm"><Printer className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm"><Mail className="h-3.5 w-3.5" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </SectionCard>
    </div>
  );
}