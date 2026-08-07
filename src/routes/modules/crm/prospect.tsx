import { createFileRoute } from "@tanstack/react-router";
import { 
  ArrowLeft,
  Phone,
  Video,
  FileText,
  History,
  Mail,
  User,
  MoreHorizontal,
  Upload,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Send,
  MessageSquare,
  Paperclip,
  Tag
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UniversalFileManager } from "@/components/shared/UniversalFileManager";
import { UniversalComments } from "@/components/shared/UniversalComments";
import { UniversalActivityTimeline } from "@/components/shared/UniversalActivityTimeline";
import { UniversalTag } from "@/components/shared/UniversalTag";
import { UniversalAuditLog } from "@/components/shared/UniversalAuditLog";

export const Route = createFileRoute("/modules/crm/prospect")({
  component: ProspectWorkspace,
});

function ProspectWorkspace() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-700">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}><ArrowLeft className="mr-2 size-4" />Back</Button>
      </div>
      
      <PageHeader
        title="Prospect: Deemand Solutions"
        description="Qualified Enterprise Lead · Assigned: Sarah Manager"
        actions={
          <div className="flex gap-2">
            <StatusBadge tone="info">Qualified</StatusBadge>
            <Button variant="outline" size="sm">Edit Prospect</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Customer 360" contentClassName="p-0">
            <Tabs defaultValue="overview">
               <TabsList className="glass-surface w-full justify-start rounded-none p-0 border-b border-border/40">
                  {["Overview", "Timeline", "Calls", "Documents", "Subscription", "Payments", "Invoices", "Support", "Activity Log"].map(tab => (
                    <TabsTrigger key={tab} value={tab.toLowerCase()} className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-3 text-[10px] font-black uppercase tracking-widest">{tab}</TabsTrigger>
                  ))}
               </TabsList>
               
               <TabsContent value="overview" className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem label="Lead Source" value="LinkedIn Ads" />
                    <InfoItem label="Preferred Lang" value="English" />
                    <InfoItem label="Qualification" value="85%" />
                  </div>
               </TabsContent>
               <TabsContent value="timeline" className="p-6">
                  <UniversalActivityTimeline items={[]} />
               </TabsContent>
               <TabsContent value="documents" className="p-6">
                  <UniversalFileManager />
               </TabsContent>
               <TabsContent value="activity log" className="p-6">
                  <UniversalAuditLog entries={[]} />
               </TabsContent>
            </Tabs>
          </SectionCard>

          <SectionCard title="AI Sales Coach">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-6 border-2 border-dashed border-border rounded-xl text-center bg-muted/20">
                  <Upload className="size-8 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-bold">Upload Call Recording</p>
                  <p className="text-[10px] text-muted-foreground mt-1">MP3, WAV, M4A supported</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <ScoreBox label="Summary" score="90" />
                  <ScoreBox label="Intent" score="85" />
                  <ScoreBox label="Mistakes" score="0" tone="success" />
                </div>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">AI Follow-up Script</p>
                   <p className="text-xs italic leading-relaxed text-muted-foreground">"Hi [Client], I've analyzed our recent call. Let's focus on the integration timeline for the next session..."</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Communication Center">
             <div className="space-y-2">
                <CommAction icon={Phone} label="Call History" />
                <CommAction icon={History} label="Callback History" />
                <CommAction icon={Mail} label="Follow-up History" />
                <CommAction icon={MessageSquare} label="WhatsApp History" placeholder />
                <CommAction icon={Mail} label="Email History" placeholder />
             </div>
          </SectionCard>

          <SectionCard title="Universal Notes">
             <UniversalComments comments={[]} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 p-3 bg-muted/30 rounded-lg">
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-xs font-bold">{value}</span>
    </div>
  );
}

function ScoreBox({ label, score, tone }: { label: string; score: string; tone?: "success" }) {
  return (
    <div className="p-3 bg-card border border-border rounded-lg flex flex-col items-center gap-1">
      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className={cn("text-lg font-black", tone === "success" ? "text-success" : "text-primary")}>{score}</span>
    </div>
  );
}

function CommAction({ icon: Icon, label, placeholder }: { icon: any; label: string; placeholder?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:bg-muted/50 cursor-pointer transition-all">
       <div className="flex items-center gap-3">
         <Icon className="size-4 text-muted-foreground" />
         <span className="text-xs font-bold">{label}</span>
       </div>
       {placeholder && <Badge variant="secondary" className="text-[9px]">Soon</Badge>}
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
