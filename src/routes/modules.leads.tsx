import { createFileRoute } from "@tanstack/react-router";
import { 
  Target, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  MoreHorizontal,
  Mail,
  Phone,
  FileText,
  History,
  Paperclip,
  Tag,
  User,
  Plus
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/modules/leads")({
  component: LeadDetail,
});

function LeadDetail() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-700">
      <PageHeader
        eyebrow="CRM / Sales"
        title="Enterprise Lead: Acme Corp"
        description="Qualified lead currently in the 'Contacted' stage."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Edit Lead</Button>
            <Button size="sm">Convert to Deal</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="bg-transparent border-b border-border/40 w-full justify-start rounded-none p-0 mb-6 gap-6">
              <TabsTrigger value="timeline" className="data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3 rounded-none">Timeline</TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3 rounded-none">Notes</TabsTrigger>
              <TabsTrigger value="docs" className="data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3 rounded-none">Documents</TabsTrigger>
              <TabsTrigger value="attachments" className="data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3 rounded-none">Attachments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline">
              <SectionCard title="Communication Timeline">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="size-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Initial Discovery Call</p>
                      <p className="text-xs text-muted-foreground">Today · 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="size-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Proposal Initial Draft</p>
                      <p className="text-xs text-muted-foreground">Yesterday · 02:30 PM</p>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </TabsContent>
            
            <TabsContent value="notes">
               <SectionCard title="Discovery Notes">
                  <div className="text-xs text-muted-foreground italic">No discovery notes recorded.</div>
               </SectionCard>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <SectionCard title="Lead Intelligence" contentClassName="space-y-4">
            <InfoRow label="Lead Status" value={<StatusBadge tone="info">Contacted</StatusBadge>} />
            <InfoRow label="Lead Source" value="LinkedIn Ad" />
            <InfoRow label="Priority" value={<Badge variant="secondary">High</Badge>} />
            <InfoRow label="Lead Score" value="85 / 100" />
            <InfoRow label="Owner" value="Alex Salesman" />
            <InfoRow label="Expected Revenue" value="₹ 0.00" />
            <InfoRow label="Next Follow-up" value="Aug 12, 2026" />
          </SectionCard>

          <SectionCard title="Reminder Alert">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <Clock className="size-4 text-primary" />
              <p className="text-xs font-medium">Follow-up due in 3 days</p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border/40 last:border-0">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold">{value}</span>
    </div>
  );
}
