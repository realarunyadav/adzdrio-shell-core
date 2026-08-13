import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Users, 
  BarChart3, 
  Clock, 
  UserPlus, 
  ShieldCheck, 
  AlertCircle,
  TrendingUp,
  LayoutGrid,
  Zap
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  demoTeamPerformance,
  demoActivations 
} from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/activation/assignments")({
  component: AssignmentsPage,
});

function AssignmentsPage() {
  const teams = [
    { name: "Technical Provisioning", lead: "Ankit Singh", members: 8, load: "High" },
    { name: "Payment Verification", lead: "Priya Nair", members: 4, load: "Medium" },
    { name: "Customer Success", lead: "Rahul Khanna", members: 12, load: "Balanced" }
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Operations Planning"
        title="Workload & Assignments"
        description="Monitor team capacity, manage manual assignments, and optimize provisioning throughput."
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Manage Teams
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold">
              <Zap className="mr-2 h-4 w-4" />
              Auto-Assign All
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teams.map((team) => (
          <SectionCard key={team.name} title={team.name} description={`Lead: ${team.lead}`}>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground">Capacity</p>
                <p className="text-xl font-black">{team.members} Agents</p>
              </div>
              <Badge className={cn(
                "font-black uppercase text-[9px]",
                team.load === 'High' ? "bg-red-100 text-red-700 hover:bg-red-100" :
                team.load === 'Medium' ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" :
                "bg-green-100 text-green-700 hover:bg-green-100"
              )}>
                {team.load} Load
              </Badge>
            </div>
            <div className="mt-4 w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full",
                  team.load === 'High' ? "bg-red-500 w-[85%]" :
                  team.load === 'Medium' ? "bg-yellow-500 w-[60%]" :
                  "bg-green-500 w-[35%]"
                )}
              />
            </div>
          </SectionCard>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <SectionCard title="Agent Workload Analysis" description="Current active activation tickets per provisioning agent.">
            <div className="mt-6 space-y-6">
              {demoTeamPerformance.slice(0, 6).map((agent) => (
                <div key={agent.id} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-muted flex items-center justify-center font-black text-xs uppercase text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase leading-none mb-1">{agent.name}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase">{agent.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black uppercase">{agent.leads} Active</span>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Efficiency: {agent.conversion}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-500" 
                      style={{ width: `${(agent.leads / 20) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <SectionCard title="Unassigned Queue" description="Activations awaiting manual or automated assignment.">
            <div className="mt-4 space-y-3">
              {demoActivations.filter(a => !a.assignedTo).map((act) => (
                <div key={act.id} className="p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 text-primary">
                      {act.priority}
                    </Badge>
                    <span className="text-[10px] font-black uppercase text-muted-foreground">{act.id}</span>
                  </div>
                  <p className="text-xs font-black uppercase truncate">{act.customerName}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-3">{act.planName}</p>
                  <Button size="sm" variant="outline" className="w-full h-8 text-[9px] font-black uppercase border-dashed group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    <UserPlus className="mr-2 size-3" />
                    Assign Now
                  </Button>
                </div>
              ))}
              {demoActivations.filter(a => !a.assignedTo).length === 0 && (
                <div className="py-12 text-center">
                  <ShieldCheck className="mx-auto size-8 text-muted-foreground opacity-20 mb-2" />
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Queue is Clear</p>
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}