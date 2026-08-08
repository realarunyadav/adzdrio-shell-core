import React from "react";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  Plus,
  Users,
  Settings,
  History,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPrograms, mockAchievements } from "./mockData";
import { cn } from "@/lib/utils";

export function IncentiveEngine() {
  const activeProgram = mockPrograms[0];
  const myAchievement = mockAchievements[0];
  
  if (!activeProgram || !myAchievement) return null;
  
  // Calculate progress
  const target = activeProgram.rules[0].target;
  const current = myAchievement.value;
  const progress = Math.min((current / target) * 100, 100);
  const remaining = Math.max(target - current, 0);

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-700">
      <PageHeader
        title="Incentive Engine"
        description="Enterprise performance rewards and achievement tracking."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass-surface h-9">
              <History className="mr-2 size-4" />
              History
            </Button>
            <Button size="sm" className="shadow-elevated h-9">
              <Plus className="mr-2 size-4" />
              New Program
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="builder">Program Builder</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Dashboard Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              label="Estimated Incentive" 
              value="₹ 50,000" 
              icon={Trophy} 
              subtext="August Period" 
              tone="primary"
            />
            <StatCard 
              label="Achievement Rate" 
              value={`${progress.toFixed(1)}%`} 
              icon={TrendingUp} 
              subtext={`${(current/100000).toFixed(1)}L / ${(target/100000).toFixed(1)}L`} 
              tone="success"
            />
            <StatCard 
              label="Active Programs" 
              value="3" 
              icon={ShieldCheck} 
              subtext="Across 4 Departments" 
            />
            <StatCard 
              label="Days Remaining" 
              value="22" 
              icon={Clock} 
              subtext="Period ends Aug 31" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Program Details */}
            <SectionCard 
              title="Current Program Performance" 
              className="lg:col-span-2"
              description={activeProgram.name}
            >
              <div className="space-y-8 py-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress towards target</span>
                    <span className="font-bold">₹ {current.toLocaleString()} / ₹ {target.toLocaleString()}</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="p-4 rounded-xl glass-surface border border-border/40">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Threshold Status</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-success" />
                      <span className="text-sm font-bold">Standard Met</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl glass-surface border border-border/40">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Next Accelerator</p>
                    <div className="flex items-center gap-2">
                      <Target className="size-4 text-primary" />
                      <span className="text-sm font-bold">₹ {remaining.toLocaleString()} more</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl glass-surface border border-border/40">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Effective Until</p>
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      <span className="text-sm font-bold">{activeProgram.expiryDate}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Incentive Rules Matrix</h4>
                  <div className="space-y-2">
                    {activeProgram.rules[0].thresholds.map((t, idx) => (
                      <div key={idx} className={cn(
                        "flex items-center justify-between p-3 rounded-lg border transition-all",
                        current >= t.min ? "bg-success/5 border-success/20" : "bg-muted/5 border-border/40 opacity-60"
                      )}>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "size-8 rounded flex items-center justify-center font-bold text-xs",
                            current >= t.min ? "bg-success text-white" : "bg-muted text-muted-foreground"
                          )}>
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-xs font-bold">{t.label}</p>
                            <p className="text-[10px] text-muted-foreground">Min Achievement: ₹ {t.min.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black">₹ {t.reward.toLocaleString()}</p>
                          <p className="text-[9px] text-muted-foreground uppercase tracking-tighter">Reward Amount</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Manager/Admin Sidebar */}
            <div className="space-y-6">
              <SectionCard title="Team Overview">
                <div className="space-y-4">
                  <TeamMemberItem name="Rahul S." progress={82} achievement="₹ 8.2L" />
                  <TeamMemberItem name="Priya M." progress={95} achievement="₹ 9.5L" />
                  <TeamMemberItem name="Ankit V." progress={45} achievement="₹ 4.5L" />
                  <Button variant="ghost" size="sm" className="w-full text-xs mt-2">View Team Analytics</Button>
                </div>
              </SectionCard>

              <SectionCard title="Verification Queue">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-warning/20 bg-warning/5">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="size-4 text-warning" />
                      <span className="text-xs font-medium">12 Pending Records</span>
                    </div>
                    <Button size="sm" className="h-7 text-[10px] uppercase font-bold">Review</Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground italic px-1">
                    Only verified business records contribute to incentive calculations.
                  </p>
                </div>
              </SectionCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="builder">
           <SectionCard title="Incentive Program Builder" description="Create flexible reward structures without code.">
             <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
               <Settings className="size-12 mb-4 opacity-10" />
               <p className="text-sm font-medium">Program Builder Interface</p>
               <p className="text-xs max-w-xs text-center mt-2">
                 Configure targets, thresholds, and reward amounts. Changes generate a new immutable version.
               </p>
               <Button variant="outline" className="mt-6">Create Initial Template</Button>
             </div>
           </SectionCard>
        </TabsContent>

        <TabsContent value="approvals">
           <SectionCard title="Pending Incentive Approvals">
              <div className="py-20 text-center text-muted-foreground">
                <p className="text-sm">No pending approvals for the current selection.</p>
              </div>
           </SectionCard>
        </TabsContent>

        <TabsContent value="audit">
           <SectionCard title="Immutable Audit Trail">
              <div className="space-y-4">
                <AuditItem 
                  user="System" 
                  action="VERSION_GENERATE" 
                  details="Q3 Sales Acceleration Program V1.2 created." 
                  time="2 hours ago"
                />
                <AuditItem 
                  user="Admin User" 
                  action="THRESHOLD_UPDATE" 
                  details="Updated 'Super Accelerator' from 1.1M to 1.2M." 
                  time="5 hours ago"
                />
              </div>
           </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, subtext, tone = "neutral" }: any) {
  const tones: any = {
    neutral: "text-muted-foreground",
    primary: "text-primary bg-primary/5",
    success: "text-success bg-success/5",
  };

  return (
    <Card className="surface-card shadow-card border-border/40">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
          <div className={cn("size-8 rounded-lg flex items-center justify-center", tones[tone])}>
            <Icon className="size-4" />
          </div>
        </div>
        <h4 className="text-2xl font-black tracking-tighter">{value}</h4>
        <p className="mt-1 text-[10px] text-muted-foreground italic">{subtext}</p>
      </CardContent>
    </Card>
  );
}

function TeamMemberItem({ name, progress, achievement }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px] font-medium">
        <span>{name}</span>
        <span>{achievement}</span>
      </div>
      <Progress value={progress} className="h-1" />
    </div>
  );
}

function AuditItem({ user, action, details, time }: any) {
  return (
    <div className="flex gap-4 p-3 rounded-lg border border-border/40 glass-surface">
      <div className="size-8 rounded bg-muted flex items-center justify-center shrink-0">
        <History className="size-4 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-tight">{action}</span>
          <span className="text-[10px] text-muted-foreground">by {user}</span>
        </div>
        <p className="text-xs">{details}</p>
        <p className="text-[10px] text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
