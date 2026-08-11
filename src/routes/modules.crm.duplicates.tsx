import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, RefreshCw, ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";
import { leadDuplicatesService, type DuplicateGroup } from "@/lib/api/leadDuplicates";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/modules/crm/duplicates")({ component: LeadDuplicatesPage });

function LeadDuplicatesPage() {
  const [groups, setGroups] = React.useState<DuplicateGroup[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [busy, setBusy] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    try {
      setLoading(true);
      setGroups(await leadDuplicatesService.list());
    } catch (error: any) {
      toast.error(error?.message || "Unable to load duplicate leads");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { void load(); }, [load]);

  const mark = async (leadId: string, canonicalId: string) => {
    try {
      setBusy(leadId);
      await leadDuplicatesService.mark(leadId, canonicalId);
      toast.success("Lead marked as duplicate");
      await load();
    } catch (error: any) {
      toast.error(error?.message || "Unable to mark duplicate");
    } finally {
      setBusy(null);
    }
  };

  const restore = async (leadId: string) => {
    try {
      setBusy(leadId);
      await leadDuplicatesService.restore(leadId);
      toast.success("Lead restored");
      await load();
    } catch (error: any) {
      toast.error(error?.message || "Unable to restore lead");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="CRM Data Quality"
        title="Duplicate Lead Management"
        description="Review potential duplicate records detected by matching email addresses and phone numbers."
        actions={<Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}><RefreshCw className={`mr-2 size-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon={AlertTriangle} label="Duplicate Groups" value={groups.length} />
        <Stat icon={Users} label="Records Involved" value={groups.reduce((n, group) => n + group.leads.length, 0)} />
        <Stat icon={ShieldCheck} label="Detection Signals" value={groups.reduce((n, group) => n + group.matchedBy.length, 0)} />
      </div>

      <SectionCard title="Potential Duplicates" description="Each group contains records sharing an email and/or phone number.">
        {loading ? <div className="py-12 text-center text-sm text-muted-foreground">Scanning CRM records…</div> : groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center"><CheckCircle2 className="mb-3 size-10 text-emerald-500" /><p className="font-semibold">No potential duplicates found</p><p className="text-sm text-muted-foreground">Your lead database is currently clean.</p></div>
        ) : (
          <div className="space-y-5">
            {groups.map((group) => (
              <Card key={group.leadIds.join("-")} className="border-border/60">
                <CardContent className="p-4">
                  <div className="mb-4 flex flex-wrap items-center gap-2"><Badge variant="outline">Matched by {group.matchedBy.join(" + ")}</Badge><Badge variant="secondary">{group.leads.length} records</Badge></div>
                  <div className="grid gap-3 lg:grid-cols-2">
                    {group.leads.map((lead, index) => {
                      const canonical = group.leads[0];
                      const isDuplicate = lead.status === "DUPLICATE";
                      return <div key={lead.id} className="rounded-xl border border-border/50 p-4">
                        <div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{lead.firstName} {lead.lastName}</p><p className="text-xs text-muted-foreground">{lead.companyName || "No company"}</p></div><Badge variant={isDuplicate ? "destructive" : "outline"}>{lead.status}</Badge></div>
                        <div className="mt-3 space-y-1 text-xs text-muted-foreground"><p>Email: {lead.email || "—"}</p><p>Phone: {lead.primaryPhone || "—"}</p><p>Stage: {lead.stage || "—"}</p></div>
                        <div className="mt-4 flex gap-2">
                          {isDuplicate ? <Button size="sm" variant="outline" onClick={() => void restore(lead.id)} disabled={busy === lead.id}>Restore</Button> : index > 0 && canonical && <Button size="sm" variant="destructive" onClick={() => void mark(lead.id, canonical.id)} disabled={busy === lead.id}>Mark Duplicate</Button>}
                        </div>
                      </div>;
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: number }) {
  return <Card><CardContent className="flex items-center gap-3 p-4"><Icon className="size-5 text-muted-foreground" /><div><p className="text-2xl font-black tracking-tight">{value}</p><p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p></div></CardContent></Card>;
}
