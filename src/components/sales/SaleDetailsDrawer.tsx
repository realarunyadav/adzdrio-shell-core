import * as React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  FileText, 
  User, 
  Calendar, 
  MoreHorizontal,
  ExternalLink,
  Receipt,
  History,
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// DemoSale replaced by any for live data transition

interface SaleDetailsDrawerProps {
  sale: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaleDetailsDrawer({ sale, open, onOpenChange }: SaleDetailsDrawerProps) {
  if (!sale) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl p-0 flex flex-col gap-0">
        <SheetHeader className="p-6 border-b bg-muted/20">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest bg-background">
              {sale.id}
            </Badge>
            <div className="flex gap-2">
              <Badge className={sale.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}>
                {sale.paymentStatus}
              </Badge>
              <Badge variant="secondary">
                {sale.status}
              </Badge>
            </div>
          </div>
          <SheetTitle className="text-2xl font-black">₹ {sale.finalAmount.toLocaleString()}</SheetTitle>
          <p className="text-sm text-muted-foreground font-medium">
            Sale created on {new Date(sale.created).toLocaleDateString()} for {sale.customerName}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <div className="px-6 border-b">
              <TabsList className="bg-transparent h-12 gap-6 p-0">
                <TabsTrigger value="overview" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:bg-transparent px-0 text-xs font-bold">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="payment" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:bg-transparent px-0 text-xs font-bold">
                  Payment
                </TabsTrigger>
                <TabsTrigger value="activity" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:bg-transparent px-0 text-xs font-bold">
                  Activity
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-6 space-y-8 m-0">
              <div className="grid grid-cols-2 gap-8">
                <section className="space-y-3">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase flex items-center gap-2">
                    <User className="h-3 w-3" /> Customer Information
                  </h4>
                  <div className="space-y-1">
                    <p className="text-sm font-bold">{sale.customerName}</p>
                    <p className="text-xs text-muted-foreground">{sale.phone}</p>
                    <p className="text-xs text-muted-foreground">{sale.email}</p>
                    <p className="text-[10px] text-primary font-bold mt-1">ID: {sale.customerId}</p>
                  </div>
                </section>
                <section className="space-y-3">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase flex items-center gap-2">
                    <ShoppingBag className="h-3 w-3" /> Sale Details
                  </h4>
                  <div className="space-y-1">
                    <p className="text-sm font-bold">{sale.planName}</p>
                    <p className="text-xs text-muted-foreground">Business: {sale.business}</p>
                    <p className="text-xs text-muted-foreground">Sales Rep: {sale.salesEmployeeName}</p>
                  </div>
                </section>
              </div>

              <section className="space-y-3">
                <h4 className="text-[10px] font-black text-muted-foreground uppercase">Pricing Summary</h4>
                <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Base Amount</span>
                    <span className="font-medium">₹ {sale.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-red-600">
                    <span>Discount</span>
                    <span className="font-bold">- ₹ {sale.discount.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 mt-2 border-t flex justify-between">
                    <span className="text-xs font-black">Final Amount</span>
                    <span className="text-sm font-black text-orange-600">₹ {sale.finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </section>

              {sale.notes && (
                <section className="space-y-3">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase flex items-center gap-2">
                    <MessageSquare className="h-3 w-3" /> Internal Notes
                  </h4>
                  <p className="text-xs text-muted-foreground bg-muted/40 p-3 rounded-lg border italic">
                    "{sale.notes}"
                  </p>
                </section>
              )}
            </TabsContent>

            <TabsContent value="payment" className="p-6 space-y-6 m-0">
               <div className="p-6 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center gap-4">
                  <div className="size-12 rounded-full bg-orange-600/10 flex items-center justify-center">
                    <ExternalLink className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black">Payment Link Active</h4>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">This customer has an active payment link for this sale.</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs font-bold">Copy Payment Link</Button>
               </div>
               
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase">Associated Documents</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="justify-start h-12 px-4 group">
                      <Receipt className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      <div className="text-left">
                        <p className="text-xs font-bold">Invoice INV-2024-001</p>
                        <p className="text-[9px] text-muted-foreground">Generated on 01/08/2024</p>
                      </div>
                    </Button>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="activity" className="p-6 m-0">
               <div className="space-y-6">
                 {[
                   { type: 'status', label: 'Sale Won', date: '01/08/2024 14:30', user: 'Ankit Singh' },
                   { type: 'payment', label: 'Payment Received', date: '01/08/2024 14:25', user: 'System' },
                   { type: 'link', label: 'Payment Link Created', date: '01/08/2024 10:15', user: 'Ankit Singh' },
                   { type: 'sale', label: 'Sale Created', date: '01/08/2024 10:00', user: 'Ankit Singh' },
                 ].map((activity, i) => (
                   <div key={i} className="flex gap-4 relative">
                     {i !== 3 && <div className="absolute left-[7px] top-4 w-[1px] h-full bg-border" />}
                     <div className="size-4 rounded-full border-2 border-orange-600 bg-background z-10" />
                     <div className="flex-1 -mt-0.5">
                       <p className="text-xs font-black">{activity.label}</p>
                       <p className="text-[10px] text-muted-foreground mt-1">By {activity.user} • {activity.date}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-6 border-t bg-muted/10 grid grid-cols-2 gap-3">
          <Button className="bg-orange-600 hover:bg-orange-700 font-bold text-xs h-10">
            Create Payment Link
          </Button>
          <Button variant="outline" className="font-bold text-xs h-10">
            Download Invoice
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

