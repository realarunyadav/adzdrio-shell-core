import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Filter, Download, MoreHorizontal, Eye, FileText, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoPayments } from "@/lib/mock/workspace.demo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/app/sales/payments")({
  component: PaymentsPage,
});

function PaymentsPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Financials"
        title="Payments"
        description="Monitor collection status, track transaction history and reconcile payments."
      />

      <SectionCard>
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <TabsList className="bg-muted/30 p-1">
              {['all', 'paid', 'pending', 'failed', 'refunded'].map((t) => (
                <TabsTrigger key={t} value={t} className="capitalize text-xs font-bold px-4 py-1.5 data-[state=active]:bg-background">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex items-center gap-2">
              <Input placeholder="Search payments..." className="h-9 w-64 text-xs" />
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-3.5 w-3.5 mr-2" /> Filters
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="m-0">
            <div className="overflow-x-auto -mx-6">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="border-y border-border/60 bg-muted/20">
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Payment ID</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Customer</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Sale ID</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Amount</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-center">Method</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-center">Status</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {demoPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6 text-[10px] font-bold text-muted-foreground tracking-widest">{p.id}</td>
                      <td className="py-4 px-6 text-xs font-bold">{p.customerName}</td>
                      <td className="py-4 px-6 text-[10px] font-bold text-muted-foreground uppercase">{p.saleId}</td>
                      <td className="py-4 px-6 text-right font-black text-xs">₹ {p.amount.toLocaleString()}</td>
                      <td className="py-4 px-6 text-center text-[10px] font-bold uppercase">{p.method}</td>
                      <td className="py-4 px-6 text-center">
                        <Badge variant="outline" className={`text-[9px] ${p.status === 'Paid' ? 'bg-green-500/10 text-green-700' : ''}`}>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" /> View</DropdownMenuItem>
                            <DropdownMenuItem><FileText className="h-3.5 w-3.5 mr-2" /> Invoice</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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