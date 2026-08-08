import { ShieldCheck, Calendar, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function TaxationCompliance() {
  const complianceItems = [
    { name: "GSTR-1 (Monthly)", status: "Filed", date: "Aug 11, 2026", dueDate: "Sep 11, 2026", tone: "success" },
    { name: "GSTR-3B (Monthly)", status: "Pending", date: "-", dueDate: "Aug 20, 2026", tone: "warning" },
    { name: "TDS Filing (Q2)", status: "Completed", date: "Jul 15, 2026", dueDate: "Oct 31, 2026", tone: "success" },
    { name: "Income Tax Advance", status: "Upcoming", date: "-", dueDate: "Sep 15, 2026", tone: "info" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {complianceItems.map((item, i) => (
          <Card key={i} className="border-none surface-card p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-muted/50">
                <ShieldCheck className={`w-5 h-5 ${item.tone === 'success' ? 'text-emerald-600' : 'text-amber-500'}`} />
              </div>
              <Badge variant="outline" className={`text-[10px] font-bold border-none ${item.tone === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                {item.status}
              </Badge>
            </div>
            <h4 className="text-sm font-black text-slate-900 mb-1">{item.name}</h4>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                <Calendar className="w-3 h-3" />
                Due: {item.dueDate}
              </div>
              {item.date !== '-' && (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-tight">
                  <CheckCircle2 className="w-3 h-3" />
                  Filed: {item.date}
                </div>
              )}
            </div>
            <Button variant="link" size="sm" className="p-0 h-auto mt-4 text-xs font-black uppercase tracking-widest text-primary underline-offset-4 hover:underline">
              <Download className="w-3 h-3 mr-1.5" />
              Download Report
            </Button>
          </Card>
        ))}
      </div>

      <SectionCard title="Configurable Tax Settings" description="Define tax rates, filing frequencies, and jurisdictional rules without code changes.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active GST Rates</h5>
            <div className="space-y-2">
              {[
                { label: "Standard GST", rate: "18%" },
                { label: "Service GST", rate: "12%" },
                { label: "Exempt Goods", rate: "0%" }
              ].map((rate, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-xs font-bold">{rate.label}</span>
                  <span className="text-xs font-black">{rate.rate}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Compliance Alerts</h5>
            <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-900">GSTR-3B filing window is now open.</p>
                <p className="text-[10px] text-amber-700 mt-1">Submit by Aug 20 to avoid late fees. Previous month data has been auto-populated.</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
