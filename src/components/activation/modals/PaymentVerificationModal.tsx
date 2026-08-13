import * as React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle2, User, Hash, DollarSign } from "lucide-react";
import { DemoActivation } from "@/lib/mock/workspace.demo";

interface PaymentVerificationModalProps {
  activation: DemoActivation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function PaymentVerificationModal({ 
  activation, 
  open, 
  onOpenChange, 
  onConfirm 
}: PaymentVerificationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            Verify Payment
          </DialogTitle>
          <DialogDescription className="text-sm font-bold uppercase tracking-widest text-muted-foreground pt-1">
            Confirm financial clearance for activation
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 flex items-center gap-1">
                <User className="size-3" /> Customer
              </p>
              <p className="text-xs font-bold truncate">{activation.customerName}</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 flex items-center gap-1">
                <Hash className="size-3" /> Activation ID
              </p>
              <p className="text-xs font-bold truncate">{activation.id}</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 flex items-center gap-1">
                <Hash className="size-3" /> Sale ID
              </p>
              <p className="text-xs font-bold truncate">{activation.saleId}</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 flex items-center gap-1">
                <CreditCard className="size-3" /> Payment ID
              </p>
              <p className="text-xs font-bold truncate">{activation.paymentId}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Status</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-700 border border-yellow-500/20">
                  {activation.paymentStatus}
                </span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Amount</span>
                <span className="text-sm font-black text-primary">₹ 12,000.00</span>
             </div>
          </div>

          <div className="text-[11px] font-medium text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/40">
            Confirming payment verification will mark the sale as PAID and advance this activation to the <span className="text-primary font-bold">PENDING ASSIGNMENT</span> workflow state.
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="font-bold uppercase text-[11px] tracking-wider h-10"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="bg-primary hover:bg-primary/90 font-black uppercase text-[11px] tracking-widest h-10 px-6"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" /> Verify Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { ShieldCheck } from "lucide-react";
