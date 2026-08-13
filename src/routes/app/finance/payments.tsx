import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Eye, 
  FileText, 
  ChevronRight,
  ExternalLink,
  CreditCard
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoPayments } from "@/lib/mock/workspace.demo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/app/finance/payments")({
  component: FinancePaymentsPage,
});

function FinancePaymentsPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Payments Ledger"
        description="Monitor collection status, track transaction history and reconcile payment records."
        actions={
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Payments
          </Button>
        }
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search payments..." className="h-9 w-64 pl-9 text-xs" />
              </div>
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
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Payment ID</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Customer</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Business</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-right">Amount</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Method</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Status</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {demoPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="py-4 px-6 text-[10px] font-bold text-muted-foreground tracking-widest">{p.id}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold group-hover:text-primary transition-colors">{p.customerName}</span>
                          <span className="text-[10px] text-muted-foreground">{p.saleId}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="outline" className="text-[9px] font-bold uppercase py-0">Acme India</Badge>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-xs">₹ {p.amount.toLocaleString()}</td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <CreditCard className="size-3 text-muted-foreground" />
                          <span className="text-[10px] font-bold uppercase">{p.method}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Badge variant="outline" className={`text-[9px] font-bold uppercase ${
                          p.status === 'Paid' ? 'bg-green-500/10 text-green-700 border-green-500/20' : 
                          p.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20' : 
                          'bg-red-500/10 text-red-700 border-red-500/20'
                        }`}>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="text-xs font-bold cursor-pointer">
                              <Eye className="mr-2 h-3.5 w-3.5" /> View Payment
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold cursor-pointer">
                              <ExternalLink className="mr-2 h-3.5 w-3.5" /> View Sale
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold cursor-pointer">
                              <FileText className="mr-2 h-3.5 w-3.5" /> View Invoice
                            </DropdownMenuItem>
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