import { SectionCard } from "@/components/shared/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  History, 
  Search, 
  Filter, 
  User, 
  Cpu, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  MessageSquare
} from "lucide-react";

export function AIAuditLog() {
  const logs = [
    { user: "Sarah J.", request: "Customer Summary", model: "GPT-4o", tokens: 1240, cost: 1.2, module: "CRM", status: "Success", time: "2m ago" },
    { user: "Mike D.", request: "Policy Q&A", model: "Claude 3.5", tokens: 2800, cost: 2.8, module: "HR", status: "Success", time: "15m ago" },
    { user: "Admin", request: "Model Config Update", model: "System", tokens: 0, cost: 0.0, module: "Admin", status: "Success", time: "1h ago" },
    { user: "John S.", request: "Sales Drill", model: "GPT-4o", tokens: 4200, cost: 4.2, module: "Sales", status: "Failed", time: "2h ago" },
    { user: "Sarah J.", request: "Lead Analysis", model: "GPT-4o", tokens: 850, cost: 0.8, module: "CRM", status: "Success", time: "3h ago" },
  ];

  return (
    <div className="space-y-6">
      <SectionCard 
        title="AI Transparency & Audit Center" 
        actions={<Button variant="outline" size="sm" className="h-8 glass-surface">Export CSV</Button>}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input 
              placeholder="Search audit logs..." 
              className="w-full bg-muted/30 border border-border/40 rounded-lg p-2.5 pl-9 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-10 text-xs px-3"><Filter className="size-3 mr-2" /> Filter User</Button>
            <Button variant="outline" className="h-10 text-xs px-3"><Cpu className="size-3 mr-2" /> Model</Button>
          </div>
        </div>

        <div className="border border-border/40 rounded-xl overflow-hidden glass-surface">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/30 border-b border-border/40">
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Timestamp</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Employee</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Request Type</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Model</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Usage</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors group text-[11px]">
                  <td className="p-4 font-bold text-muted-foreground tracking-tighter uppercase">{log.time}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-muted flex items-center justify-center text-[10px]">
                        <User className="size-3" />
                      </div>
                      <span className="font-bold">{log.user}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="size-3 text-muted-foreground opacity-50" />
                      <span className="font-medium">{log.request}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 font-bold tracking-tight bg-muted/30 border-none">{log.model}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold">{log.tokens.toLocaleString()} tokens</span>
                      <span className="text-[9px] text-muted-foreground">₹ {log.cost.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      {log.status === 'Success' ? (
                        <CheckCircle2 className="size-3 text-success" />
                      ) : (
                        <AlertCircle className="size-3 text-destructive" />
                      )}
                      <span className={`font-bold uppercase tracking-tighter ${log.status === 'Success' ? 'text-success' : 'text-destructive'}`}>
                        {log.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon" className="size-8"><MoreVertical className="size-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
