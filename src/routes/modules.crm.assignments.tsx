import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Loader2, RefreshCw, Search, UserRoundCheck } from "lucide-react";
import { toast } from "sonner";

import { authService, leadsService } from "@/lib/api/services";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/modules/crm/assignments")({ component: LeadAssignments });

type AssignmentType = "MANUAL" | "ROUND_ROBIN" | "EQUAL" | "WORKLOAD" | "TRANSFER";

function LeadAssignments() {
  const [leads, setLeads] = React.useState<any[]>([]);
  const [users, setUsers] = React.useState<any[]>([]);
  const [selectedLeads, setSelectedLeads] = React.useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const [assignmentType, setAssignmentType] = React.useState<AssignmentType>("MANUAL");
  const [reason, setReason] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const [leadData, userData] = await Promise.all([
        leadsService.getAll({ page: 1, pageSize: 250 }),
        authService.getOrganizationUsers(),
      ]);
      setLeads(leadData ?? []);
      setUsers(userData ?? []);
    } catch (error: any) {
      toast.error(error?.message || "Unable to load assignment data");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { void load(); }, [load]);

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((lead) => JSON.stringify(lead).toLowerCase().includes(q));
  }, [leads, search]);

  const toggleLead = (id: string) => setSelectedLeads((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  const toggleUser = (id: string) => setSelectedUsers((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);

  const assign = async () => {
    if (!selectedLeads.length || !selectedUsers.length) {
      toast.error("Select at least one lead and one salesperson");
      return;
    }
    setSaving(true);
    try {
      await leadsService.assign(selectedLeads, selectedUsers, assignmentType, reason.trim() || undefined);
      toast.success(`${selectedLeads.length} lead${selectedLeads.length === 1 ? "" : "s"} assigned successfully`);
      setSelectedLeads([]);
      setReason("");
      await load();
    } catch (error: any) {
      toast.error(error?.message || "Lead assignment failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex min-h-[70vh] items-center justify-center"><Loader2 className="size-8 animate-spin text-primary" /></div>;

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Adzdrio Sales"
        title="Lead Assignment Center"
        description="Assign live CRM leads to active salespeople using the ABOS assignment engine."
        actions={<Button variant="outline" size="sm" onClick={() => void load()}><RefreshCw className="mr-2 size-3.5" /> Refresh</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <SectionCard title="Select Leads" description={`${selectedLeads.length} selected · ${filtered.length} visible`}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search leads by name, company, email..." className="pl-9" />
          </div>
          <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
            {filtered.map((lead) => (
              <label key={lead.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/40 p-3 hover:bg-muted/30">
                <Checkbox checked={selectedLeads.includes(lead.id)} onCheckedChange={() => toggleLead(lead.id)} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold">{lead.customerName || [lead.firstName, lead.lastName].filter(Boolean).join(" ")}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{lead.customerEmail || lead.email || lead.companyName || "No contact details"}</p>
                </div>
                <Badge variant="outline" className="text-[9px]">{lead.status || "NEW"}</Badge>
              </label>
            ))}
            {!filtered.length && <p className="py-12 text-center text-xs text-muted-foreground">No leads found.</p>}
          </div>
        </SectionCard>

        <SectionCard title="Assign To" description={`${selectedUsers.length} salesperson${selectedUsers.length === 1 ? "" : "s"} selected`}>
          <div className="space-y-2">
            {users.map((user) => (
              <label key={user.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/40 p-3 hover:bg-muted/30">
                <Checkbox checked={selectedUsers.includes(user.id)} onCheckedChange={() => toggleUser(user.id)} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold">{user.name}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{user.email}</p>
                </div>
                <UserRoundCheck className="size-4 text-muted-foreground" />
              </label>
            ))}
            {!users.length && <p className="py-8 text-center text-xs text-muted-foreground">No active users found.</p>}
          </div>

          <div className="mt-6 space-y-2">
            <Label>Assignment method</Label>
            <Select value={assignmentType} onValueChange={(value) => setAssignmentType(value as AssignmentType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="MANUAL">Manual</SelectItem>
                <SelectItem value="ROUND_ROBIN">Round Robin</SelectItem>
                <SelectItem value="EQUAL">Equal Distribution</SelectItem>
                <SelectItem value="WORKLOAD">Workload Based</SelectItem>
                <SelectItem value="TRANSFER">Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 space-y-2">
            <Label>Reason <span className="text-muted-foreground">(optional)</span></Label>
            <Input value={reason} onChange={(event) => setReason(event.target.value)} placeholder="e.g. New campaign allocation" />
          </div>

          <Button className="mt-6 w-full" onClick={() => void assign()} disabled={saving || !selectedLeads.length || !selectedUsers.length}>
            {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
            {saving ? "Assigning..." : `Assign ${selectedLeads.length || "Selected"} Lead${selectedLeads.length === 1 ? "" : "s"}`}
          </Button>
        </SectionCard>
      </div>
    </div>
  );
}
