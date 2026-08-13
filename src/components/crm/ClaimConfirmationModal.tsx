import * as React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface ClaimConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  leadName: string;
}

export function ClaimConfirmationModal({ open, onOpenChange, onConfirm, leadName }: ClaimConfirmationModalProps) {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success'>('idle');

  const handleConfirm = async () => {
    setStatus('loading');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setTimeout(() => {
      onConfirm();
      setStatus('idle');
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        {status === 'success' ? (
          <div className="py-6 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="size-16 rounded-full bg-success/10 flex items-center justify-center text-success mb-4">
              <CheckCircle2 className="size-8" />
            </div>
            <DialogTitle className="text-xl font-black uppercase tracking-tight mb-2">Lead Claimed!</DialogTitle>
            <DialogDescription className="text-sm font-medium">
              {leadName} has been successfully added to your leads.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <AlertCircle className="size-6" />
              </div>
              <DialogTitle className="text-center text-xl font-black uppercase tracking-tight">Claim this lead?</DialogTitle>
              <DialogDescription className="text-center text-sm font-medium">
                You are claiming <span className="font-bold text-foreground">{leadName}</span>. 
                This lead will be assigned to you and moved to your "My Leads" list.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex-row gap-3 sm:justify-center">
              <Button 
                variant="ghost" 
                onClick={() => onOpenChange(false)} 
                disabled={status === 'loading'}
                className="flex-1 font-bold"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirm} 
                disabled={status === 'loading'}
                className="flex-1 font-black uppercase tracking-widest text-[11px]"
              >
                {status === 'loading' ? <Loader2 className="size-4 animate-spin" /> : "Confirm Claim"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
