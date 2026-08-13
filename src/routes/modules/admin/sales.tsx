import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit2, ShieldCheck, Zap, Globe, Lock, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { demoPlans, demoTaxRules } from "@/lib/mock/workspace.demo";
import { useState } from "react";
import { PlanModal } from "@/components/sales/PlanModal";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/modules/admin/sales")({
  component: () => {
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);

    const openPlanModal = (plan?: any) => {
      setSelectedPlan(plan || null);
      setIsPlanModalOpen(true);
    };

    return (
      <div className="space-y-6 pb-20">
        <PageHeader
          title="Sales Configuration"
          description="Configure pricing plans, payment link behaviors, and enterprise tax rules."
        />

        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="plans" className="text-[10px] font-black uppercase tracking-widest px-6">Plans</TabsTrigger>
            <TabsTrigger value="payment-links" className="text-[10px] font-black uppercase tracking-widest px-6">Payment Links</TabsTrigger>
            <TabsTrigger value="tax-rules" className="text-[10px] font-black uppercase tracking-widest px-6">Tax Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider">Product Catalog</h3>
                <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Manage pricing tiers and feature entitlements</p>
              </div>
              <Button onClick={() => openPlanModal()} size="sm" className="h-9 text-[10px] font-black uppercase tracking-widest gap-2 bg-primary shadow-lg shadow-primary/20">
                <Plus className="size-4" /> Add New Plan
              </Button>
            </div>
            <div className="rounded-xl border border-border/40 bg-accent/10 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 border-border/50 hover:bg-muted/30">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Plan Name</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Price</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Business</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoPlans.map((plan) => (
                    <TableRow key={plan.id} className="border-border/40 hover:bg-accent/20 transition-colors">
                      <TableCell className="py-4">
                        <div className="text-xs font-black uppercase tracking-wider">{plan.name}</div>
                        <div className="text-[9px] text-muted-foreground uppercase font-bold mt-0.5">
                          {plan.features?.slice(0, 2).join(" • ")}
                          {(plan.features?.length || 0) > 2 && ` +${(plan.features?.length || 0) - 2} more`}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold">₹ {plan.price.toLocaleString()}</TableCell>
                      <TableCell className="text-[10px] font-bold text-muted-foreground uppercase">{plan.business}</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "text-[8px] font-black uppercase tracking-tighter h-5 border-none",
                          plan.status === 'Active' ? "bg-emerald-500/10 text-emerald-600" : 
                          plan.status === 'Draft' ? "bg-amber-500/10 text-amber-600" : 
                          "bg-muted text-muted-foreground"
                        )}>
                          {plan.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button variant="ghost" size="icon" className="size-8" onClick={() => openPlanModal(plan)}>
                          <Edit2 className="size-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="payment-links" className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider">Payment Link Config</h3>
                <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Global behaviors and brand overrides for generated links</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-surface border-border/40">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="size-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Expiration & Security</h4>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase">Configure link lifespan and validation</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-[11px] font-bold uppercase tracking-tight">Auto-Expire Links</Label>
                        <p className="text-[9px] text-muted-foreground font-medium">Links expire after 48 hours if unpaid</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-[11px] font-bold uppercase tracking-tight">OTP Verification</Label>
                        <p className="text-[9px] text-muted-foreground font-medium">Require OTP before viewing payment details</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-surface border-border/40">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="size-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Redirects & Branding</h4>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase">Post-payment experience</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-[11px] font-bold uppercase tracking-tight">Custom Success URL</Label>
                        <p className="text-[9px] text-muted-foreground font-medium">Redirect to business success page</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-[11px] font-bold uppercase tracking-tight">Show Business Logo</Label>
                        <p className="text-[9px] text-muted-foreground font-medium">Override platform branding with entity logo</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tax-rules" className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider">Compliance & Taxes</h3>
                <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Configure GST, TDS, and global tax calculation rules</p>
              </div>
              <Button size="sm" variant="outline" className="h-9 text-[10px] font-black uppercase tracking-widest gap-2 border-border/40">
                <Plus className="size-4" /> Add Tax Rule
              </Button>
            </div>
            <div className="rounded-xl border border-border/40 bg-accent/10 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 border-border/50 hover:bg-muted/30">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Rule Name</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Type</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Rate</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Effective From</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoTaxRules.map((rule) => (
                    <TableRow key={rule.id} className="border-border/40 hover:bg-accent/20 transition-colors">
                      <TableCell className="py-4 font-bold text-xs uppercase tracking-tight">{rule.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[8px] font-black uppercase tracking-tighter h-5 border-border/60">
                          {rule.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs font-black">{rule.rate}%</TableCell>
                      <TableCell className="text-[10px] font-bold text-muted-foreground uppercase">{rule.effectiveFrom}</TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] font-black uppercase tracking-tighter h-5">{rule.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

        </Tabs>

        <PlanModal 
          isOpen={isPlanModalOpen} 
          onClose={() => setIsPlanModalOpen(false)} 
          plan={selectedPlan}
        />
      </div>
    );
  },
});

