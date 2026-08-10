import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, RefreshCw, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { leadQueueService, type LeadQueue } from "@/lib/api/lead-queues.service";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/modules/crm/queues")({ component: LeadQueuesPage });

function LeadQueuesPage() {
  const [queues, setQueues] = React.useState<LeadQueue[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<LeadQueue | null>(null);
  const [name, setName] = React.useState("");
  const [active, setActive] = React.useState(true);

  const load = React.useCallback(async (silent = false) => {
    try {
      silent ? setRefreshing(true) : setLoading(true);
      setQueues((await leadQueueService.list()) ?? []);
    } catch (error: any) {
      toast.error(error?.message || "Unable to load lead queues");
    } finally { setLoading(false); setRefreshing(false); }
  }, []);

  React.useEffect(() => { void load(); }, [load]);

  const startCreate = () => { setEditing(null); setName(""); setActive(true); setOpen(true); };
  const startEdit = (queue: LeadQueue) => { setEditing(queue); setName(queue.name); setActive(queue.isActive); setOpen(true); };

  const save = async () => {
    if (!name.trim()) { toast.error("Queue name is required"); return; }
    try {
      if (editing) await leadQueueService.update(editing.id, { name: name.trim(), isActive: active });
      else await leadQueueService.create({ name: name.trim(), isActive: active, rules: {} });
      toast.success(editing ? "Queue updated" : "Queue created");
      setOpen(false);
      await load(true);
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
    <PageHeader eyebrow="Adzdrio CRM" title="Lead Routing Queues" description="Manage live organization-scoped lead routing queues."
      actions={<div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => void load(true)} disabled={refreshing}><RefreshCw className={`mr-2 size-3.5 ${refreshing ? "animate-spin" : ""}`} />Refresh</Button><Button size="sm" onClick={startCreate}><Plus className="mr-2 size-3.5" />New Queue</Button></div>} />

    <div className="grid gap-4 sm:grid-cols-3">
      <Stat label="Total queues" value={queues.length} />
      <Stat label="Active queues" value={queues.filter((q) => q.isActive).length} />
      <Stat label="Paused queues" value={queues.filter((q) => !q.isActive).length} />
    </div>

    <SectionCard title="Routing configuration" description="Create, activate, edit and remove live lead queues." contentClassName="p-0">
      <Table><TableHeader><TableRow><TableHead>Queue</TableHead><TableHead>Status</TableHead><TableHead>Rules</TableHead><TableHead>Updated</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>
        {queues.map((queue) => <TableRow key={queue.id}>
          <TableCell><p className="text-xs font-bold">{queue.name}</p><p className="text-[10px] text-muted-foreground">{queue.id}</p></TableCell>
          <TableCell><Badge variant={queue.isActive ? "default" : "secondary"}>{queue.isActive ? "ACTIVE" : "PAUSED"}</Badge></TableCell>
          <TableCell className="text-xs text-muted-foreground">{Object.keys(queue.rules ?? {}).length ? `${Object.keys(queue.rules).length} configured` : "All incoming leads"}</TableCell>
          <TableCell className="text-xs text-muted-foreground">{new Date(queue.updatedAt || queue.createdAt).toLocaleString()}</TableCell>
          <TableCell className="text-right"><div className="flex justify-end gap-1"><Button size="sm" variant="ghost" onClick={() => void toggle(queue)}>{queue.isActive ? "Pause" : "Activate"}</Button><Button size="icon" variant="ghost" onClick={() => startEdit(queue)}><Pencil className="size-4" /></Button><Button size="icon" variant="ghost" onClick={() => void remove(queue)}><Trash2 className="size-4 text-destructive" /></Button></div></TableCell>
        </TableRow>)}
        {!queues.length && <TableRow><TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">No routing queues configured yet.</TableCell></TableRow>}
      </TableBody></Table>
    </SectionCard>

    <Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>{editing ? "Edit Queue" : "Create Queue"}</DialogTitle></DialogHeader><div className="space-y-4 py-2"><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Queue name" /><Button variant="outline" onClick={() => setActive((value) => !value)}>Status: {active ? "Active" : "Paused"}</Button></div><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => void save()}>Save</Button></DialogFooter></DialogContent></Dialog>
  </div>;
}

function Stat({ label, value }: { label: string; value: number }) { return <div className="rounded-xl border border-border/40 bg-card p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>; }
