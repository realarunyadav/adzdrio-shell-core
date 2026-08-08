import * as React from "react";
import { 
  CreditCard, 
  History, 
  CheckCircle2, 
  ArrowUpRight, 
  FileText, 
  Download, 
  Calendar,
  Lock,
  ChevronRight,
  TrendingUp,
  Clock,
  ArrowRight
} from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function SubscriptionWorkspace() {
  const currentSubscription = {
    plan: "Enterprise Platinum",
    status: "Active",
    duration: "12 Months (Annual)",
    start: "Jan 12, 2026",
    end: "Jan 11, 2027",
    services: [
      "24/7 Priority Support",
      "Unlimited Device Management",
      "Advanced AI Sales Coach",
      "Revenue Intelligence Dashboard",
      "100GB Secure Storage",
      "Custom Organization Branding"
    ]
  };

  const subscriptionHistory = [
    { id: "SUB-8812", plan: "Enterprise Platinum", action: "Renewal", date: "Jan 12, 2026", status: "Active" },
    { id: "SUB-4421", plan: "Enterprise Gold", action: "Upgrade", date: "Aug 15, 2025", status: "Terminated" },
    { id: "SUB-2210", plan: "Standard Business", action: "Initial Purchase", date: "Jan 12, 2025", status: "Terminated" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Plan Details */}
        <div className="lg:col-span-7 space-y-6">
          <SectionCard 
            title="Current Plan Configuration" 
            actions={<StatusBadge tone="success">{currentSubscription.status}</StatusBadge>}
          >
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Selected Plan</p>
                <p className="text-xl font-black text-primary">{currentSubscription.plan}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Billing Cycle</p>
                <p className="text-xl font-black">{currentSubscription.duration}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Commencement</p>
                <p className="text-sm font-bold">{currentSubscription.start}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Expiration</p>
                <p className="text-sm font-bold">{currentSubscription.end}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-4">Included Enterprise Services</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSubscription.services.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40 group hover:bg-primary/5 hover:border-primary/20 transition-all">
                    <CheckCircle2 className="size-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Lifecycle History" description="Audit trail of subscription state changes and tier migrations." contentClassName="p-0">
             <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="text-[10px] uppercase font-black">Subscription ID</TableHead>
                    <TableHead className="text-[10px] uppercase font-black">Tier</TableHead>
                    <TableHead className="text-[10px] uppercase font-black">Event</TableHead>
                    <TableHead className="text-[10px] uppercase font-black">Effective Date</TableHead>
                    <TableHead className="text-[10px] uppercase font-black text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptionHistory.map((history) => (
                    <TableRow key={history.id} className="text-xs hover:bg-muted/5 transition-colors">
                      <TableCell className="font-medium text-primary uppercase">{history.id}</TableCell>
                      <TableCell className="font-bold">{history.plan}</TableCell>
                      <TableCell className="italic opacity-70">{history.action}</TableCell>
                      <TableCell>{history.date}</TableCell>
                      <TableCell className="text-right">
                        <StatusBadge tone={history.status === 'Active' ? 'success' : 'neutral'}>{history.status}</StatusBadge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
             </Table>
          </SectionCard>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <SectionCard title="Renewal Management" className="bg-primary/5 border-primary/20">
            <div className="space-y-6">
               <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <History className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black">Auto-Renewal is ON</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">Your subscription will automatically renew on Jan 11, 2027 using your default payment method.</p>
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                 <Button className="w-full h-10 font-black shadow-elevated">Manage Payment Method</Button>
                 <Button variant="outline" className="w-full h-10 font-bold glass-surface border-primary/20 text-primary hover:bg-primary/10 transition-all">Review Renewal Offer</Button>
                 <Button variant="ghost" className="w-full text-[10px] uppercase font-black opacity-40 hover:opacity-100">Disable Auto-Renewal</Button>
               </div>
            </div>
          </SectionCard>

          <SectionCard title="Available Upgrades" footer={<p className="text-center italic">Special enterprise loyalty discount applied: 15%</p>}>
             <div className="space-y-4">
                <UpgradeOption 
                  title="Global Enterprise One" 
                  desc="Unrestricted multi-region support, unlimited users, and dedicated account manager." 
                  price="₹ 45L/yr" 
                />
                <UpgradeOption 
                  title="Custom Hybrid Tier" 
                  desc="Tailor-made resources for specialized organizational needs." 
                  price="On-Request" 
                />
             </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function UpgradeOption({ title, desc, price }: { title: string, desc: string, price: string }) {
  return (
    <div className="p-4 rounded-xl border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="size-4 text-primary" />
      </div>
      <p className="text-[10px] uppercase font-black text-primary tracking-widest mb-1">Upgrade Tier</p>
      <h4 className="text-sm font-black mb-2">{title}</h4>
      <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">{desc}</p>
      <div className="flex items-center justify-between pt-3 border-t border-border/20">
        <span className="text-[10px] font-bold opacity-60 uppercase">Starting at</span>
        <span className="text-sm font-black text-primary">{price}</span>
      </div>
    </div>
  );
}
