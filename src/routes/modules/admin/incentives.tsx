import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Settings, History, Play, Power, Zap, Target, Eye, Copy } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { demoIncentiveRules } from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/modules/admin/incentives")({

  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="Incentive Engine"
        description="Configure rules, tiers, and referral rewards for sales performance."
      />
      
      <div className="flex gap-4">
        <Button className="gap-2"><Plus className="size-4" /> New Incentive Rule</Button>
        <Button variant="outline" className="gap-2"><Plus className="size-4" /> New Referral Rule</Button>
      </div>

      <Card className="glass-surface border-border/40">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Rule Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Eligibility</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold">Q3 Sales Accelerator</TableCell>
                <TableCell>Sales Incentive</TableCell>
                <TableCell>All Sales</TableCell>
                <TableCell><Badge variant="outline" className="text-primary border-primary/20">Active</Badge></TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm"><Settings className="size-4" /></Button>
                  <Button variant="ghost" size="sm"><History className="size-4" /></Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  ),
});
