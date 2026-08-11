import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, RefreshCw, Pencil, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { authService } from "@/lib/api/services";
import { leadQueueService, type LeadQueue, type QueueRule } from "@/lib/api/lead-queues.service";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/modules/crm/queues")({ component: LeadQueuesPage });

type Strategy = "ROUND_ROBIN" | "EQUAL" | "WORKLOAD" | "MANUAL";
type QueueUser = { id: string; name: string; email: string; status?: string };
const fields: QueueRule["field"][] = ["source", "stage", "city", "state", "scoreMin", "scoreMax"];
const operators: QueueRule["operator"][] = ["equals", "contains", "gte", "lte"];

function LeadQueuesPage() {
  const [queues, setQueues] = React.useState<LeadQueue[]>([]);
  const [users, setUsers] = React.useState<QueueUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<LeadQueue | null>(null);
  const [name, setName] = React.useState("");
  const [active, setActive] = React.useState(true);
  const [field, setField] = React.useState<QueueRule["field"]>("source");
  const [operator, setOperator] = React.useState<QueueRule["operator"]>("equals");
  const [value, setValue] = React.useState("");
  const [strategy, setStrategy] = React.useState<Strategy>("ROUND_ROBIN");
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

  const load = React.useCallback(async (silent = false) => {
    try {
      silent ? setRefreshing(true) : setLoading(true);
      const [queueData, userData] = await Promise.all([leadQueueService.list(), authService.getOrganizationUsers()]);
      setQueues(queueData ?? []);
      setUsers((userData ?? []).filter((user: QueueUser) => user.status === undefined || user.status === "ACTIVE"));
    } catch (error: any) {
      toast.error(error?.message || "Unable to load lead queues");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => { void load(); }, [load]);

  const reset = () => {
    setEditing(null); setName(""); setActive(true); setField("source"); setOperator("equals");
    setValue(""); setStrategy("ROUND_ROBIN"); setSelectedUsers([]);
  };

  const startCreate = () => { reset(); setOpen(true); };

  const startEdit = (queue: LeadQueue) => {
    const config = (queue.rules ?? {}) as any;
    const conditions = config.conditions ?? {};
    let editField: QueueRule["field"] = "source";
    let editValue = "";
    let editOperator: QueueRule["operator"] = "equals";
    const scoreCondition = conditions.minScore !== undefined ? ["scoreMin", conditions.minScore, "gte"] : conditions.maxScore !== undefined ? ["scoreMax", conditions.maxScore, "lte"] : null;
    if (scoreCondition) {
      editField = scoreCondition[0] as QueueRule["field"];
      editValue = String(scoreCondition[1]);
      editOperator = scoreCondition[2] as QueueRule["operator"];
    } else {
      const match = ["source", "stage", "city", "state"].find((key) => conditions[key] !== undefined);
      if (match) {
        editField = match as QueueRule["field"];
        const condition = conditions[match];
        if (typeof condition === "object" && condition !== null) {
          editValue = String(condition.value ?? "");
          editOperator = condition.operator ?? "equals";
        } else editValue = String(condition);
      }
    }
    setEditing(queue); setName(queue.name); setActive(queue.isActive); setField(editField); setOperator(editOperator);
    setValue(editValue); setStrategy((config.assignmentType ?? "ROUND_ROBIN") as Strategy);
    setSelectedUsers(Array.isArray(config.userIds) ? config.userIds : []); setOpen(true);
  };

  const toggleUser = (id: string) => setSelectedUsers((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);

  const save = async () => {
    if (!name.trim()) return toast.error("Queue name is required");
    if (!value.trim()) return toast.error("Rule value is required");
    if (!selectedUsers.length) return toast.error("Select at least one active salesperson");
    const conditions: Record<string, unknown> = {};
    if (field === "scoreMin") conditions['minScore'] = Number(value);
    else if (field === "scoreMax") conditions['maxScore'] = Number(value);
    else conditions[field] = { value: value.trim(), operator };
    const rules = { conditions, assignmentType: strategy, userIds: selectedUsers };
    try {
      if (editing) await leadQueueService.update(editing.id, { name: name.trim(), isActive: active, rules });
      else await leadQueueService.create({ name: name.trim(), isActive: active, rules });
      toast.success(editing ? "Queue updated" : "Queue created"); setOpen(false); reset(); await load(true);
      return;
    } catch (error: any) { toast.error(error?.message || "Unable to save queue"); }
  };

  const toggle = async (queue: LeadQueue) => {
    try { await leadQueueService.update(queue.id, { isActive: !queue.isActive }); await load(true); }
    catch (error: any) { toast.error(error?.message || "Unable to update queue"); }
  };

  const remove = async (queue: LeadQueue) => {
    if (!window.confirm(`Delete ${queue.name}?`)) return;
    try { await leadQueueService.remove(queue.id); toast.success("Queue deleted"); await load(true); }
    catch (error: any) { toast.error(error?.message || "Unable to delete queue"); }
  };

  if (loading) return <div className="p-6 text-sm text-muted-foreground">Loading lead queues…</div>;

  return <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-500">
    <PageHeader eyebrow="Adzdrio CRM" title="Lead Routing Queues" description="Configure organization-scoped matching rules, active salespeople, and automatic assignment strategy." actions={<div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => void load(true)} disabled={refreshing}><RefreshCw className={`mr-2 size-3.5 ${refreshing ? "animate-spin" : ""}`} />Refresh</Button><Button size="sm" onClick={startCreate}><Plus className="mr-2 size-3.5" />New Queue</Button></div>} />
    <div className="grid gap-4 sm:grid-cols-3"><Stat label="Total queues" value={queues.length} /><Stat label="Active queues" value={queues.filter((q) => q.isActive).length} /><Stat label="Paused queues" value={queues.filter((q) => !q.isActive).length} /></div>
    <SectionCard title="Routing configuration" description="Each active queue is evaluated in creation order. The first matching queue selects its active salespeople and assignment strategy." contentClassName="p-0">
      <Table><TableHeader><TableRow><TableHead>Queue</TableHead><TableHead>Status</TableHead><TableHead>Match rule</TableHead><TableHead>Strategy</TableHead><TableHead>Salespeople</TableHead><TableHead>Updated</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>
        {queues.map((queue) => { const config = (queue.rules ?? {}) as any; const conditions = config.conditions ?? {}; const ruleEntry = Object.entries(conditions)[0]; const renderedRule = ruleEntry ? (typeof ruleEntry[1] === "object" ? `${ruleEntry[0]} ${String((ruleEntry[1] as any).operator ?? "equals")} ${String((ruleEntry[1] as any).value ?? "")}` : `${ruleEntry[0]} = ${String(ruleEntry[1])}`) : "No rule"; return <TableRow key={queue.id}><TableCell><p className="text-xs font-bold">{queue.name}</p><p className="text-[10px] text-muted-foreground">{queue.id}</p></TableCell><TableCell><Badge variant={queue.isActive ? "default" : "secondary"}>{queue.isActive ? "ACTIVE" : "PAUSED"}</Badge></TableCell><TableCell className="text-xs">{renderedRule}</TableCell><TableCell><Badge variant="outline" className="text-[9px]">{String(config.assignmentType ?? "ROUND_ROBIN")}</Badge></TableCell><TableCell><span className="inline-flex items-center gap-1 text-xs"><Users className="size-3.5" />{Array.isArray(config.userIds) ? config.userIds.length : 0}</span></TableCell><TableCell className="text-xs text-muted-foreground">{new Date(queue.updatedAt || queue.createdAt).toLocaleString()}</TableCell><TableCell className="text-right"><div className="flex justify-end gap-1"><Button size="sm" variant="ghost" onClick={() => void toggle(queue)}>{queue.isActive ? "Pause" : "Activate"}</Button><Button size="icon" variant="ghost" onClick={() => startEdit(queue)}><Pencil className="size-4" /></Button><Button size="icon" variant="ghost" onClick={() => void remove(queue)}><Trash2 className="size-4 text-destructive" /></Button></div></TableCell></TableRow>; })}
        {!queues.length && <TableRow><TableCell colSpan={7} className="h-32 text-center text-sm text-muted-foreground">No routing queues configured yet.</TableCell></TableRow>}
      </TableBody></Table>
    </SectionCard>
    <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) reset(); }}><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>{editing ? "Edit Queue" : "Create Queue"}</DialogTitle></DialogHeader><div className="space-y-4 py-2">
      <div className="space-y-2"><Label>Queue name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Delhi high-score leads" /></div>
      <div className="grid gap-3 sm:grid-cols-2"><div className="space-y-2"><Label>Match field</Label><Select value={field} onValueChange={(v) => setField(v as QueueRule["field"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{fields.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label>Operator</Label><Select value={operator} onValueChange={(v) => setOperator(v as QueueRule["operator"])} disabled={field.startsWith("score")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{operators.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div></div>
      <div className="space-y-2"><Label>Rule value</Label><Input type={field.startsWith("score") ? "number" : "text"} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Delhi / Website / 70" /></div>
      <div className="space-y-2"><Label>Assignment strategy</Label><Select value={strategy} onValueChange={(v) => setStrategy(v as Strategy)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ROUND_ROBIN">Round Robin</SelectItem><SelectItem value="EQUAL">Equal Distribution</SelectItem><SelectItem value="WORKLOAD">Workload Based</SelectItem><SelectItem value="MANUAL">First Selected User</SelectItem></SelectContent></Select></div>
      <div className="space-y-2"><Label>Active salespeople</Label><div className="max-h-40 space-y-2 overflow-y-auto rounded-lg border p-2">{users.map((user) => <label key={user.id} className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-muted/30"><Checkbox checked={selectedUsers.includes(user.id)} onCheckedChange={() => toggleUser(user.id)} /><div className="min-w-0"><p className="text-xs font-semibold">{user.name}</p><p className="truncate text-[10px] text-muted-foreground">{user.email}</p></div></label>)}{!users.length && <p className="py-4 text-center text-xs text-muted-foreground">No active salespeople found.</p>}</div></div>
      <Button variant="outline" onClick={() => setActive((v) => !v)}>Status: {active ? "Active" : "Paused"}</Button>
    </div><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => void save()}>Save Queue</Button></DialogFooter></DialogContent></Dialog>
  </div>;
}

function Stat({ label, value }: { label: string; value: number }) { return <div className="rounded-xl border border-border/40 bg-card p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>; }
