import * as React from "react";
import { CheckCircle2, Clock3, Loader2, MessageSquare, Plus, RefreshCw, Trash2, UserRoundCheck } from "lucide-react";
import { toast } from "sonner";

import { lead360Service, type LeadActivity, type LeadTask } from "@/lib/api/lead360";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function Lead360Dialog({ lead, open, onOpenChange }: { lead: any | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const [activities, setActivities] = React.useState<LeadActivity[]>([]);
  const [tasks, setTasks] = React.useState<LeadTask[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [activityAction, setActivityAction] = React.useState("NOTE");
  const [activityNote, setActivityNote] = React.useState("");
  const [taskTitle, setTaskTitle] = React.useState("");
  const [taskDescription, setTaskDescription] = React.useState("");
  const [taskType, setTaskType] = React.useState<LeadTask["taskType"]>("FOLLOW_UP");
  const [taskPriority, setTaskPriority] = React.useState<LeadTask["priority"]>("MEDIUM");
  const [taskDueAt, setTaskDueAt] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [convertOpen, setConvertOpen] = React.useState(false);
  const [converting, setConverting] = React.useState(false);
  const [accountName, setAccountName] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");

  const load = React.useCallback(async () => {
    if (!lead?.id) return;
    setLoading(true);
    try {
      const [activityData, taskData] = await Promise.all([
        lead360Service.getActivities(lead.id),
        lead360Service.getTasks(lead.id, true),
      ]);
      setActivities(activityData ?? []);
      setTasks(taskData ?? []);
    } catch (error: any) {
      toast.error(error?.message || "Unable to load lead 360 data");
    } finally {
      setLoading(false);
    }
  }, [lead?.id]);

  React.useEffect(() => {
    if (!open) return;
    setAccountName(lead?.companyName ?? "");
    setContactEmail(lead?.email ?? lead?.customerEmail ?? "");
    void load();
  }, [open, load, lead?.companyName, lead?.email, lead?.customerEmail]);

  const addActivity = async () => {
    if (!lead?.id || !activityNote.trim()) return;
    setSaving(true);
    try {
      await lead360Service.addActivity(lead.id, { action: activityAction, note: activityNote.trim() });
      setActivityNote("");
      toast.success("Activity added");
      await load();
    } catch (error: any) {
      toast.error(error?.message || "Unable to add activity");
    } finally {
      setSaving(false);
    }
  };

  const addTask = async () => {
    if (!lead?.id || !taskTitle.trim()) return;
    setSaving(true);
    try {
      await lead360Service.createTask(lead.id, {
        title: taskTitle.trim(),
        description: taskDescription.trim() || null,
        taskType,
        priority: taskPriority,
        dueAt: taskDueAt ? new Date(taskDueAt).toISOString() : null,
      } as any);
      setTaskTitle("");
      setTaskDescription("");
      setTaskDueAt("");
      toast.success("Task created");
      await load();
    } catch (error: any) {
      toast.error(error?.message || "Unable to create task");
    } finally {
      setSaving(false);
    }
  };

  const completeTask = async (task: LeadTask) => {
    if (!lead?.id) return;
    try {
      await lead360Service.updateTask(lead.id, task.id, { status: task.status === "COMPLETED" ? "PENDING" : "COMPLETED" });
      await load();
    } catch (error: any) {
      toast.error(error?.message || "Unable to update task");
    }
  };

  const deleteTask = async (task: LeadTask) => {
    if (!lead?.id) return;
    try {
      await lead360Service.deleteTask(lead.id, task.id);
      toast.success("Task deleted");
      await load();
    } catch (error: any) {
      toast.error(error?.message || "Unable to delete task");
    }
  };

  const convertLead = async () => {
    if (!lead?.id) return;
    setConverting(true);
    try {
      const result = await lead360Service.convert(lead.id, {
        accountName: accountName.trim() || "",
        contactEmail: contactEmail.trim() || "",
      });
      toast.success(result.accountId ? "Lead converted to CRM account + contact" : "Lead converted to CRM contact");
      setConvertOpen(false);
      onOpenChange(false);
      window.setTimeout(() => window.location.reload(), 350);
    } catch (error: any) {
      toast.error(error?.message || "Unable to convert lead");
    } finally {
      setConverting(false);
    }
  };

  const alreadyConverted = /won|converted/i.test(`${lead?.status ?? ""} ${lead?.stage ?? ""}`);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex flex-wrap items-center gap-2">
              <DialogTitle>{lead ? `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || lead.customerName : "Lead"}</DialogTitle>
              {lead?.status && <Badge variant="outline">{lead.status}</Badge>}
              {lead?.stage && <Badge variant="secondary">{lead.stage}</Badge>}
            </div>
            <DialogDescription>Lead 360 — contact details, activity history and follow-up tasks.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 lg:grid-cols-[280px_1fr] overflow-y-auto pr-1">
            <div className="space-y-3">
              <div className="rounded-xl border border-border/40 p-4 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lead information</p>
                <Info label="Email" value={lead?.email ?? lead?.customerEmail} />
                <Info label="Phone" value={lead?.primaryPhone ?? lead?.customerPhone} />
                <Info label="Company" value={lead?.companyName} />
                <Info label="Location" value={[lead?.city, lead?.state].filter(Boolean).join(", ")} />
                <Info label="Source" value={lead?.source} />
                <Info label="Score" value={String(lead?.score ?? 0)} />
                {lead?.notes && <div><p className="text-[10px] text-muted-foreground">Notes</p><p className="text-xs whitespace-pre-wrap mt-1">{lead.notes}</p></div>}
              </div>
              {!alreadyConverted && (
                <Button className="w-full" onClick={() => setConvertOpen(true)}>
                  <UserRoundCheck className="mr-2 size-4" /> Convert to CRM
                </Button>
              )}
              <Button variant="outline" size="sm" className="w-full" onClick={() => void load()} disabled={loading}>
                <RefreshCw className={cn("mr-2 size-3.5", loading && "animate-spin")} /> Refresh 360
              </Button>
            </div>

            <Tabs defaultValue="activity" className="min-w-0">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="activity">Activity <span className="ml-1 text-[9px]">{activities.length}</span></TabsTrigger>
                <TabsTrigger value="tasks">Tasks <span className="ml-1 text-[9px]">{tasks.length}</span></TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="space-y-4 mt-4">
                <div className="rounded-xl border border-border/40 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-[150px_1fr_auto] sm:items-end">
                    <div className="space-y-2"><Label>Activity</Label><Select value={activityAction} onValueChange={setActivityAction}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="NOTE">Note</SelectItem><SelectItem value="CALL">Call</SelectItem><SelectItem value="EMAIL">Email</SelectItem><SelectItem value="WHATSAPP">WhatsApp</SelectItem><SelectItem value="MEETING">Meeting</SelectItem><SelectItem value="STATUS_CHANGE">Status change</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2"><Label>Note</Label><Input value={activityNote} onChange={(event) => setActivityNote(event.target.value)} placeholder="What happened?" onKeyDown={(event) => { if (event.key === "Enter") void addActivity(); }} /></div>
                    <Button onClick={() => void addActivity()} disabled={saving || !activityNote.trim()}><Plus className="size-4" /> Add</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {activities.map((activity) => (
                    <div key={activity.id} className="rounded-xl border border-border/40 p-4">
                      <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><MessageSquare className="size-4 text-primary" /><Badge variant="outline">{activity.action}</Badge></div><span className="text-[10px] text-muted-foreground">{formatDateTime(activity.createdAt)}</span></div>
                      {activity.details && (activity.details as Record<string, any>)['note'] && (
                        <p className="mt-2 text-xs whitespace-pre-wrap">{(activity.details as Record<string, any>)['note']}</p>
                      )}
                      {!activity.details?.note && <p className="mt-2 text-xs text-muted-foreground">Activity recorded.</p>}
                    </div>
                  ))}
                  {!activities.length && <Empty label="No activity recorded yet" />}
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4 mt-4">
                <div className="rounded-xl border border-border/40 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2"><Label>Task title</Label><Input value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} placeholder="Follow up with lead" /></div>
                    <div className="space-y-2"><Label>Due</Label><Input type="datetime-local" value={taskDueAt} onChange={(event) => setTaskDueAt(event.target.value)} /></div>
                    <div className="space-y-2"><Label>Type</Label><Select value={taskType} onValueChange={(value) => setTaskType(value as LeadTask["taskType"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["FOLLOW_UP", "CALL", "WHATSAPP", "EMAIL", "MEETING", "OTHER"].map((value) => <SelectItem key={value} value={value}>{pretty(value)}</SelectItem>)}</SelectContent></Select></div>
                    <div className="space-y-2"><Label>Priority</Label><Select value={taskPriority} onValueChange={(value) => setTaskPriority(value as LeadTask["priority"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["LOW", "MEDIUM", "HIGH", "URGENT"].map((value) => <SelectItem key={value} value={value}>{pretty(value)}</SelectItem>)}</SelectContent></Select></div>
                    <div className="space-y-2 sm:col-span-2"><Label>Description</Label><Textarea value={taskDescription} onChange={(event) => setTaskDescription(event.target.value)} placeholder="Add context for the salesperson..." /></div>
                  </div>
                  <Button onClick={() => void addTask()} disabled={saving || !taskTitle.trim()}><Plus className="size-4" /> Create task</Button>
                </div>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div key={task.id} className={cn("rounded-xl border border-border/40 p-4", task.status === "COMPLETED" && "opacity-60") }>
                      <div className="flex items-start gap-3">
                        <button type="button" onClick={() => void completeTask(task)} className="mt-0.5 text-primary" title="Toggle completion"><CheckCircle2 className={cn("size-5", task.status !== "COMPLETED" && "opacity-30")} /></button>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2"><p className={cn("text-sm font-bold", task.status === "COMPLETED" && "line-through")}>{task.title}</p><Badge variant="outline">{pretty(task.priority)}</Badge><Badge variant="secondary">{pretty(task.taskType)}</Badge></div>
                          {task.description && <p className="mt-1 text-xs text-muted-foreground whitespace-pre-wrap">{task.description}</p>}
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground"><span className="inline-flex items-center gap-1"><Clock3 className="size-3" /> {task.dueAt ? formatDateTime(task.dueAt) : "No due date"}</span><span>{pretty(task.status)}</span></div>
                        </div>
                        <Button variant="ghost" size="icon" className="size-8 text-destructive" onClick={() => void deleteTask(task)} title="Delete task"><Trash2 className="size-4" /></Button>
                      </div>
                    </div>
                  ))}
                  {!tasks.length && <Empty label="No tasks for this lead" />}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={convertOpen} onOpenChange={setConvertOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Convert lead to CRM</DialogTitle>
            <DialogDescription>This will create or reuse the CRM account/contact, mark the lead as Converted, and record an audit activity.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><Label>Account / Company</Label><Input value={accountName} onChange={(event) => setAccountName(event.target.value)} placeholder="Company name (optional)" /></div>
            <div className="space-y-2"><Label>Contact email</Label><Input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder="Contact email (optional)" /></div>
            <div className="rounded-lg border border-border/40 bg-muted/20 p-3 text-xs text-muted-foreground">Duplicate contacts and existing accounts are matched before creating new CRM records.</div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConvertOpen(false)} disabled={converting}>Cancel</Button>
            <Button onClick={() => void convertLead()} disabled={converting}>{converting ? <Loader2 className="mr-2 size-4 animate-spin" /> : <UserRoundCheck className="mr-2 size-4" />} Convert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) { return <div><p className="text-[10px] text-muted-foreground">{label}</p><p className="text-xs font-medium mt-0.5 break-words">{value || "—"}</p></div>; }
function Empty({ label }: { label: string }) { return <div className="rounded-xl border border-dashed border-border/40 p-8 text-center text-xs text-muted-foreground">{label}</div>; }
function pretty(value: string) { return value.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase()); }
function formatDateTime(value: string) { return new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }); }
