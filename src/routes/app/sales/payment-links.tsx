import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Copy, 
  Ban,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoPaymentLinks } from "@/lib/mock/workspace.demo";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/sales/payment-links")({
  component: PaymentLinksPage,
});

function PaymentLinksPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Sales Operations"
        title="Payment Links"
        description="Generate, manage and share secure payment links with your customers."
        actions={
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Link
          </Button>
        }
      />

      <SectionCard>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search links, customers..." className="pl-9 h-9 text-xs" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 text-xs">
                <Filter className="mr-2 h-3.5 w-3.5" />
                Filters
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-y border-border/60 bg-muted/20">
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Customer</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Sale ID</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Amount</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-center">Status</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Expires</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {demoPaymentLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{link.customerName}</span>
                        <span className="text-[10px] text-muted-foreground">{link.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{link.saleId}</td>
                    <td className="py-4 px-6 text-right font-black text-xs">₹ {link.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant={link.status === 'Active' ? 'default' : 'secondary'} className="text-[10px] uppercase">
                        {link.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-[10px] font-medium">{new Date(link.expires).toLocaleDateString()}</td>
                    <td className="py-4 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-3.5 w-3.5" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-3.5 w-3.5" /> Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-3.5 w-3.5" /> Regenerate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="mr-2 h-3.5 w-3.5" /> Disable
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}