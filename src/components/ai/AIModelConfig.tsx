import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Cpu, 
  ShieldCheck, 
  Key, 
  Lock, 
  RefreshCw,
  Plus,
  ArrowRight,
  Database,
  Cloud
} from "lucide-react";

export function AIModelConfig() {
  const models = [
    { name: "GPT-4o", provider: "OpenAI", status: "Active", latency: "240ms", reliability: "99.9%" },
    { name: "Claude 3.5 Sonnet", provider: "Anthropic", status: "Active", latency: "310ms", reliability: "99.8%" },
    { name: "Gemini 1.5 Pro", provider: "Google", status: "Standby", latency: "420ms", reliability: "99.5%" },
    { name: "Llama 3 (70B)", provider: "Self-Hosted", status: "Testing", latency: "180ms", reliability: "98.2%" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <SectionCard 
            title="Model Orchestration" 
            actions={<Button size="sm" className="h-8 shadow-elevated"><Plus className="size-3 mr-2" /> Connect Provider</Button>}
          >
            <div className="space-y-4">
              {models.map((model, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl glass-surface border border-border/40 group hover:border-primary/40 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Cpu className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight">{model.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{model.provider}</span>
                        <div className="size-1 rounded-full bg-border" />
                        <span className="text-[10px] text-muted-foreground font-medium">{model.latency} latency</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1.5 mb-1">
                        <div className={`size-1.5 rounded-full ${model.status === 'Active' ? 'bg-success' : 'bg-warning'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-tighter ${model.status === 'Active' ? 'text-success' : 'text-warning'}`}>{model.status}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-bold tracking-tighter">REL: {model.reliability}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="size-8"><Settings className="size-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Enterprise Security Layer">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SecurityFeature 
                icon={Lock} 
                title="Secret Vault" 
                description="API keys are encrypted and injected server-side. Never exposed to browser."
              />
              <SecurityFeature 
                icon={ShieldCheck} 
                title="PII Redaction" 
                description="Automatic masking of sensitive customer data before sending to providers."
              />
              <SecurityFeature 
                icon={RefreshCw} 
                title="Model Fallback" 
                description="Automatic switching to secondary providers if primary model fails."
              />
              <SecurityFeature 
                icon={Database} 
                title="Context Retrieval" 
                description="Permission-aware vector search for internal company knowledge."
              />
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <SectionCard title="Memory & Persistence" className="bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <p className="text-[11px] leading-relaxed opacity-70">
                Controlled long-term memory for employee preferences and cross-module context. Auditable and permission-restricted.
              </p>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                <span>Memory Utilization</span>
                <span>4.2 GB</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[42%]" />
              </div>
              <Button variant="outline" size="sm" className="w-full h-8 glass-surface text-[10px] uppercase font-bold tracking-tight">Manage Memory Index</Button>
            </div>
          </SectionCard>

          <SectionCard title="Usage Quotas">
            <div className="space-y-4">
              <QuotaItem label="Token Budget" used={650000} total={1000000} />
              <QuotaItem label="Daily Requests" used={1200} total={5000} />
              <QuotaItem label="Cost Threshold" used={8240} total={25000} prefix="₹" />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function SecurityFeature({ icon: Icon, title, description }: any) {
  return (
    <div className="p-4 rounded-xl border border-border/40 flex gap-3">
      <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
        <Icon className="size-4 text-primary" />
      </div>
      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-tight mb-1">{title}</h4>
        <p className="text-[10px] text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function QuotaItem({ label, used, total, prefix = "" }: any) {
  const percentage = (used / total) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
        <span>{label}</span>
        <span>{prefix}{used.toLocaleString()} / {prefix}{total.toLocaleString()}</span>
      </div>
      <div className="h-1 w-full bg-muted/40 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-1000" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
