import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/label";
import { Hash, List, CheckSquare, Plus, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/modules/admin/crm")({
  component: () => (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <PageHeader
          title="CRM Configuration"
          description="Configure lead statuses, custom fields, assignment rules, and CRM-specific automation workflows."
        />
        <Button className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-primary">
          <Plus className="size-4" /> Add Custom Field
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-surface border-border/40 p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Active Statuses</p>
            <h4 className="text-2xl font-black">12</h4>
          </div>
          <List className="size-8 text-muted-foreground/30" />
        </Card>
        <Card className="glass-surface border-border/40 p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Custom Fields</p>
            <h4 className="text-2xl font-black">45</h4>
          </div>
          <Hash className="size-8 text-muted-foreground/30" />
        </Card>
        <Card className="glass-surface border-border/40 p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Automation Rules</p>
            <h4 className="text-2xl font-black">08</h4>
          </div>
          <CheckSquare className="size-8 text-muted-foreground/30" />
        </Card>
      </div>

      <div className="rounded-xl border border-border/40 bg-accent/10">
        <div className="p-4 border-b border-border/40 flex justify-between items-center">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lead Lifecycle Statuses</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Status Name</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Category</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Weight</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Color</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Settings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <StatusRow name="New Lead" cat="Initial" weight="1.0" color="bg-blue-500" />
            <StatusRow name="Qualified" cat="Validation" weight="2.5" color="bg-emerald-500" />
            <StatusRow name="Discovery" cat="Engagement" weight="3.0" color="bg-amber-500" />
            <StatusRow name="On Hold" cat="Inactive" weight="0.0" color="bg-gray-400" />
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});

function StatusRow({ name, cat, weight, color }: any) {
  return (
    <TableRow className="border-border/40 hover:bg-accent/30 transition-colors">
      <TableCell className="text-xs font-bold uppercase tracking-wider">{name}</TableCell>
      <TableCell className="text-xs font-medium text-muted-foreground">{cat}</TableCell>
      <TableCell className="text-xs font-mono">{weight}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className={`size-3 rounded-full ${color}`} />
          <span className="text-[10px] font-bold text-muted-foreground uppercase">{color.split('-')[1]}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon" className="size-8"><Settings2 className="size-4" /></Button>
      </TableCell>
    </TableRow>
  );
}
