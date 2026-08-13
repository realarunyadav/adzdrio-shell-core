import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoBusinesses } from "@/lib/mock/workspace.demo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Building2, Plus, ArrowUpRight, ShieldCheck, MoreVertical, Edit2 } from "lucide-react";
import { useState } from "react";
import { BusinessModal } from "@/components/admin-studio/BusinessModal";

export const Route = createFileRoute("/modules/admin/business")({
  component: () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBiz, setSelectedBiz] = useState<any>(null);

    const openModal = (biz?: any) => {
      setSelectedBiz(biz || null);
      setIsModalOpen(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <PageHeader
            title="Business Management"
            description="Manage brands, business legal entities, and operational domains across the enterprise."
          />
          <Button onClick={() => openModal()} className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-primary shadow-lg shadow-primary/20">
            <Plus className="size-4" /> Add New Business
          </Button>
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BusinessSummaryCard label="Total Entities" value="03" icon={Building2} />
        <BusinessSummaryCard label="Primary Domains" value="08" icon={ArrowUpRight} />
        <BusinessSummaryCard label="Verified Licenses" value="03" icon={ShieldCheck} tone="success" />
      </div>

      <div className="rounded-xl border border-border/40 bg-accent/10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Business Entity</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Revenue (MTD)</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Active Staff</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Compliance</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoBusinesses.map((biz) => (
              <TableRow key={biz.id} className="border-border/40 hover:bg-accent/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 rounded-lg border border-border/50">
                      <AvatarFallback className="bg-navy text-[10px] font-bold text-navy-foreground uppercase">
                        {biz.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xs font-black">{biz.name}</div>
                      <div className="text-[9px] text-muted-foreground uppercase font-medium">{biz.plan} Entity</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-bold text-emerald-600">{biz.revenue}</TableCell>
                <TableCell className="text-xs font-medium">12</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter border-emerald-500/20 text-emerald-600 h-5">
                    Verified
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-tighter h-5">
                    {biz.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="size-8" onClick={() => openModal(biz)}><Edit2 className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="size-8"><MoreVertical className="size-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <BusinessModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          business={selectedBiz}
        />
      </div>
    );
  },
});

function BusinessSummaryCard({ label, value, icon: Icon, tone = "default" }: any) {
  return (
    <Card className="glass-surface border-border/40">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
            <h4 className="text-2xl font-black">{value}</h4>
          </div>
          <div className="size-10 rounded-xl bg-accent/50 flex items-center justify-center">
            <Icon className="size-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
