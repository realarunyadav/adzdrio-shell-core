import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  History, 
  User, 
  ArrowRight,
  Package,
  ArrowRightLeft,
  MoveDown,
  MoveUp,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const InventoryAuditTrail = () => {
  const logs = [
    {
      action: "Inter-Warehouse Transfer",
      details: "50 units of Core Router V4 moved to Mumbai Node",
      user: "Amit Sharma",
      role: "Inventory Manager",
      timestamp: "Aug 08, 2026 • 15:05 UTC",
      type: "transfer",
      source: "Bengaluru Hub",
      dest: "Mumbai Node"
    },
    {
      action: "Stock Receipt (GRN)",
      details: "120 units received against PO-2026-0042",
      user: "Sarah Johnson",
      role: "Procurement Lead",
      timestamp: "Aug 07, 2026 • 11:20 UTC",
      type: "receipt",
      qty: "+120"
    },
    {
      action: "Manual Stock Adjustment",
      details: "Cycle count discrepancy fix for legacy adapters",
      user: "Michael Chen",
      role: "Warehouse Head",
      timestamp: "Aug 06, 2026 • 16:45 UTC",
      type: "adjustment",
      prev: "324",
      next: "320"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'transfer': return <ArrowRightLeft className="w-4 h-4 text-blue-500" />;
      case 'receipt': return <MoveDown className="w-4 h-4 text-emerald-500" />;
      case 'adjustment': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Immutable Stock Ledger
        </h3>
        <Badge variant="outline" className="text-[10px] font-bold border-slate-200">Session ID: WH-AUD-8849</Badge>
      </div>

      <div className="space-y-4">
        {logs.map((log, i) => (
          <div key={i} className="relative pl-10 pb-8 last:pb-0">
            {i !== logs.length - 1 && (
              <div className="absolute left-[19px] top-8 bottom-0 w-px bg-slate-200" />
            )}
            <div className="absolute left-0 top-1 p-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
              {getIcon(log.type)}
            </div>
            
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{log.action}</span>
                    <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">{log.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <User className="w-3 h-3 text-slate-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-700 leading-none">{log.user}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter leading-none mt-1">{log.role}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed">{log.details}</p>

                {log.type === 'transfer' && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/30 border border-blue-100/50">
                    <div className="flex flex-col flex-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Source Node</span>
                      <span className="text-xs font-black text-slate-700">{log.source}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
                    <div className="flex flex-col flex-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 text-blue-600/60">Destination Node</span>
                      <span className="text-xs font-black text-slate-900">{log.dest}</span>
                    </div>
                  </div>
                )}

                {log.type === 'adjustment' && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/30 border border-amber-100/50">
                    <div className="flex flex-col flex-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Stock Before</span>
                      <span className="text-xs font-bold text-slate-500 line-through">{log.prev}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                    <div className="flex flex-col flex-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 text-emerald-600/60">Final Stock</span>
                      <span className="text-xs font-black text-slate-900">{log.next}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
