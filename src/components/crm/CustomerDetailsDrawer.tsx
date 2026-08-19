import * as React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Customer } from "@/lib/api/services.types";
import { format } from "date-fns";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  UserCheck, 
  MessageSquare, 
  TrendingUp, 
  CreditCard,
  FileText,
  History,
  Tag,
  AlertCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface CustomerDetailsDrawerProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerDetailsDrawer({ customer, open, onOpenChange }: CustomerDetailsDrawerProps) {
  const { data: customer360, isLoading } = useQuery({
    queryKey: ["customer-360", customer?.id],
    queryFn: () => customerService.get360(customer?.id || ""),
    enabled: !!customer?.id && open,
  });

  if (!customer) return null;

  const summary = [
    { label: "Total Sales", value: customer.totalSales || "₹ 0", icon: TrendingUp },
    { label: "Status", value: customer.status, icon: History },
    { label: "Added Date", value: format(new Date(customer.createdAt), "MMM dd, yyyy"), icon: Calendar },
    { label: "Updated", value: format(new Date(customer.updatedAt), "MMM dd, yyyy"), icon: Clock },
  ];


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0 border-l border-border/40">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border/40 bg-muted/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <StatusBadge tone="success">Active Customer</StatusBadge>
              </div>

              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                ID: {customer.id.toUpperCase()}
              </div>
            </div>
            
            <div className="flex items-start justify-between">
              <div>
                <SheetTitle className="text-3xl font-black mb-1">{customer.name}</SheetTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <Globe className="size-3" /> {customer.business} · <UserCheck className="size-3" /> {customer.assignedToName}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" className="size-9 rounded-full shadow-sm"><Phone className="size-4" /></Button>
                    <Button size="icon" variant="outline" className="size-9 rounded-full shadow-sm"><MessageSquare className="size-4" /></Button>
                    <Button className="h-9 px-4 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">Add Sale</Button>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 border-b border-border/40">
              {summary.map((item, i) => (
                <div key={i} className="bg-background p-4 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter text-muted-foreground">
                    <item.icon className="size-3" />
                    {item.label}
                  </div>
                  <div className="text-sm font-black">
                    {item.value}
                  </div>
                </div>
              ))}

            </div>

            <Tabs defaultValue="overview" className="w-full">
              <div className="px-6 border-b border-border/40 bg-muted/5">
                <TabsList className="h-12 bg-transparent p-0 gap-6">
                  {["Overview", "Activity", "Sales", "Follow-ups", "Documents"].map(tab => (
                    <TabsTrigger 
                      key={tab} 
                      value={tab.toLowerCase()} 
                      className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-[10px] font-black uppercase tracking-widest px-0"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="overview" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Tag className="size-3" /> Contact Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-xl border border-border/40 bg-muted/5">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Email Address</p>
                        <p className="text-xs font-black">{customer.email}</p>
                      </div>
                      <div className="p-3 rounded-xl border border-border/40 bg-muted/5">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Phone Number</p>
                        <p className="text-xs font-black">{customer.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Engagement Notes</h4>
                    <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 italic text-xs leading-relaxed text-foreground/80">
                      "No significant engagement notes for this customer yet."
                    </div>

                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Upcoming Schedule</h4>
                      <Button variant="link" className="h-auto p-0 text-[10px] font-black uppercase">View Calendar</Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-xl border border-border/40 hover:border-primary/40 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Clock className="size-4" />
                          </div>
                          <div>
                            <p className="text-xs font-black group-hover:text-primary transition-colors">Quarterly Review Call</p>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase">Scheduled for Aug 25, 10:30 AM</p>
                          </div>
                        </div>
                        <CheckCircle2 className="size-4 text-muted-foreground/30" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="mt-0 space-y-6">
                   <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-border/40">
                      {[
                        { time: "2 hours ago", action: "Payment Received", detail: "₹ 50,000 via Razorpay", icon: CreditCard, color: "text-green-500", bg: "bg-green-500/10" },
                        { time: "Yesterday", action: "Email Sent", detail: "Monthly performance report for July 2026", icon: Mail, color: "text-blue-500", bg: "bg-blue-500/10" },
                        { time: "3 days ago", action: "Call Completed", detail: "Discussed expansion plans for vertex-tech", icon: Phone, color: "text-orange-500", bg: "bg-orange-500/10" },
                        { time: "Aug 05, 2026", action: "Document Signed", detail: "Master Service Agreement v2.1", icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
                      ].map((activity, i) => (
                        <div key={i} className="relative pl-10">
                          <div className={cn("absolute left-0 top-0 size-8 rounded-full flex items-center justify-center z-10", activity.bg, activity.color)}>
                            <activity.icon className="size-4" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-0.5">{activity.time}</p>
                            <p className="text-xs font-black">{activity.action}</p>
                            <p className="text-[11px] text-muted-foreground font-medium">{activity.detail}</p>
                          </div>
                        </div>
                      ))}
                   </div>
                </TabsContent>
                
                <TabsContent value="sales" className="mt-0 text-center py-12">
                   <TrendingUp className="size-12 text-muted-foreground/20 mx-auto mb-4" />
                   <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Historical sales data will appear here</p>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <SheetFooter className="p-6 border-t border-border/40 bg-muted/5 gap-2 sm:flex-row">
            <Button variant="outline" className="flex-1 text-[10px] font-black uppercase tracking-widest h-10">Edit Profile</Button>
            <Button variant="outline" className="flex-1 text-[10px] font-black uppercase tracking-widest h-10 border-red-500/20 text-red-500 hover:bg-red-500/5">Deactivate</Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
