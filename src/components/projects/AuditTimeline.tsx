import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  History, 
  User, 
  ArrowRight,
  Database,
  ShieldCheck,
  FileEdit,
  AlertCircle
} from 'lucide-react';

export const AuditTimeline = () => {
  const logs = [
    {
      action: "Project Status Transition",
      details: "ABOS Core Framework moved from 'Discovery' to 'Implementation'",
      user: "Sarah Johnson",
      role: "Portfolio Manager",
      timestamp: "Aug 08, 2026 • 14:22 UTC",
      type: "status",
      prev: "Discovery",
      next: "Implementation"
    },
    {
      action: "Budget Adjustment Approved",
      details: "Infrastructure budget increased by ₹5.0L for cloud scalability",
      user: "David Miller",
      role: "Finance Director",
      timestamp: "Aug 07, 2026 • 09:15 UTC",
      type: "budget",
      prev: "₹40.0L",
      next: "₹45.0L"
    },
    {
      action: "Critical Risk Logged",
      details: "Hardware shipment delay identified as P0 blocker",
      user: "Michael Chen",
      role: "Project Lead",
      timestamp: "Aug 06, 2026 • 16:45 UTC",
      type: "risk"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'status': return <History className="w-4 h-4 text-blue-500" />;
      case 'budget': return <Database className="w-4 h-4 text-amber-500" />;
      case 'risk': return <AlertCircle className="w-4 h-4 text-rose-500" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Immutable Audit Trail
        </h3>
        <Badge variant="outline" className="text-[10px] font-bold border-slate-200">Total Records: 1,284</Badge>
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

                {(log.prev || log.next) && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100/50">
                    <div className="flex flex-col flex-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Previous Value</span>
                      <span className="text-xs font-bold text-slate-500 line-through">{log.prev}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                    <div className="flex flex-col flex-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 text-emerald-600/60">New Value</span>
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
