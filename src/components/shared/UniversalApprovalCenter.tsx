import * as React from "react";
import { CheckCircle2, XCircle, Clock, Receipt } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Approval {
  id: string;
  type: string;
  description: string;
  amount?: string;
  user: string;
}

export function UniversalApprovalCenter({ approvals }: { approvals: Approval[] }) {
  return (
    <div className="space-y-4">
      {approvals.map(app => (
        <Card key={app.id} className="p-4 flex items-center justify-between border-none shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
              <Receipt className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">{app.type}</p>
              <p className="text-sm font-bold text-slate-800">{app.description}</p>
              <p className="text-xs text-slate-400">Requested by {app.user}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-emerald-600 hover:bg-emerald-50"><CheckCircle2 className="size-4 mr-2" />Approve</Button>
            <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/5"><XCircle className="size-4 mr-2" />Reject</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
