import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Zap, DollarSign, Tag, ListFilter, Plus, Edit2, Play, Power, History } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold">Premium Annual</TableCell>
                  <TableCell>₹ 12,000</TableCell>
                  <TableCell><Badge className="bg-emerald-500/10 text-emerald-600 border-none">Active</Badge></TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm"><Edit2 className="size-4" /></Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="payment-links" className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest">Payment Link Config</h3>
          {/* Placeholder for Payment Link Table */}
          <div className="p-8 border border-dashed rounded-xl text-center text-muted-foreground text-sm">Payment link configuration settings will appear here.</div>
        </TabsContent>

        <TabsContent value="tax-rules" className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest">Tax Rules</h3>
          {/* Placeholder for Tax Rules Table */}
          <div className="p-8 border border-dashed rounded-xl text-center text-muted-foreground text-sm">Global tax rules configuration workspace.</div>
        </TabsContent>
      </Tabs>
    </div>
  ),
});
