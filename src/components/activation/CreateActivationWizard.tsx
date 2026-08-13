import * as React from "react";
import { 
  Rocket, 
  Search, 
  User, 
  Building2, 
  CreditCard, 
  UserPlus, 
  ClipboardCheck, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  Package
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  demoLeads, 
  demoSales, 
  demoPlans,
  demoTeamPerformance,
  demoActivations
} from "@/lib/mock/workspace.demo";

interface CreateActivationWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateActivationWizard({ open, onOpenChange }: CreateActivationWizardProps) {
  const [step, setStep] = React.useState(1);
  const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);
  const [selectedSale, setSelectedSale] = React.useState<any>(null);
  const [paymentAcknowledged, setPaymentAcknowledged] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<any>(null);
  const [priority, setPriority] = React.useState('Medium');
  const [activationDate, setActivationDate] = React.useState('2026-08-13T12:00');
  const [notes, setNotes] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState("");

  const steps = [
    { id: 1, label: "Customer", icon: User },
    { id: 2, label: "Subscription", icon: Package },
    { id: 3, label: "Payment", icon: CreditCard },
    { id: 4, label: "Assignment", icon: UserPlus },
    { id: 5, label: "Details", icon: ClipboardCheck },
    { id: 6, label: "Review", icon: Rocket },
  ];

  const isStepValid = () => {
    switch(step) {
      case 1: return !!selectedCustomer;
      case 2: return !!selectedSale;
      case 3: return paymentAcknowledged || selectedSale?.paymentStatus === 'Paid';
      case 4: return !!selectedEmployee;
      case 5: return !!activationDate;
      default: return true;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setStep(s => Math.min(s + 1, 6));
    }
  };
  const handleBack = () => setStep(s => Math.max(s - 1, 1));
  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setSelectedCustomer(null);
      setSelectedSale(null);
      setPaymentAcknowledged(false);
      setSelectedEmployee(null);
      setPriority('Medium');
      setActivationDate('2026-08-13T12:00');
      setNotes('');
      setSearchQuery("");
    }, 300);
  };

  const handleCreate = () => {
    // Mock creating the activation and updating the shared state
    const newActivation = {
      id: `ACT-${8800 + demoActivations.length + 1}`,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      businessId: selectedCustomer.business === 'Acme India' ? 'biz-a' : selectedCustomer.business === 'Vertex Tech' ? 'biz-b' : 'biz-c',
      businessName: selectedCustomer.business,
      subscriptionId: `SUB-${4400 + demoActivations.length + 1}`,
      planName: selectedSale.planName,
      saleId: selectedSale.id,
      paymentId: `PAY-${9900 + demoActivations.length + 1}`,
      paymentStatus: selectedSale.paymentStatus,
      status: selectedSale.paymentStatus === 'Paid' ? 'Pending Assignment' : 'Pending Payment Verification',
      priority: priority,
      assignedTo: selectedEmployee.id,
      assignedToName: selectedEmployee.name,
      createdAt: new Date().toISOString(),
      requestedAt: activationDate,
      slaDueAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      createdBy: "Current User",
      lastUpdatedAt: new Date().toISOString(),
      notes: notes
    };

    // In a real app we'd mutate the state here
    // For this prototype we push to the mock array
    demoActivations.unshift(newActivation as any);
    
    handleClose();
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        const filteredCustomers = demoLeads
          .filter(l => l.status === 'Converted')
          .filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            c.business.toLowerCase().includes(searchQuery.toLowerCase())
          );

        return (
          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input 
                placeholder="Search customer name or business..." 
                className="pl-10 h-10 font-medium" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto pr-2">
              {filteredCustomers.map(customer => (
                <div 
                  key={customer.id} 
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all",
                    selectedCustomer?.id === customer.id ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border hover:bg-muted/30"
                  )}
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setSelectedSale(null); // Reset sale when customer changes
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase text-xs">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase">{customer.name}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">{customer.business}</p>
                    </div>
                  </div>
                  {selectedCustomer?.id === customer.id && <CheckCircle2 className="size-4 text-primary" />}
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        const availableSales = demoSales.filter(s => s.customerId === selectedCustomer?.id || s.customerName === selectedCustomer?.name);
        return (
          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-1 mb-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select Subscription / Sale</h4>
              <p className="text-[10px] font-bold text-primary uppercase">Customer: {selectedCustomer?.name}</p>
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {availableSales.length > 0 ? (
                availableSales.map(sale => (
                  <div 
                    key={sale.id} 
                    className={cn(
                      "p-3 rounded-xl border cursor-pointer transition-all",
                      selectedSale?.id === sale.id ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border hover:bg-muted/30"
                    )}
                    onClick={() => setSelectedSale(sale)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{sale.id}</span>
                      <Badge variant="outline" className={cn(
                        "text-[9px] font-black uppercase",
                        sale.paymentStatus === 'Paid' ? "text-green-600 border-green-500/20" : "text-yellow-700 border-yellow-500/20"
                      )}>{sale.paymentStatus}</Badge>
                    </div>
                    <p className="text-xs font-black uppercase">{sale.planName}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Amount: ₹ {sale.finalAmount.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">{new Date(sale.created).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center border border-dashed rounded-xl">
                  <p className="text-[10px] font-black uppercase text-muted-foreground">No eligible sales found for this customer</p>
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 py-4">
            <div className="p-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 flex flex-col items-center text-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <CreditCard className="size-6" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-tight">Payment Verification</h4>
              <p className="text-[11px] text-muted-foreground font-medium mt-1 mb-6">
                Verification is required before proceeding to technical activation.
              </p>
              
              <div className="w-full space-y-3 text-left">
                <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                  <span className="text-[10px] font-black uppercase text-muted-foreground">Amount Due</span>
                  <span className="text-xs font-black">₹ {selectedSale?.finalAmount.toLocaleString() || "0"}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                  <span className="text-[10px] font-black uppercase text-muted-foreground">Status</span>
                  <Badge variant={selectedSale?.paymentStatus === 'Paid' ? 'default' : 'outline'} className={cn(
                    "font-black uppercase text-[9px]",
                    selectedSale?.paymentStatus === 'Paid' ? "bg-green-600 text-white" : "text-yellow-700 border-yellow-500/20"
                  )}>
                    {selectedSale?.paymentStatus || 'Pending'}
                  </Badge>
                </div>
              </div>
            </div>
            
            {selectedSale?.paymentStatus !== 'Paid' ? (
              <div 
                className={cn(
                  "p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all",
                  paymentAcknowledged ? "border-primary bg-primary/5" : "border-yellow-200 bg-yellow-50/50"
                )}
                onClick={() => setPaymentAcknowledged(!paymentAcknowledged)}
              >
                <div className="mt-0.5">
                  {paymentAcknowledged ? <CheckCircle2 className="size-4 text-primary" /> : <AlertTriangle className="size-4 text-yellow-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-black text-yellow-800 uppercase leading-relaxed">
                    I acknowledge that payment is pending and this activation will be flagged for verification.
                  </p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">Click to acknowledge and continue</p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-green-200 bg-green-50/50 flex items-start gap-3">
                <CheckCircle2 className="size-4 text-green-600 mt-0.5" />
                <p className="text-[11px] font-bold text-green-800 uppercase leading-relaxed">
                  Payment has been fully verified for this subscription.
                </p>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 py-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assign Employee</h4>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {demoTeamPerformance.map(employee => (
                <div 
                  key={employee.id} 
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all",
                    selectedEmployee?.id === employee.id ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border hover:bg-muted/30"
                  )}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase text-xs">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase">{employee.name}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">{employee.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase text-muted-foreground">Workload</p>
                    <p className="text-[10px] font-black">{employee.leads} Active</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Priority</h4>
              <div className="flex gap-2">
                {['Low', 'Medium', 'High', 'Critical'].map(p => (
                  <Button 
                    key={p}
                    variant={priority === p ? 'default' : 'outline'}
                    size="sm"
                    className={cn(
                      "flex-1 text-[10px] font-black uppercase h-8",
                      priority === p && p === 'Critical' ? "bg-red-600 hover:bg-red-700" :
                      priority === p && p === 'High' ? "bg-orange-500 hover:bg-orange-600" : ""
                    )}
                    onClick={() => setPriority(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Requested Activation Date</label>
              <Input 
                type="datetime-local" 
                value={activationDate} 
                onChange={(e) => setActivationDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Internal Notes</label>
              <textarea 
                className="w-full min-h-[120px] p-3 rounded-xl border border-border bg-background text-xs font-medium focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Enter any special instructions for the provisioning team..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-2xl border border-border bg-muted/5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-tight">Final Summary</h4>
                <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase">Review Required</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Customer</p>
                  <p className="text-xs font-black uppercase">{selectedCustomer?.name || '---'}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Business</p>
                  <p className="text-xs font-black uppercase">{selectedCustomer?.business || '---'}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Subscription</p>
                  <p className="text-xs font-black uppercase">{selectedSale?.planName || '---'}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Payment</p>
                  <Badge variant="outline" className={cn(
                    "text-[9px] font-black uppercase h-5",
                    selectedSale?.paymentStatus === 'Paid' ? "text-green-600 border-green-500/20" : "text-yellow-700 border-yellow-500/20"
                  )}>
                    {selectedSale?.paymentStatus || 'Pending'}
                  </Badge>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Assigned To</p>
                  <p className="text-xs font-black uppercase">{selectedEmployee?.name || 'Auto-assign'}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Priority</p>
                  <p className="text-xs font-black uppercase">{priority}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Activation Date</p>
                  <p className="text-xs font-black uppercase">{new Date(activationDate).toLocaleDateString()} {new Date(activationDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border border-green-200 bg-green-50/50 flex items-start gap-3">
              <CheckCircle2 className="size-4 text-green-600 mt-0.5" />
              <p className="text-[11px] font-bold text-green-800 uppercase leading-relaxed">
                Workflows will be initialized upon creation.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-background">
        <DialogHeader className="p-6 bg-primary text-primary-foreground">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Rocket className="size-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black uppercase tracking-tight text-white leading-none">New Activation</DialogTitle>
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1">Enterprise Provisioning Flow</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            {steps.map((s, idx) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-1.5 relative group">
                  <div className={cn(
                    "size-7 rounded-full flex items-center justify-center transition-all duration-300",
                    step === s.id ? "bg-white text-primary scale-110 shadow-lg" : 
                    step > s.id ? "bg-green-400 text-white" : "bg-white/10 text-white/40"
                  )}>
                    {step > s.id ? <CheckCircle2 className="size-4" /> : <s.icon className="size-3.5" />}
                  </div>
                  <span className={cn(
                    "text-[8px] font-black uppercase tracking-tighter absolute -bottom-5 w-max transition-all",
                    step === s.id ? "text-white opacity-100" : "text-white/40 opacity-0 group-hover:opacity-100"
                  )}>
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={cn(
                    "h-[1.5px] flex-1 mx-2 rounded-full transition-all duration-500",
                    step > s.id ? "bg-green-400" : "bg-white/10"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        </DialogHeader>

        <div className="p-8 pb-4">
          {renderStep()}
        </div>

        <DialogFooter className="p-6 bg-muted/5 gap-2 sm:gap-0 flex-row justify-between border-t border-border/40">
          <Button 
            variant="ghost" 
            onClick={step === 1 ? handleClose : handleBack}
            className="text-[10px] font-black uppercase tracking-widest h-10 px-6"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button 
            onClick={step === 6 ? handleCreate : handleNext}
            className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest h-10 px-8 shadow-lg shadow-primary/20"
          >
            {step === 6 ? 'Create Activation' : 'Continue'}
            {step < 6 && <ChevronRight className="ml-2 size-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}