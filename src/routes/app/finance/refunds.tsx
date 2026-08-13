import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Filter, Eye, AlertCircle, CheckCircle2, RotateCcw, Ban } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoRefunds } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/app/finance/refunds")({
  component: RefundsPage,
});

function RefundsPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Refund Requests"
        description="Review, process and monitor customer refund claims."
      />

      <SectionCard>
        <Tabs defaultValue="all">
          <TabsList className="bg-muted/30 p-1 mb-6">
            {['all', 'requested', 'processing', 'completed', 'rejected'].map((t) => (
              <TabsTrigger key={t} value={t} className="capitalize text-xs font-bold px-4 py-1.5 data-[state=active]:bg-background">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex items-center gap-4 mb-6">
            <Input placeholder="Search refunds, payments..." className="h-9 w-64 text-xs" />
            <Button variant="outline" size="sm" className="h-9"><Filter className="h-3.5 w-3.5 mr-2" /> Filters</Button>
          </div>

          <TabsContent value="all" className="m-0">
            <div className="overflow-x-auto -mx-6">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="border-y border-border/60 bg-muted/20">
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Refund ID</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Payment ID</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Customer</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Amount</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-center">Status</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Requested</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {demoRefunds.map((r) => (
                    <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6 text-[10px] font-black text-muted-foreground tracking-widest">{r.id}</td>
                      <td className="py-4 px-6 text-[10px] font-bold">{r.paymentId}</td>
                      <td className="py-4 px-6 text-xs font-bold">{r.customerName}</td>
                      <td className="py-4 px-6 text-right font-black text-xs text-red-600">- ₹ {r.amount.toLocaleString()}</td>
                      <td className="py-4 px-6 text-center"><Badge variant="outline" className="text-[9px] uppercase">{r.status}</Badge></td>
                      <td className="py-4 px-6 text-[10px] font-medium">{r.requestedDate}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /></Button>
                          {r.status === 'Requested' && (
                             <>
                               <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold text-green-600"><CheckCircle2 className="h-3 w-3 mr-1" /> Approve</Button>
                               <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold text-red-600"><Ban className="h-3 w-3 mr-1" /> Reject</Button>
                             </>
                          )}
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