import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Target, 
  MessageSquare, 
  Zap, 
  TrendingUp, 
  BookOpen, 
  Play,
  Award,
  History,
  Star
} from "lucide-react";

export function SalesCoach() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CoachMetric title="Roleplay Sessions" value="12" subtext="4 this week" icon={MessageSquare} />
        <CoachMetric title="Objection Score" value="84%" subtext="+12% vs last month" icon={Target} />
        <CoachMetric title="Product Knowledge" value="96%" subtext="Expert Level" icon={Award} />
        <CoachMetric title="Coaching Hours" value="8.5" subtext="Strategic Growth" icon={History} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <SectionCard 
            title="Interactive AI Training" 
            actions={<Button size="sm" variant="outline" className="h-8">View All Drills</Button>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TrainingCard 
                title="Roleplay: Price Objection" 
                description="Practice handling high-ticket objections for the Enterprise plan."
                difficulty="Medium"
                time="10 mins"
              />
              <TrainingCard 
                title="Product Quiz: API Limits" 
                description="Test your knowledge on rate limits and technical specifications."
                difficulty="Hard"
                time="5 mins"
              />
              <TrainingCard 
                title="Objection Handling: Competitors" 
                description="Learn the authorized response for the Top 3 market competitors."
                difficulty="Easy"
                time="8 mins"
              />
              <TrainingCard 
                title="Closing: Strategic Negotiation" 
                description="Advanced techniques for closing deals > ₹ 10L."
                difficulty="Expert"
                time="15 mins"
              />
            </div>
          </SectionCard>

          <SectionCard title="Personalized Sales Scripts">
            <div className="space-y-4">
              <div className="p-4 rounded-xl glass-surface border border-border/40 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-xs font-bold">Standard Introduction (Refined)</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Updated by AI 2h ago</p>
                  </div>
                  <Badge variant="outline" className="text-[9px]">Active</Badge>
                </div>
                <p className="text-[11px] leading-relaxed italic opacity-80 mb-4">
                  "Hello [Name], I'm calling from ABOS. Based on your recent inquiry about [Pain Point], I've analyzed our solutions and believe our [Feature] could specifically solve..."
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="h-7 text-[10px] uppercase font-bold tracking-tight">Generate Variant</Button>
                  <Button size="sm" variant="ghost" className="h-7 text-[10px] uppercase font-bold tracking-tight">Copy to Clipboard</Button>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <SectionCard title="Skills Matrix">
            <div className="space-y-5">
              <SkillItem label="Active Listening" value={92} />
              <SkillItem label="Discovery Quality" value={78} />
              <SkillItem label="Solution Mapping" value={85} />
              <SkillItem label="Handling Rejection" value={64} />
              <SkillItem label="Closing Velocity" value={91} />
            </div>
          </SectionCard>

          <SectionCard title="Recommended Training" className="bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="size-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Advanced Objection Handling</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Focus on improving "Handling Rejection" score.</p>
                </div>
              </div>
              <Button size="sm" className="w-full h-8 shadow-elevated">Start Lesson</Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function CoachMetric({ title, value, subtext, icon: Icon }: any) {
  return (
    <div className="p-4 rounded-xl glass-surface border border-border/40 hover:shadow-elevated transition-all">
      <div className="flex items-center gap-3 mb-2">
        <div className="size-8 rounded-lg bg-muted/50 flex items-center justify-center">
          <Icon className="size-4 text-muted-foreground" />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{title}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <h4 className="text-xl font-black">{value}</h4>
        <span className="text-[10px] text-primary font-bold">{subtext}</span>
      </div>
    </div>
  );
}

function TrainingCard({ title, description, difficulty, time }: any) {
  const diffMap: any = {
    Easy: "text-success",
    Medium: "text-primary",
    Hard: "text-warning",
    Expert: "text-destructive"
  };

  return (
    <div className="p-4 rounded-xl border border-border/40 hover:border-primary/40 transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xs font-bold leading-tight group-hover:text-primary transition-colors">{title}</h4>
        <Button size="icon" variant="ghost" className="size-6 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          <Play className="size-3" />
        </Button>
      </div>
      <p className="text-[10px] text-muted-foreground line-clamp-2 mb-3">{description}</p>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Zap className="size-3 opacity-30" />
          <span className={`text-[9px] font-bold uppercase ${diffMap[difficulty]}`}>{difficulty}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <History className="size-3 opacity-30" />
          <span className="text-[9px] font-bold uppercase">{time}</span>
        </div>
      </div>
    </div>
  );
}

function SkillItem({ label, value }: { label: string, value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1 w-full bg-muted/40 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-1000" 
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
