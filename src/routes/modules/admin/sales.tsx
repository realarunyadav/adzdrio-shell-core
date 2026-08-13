import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Zap, DollarSign, Tag, ListFilter, Plus, Edit2, Play, Power, History } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { demoPlans, demoTaxRules } from "@/lib/mock/workspace.demo";

export const Route = createFileRoute("/modules/admin/sales")({

  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="Sales Configuration"
        description="Configure pricing plans, payment link behaviors, and enterprise tax rules."
      />

      <Tabs defaultValue="plans" className="w-full">
        <TabsList>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="payment-links">Payment Links</TabsTrigger>
          <TabsTrigger value="tax-rules">Tax Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest">Pricing Plans</h3>
            <Button size="sm" className="gap-2"><Plus className="size-4" /> Add New Plan</Button>
          </div>
          <div className="rounded-xl border border-border/40 bg-accent/10">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Plan Name</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Price</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoPlans.map((plan) => (
                  <TableRow key={plan.id} className="border-border/40">
                    <TableCell className="font-bold text-xs">{plan.name}</TableCell>
                    <TableCell className="text-xs">₹ {plan.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-[9px] font-black uppercase tracking-tighter h-5", plan.status === 'Active' ? "bg-emerald-500/10 text-emerald-600 border-none" : "bg-muted text-muted-foreground border-none")}>
                        {plan.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm"><Edit2 className="size-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="payment-links" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest">Payment Link Config</h3>
            <Button size="sm" variant="outline" className="gap-2"><Plus className="size-4" /> Generate New Link</Button>
          </div>
          <div className="rounded-xl border border-border/40 bg-accent/10 p-8 text-center text-muted-foreground text-xs font-bold uppercase tracking-widest italic">
            Prototype Interface: Link management coming in next iteration.
          </div>
        </TabsContent>

        <TabsContent value="tax-rules" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest">Global Tax Rules</h3>
            <Button size="sm" variant="outline" className="gap-2"><Plus className="size-4" /> Add Tax Rule</Button>
          </div>
          <div className="rounded-xl border border-border/40 bg-accent/10">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Rule Name</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Type</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Rate</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoTaxRules.map((rule) => (
                  <TableRow key={rule.id} className="border-border/40">
                    <TableCell className="font-bold text-xs">{rule.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{rule.type}</TableCell>
                    <TableCell className="text-xs font-bold">{rule.rate}%</TableCell>
                    <TableCell>
                      <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-tighter h-5">{rule.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  ),
});
