import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Settings, History, Play, Power, Zap, Eye, Copy } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { demoIncentiveRules } from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IncentiveRuleModal } from "@/components/incentives/IncentiveRuleModal";
import { useState } from "react";

export const Route = createFileRoute("/modules/admin/incentives")({
  component: () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<any>(null);

    const openModal = (rule?: any) => {
      setSelectedRule(rule || null);
      setIsModalOpen(true);
    };

    const salesRules = demoIncentiveRules.filter(r => r.type === "Sales");
    const referralRules = demoIncentiveRules.filter(r => r.type === "Referral");

    return (
      <div className="space-y-6 pb-20">
        <PageHeader
          title="Incentive Engine"
          description="Architect enterprise performance rewards, tiered commission slabs, and multi-level referral incentives."
        />
        
        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="sales" className="text-[10px] font-black uppercase tracking-widest px-6">Sales Incentives</TabsTrigger>
            <TabsTrigger value="referrals" className="text-[10px] font-black uppercase tracking-widest px-6">Referral Rules</TabsTrigger>
            <TabsTrigger value="simulator" className="text-[10px] font-black uppercase tracking-widest px-6">Prototype Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider">Performance Rules</h3>
                <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Active slabs for sales achievement</p>
              </div>
              <Button onClick={() => openModal()} className="h-9 text-[10px] font-black uppercase tracking-widest gap-2 bg-primary">
                <Plus className="size-4" /> Create Sales Rule
              </Button>
            </div>

            <Card className="glass-surface border-border/40 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 border-border/50 hover:bg-muted/30">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Rule Identity</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Slabs / Tiers</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Period</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesRules.map((rule) => (
                    <TableRow key={rule.id} className="border-border/40 hover:bg-accent/20 transition-colors">
                      <TableCell className="py-4">
                        <div className="text-xs font-black uppercase tracking-wider">{rule.name}</div>
                        <div className="text-[9px] text-muted-foreground uppercase font-bold mt-0.5">Version {rule.version}.0 • {rule.businessId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {rule.tiers.map((tier, idx) => (
                            <Badge key={idx} variant="outline" className="text-[8px] font-black uppercase tracking-tighter border-primary/20 bg-primary/5 text-primary h-5 px-1.5">
                              T{idx+1}: {tier.min}+
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-[10px] font-bold text-muted-foreground uppercase">
                        Effective {rule.effectiveFrom}
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "text-[8px] font-black uppercase tracking-tighter h-5 border-none",
                          rule.status === 'Active' ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"
                        )}>
                          {rule.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="size-8" onClick={() => openModal(rule)}><Eye className="size-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="size-8" onClick={() => openModal(rule)}><Settings className="size-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="size-8"><History className="size-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider">Referral Programs</h3>
                <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Multi-tier referral reward configuration</p>
              </div>
              <Button onClick={() => openModal()} className="h-9 text-[10px] font-black uppercase tracking-widest gap-2 variant-outline border-primary/20 text-primary">
                <Plus className="size-4" /> Create Referral Rule
              </Button>
            </div>

            <Card className="glass-surface border-border/40 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 border-border/50 hover:bg-muted/30">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Rule Name</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Reward Structure</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referralRules.map((rule) => (
                    <TableRow key={rule.id} className="border-border/40 hover:bg-accent/20 transition-colors">
                      <TableCell className="py-4">
                        <div className="text-xs font-black uppercase tracking-wider">{rule.name}</div>
                        <div className="text-[9px] text-muted-foreground uppercase font-bold mt-0.5">{rule.businessId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {rule.tiers.map((tier, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="text-[8px] font-black uppercase text-muted-foreground tracking-tighter">Tier {idx+1}</span>
                              <span className="text-[10px] font-bold">₹{tier.reward.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] font-black uppercase tracking-tighter h-5">{rule.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="size-8" onClick={() => openModal(rule)}><Settings className="size-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="size-8"><Copy className="size-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="simulator" className="space-y-6">
            <Card className="glass-surface border-border/40 border-dashed bg-navy/5">
              <CardContent className="p-12 flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Play className="size-6 text-primary" />
                </div>
                <h4 className="text-lg font-black uppercase tracking-widest mb-2 italic">Prototype Preview Engine</h4>
                <p className="text-xs text-muted-foreground max-w-md font-bold uppercase leading-relaxed tracking-wider mb-8">
                  Select a rule and enter hypothetical sales volume to simulate incentive payouts before publishing a new version.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                  <div className="h-10 px-4 rounded-lg bg-background border border-border/50 flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select Rule...</div>
                  <div className="h-10 px-4 rounded-lg bg-background border border-border/50 flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">Volume: 0</div>
                </div>
                <Button className="mt-6 h-10 px-8 text-[10px] font-black uppercase tracking-widest bg-primary opacity-50 cursor-not-allowed">Run Simulation</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <IncentiveRuleModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          rule={selectedRule}
        />
      </div>
    );
  }
});

