import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, RefreshCw, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { leadQueueService, type LeadQueue, type QueueRule } from "@/lib/api/lead-queues.service";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/modules/crm/queues")({ component: LeadQueuesPage });

type Strategy = "ROUND_ROBIN" | "EQUAL" | "WORKLOAD";
const fields: QueueRule["field"][] = ["source", "stage", "city", "state", "scoreMin", "scoreMax"];
const operators: QueueRule["operator"][] = ["equals", "contains", "gte", "lte"];

function LeadQueuesPage() {
  const [queues, setQueues] = React.useState<LeadQueue[]>([]);
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

  const load = React.useCallback(async (silent = false) => {
    try {
      silent ? setRefreshing(true) : setLoading(true);
      setQueues((await leadQueueService.list()) ?? []);
    } catch (error: any) {
      toast.error(error?.message || "Unable to load lead queues");
    } finally { setLoading(false); setRefreshing(false); }
  }, []);

  React.useEffect(() => { void load(); }, [load]);

  const reset = () => {
    setEditing(null); setName(""); setActive(true); setField("source");
    setOperator("equals"); setValue(""); setStrategy("ROUND_ROBIN");
  };

  const startCreate = () => { reset(); setOpen(true); };

  const startEdit = (queue: LeadQueue) => {
    const config = queue.rules ?? {};
    const rule = Array.isArray((config as any).rules) ? (config as any).rules[0] : undefined;
    setEditing(queue); setName(queue.name); setActive(queue.isActive);
    setField(rule?.field ?? "source"); setOperator(rule?.operator ?? "equals"); setValue(String(rule?.value ?? ""));
    setStrategy(((config as any).strategy ?? "ROUND_ROBIN") as Strategy); setOpen(true);
  };

  const save = async () => {
    if (!name.trim()) return toast.error("Queue name is required");
    if (!value.trim()) return toast.error("Rule value is required");
    const rules = { rules: [{ field, operator, value: value.trim() }], strategy };
    try {
      if (editing) await leadQueueService.update(editing.id, { name: name.trim(), isActive: active, rules });
      else await leadQueueService.create({ name: name.trim(), isActive: active, rules });
      toast.success(editing ? "Queue updated" : "Queue created");
      setOpen(false); reset(); await load(true);
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
    <PageHeader eyebrow="Adzdrio CRM" title="Lead Routing Queues" description="Configure live organization-scoped matching rules and assignment strategy."
      actions={<div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => void load(true)} disabled={refreshing}><RefreshCw className={`mr-2 size-3.5 ${refreshing ? "animate-spin" : ""}`} />Refresh</Button><Button size="sm" onClick={startCreate}><Plus className="mr-2 size-3.5" />New Queue</Button></div>} />

    <div className="grid gap-4 sm:grid-cols-3"><Stat label="Total queues" value={queues.length} /><Stat label="Active queues" value={queues.filter((q) => q.isActive).length} /><Stat label="Paused queues" value={queues.filter((q) => !q.isActive).length} /></div>

    <SectionCard title="Routing configuration" description="Queues store match conditions and the intended assignment strategy for the routing engine." contentClassName="p-0">
      <Table><TableHeader><TableRow><TableHead>Queue</TableHead><TableHead>Status</TableHead><TableHead>Match rule</TableHead><TableHead>Strategy</TableHead><TableHead>Updated</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>
        {queues.map((queue) => {
          const config = queue.rules ?? {};
          const rule = Array.isArray((config as any).rules) ? (config as any).rules[0] : undefined;
          return <TableRow key={queue.id}><TableCell><p className="text-xs font-bold">{queue.name}</p><p className="text-[10px] text-muted-foreground">{queue.id}</p></TableCell><TableCell><Badge variant={queue.isActive ? "default" : "secondary"}>{queue.isActive ? "ACTIVE" : "PAUSED"}</Badge></TableCell><TableCell className="text-xs">{rule ? `${rule.field} ${rule.operator} ${rule.value}` : "No rule"}</TableCell><TableCell><Badge variant="outline" className="text-[9px]">{String((config as any).strategy ?? "ROUND_ROBIN")}</Badge></TableCell><TableCell className="text-xs text-muted-foreground">{new Date(queue.updatedAt || queue.createdAt).toLocaleString()}</TableCell><TableCell className="text-right"><div className="flex justify-end gap-1"><Button size="sm" variant="ghost" onClick={() => void toggle(queue)}>{queue.isActive ? "Pause" : "Activate"}</Button><Button size="icon" variant="ghost" onClick={() => startEdit(queue)}><Pencil className="size-4" /></Button><Button size="icon" variant="ghost" onClick={() => void remove(queue)}><Trash2 className="size-4 text-destructive" /></Button></div></TableCell></TableRow>;
        })}
        {!queues.length && <TableRow><TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">No routing queues configured yet.</TableCell></TableRow>}
      </TableBody></Table>
    </SectionCard>

    <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) reset(); }}><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>{editing ? "Edit Queue" : "Create Queue"}</DialogTitle></DialogHeader><div className="space-y-4 py-2">
      <div className="space-y-2"><Label>Queue name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Delhi high-score leads" /></div>
      <div className="grid gap-3 sm:grid-cols-2"><div className="space-y-2"><Label>Match field</Label><Select value={field} onValueChange={(v) => setField(v as QueueRule["field"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{fields.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label>Operator</Label><Select value={operator} onValueChange={(v) => setOperator(v as QueueRule["operator"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{operators.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div></div>
      <div className="space-y-2"><Label>Rule value</Label><Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Delhi / Website / 70" /></div>
      <div className="space-y-2"><Label>Assignment strategy</Label><Select value={strategy} onValueChange={(v) => setStrategy(v as Strategy)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ROUND_ROBIN">Round Robin</SelectItem><SelectItem value="EQUAL">Equal Distribution</SelectItem><SelectItem value="WORKLOAD">Workload Based</SelectItem></SelectContent></Select></div>
      <Button variant="outline" onClick={() => setActive((v) => !v)}>Status: {active ? "Active" : "Paused"}</Button>
    </div><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => void save()}>Save Queue</Button></DialogFooter></DialogContent></Dialog>
  </div>;
}

function Stat({ label, value }: { label: string; value: number }) { return <div className="rounded-xl border border-border/40 bg-card p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>; }
