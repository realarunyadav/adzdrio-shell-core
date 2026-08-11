import * as React from "react";
import { Briefcase, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { lead360Service } from "@/lib/api/lead360";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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

  const load = React.useCallback(async () => {
    if (!lead?.id) return;
    setLoading(true);
    try {
      // These currently return empty arrays as backend controllers are pending
      await Promise.all([
        lead360Service.getActivities(lead.id),
        lead360Service.getTasks(lead.id),
      ]);
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
  };

  const alreadyConverted = /won|converted/i.test(`${lead?.status ?? ""} ${lead?.stage ?? ""}`);

  return (
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
              {lead?.notes && (
                <div>
                  <p className="text-[10px] text-muted-foreground">Notes</p>
                  <p className="text-xs whitespace-pre-wrap mt-1">{lead.notes}</p>
                </div>
              )}
            </div>

            {!alreadyConverted && onCreateDeal && (
              <Button className="w-full h-11 shadow-md" onClick={handleCreateDeal}>
                <Briefcase className="mr-2 size-4" /> Create Deal
              </Button>
            )}

            <Button variant="outline" size="sm" className="w-full" onClick={() => void load()} disabled={loading}>
              <RefreshCw className={cn("mr-2 size-3.5", loading && "animate-spin")} /> Refresh 360
            </Button>
          </div>

          <Tabs defaultValue="activity" className="min-w-0">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-4">
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/40 p-12 text-center">
                <div className="rounded-full bg-muted/50 p-3 mb-4">
                  <RefreshCw className="size-6 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-sm font-semibold">Activity Tracking</h3>
                <p className="mt-1 text-xs text-muted-foreground max-w-[240px]">
                  Real-time activity logging and history is coming in the next CRM phase.
                </p>
                <Badge variant="secondary" className="mt-4">Coming Soon</Badge>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="mt-4">
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/40 p-12 text-center">
                <div className="rounded-full bg-muted/50 p-3 mb-4">
                  <Briefcase className="size-6 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-sm font-semibold">Task Management</h3>
                <p className="mt-1 text-xs text-muted-foreground max-w-[240px]">
                  Follow-up tasks and salesperson assignments are coming in the next CRM phase.
                </p>
                <Badge variant="secondary" className="mt-4">Coming Soon</Badge>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-xs font-medium mt-0.5 break-words">{value || "—"}</p>
    </div>
  );
}
