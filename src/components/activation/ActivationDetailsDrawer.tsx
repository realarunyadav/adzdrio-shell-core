import * as React from "react";
import { 
  X, 
  Rocket, 
  Clock, 
  AlertTriangle, 
  User, 
  Calendar, 
  History,
  CheckCircle2,
  ShieldCheck,
  Play,
  Pause,
  UserPlus,
  Ban,
  MessageSquare,
  FileText,
  CreditCard,
  Layers,
  Activity,
  ArrowRightLeft
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { 
  DemoActivation, 
  demoActivationActivities, 
  DemoActivationActivity,
  demoActivations
} from "@/lib/mock/workspace.demo";
import { EmployeeAssignmentModal } from "./EmployeeAssignmentModal";
import { toast } from "sonner";


interface ActivationDetailsDrawerProps {
  activation: DemoActivation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActivationDetailsDrawer({ activation: initialActivation, open, onOpenChange }: ActivationDetailsDrawerProps) {
  const [activation, setActivation] = React.useState<DemoActivation | null>(initialActivation);
  const [isAssignModalOpen, setIsAssignModalOpen] = React.useState(false);

  React.useEffect(() => {
    setActivation(initialActivation);
  }, [initialActivation]);

  if (!activation) return null;

  const activities = demoActivationActivities.filter((a: DemoActivationActivity) => a.activationId === activation.id);

  const handleAssignConfirm = (employee: any) => {
    // 1. Update the mock state for persistence
    const actIndex = demoActivations.findIndex(a => a.id === activation.id);
    if (actIndex > -1) {
      const currentAct = demoActivations[actIndex]!;
      const updatedAct: DemoActivation = {
        ...currentAct,
        status: 'Assigned',
        assignedTo: employee.id.toString(),
        assignedToName: employee.name,
        lastUpdatedAt: new Date().toISOString()
      } as DemoActivation;
      
      demoActivations[actIndex] = updatedAct;
      
      // 2. Add activity log
      const newActivity: DemoActivationActivity = {
        id: `ACT-EV-${demoActivationActivities.length + 1}`,
        activationId: activation.id,
        actor: "Current User",
        actorId: "user-current",
        action: `assigned activation to ${employee.name}`,
        previousStatus: activation.status,
        newStatus: "Assigned",
        timestamp: new Date().toISOString()
      };
      demoActivationActivities.unshift(newActivity);

      // 3. Update local state
      setActivation(updatedAct);
      toast.success(`Activation assigned to ${employee.name}`);
    }
  };


  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      'Pending Payment Verification': "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
      'Payment Verified': "bg-blue-500/10 text-blue-700 border-blue-500/20",
      'Pending Assignment': "bg-purple-500/10 text-purple-700 border-purple-500/20",
      'Assigned': "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
      'In Progress': "bg-blue-600/10 text-blue-800 border-blue-600/20",
      'Waiting Customer': "bg-orange-500/10 text-orange-700 border-orange-500/20",
      'Completed': "bg-green-500/10 text-green-700 border-green-500/20",
      'Failed': "bg-red-500/10 text-red-700 border-red-500/20",
      'Cancelled': "bg-gray-500/10 text-gray-700 border-gray-500/20",
      'On Hold': "bg-amber-500/10 text-amber-700 border-amber-500/20",
    };
    
    return (
      <Badge variant="outline" className={cn("text-[9px] font-black uppercase h-5", statusMap[status] || "bg-muted text-muted-foreground")}>
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap: Record<string, string> = {
      'Critical': "bg-red-500 text-white",
      'High': "bg-orange-500 text-white",
      'Medium': "bg-blue-500 text-white",
      'Low': "bg-gray-400 text-white",
    };
    
    return (
      <Badge className={cn("text-[9px] font-black uppercase h-5 border-none", priorityMap[priority])}>
        {priority}
      </Badge>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[750px] p-0 flex flex-col h-full bg-background border-l border-border">
        <SheetHeader className="p-6 border-b border-border/40 bg-muted/5 space-y-0">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">{activation.id}</span>
                {getStatusBadge(activation.status)}
                {getPriorityBadge(activation.priority)}
              </div>
              <SheetTitle className="text-xl font-black leading-tight tracking-tight mt-2">
                Activation: {activation.planName}
              </SheetTitle>
              <div className="flex items-center gap-3 text-muted-foreground pt-1">
                <div className="flex items-center gap-1">
                  <User className="size-3" />
                  <span className="text-[10px] font-bold uppercase">{activation.customerName} ({activation.businessName})</span>
                </div>
                <Separator orientation="vertical" className="h-3" />
                <div className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  <span className="text-[10px] font-bold uppercase">Requested: {new Date(activation.requestedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8"><X className="h-4 w-4" /></Button>
              </SheetClose>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-6">
            {activation.status === 'Pending Payment Verification' && (
              <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold h-8 text-[11px] uppercase tracking-wider">
                <CreditCard className="mr-2 h-3.5 w-3.5" /> Verify Payment
              </Button>
            )}
            {activation.status === 'Pending Assignment' && (
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 font-bold h-8 text-[11px] uppercase tracking-wider"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsAssignModalOpen(true);
                }}
              >
                <UserPlus className="mr-2 h-3.5 w-3.5" /> Assign Employee
              </Button>
            )}
            {activation.status === 'Assigned' && (
              <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold h-8 text-[11px] uppercase tracking-wider">
                <Play className="mr-2 h-3.5 w-3.5" /> Start Activation
              </Button>
            )}
            {activation.status === 'In Progress' && (
              <>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-bold h-8 text-[11px] uppercase tracking-wider">
                  <CheckCircle2 className="mr-2 h-3.5 w-3.5" /> Complete
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-[11px] font-bold uppercase tracking-wider">
                  <Pause className="mr-2 h-3.5 w-3.5" /> Mark Waiting Customer
                </Button>
              </>
            )}
            {activation.status === 'Waiting Customer' && (
              <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold h-8 text-[11px] uppercase tracking-wider">
                <Play className="mr-2 h-3.5 w-3.5" /> Resume
              </Button>
            )}
            
            <Separator orientation="vertical" className="h-8 mx-1 hidden sm:block" />
            
            <Button size="sm" variant="outline" className="h-8 text-[11px] font-bold uppercase tracking-wider">
              <Pause className="mr-2 h-3.5 w-3.5" /> Hold
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-[11px] font-bold uppercase tracking-wider text-red-600 hover:text-red-700">
              <Ban className="mr-2 h-3.5 w-3.5" /> Fail
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-[11px] font-bold uppercase tracking-wider">
              <MessageSquare className="mr-2 h-3.5 w-3.5" /> Add Note
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <div className="px-6 border-b border-border/40 bg-muted/5">
              <TabsList className="bg-transparent gap-6 h-12 p-0">
                {['Overview', 'Activity', 'Subscription', 'Payment', 'Notes', 'Documents'].map(tab => (
                  <TabsTrigger 
                    key={tab} 
                    value={tab.toLowerCase()}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[10px] font-black uppercase tracking-widest px-0 h-12"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="overview" className="m-0 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Workflow Health</h4>
                    <div className="p-4 rounded-xl border border-border bg-muted/10 flex items-center gap-3">
                      <div className={cn(
                        "size-10 rounded-full flex items-center justify-center",
                        new Date() < new Date(activation.slaDueAt) ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                      )}>
                        <Clock className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase">SLA COMPLIANCE</p>
                        <p className="text-[10px] text-muted-foreground font-bold">Due: {new Date(activation.slaDueAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assigned Personnel</h4>
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-border">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase">
                        {activation.assignedToName ? activation.assignedToName.split(' ').map(n => n[0]).join('') : '?'}
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase">{activation.assignedToName || 'Unassigned'}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase">Provisioning Specialist</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-border bg-muted/5">
                    <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Customer</p>
                    <p className="text-xs font-bold">{activation.customerName}</p>
                    <p className="text-[10px] text-muted-foreground">{activation.businessName}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-muted/5">
                    <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Subscription</p>
                    <p className="text-xs font-bold">{activation.planName}</p>
                    <p className="text-[10px] text-muted-foreground">{activation.subscriptionId}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-muted/5">
                    <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Sale / Payment</p>
                    <p className="text-xs font-bold">{activation.saleId}</p>
                    <p className="text-[10px] text-muted-foreground">{activation.paymentId} ({activation.paymentStatus})</p>
                  </div>
                </div>

                {activation.waitingReason && (
                  <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/50 flex items-start gap-3">
                    <AlertTriangle className="size-4 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-black text-orange-800 uppercase">Action Required</p>
                      <p className="text-sm font-medium text-orange-700">{activation.waitingReason}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Internal Notes</h4>
                  <p className="text-sm font-medium leading-relaxed bg-muted/20 p-4 rounded-xl border border-border/40">
                    {activation.notes || "No internal notes provided for this activation request."}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="m-0">
                 <div className="space-y-6">
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <Activity className="size-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold">
                              <span className="text-primary">{activity.actor}</span> {activity.action}
                            </p>
                            <span className="text-[9px] text-muted-foreground font-black uppercase">
                              {new Date(activity.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                            </span>
                          </div>
                          {activity.newStatus && (
                            <div className="flex items-center gap-2 mt-1">
                              {activity.previousStatus && (
                                <>
                                  <span className="text-[9px] font-bold text-muted-foreground uppercase">{activity.previousStatus}</span>
                                  <ArrowRightLeft className="size-3 text-muted-foreground" />
                                </>
                              )}
                              <span className="text-[9px] font-black text-primary uppercase">{activity.newStatus}</span>
                            </div>
                          )}
                          {activity.note && (
                            <p className="text-[11px] text-muted-foreground bg-muted/30 p-2 rounded mt-2 border border-border/40">
                              {activity.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <History className="size-10 text-muted-foreground/20 mx-auto mb-4" />
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No activity recorded</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="payment" className="m-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                        <CreditCard className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase">Transaction ID</p>
                        <p className="text-sm font-bold">{activation.paymentId}</p>
                      </div>
                    </div>
                    <Badge variant={activation.paymentStatus === 'Paid' ? 'default' : 'outline'} className={cn(
                      "font-black uppercase",
                      activation.paymentStatus === 'Paid' ? "bg-green-600" : "text-yellow-700 border-yellow-500/20"
                    )}>
                      {activation.paymentStatus}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border bg-muted/5">
                      <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Sale Reference</p>
                      <p className="text-xs font-bold">{activation.saleId}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-muted/5">
                      <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Billing Amount</p>
                      <p className="text-xs font-bold">₹ 12,000.00</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest">
                    <FileText className="mr-2 h-3.5 w-3.5" /> View Full Invoice
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </SheetContent>
      <EmployeeAssignmentModal 
        open={isAssignModalOpen}
        onOpenChange={setIsAssignModalOpen}
        onConfirm={handleAssignConfirm}
        suggestedEmployeeId={activation.assignedTo || null} // Use current or suggested
      />
    </Sheet>
  );
}