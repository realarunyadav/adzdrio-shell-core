import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertOctagon, ShieldAlert, ShieldCheck, Filter, Search, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const RiskRegister = () => {
  const risks = [
    { 
      id: "RSK-042", 
      title: "Third-party API Downtime", 
      cat: "Technical", 
      prob: "Medium", 
      impact: "High", 
      severity: "High", 
      owner: "Sarah J.", 
      status: "Mitigated" 
    },
    { 
      id: "RSK-045", 
      title: "Delayed Hardware Shipment", 
      cat: "Operational", 
      prob: "High", 
      impact: "High", 
      severity: "Critical", 
      owner: "Mike C.", 
      status: "Active" 
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <Badge className="bg-rose-500 text-white font-bold px-3 py-1">2 CRITICAL</Badge>
          <Badge variant="outline" className="text-slate-500 font-bold border-slate-200">5 ACTIVE</Badge>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search risks..." className="pl-10 h-10 text-sm border-slate-200" />
          </div>
          <Button variant="outline" className="h-10 font-bold"><Filter className="w-4 h-4 mr-2" />Filters</Button>
          <Button className="h-10 bg-slate-900 text-white font-bold px-6">Log New Risk</Button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-100 shadow-sm overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Detail</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Severity</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Impact</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Probability</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {risks.map((risk, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{risk.title}</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-tighter">{risk.id} • {risk.owner}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="secondary" className="text-[9px] font-bold uppercase">{risk.cat}</Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge className={`text-[9px] font-bold ${risk.severity === 'Critical' ? 'bg-rose-500' : 'bg-amber-500'}`}>
                    {risk.severity}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-slate-600">{risk.impact}</td>
                <td className="px-6 py-4 text-xs font-bold text-slate-600">{risk.prob}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {risk.status === 'Mitigated' ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> : <AlertOctagon className="w-3.5 h-3.5 text-rose-500 animate-pulse" />}
                    <span className={`text-[10px] font-black uppercase tracking-widest ${risk.status === 'Mitigated' ? 'text-emerald-600' : 'text-rose-600'}`}>{risk.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
