import * as React from "react";
import { Briefcase, Loader2, RefreshCw, Activity, CheckSquare } from "lucide-react";
import { toast } from "sonner";

import { lead360Service } from "@/lib/api/lead360";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { UniversalActivityTimeline, TimelineItem } from "@/components/shared/UniversalActivityTimeline";
import { EmptyState } from "@/components/shared/EmptyState";

export function Lead360Dialog({ 
  lead, 
  open, 
  onOpenChange, 
  onCreateDeal 
}: { 
  lead: any | null; 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  onCreateDeal?: (lead: any) => void 
}) {
  const [loading, setLoading] = React.useState(false);
  const [activities, setActivities] = React.useState<TimelineItem[]>([]);
  const [tasks, setTasks] = React.useState<any[]>([]);

  const load = React.useCallback(async () => {
    if (!lead?.id) return;
    setLoading(true);
    try {
      const [actData, taskData] = await Promise.all([
        lead360Service.getActivities(lead.id),
        lead360Service.getTasks(lead.id),
      ]);
      setActivities(actData as any);
      setTasks(taskData);
    } catch (error: any) {
      toast.error(error?.message || "Unable to load lead 360 data");
    } finally {
      setLoading(false);
    }
  }, [lead?.id]);

  React.useEffect(() => {
    if (open) {
      void load();
    }
  }, [open, load]);

  const handleCreateDeal = () => {
    if (!lead?.id || !onCreateDeal) return;
    onCreateDeal(lead);
    onOpenChange(false);
    toast.success("Creating deal context", {
      description: `New deal initiated for ${lead.firstName ?? lead.customerName}`
    });
  };

  const alreadyConverted = /won|converted/i.test(`${lead?.status ?? ""} ${lead?.stage ?? ""}`);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle>{lead ? `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || lead.customerName : "Lead"}</DialogTitle>
            {lead?.status && <Badge variant="outline" className="font-bold text-[10px] uppercase">{lead.status}</Badge>}
            {lead?.stage && <Badge variant="secondary" className="font-bold text-[10px] uppercase">{lead.stage}</Badge>}
          </div>
          <DialogDescription className="text-xs">Lead 360 — contact details, activity history and follow-up tasks.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] overflow-y-auto pr-1">
          <div className="space-y-4">
            <div className="rounded-xl border border-border/40 p-4 space-y-4 bg-muted/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">Lead profile</p>
              <Info label="Email" value={lead?.email ?? lead?.customerEmail} />
              <Info label="Phone" value={lead?.primaryPhone ?? lead?.customerPhone} />
              <Info label="Company" value={lead?.companyName} />
              <Info label="Location" value={[lead?.city, lead?.state].filter(Boolean).join(", ")} />
              <Info label="Source" value={lead?.source} />
              <Info label="Score" value={String(lead?.score ?? 0)} />
              {lead?.notes && (
                <div className="pt-2 border-t border-border/40">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Notes</p>
                  <p className="text-xs whitespace-pre-wrap mt-1 text-muted-foreground/80 leading-relaxed">{lead.notes}</p>
                </div>
              )}
            </div>

            {!alreadyConverted && onCreateDeal && (
              <Button className="w-full h-11 shadow-elevated font-bold" onClick={handleCreateDeal}>
                <Briefcase className="mr-2 size-4" /> Create Deal
              </Button>
            )}

            <Button variant="outline" size="sm" className="w-full font-bold" onClick={() => void load()} disabled={loading}>
              <RefreshCw className={cn("mr-2 size-3.5", loading && "animate-spin")} /> Refresh Data
            </Button>
          </div>

          <Tabs defaultValue="activity" className="min-w-0">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
              <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 pb-3 text-[11px] font-bold uppercase tracking-wider">
                Activity Timeline
              </TabsTrigger>
              <TabsTrigger value="tasks" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 pb-3 text-[11px] font-bold uppercase tracking-wider">
                Follow-up Tasks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-6">
              {loading ? (
                <div className="flex items-center justify-center py-20 opacity-20">
                  <Loader2 className="size-8 animate-spin" />
                </div>
              ) : activities.length > 0 ? (
                <UniversalActivityTimeline items={activities} />
              ) : (
                <EmptyState 
                  icon={Activity}
                  title="No Activity Logged"
                  description="System and user interactions for this lead will appear here."
                />
              )}
            </TabsContent>

            <TabsContent value="tasks" className="mt-6">
              {loading ? (
                <div className="flex items-center justify-center py-20 opacity-20">
                  <Loader2 className="size-8 animate-spin" />
                </div>
              ) : tasks.length > 0 ? (
                <div className="space-y-3">
                   {/* Task list rendering would go here */}
                </div>
              ) : (
                <EmptyState 
                  icon={CheckSquare}
                  title="No Pending Tasks"
                  description="Create a follow-up task to keep this lead moving through the pipeline."
                  action={<Button size="sm" variant="outline"><RefreshCw className="mr-2 size-3" /> Assign Task</Button>}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="border-t border-border/40 pt-4 mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close Lead 360</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase text-muted-foreground/60 leading-none">{label}</p>
      <p className="text-xs font-bold mt-1.5 break-words text-foreground">{value || "—"}</p>
    </div>
  );
}
