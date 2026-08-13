import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Link as LinkIcon, 
  FileText,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoSales, DemoSale } from "@/lib/mock/workspace.demo";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { CreateSaleWizard } from "@/components/sales/CreateSaleWizard";
import { SaleDetailsDrawer } from "@/components/sales/SaleDetailsDrawer";

export const Route = createFileRoute("/app/sales/deals")({
  component: SalesDealsPage,
});

function SalesDealsPage() {
  const [isWizardOpen, setIsWizardOpen] = React.useState(false);
  const [selectedSale, setSelectedSale] = React.useState<DemoSale | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openSaleDetails = (sale: DemoSale) => {
    setSelectedSale(sale);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Sales Management"
        title="Sales / Deals"
        description="Manage your enterprise sales, deal pipeline and customer contracts."
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 font-bold" onClick={() => setIsWizardOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Sale
            </Button>
          </div>
        }
      />

      <SectionCard>
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search deals, customers, employees..." className="pl-9 h-9 text-xs" />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="h-9 text-xs">
                <Filter className="mr-2 h-3.5 w-3.5" />
                Filters
              </Button>
              <div className="h-4 w-[1px] bg-border mx-1" />
              <p className="text-[10px] font-bold text-muted-foreground uppercase">
                {demoSales.length} Total Deals
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-y border-border/60 bg-muted/20">
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Business</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-right">Amount</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Status</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Payment</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Created</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {demoSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-muted/30 transition-colors group cursor-pointer" onClick={() => openSaleDetails(sale)}>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{sale.customerName}</span>
                        <span className="text-[10px] text-muted-foreground">{sale.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tight py-0">
                        {sale.business}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-black">₹ {sale.finalAmount.toLocaleString()}</span>
                        <span className="text-[9px] text-muted-foreground line-through">₹ {sale.amount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                        sale.status === 'Won' ? 'bg-green-500/10 text-green-700' :
                        sale.status === 'Lost' ? 'bg-red-500/10 text-red-700' :
                        'bg-blue-500/10 text-blue-700'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sale.paymentStatus === 'Paid' ? 'bg-green-500/10 text-green-600' : 
                        sale.paymentStatus === 'Pending' ? 'bg-yellow-500/10 text-yellow-600' : 
                        'bg-red-500/10 text-red-600'
                      }`}>
                        {sale.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-medium">{new Date(sale.created).toLocaleDateString()}</span>
                        <span className="text-[9px] text-muted-foreground uppercase">{sale.salesEmployeeName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="text-xs font-medium cursor-pointer" onClick={() => openSaleDetails(sale)}>
                            <Eye className="mr-2 h-3.5 w-3.5" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                            <Edit className="mr-2 h-3.5 w-3.5" /> Edit Sale
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                            <LinkIcon className="mr-2 h-3.5 w-3.5" /> Create Payment Link
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-medium cursor-pointer">
                            <FileText className="mr-2 h-3.5 w-3.5" /> Add Note
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CreateSaleWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
          <SaleDetailsDrawer sale={selectedSale} open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">
              Showing 1-2 of {demoSales.length}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
