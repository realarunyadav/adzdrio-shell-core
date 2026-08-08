import * as React from "react";
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  ArrowRight,
  MoreVertical,
  CreditCard
} from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function CustomerInvoices() {
  const invoices = [
    { id: "INV-2026-881", date: "Jul 01, 2026", amount: "₹ 1,25,000", status: "Paid", file: "Invoice_INV-2026-881.pdf" },
    { id: "INV-2026-722", date: "Jun 01, 2026", amount: "₹ 1,25,000", status: "Paid", file: "Invoice_INV-2026-722.pdf" },
    { id: "INV-2026-644", date: "May 01, 2026", amount: "₹ 1,25,000", status: "Paid", file: "Invoice_INV-2026-644.pdf" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SectionCard 
        title="Billing History & Invoices" 
        description="View, track, and download all your generated invoices from Adzdrio Business Systems."
        actions={
          <div className="flex gap-2">
            <div className="relative group">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search invoices..." className="w-[200px] h-9 pl-9 text-xs glass-surface" />
            </div>
            <Button variant="outline" size="sm" className="h-9 glass-surface"><Filter className="mr-2 size-3.5" /> Filter</Button>
          </div>
        }
        contentClassName="p-0"
      >
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="text-[10px] uppercase font-black">Invoice #</TableHead>
              <TableHead className="text-[10px] uppercase font-black">Date Issued</TableHead>
              <TableHead className="text-[10px] uppercase font-black">Total Amount</TableHead>
              <TableHead className="text-[10px] uppercase font-black">Payment Status</TableHead>
              <TableHead className="text-[10px] uppercase font-black text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id} className="text-xs hover:bg-muted/5 transition-colors group">
                <TableCell className="font-bold text-primary">{inv.id}</TableCell>
                <TableCell>{inv.date}</TableCell>
                <TableCell className="font-medium tracking-tight">{inv.amount}</TableCell>
                <TableCell>
                  <StatusBadge tone="success">{inv.status}</StatusBadge>
                </TableCell>
                <TableCell className="text-right">
                   <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="size-7"><Download className="size-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="size-7"><MoreVertical className="size-3.5" /></Button>
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="surface-card p-6 border-border/40">
           <div className="flex items-center gap-4 mb-4">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><CreditCard className="size-5" /></div>
              <div>
                 <h4 className="text-sm font-black">Billing Method</h4>
                 <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">Primary Card</p>
              </div>
           </div>
           <p className="text-xs font-medium leading-relaxed italic text-muted-foreground">Visa ending in 4242 · Expires 12/2028</p>
           <Button variant="outline" size="sm" className="mt-4 w-full h-8 text-[10px] font-bold uppercase tracking-widest glass-surface">Change Payment Method</Button>
        </Card>
        <Card className="surface-card p-6 border-border/40">
           <div className="flex items-center gap-4 mb-4">
              <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600"><Calendar className="size-5" /></div>
              <div>
                 <h4 className="text-sm font-black">Upcoming Cycle</h4>
                 <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">Aug 01, 2026</p>
              </div>
           </div>
           <p className="text-xs font-medium leading-relaxed italic text-muted-foreground">Next invoice issuance date for the current subscription plan.</p>
           <Button variant="ghost" size="sm" className="mt-4 w-full h-8 text-[10px] font-bold uppercase tracking-widest">View Billing Preferences</Button>
        </Card>
      </div>
    </div>
  );
}
