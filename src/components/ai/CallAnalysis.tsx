import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Mic, 
  CheckCircle2, 
  AlertCircle, 
  FileText,
  User,
  Smile,
  Zap,
  Star,
  Play
} from "lucide-react";

export function CallAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <SectionCard 
            title="Call Workspace" 
            actions={
              <Button size="sm" className="h-8 shadow-elevated">
                <Upload className="mr-2 size-3" />
                Upload Recording
              </Button>
            }
          >
            <div className="h-[200px] rounded-xl bg-muted/20 border-2 border-dashed border-border/60 flex flex-col items-center justify-center gap-3">
              <Mic className="size-8 text-muted-foreground opacity-20" />
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-tight">Drop recording here</p>
                <p className="text-[10px] text-muted-foreground italic mt-1">Supports MP3, WAV, M4A up to 50MB</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl glass-surface border border-border/40">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="size-5 text-success" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">Enterprise Demo - Acme Corp</h4>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">Processed 2h ago · 24m 12s</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-8"><Play className="size-3 mr-2" /> Playback</Button>
              </div>
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionCard title="Key Objections Handled">
              <div className="space-y-3">
                {[
                  { obj: "Pricing too high", status: "Neutral" },
                  { obj: "Implementation timeline", status: "Resolved" },
                  { obj: "Competitor comparison", status: "Strengthened" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded bg-muted/30">
                    <span className="text-[11px] font-medium">{item.obj}</span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0">{item.status}</Badge>
                  </div>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Employee Feedback">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-success/5 border border-success/10">
                  <p className="text-[10px] font-bold text-success uppercase mb-1">Strength</p>
                  <p className="text-[11px]">Excellent summary of the value proposition during the final 5 minutes.</p>
                </div>
                <div className="p-3 rounded-xl bg-warning/5 border border-warning/10">
                  <p className="text-[10px] font-bold text-warning uppercase mb-1">Improvement</p>
                  <p className="text-[11px]">Spoke 65% of the time. Try to ask more open-ended discovery questions.</p>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <SectionCard title="AI Analysis Scores">
            <div className="space-y-6">
              <ScoreGauge label="Overall Closing Probability" value={78} />
              <div className="space-y-4">
                <ScoreBar label="Qualification Quality" value={92} />
                <ScoreBar label="Customer Sentiment" value={84} icon={Smile} />
                <ScoreBar label="Customer Intent" value={65} icon={Zap} />
                <ScoreBar label="Competitor Mention Risk" value={12} variant="danger" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Transcript Summary">
            <div className="space-y-4">
              <div className="p-3 rounded-xl glass-surface border border-border/40 text-[11px] leading-relaxed">
                The customer is interested in the enterprise plan but expressed concerns about data migration from their legacy system. They requested a technical follow-up with their IT lead next Tuesday.
              </div>
              <Button size="sm" variant="outline" className="w-full h-8 text-xs"><FileText className="size-3 mr-2" /> Full Transcript</Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function ScoreGauge({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative size-24 flex items-center justify-center">
        <svg className="size-full -rotate-90">
          <circle cx="48" cy="48" r="42" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-border/40" />
          <circle 
            cx="48" 
            cy="48" 
            r="42" 
            fill="transparent" 
            stroke="currentColor" 
            strokeWidth="6" 
            strokeDasharray={264} 
            strokeDashoffset={264 - (264 * value) / 100} 
            className="text-primary transition-all duration-1000" 
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-black">{value}%</span>
          <span className="text-[9px] uppercase font-bold text-muted-foreground">Score</span>
        </div>
      </div>
      <p className="text-xs font-bold text-center mt-3 uppercase tracking-tight">{label}</p>
    </div>
  );
}

function ScoreBar({ label, value, icon: Icon, variant = "primary" }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
        <div className="flex items-center gap-1.5">
          {Icon && <Icon className="size-3 opacity-50" />}
          {label}
        </div>
        <span>{value}%</span>
      </div>
      <Progress value={value} className="h-1" />
    </div>
  );
}
