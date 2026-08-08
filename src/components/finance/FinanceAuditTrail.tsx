import { History, User, Terminal, ArrowRight, Shield } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const logs = [
  { id: 1, user: "Nikhil S.", action: "Verified Payment", target: "PAY-2026-001", time: "14:02 UTC", prev: "Pending", next: "Verified", date: "Aug 15, 2026" },
  { id: 2, user: "Sarah J.", action: "Updated GST Rate", target: "Tax Config", time: "11:45 UTC", prev: "15%", next: "18%", date: "Aug 15, 2026" },
  { id: 3, user: "System", action: "Generated Invoice", target: "INV-2026-452", time: "09:00 UTC", prev: "None", next: "Draft", date: "Aug 15, 2026" },
  { id: 4, user: "Nikhil S.", action: "Approved Expense", target: "EXP-2026-042", time: "08:15 UTC", prev: "Review", next: "Approved", date: "Aug 15, 2026" },
];

export function FinanceAuditTrail() {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center gap-2 px-2">
        <Shield className="w-4 h-4 text-primary" />
        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Immutable Financial Ledger</h4>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <Card key={log.id} className="p-4 border-none surface-card flex gap-4 items-start group hover:bg-muted/30 transition-colors">
            <div className="mt-1">
              <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900">{log.user}</span>
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-bold uppercase tracking-tight">{log.action}</Badge>
                  <span className="text-xs font-bold text-primary">{log.target}</span>
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {log.date} • {log.time}
                </div>
              </div>
              <div className="flex items-center gap-3 bg-muted/20 p-2 rounded-lg border border-border/40">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Previous Value</span>
                  <span className="text-xs font-medium text-slate-600">{log.prev}</span>
                </div>
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">New Value</span>
                  <span className="text-xs font-bold text-emerald-600">{log.next}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
