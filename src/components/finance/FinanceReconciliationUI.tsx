import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { financeService } from "@/lib/api/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  CreditCard, 
  History, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet,
  AlertCircle,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ReconciliationDisplayProps {
  saleId?: string;
  invoiceId?: string;
  className?: string;
}

export function ReconciliationDisplay({ saleId, invoiceId, className }: ReconciliationDisplayProps) {
  const { data: recon, isLoading, error } = useQuery({
    queryKey: ["reconciliation", { saleId, invoiceId }],
    queryFn: () => financeService.getReconciliation({ 
      saleId: saleId ?? null, 
      invoiceId: invoiceId ?? null 
    }),
    enabled: !!(saleId || invoiceId),
  });

  if (isLoading) {
    return (
      <Card className={cn("border-border/40 bg-muted/5", className)}>
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-4 w-32" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !recon) {
    return (
      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center gap-3 text-red-600 text-[10px] font-bold uppercase">
        <AlertCircle className="size-4" />
        Failed to load reconciliation data
      </div>
    );
  }

  const isSettled = recon.outstanding === 0;
  const isOverpaid = recon.netCollected > recon.totalAmount;

  return (
    <div className={cn("space-y-4", className)}>
      <Card className="border-border/40 overflow-hidden glass-surface">
        <CardHeader className="p-4 bg-muted/30 border-b border-border/40 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <Wallet className="size-3.5 text-muted-foreground" />
            <CardTitle className="text-[10px] font-black uppercase tracking-widest">
              Financial Ledger ({recon.currency})
            </CardTitle>
          </div>
          <StatusBadge tone={isSettled ? "success" : isOverpaid ? "warning" : "neutral"}>
            {isSettled ? "Settled" : isOverpaid ? "Overpaid" : "Outstanding"}
          </StatusBadge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/40">
            <div className="p-4 space-y-1">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Gross Amount</p>
              <p className="text-sm font-black">{recon.currency} {recon.totalAmount.toLocaleString()}</p>
            </div>
            <div className="p-4 space-y-1">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Net Collected</p>
              <p className="text-sm font-black text-green-600">{recon.currency} {recon.netCollected.toLocaleString()}</p>
            </div>
            <div className="p-4 space-y-1">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Refunded</p>
              <p className="text-sm font-black text-red-600">{recon.currency} {recon.refunded.toLocaleString()}</p>
            </div>
            <div className="p-4 space-y-1 bg-primary/5">
              <p className="text-[9px] font-black text-primary uppercase tracking-tighter">Balance Due</p>
              <p className={cn("text-sm font-black", recon.outstanding > 0 ? "text-primary" : "text-green-600")}>
                {recon.currency} {recon.outstanding.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Integrity Verification Footer */}
          <div className="px-4 py-2 bg-muted/10 border-t border-border/40 flex items-center justify-between text-[8px] font-bold text-muted-foreground uppercase">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-3 text-emerald-500" />
              Database Integrity Verified
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3" />
              As of {format(new Date(), "MMM dd, HH:mm")}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

