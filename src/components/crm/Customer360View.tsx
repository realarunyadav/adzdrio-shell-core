import * as React from "react";
import { customerService, leadsService, Customer, Subscription, Device, DeviceGroup, RapidLead, Renewal, Referral, ReferralReward, RefundRequest } from "@/lib/api/services";
import { SectionCard } from "@/components/shared/SectionCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UniversalTag } from "@/components/shared/UniversalTag";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";
import { 
  Users, DollarSign, AlertCircle, Heart, ShieldCheck, 
  Smartphone, Tv, Laptop, History, CreditCard, 
  FileText, MessageSquare, Plus, ArrowRight, 
  Layers, Zap, Gift, Undo2, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UniversalComments } from "@/components/shared/UniversalComments";
import { UniversalActivityTimeline } from "@/components/shared/UniversalActivityTimeline";
import { UniversalFileManager } from "@/components/shared/UniversalFileManager";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Customer360Data {
  customer: Customer;
  subscriptions: Subscription[];
  devices: Device[];
  deviceGroups: DeviceGroup[];
  rapidLeads: RapidLead[];
  renewals: Renewal[];
  referrals: Referral[];
  refunds: RefundRequest[];
}

export function Customer360View() {
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<string | null>("cust-1");
  const [data, setData] = React.useState<Customer360Data | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (selectedCustomerId) {
      async function fetch360() {
        try {
          setLoading(true);
          const response = await customerService.get360(selectedCustomerId);
          setData(response as any);
        } catch (err) {
          console.error("Failed to fetch Customer 360", err);
        } finally {
          setLoading(false);
        }
      }
      fetch360();
    }
  }, [selectedCustomerId]);

  if (!selectedCustomerId) {
    return (
      <SectionCard title="Customer Directory">
        <EmptyState 
          icon={Users} 
          title="No customer selected" 
          description="Select a customer from the directory to view their 360 overview." 
          className="py-24 border-none shadow-none surface-none"
        />
      </SectionCard>
    );
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <Zap className="size-10 text-primary animate-pulse" />
      </div>
    );
  }

  const { customer, subscriptions, devices, deviceGroups, rapidLeads, renewals, referrals, refunds } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Identity Sidebar */}
      <div className="lg:col-span-3 space-y-6">
        <SectionCard title="Customer Identity" contentClassName="p-0">
          <div className="p-6 text-center border-b border-border/40">
            <Avatar className="size-20 mx-auto mb-4 border-2 border-primary/20 p-1">
              <AvatarImage src="" />
              <AvatarFallback className="text-xl font-black bg-primary/10 text-primary">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-black tracking-tight">{customer.name}</h3>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Status: {customer.status}</p>
            <div className="flex justify-center gap-2 mt-4">
              <UniversalTag label={customer.status.toUpperCase()} color={customer.status === 'active' ? 'emerald' : 'amber'} />
              {referrals.length > 0 && <UniversalTag label="Referrer" color="blue" />}
            </div>
          </div>
          <div className="p-4 space-y-4">
             <InfoItem label="Customer ID" value={customer.id} />
             <InfoItem label="Email" value={customer.email} />
             <InfoItem label="Phone" value={customer.phone || 'N/A'} />
             <InfoItem label="Joined" value={new Date(customer.createdAt).toLocaleDateString()} />
          </div>
        </SectionCard>

        <SectionCard title="Global Controls" contentClassName="p-4 space-y-3">
          <Button variant="outline" size="sm" className="w-full text-[10px] h-8 font-black uppercase tracking-widest glass-surface">Edit Profile</Button>
          <Button variant="outline" size="sm" className="w-full text-[10px] h-8 font-black uppercase tracking-widest glass-surface">Manage Permissions</Button>
          <Button variant="destructive" size="sm" className="w-full text-[10px] h-8 font-black uppercase tracking-widest opacity-60">Block Account</Button>
        </SectionCard>
      </div>

      {/* Main Workspace */}
      <div className="lg:col-span-9 space-y-6">
        <Tabs defaultValue="subscriptions" className="w-full">
          <TabsList className="bg-transparent border-b border-border/40 w-full justify-start rounded-none p-0 mb-6 gap-6 overflow-x-auto h-auto">
            <CustomerTabTrigger value="subscriptions" label="Subscriptions" icon={ShieldCheck} count={subscriptions.length} />
            <CustomerTabTrigger value="devices" label="Devices" icon={Smartphone} count={devices.length} />
            <CustomerTabTrigger value="confirmations" label="Rapid Leads" icon={Zap} count={rapidLeads.length} />
            <CustomerTabTrigger value="finance" label="Billing & Payments" icon={CreditCard} />
            <CustomerTabTrigger value="lifecycle" label="Lifecycle" icon={History} />
            <CustomerTabTrigger value="referrals" label="Referrals" icon={Gift} count={referrals.length} />
          </TabsList>

          <TabsContent value="subscriptions" className="outline-none space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptions.map((sub) => (
                <Card key={sub.id} className="border-none shadow-sm glass-surface overflow-hidden group">
                  <CardHeader className="pb-2 border-b border-border/40 bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm font-black tracking-tight">{sub.planName}</CardTitle>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">{sub.id}</p>
                      </div>
                      <Badge className={cn(
                        "text-[9px] font-black uppercase",
                        sub.status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground"
                      )} variant="outline">{sub.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Amount</p>
                        <p className="text-xs font-bold">{sub.currency} {sub.amount.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Term</p>
                        <p className="text-xs font-bold">{sub.termMonths} Months</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Start Date</p>
                        <p className="text-xs font-bold">{new Date(sub.startDate).toLocaleDateString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Expiry Date</p>
                        <p className="text-xs font-bold text-primary">{new Date(sub.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border/40 flex justify-between items-center">
                      <span className="text-[9px] font-bold text-muted-foreground">Auto-Renewal: {sub.autoRenew ? 'Enabled' : 'Disabled'}</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-[9px] font-black uppercase tracking-widest text-primary">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border/40 rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all group">
                <Plus className="size-6 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary">Add Subscription</span>
              </button>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="outline-none space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {devices.map((device) => (
                <Card key={device.id} className="border-none shadow-sm glass-surface p-4 relative group">
                  <div className="absolute top-3 right-3">
                    <div className={cn(
                      "size-2 rounded-full",
                      device.status === 'active' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-muted"
                    )} />
                  </div>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="size-12 rounded-xl bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {device.type.toLowerCase().includes('phone') ? <Smartphone className="size-6" /> :
                       device.type.toLowerCase().includes('tv') ? <Tv className="size-6" /> :
                       <Laptop className="size-6" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-black tracking-tight">{device.nickname || device.type}</h4>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{device.brand} {device.model}</p>
                    </div>
                    <div className="w-full space-y-1.5 pt-2 border-t border-border/40">
                      <div className="flex justify-between text-[9px] font-bold">
                        <span className="text-muted-foreground">Identifier</span>
                        <span>{device.macAddress || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-[9px] font-bold">
                        <span className="text-muted-foreground">Group</span>
                        <span className="text-primary uppercase">{deviceGroups.find(g => g.id === device.deviceGroupId)?.name || 'Default'}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full h-7 text-[9px] font-black uppercase tracking-widest">Manage Device</Button>
                  </div>
                </Card>
              ))}
            </div>

            {deviceGroups.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <Layers className="size-4" /> Alternative Device Groups
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deviceGroups.map((group) => (
                    <Card key={group.id} className="border-none shadow-sm glass-surface p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-black tracking-tight">{group.name}</h4>
                        {group.singleActiveRule && <Badge variant="secondary" className="text-[8px] font-black bg-primary/10 text-primary uppercase">Single Active Rule</Badge>}
                      </div>
                      <div className="flex gap-2">
                        {devices.filter(d => d.deviceGroupId === group.id).map(d => (
                          <div key={d.id} className="size-8 rounded-lg bg-muted/50 border border-border/40 flex items-center justify-center" title={d.nickname}>
                             {d.type.toLowerCase().includes('phone') ? <Smartphone className="size-4" /> : <Tv className="size-4" />}
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="confirmations" className="outline-none space-y-4">
            <SectionCard title="Rapid Lead History" contentClassName="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Plan / Offer</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Sent Date</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Details</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rapidLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-muted/5">
                      <TableCell>
                        <p className="text-xs font-bold">{lead.selectedPlanId.replace(/_/g, ' ')}</p>
                        <p className="text-[9px] text-muted-foreground">₹{lead.price} for {lead.duration}m</p>
                      </TableCell>
                      <TableCell className="text-xs font-medium">{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "text-[9px] font-black uppercase",
                          lead.status === 'confirmed' ? "bg-emerald-500/10 text-emerald-500" :
                          lead.status === 'not_confirmed' ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                        )} variant="outline">{lead.status.replace(/_/g, ' ')}</Badge>
                      </TableCell>
                      <TableCell>
                        {lead.status === 'confirmed' ? (
                          <span className="text-[10px] text-muted-foreground italic">Confirmed on {new Date(lead.confirmedAt!).toLocaleDateString()}</span>
                        ) : lead.status === 'not_confirmed' ? (
                          <span className="text-[10px] text-destructive italic">{lead.declineReason}</span>
                        ) : (
                          <span className="text-[10px] text-muted-foreground">Link active until {new Date(lead.expiresAt).toLocaleDateString()}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="size-8"><ArrowRight className="size-4 text-muted-foreground" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </SectionCard>
          </TabsContent>

          <TabsContent value="finance" className="outline-none space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <SectionCard title="Payment History" contentClassName="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[10px] font-black uppercase">Date</TableHead>
                        <TableHead className="text-[10px] font-black uppercase">Reference</TableHead>
                        <TableHead className="text-[10px] font-black uppercase text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                       <TableRow><TableCell colSpan={3} className="text-center py-10 text-xs text-muted-foreground italic">Financial data integration pending...</TableCell></TableRow>
                    </TableBody>
                  </Table>
               </SectionCard>
               <SectionCard title="Active Refund Requests" contentClassName="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[10px] font-black uppercase">Request Date</TableHead>
                        <TableHead className="text-[10px] font-black uppercase">Amount</TableHead>
                        <TableHead className="text-[10px] font-black uppercase text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {refunds.length === 0 ? (
                        <TableRow><TableCell colSpan={3} className="text-center py-10 text-xs text-muted-foreground italic">No active requests</TableCell></TableRow>
                      ) : (
                        refunds.map(refund => (
                          <TableRow key={refund.id}>
                            <TableCell className="text-xs font-medium">{new Date(refund.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-xs font-bold">₹{refund.requestedAmount}</TableCell>
                            <TableCell className="text-right">
                              <Badge className="text-[8px] font-black uppercase" variant="outline">{refund.status.replace(/_/g, ' ')}</Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
               </SectionCard>
            </div>
          </TabsContent>

          <TabsContent value="lifecycle" className="outline-none space-y-6">
             <SectionCard title="Renewal Early-Exit History">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[10px] font-black uppercase">Subscription</TableHead>
                      <TableHead className="text-[10px] font-black uppercase">Adjustment</TableHead>
                      <TableHead className="text-[10px] font-black uppercase">Effective Date</TableHead>
                      <TableHead className="text-[10px] font-black uppercase text-right">Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {renewals.length === 0 ? (
                       <TableRow><TableCell colSpan={4} className="text-center py-10 text-xs text-muted-foreground italic">No historical renewals recorded</TableCell></TableRow>
                    ) : (
                      renewals.map(r => (
                        <TableRow key={r.id}>
                          <TableCell className="text-xs font-bold">{r.subscriptionId}</TableCell>
                          <TableCell>
                            <Badge className="text-[8px] font-black uppercase" variant="secondary">{r.adjustmentType}</Badge>
                          </TableCell>
                          <TableCell className="text-xs font-medium">{new Date(r.newStartDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right text-[10px] italic text-muted-foreground">{r.adjustmentReason}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
             </SectionCard>
             <SectionCard title="System Activity">
                <UniversalActivityTimeline items={[]} />
             </SectionCard>
          </TabsContent>

          <TabsContent value="referrals" className="outline-none space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-none shadow-sm glass-surface p-6 flex flex-col items-center justify-center text-center gap-2">
                <Gift className="size-8 text-primary mb-2" />
                <h4 className="text-sm font-black tracking-tight">Referral Code</h4>
                <div className="bg-muted px-4 py-2 rounded-lg font-mono font-black text-primary border border-border/40 select-all">
                  {customer.referralCode || 'NOT_GEN'}
                </div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase mt-2">Active Referrals: {referrals.length}</p>
              </Card>
              <Card className="border-none shadow-sm glass-surface p-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Earned Rewards</h4>
                <div className="space-y-3">
                  {referrals.length === 0 ? (
                    <p className="text-xs italic text-muted-foreground">No rewards earned yet</p>
                  ) : (
                    <div className="space-y-2">
                      {/* Mapping rewards would go here */}
                      <p className="text-xs font-bold text-slate-700">Participation recorded in {referrals.length} referrals.</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
            
            <SectionCard title="Referral Network" contentClassName="p-0">
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead className="text-[10px] font-black uppercase">Referred User</TableHead>
                     <TableHead className="text-[10px] font-black uppercase">Status</TableHead>
                     <TableHead className="text-[10px] font-black uppercase text-right">Joined Date</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {referrals.map(ref => (
                     <TableRow key={ref.id}>
                       <TableCell className="text-xs font-bold">{ref.referredId}</TableCell>
                       <TableCell>
                         <Badge variant="outline" className="text-[8px] font-black uppercase">{ref.status}</Badge>
                       </TableCell>
                       <TableCell className="text-right text-xs font-medium">{new Date(ref.createdAt).toLocaleDateString()}</TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-foreground/60">{label}</span>
      <span className="text-xs font-bold text-slate-700 truncate">{value}</span>
    </div>
  );
}

function CustomerTabTrigger({ value, label, icon: Icon, count }: { value: string; label: string; icon: any; count?: number }) {
  return (
    <TabsTrigger 
      value={value} 
      className="rounded-none border-b-2 border-transparent px-1 pb-3 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none opacity-60 data-[state=active]:opacity-100 transition-all flex items-center gap-2"
    >
      <Icon className="size-3.5" />
      {label}
      {count !== undefined && <Badge variant="secondary" className="text-[8px] font-black px-1.5 h-4 bg-primary/5 text-primary border-primary/20">{count}</Badge>}
    </TabsTrigger>
  );
}
