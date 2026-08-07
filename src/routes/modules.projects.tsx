import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionCard } from '@/components/shared/SectionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutGrid, 
  ListTodo, 
  Calendar, 
  Users, 
  Briefcase, 
  AlertOctagon, 
  BarChart3, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Timer, 
  TrendingUp, 
  FileText, 
  MessageSquare, 
  IndianRupee,
  MoreHorizontal,
  GanttChart,
  Kanban,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export const Route = createFileRoute('/modules/projects')({
  component: ProjectsWorkspace,
});

function ProjectsWorkspace() {
  return (
    <div className="flex flex-col gap-6 p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <PageHeader 
        title="Enterprise PMO" 
        description="Strategic project management office, resource orchestration, and delivery excellence."
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Global Timeline
            </Button>
            <Button className="shadow-md bg-primary hover:bg-primary/90 text-white font-medium">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        }
      />

      {/* Executive PMO KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {[
          { label: "Total Projects", value: "24", change: "+2", trend: "up", icon: Briefcase },
          { label: "Active", value: "18", change: "Stable", trend: "neutral", icon: Timer },
          { label: "Delayed", value: "3", change: "+1", trend: "up", icon: AlertOctagon, color: "text-destructive" },
          { label: "Budget Used", value: "₹1.2Cr", change: "62%", trend: "up", icon: IndianRupee },
          { label: "Project Health", value: "88%", change: "+2.5%", trend: "up", icon: CheckCircle2, color: "text-emerald-500" },
        ].map((stat, i) => (
          <Card key={i} className="p-5 border-none shadow-card hover:shadow-elevated transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-primary/5 transition-colors">
                <stat.icon className={`w-5 h-5 ${stat.color || 'text-slate-500'} group-hover:text-primary transition-colors`} />
              </div>
              <Badge 
                variant={stat.trend === "up" ? "outline" : "secondary"} 
                className={`flex gap-1 items-center px-2 py-0.5 text-[10px] font-bold ${stat.trend === 'up' && stat.label !== 'Delayed' ? 'border-emerald-100 text-emerald-600 bg-emerald-50/50' : ''}`}
              >
                {stat.change}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="directory" className="space-y-6">
        <TabsList className="bg-slate-100/80 backdrop-blur-md p-1 rounded-xl border border-white/50 w-fit overflow-x-auto no-scrollbar max-w-full">
          <TabsTrigger value="directory" className="px-5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Project Directory</TabsTrigger>
          <TabsTrigger value="workspace" className="px-5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Active Workspace</TabsTrigger>
          <TabsTrigger value="tasks" className="px-5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Global Tasks</TabsTrigger>
          <TabsTrigger value="resources" className="px-5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Resource Planning</TabsTrigger>
          <TabsTrigger value="risks" className="px-5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Risk Register</TabsTrigger>
          <TabsTrigger value="reporting" className="px-5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Intelligence</TabsTrigger>
          <TabsTrigger value="audit" className="px-5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard title="Active Portfolio" description="Comprehensive overview of all enterprise initiatives, timelines, and delivery status.">
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 max-w-sm">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search projects, clients, managers..." className="pl-10 h-10 border-slate-200 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white shadow-sm">
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400">
                      <ListTodo className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="outline" className="text-[10px] font-bold border-emerald-100 text-emerald-600 bg-emerald-50/50">ACTIVE</Badge>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
                      </div>
                      <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer mb-1">ABOS Core Framework Implementation</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4">Development of the modular enterprise operating system for Adzdrio India Services.</p>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[11px] font-bold">
                          <span className="text-slate-400">PROGRESS</span>
                          <span className="text-slate-900">72%</span>
                        </div>
                        <Progress value={72} className="h-1.5" />
                        
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(u => (
                              <div key={u} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200" />
                            ))}
                            <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+3</div>
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            DUE IN 12 DAYS
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="workspace" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard title="Project Command Center" description="Granular workspace for specific project execution and operational tracking.">
            <div className="h-[600px] flex items-center justify-center text-slate-400 bg-slate-50/30 border-2 border-dashed border-slate-100 rounded-2xl mt-4">
              <div className="flex flex-col items-center gap-3">
                <LayoutGrid className="w-12 h-12 opacity-10" />
                <p className="text-sm font-medium">Select a project to load the dedicated workspace</p>
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="tasks" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                <Button variant="ghost" size="sm" className="h-9 px-4 bg-white shadow-sm font-bold text-xs">
                  <Kanban className="w-3.5 h-3.5 mr-2" />
                  Kanban
                </Button>
                <Button variant="ghost" size="sm" className="h-9 px-4 font-bold text-xs text-slate-500">
                  <ListTodo className="w-3.5 h-3.5 mr-2" />
                  List
                </Button>
                <Button variant="ghost" size="sm" className="h-9 px-4 font-bold text-xs text-slate-500">
                  <GanttChart className="w-3.5 h-3.5 mr-2" />
                  Gantt
                </Button>
              </div>
              <Button size="sm"><Plus className="w-4 h-4 mr-2" />New Task</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[500px]">
              {['Todo', 'In Progress', 'Review', 'Done'].map(stage => (
                <div key={stage} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between px-2">
                    <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stage}</h5>
                    <Badge variant="secondary" className="text-[10px]">3</Badge>
                  </div>
                  <div className="flex flex-col gap-3 p-2 bg-slate-50/50 rounded-xl h-full border border-dashed border-slate-200">
                    {[1, 2].map(t => (
                      <Card key={t} className="p-4 border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-between mb-2">
                          <Badge className="text-[9px] font-bold bg-amber-50 text-amber-600 border-amber-100 shadow-none">HIGH</Badge>
                        </div>
                        <h6 className="text-sm font-bold text-slate-800 mb-2">Design UI System Tokens</h6>
                        <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-50">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                            <CheckCircle2 className="w-3 h-3" />
                            2/5
                          </div>
                          <div className="w-6 h-6 rounded-full bg-slate-200" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard title="Capacity & Orchestration" description="Analyze employee allocation and balance workloads across departments.">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
               <div className="lg:col-span-2 space-y-4">
                  <div className="h-[400px] flex items-center justify-center text-slate-400 bg-slate-50/30 border-2 border-dashed border-slate-100 rounded-2xl">
                    Resource Heatmap Grid
                  </div>
               </div>
               <div className="space-y-4">
                 <Card className="p-5 border-none shadow-sm bg-slate-50/50">
                   <div className="flex items-center justify-between mb-4">
                     <h4 className="text-sm font-bold text-slate-800">Utilization Pulse</h4>
                     <TrendingUp className="w-4 h-4 text-emerald-500" />
                   </div>
                   <div className="space-y-4">
                     {['Engineering', 'Design', 'Product', 'QA'].map(dept => (
                       <div key={dept} className="space-y-2">
                         <div className="flex justify-between text-[11px] font-bold">
                           <span className="text-slate-500 uppercase tracking-wider">{dept}</span>
                           <span className="text-slate-900">85%</span>
                         </div>
                         <Progress value={85} className="h-1.5" />
                       </div>
                     ))}
                   </div>
                   <Button variant="outline" className="w-full mt-6 text-xs font-bold bg-white">
                     <UserPlus className="w-3.5 h-3.5 mr-2" />
                     Smart Resource Allocation
                   </Button>
                 </Card>
               </div>
             </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="risks" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard title="Enterprise Risk Register" description="Identify, assess, and mitigate strategic and operational delivery risks.">
            <div className="h-[400px] flex items-center justify-center text-slate-400 bg-slate-50/30 border-2 border-dashed border-slate-100 rounded-2xl mt-4">
              Severity vs Probability Matrix
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="reporting" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Portfolio Performance" description="Real-time delivery velocity and budget burn analysis.">
               <div className="h-[300px] flex items-center justify-center text-slate-400">
                 <BarChart3 className="w-12 h-12 opacity-10" />
               </div>
            </SectionCard>
            <SectionCard title="Executive Summary" description="AI-generated insights into delivery health and strategic alignment.">
               <div className="h-[300px] flex items-center justify-center text-slate-400">
                 <FileText className="w-12 h-12 opacity-10" />
               </div>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard title="Immutable Audit History" description="Comprehensive log of all project-level actions, status transitions, and team changes.">
            <div className="space-y-4 pt-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex gap-4 p-4 border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-slate-500" />
                    </div>
                    {i < 5 && <div className="w-px h-full bg-slate-100" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="text-sm font-bold text-slate-800">Status Changed: <span className="text-emerald-600">IN REVIEW</span></div>
                      <div className="text-[10px] font-bold text-slate-400">AUG 07, 2026 • 15:08 UTC</div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Project: <span className="font-bold">ABOS Core Framework Implementation</span></div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-5 h-5 rounded-full bg-slate-200" />
                      <span className="text-[11px] font-medium text-slate-600">Senior Project Manager • Milestone M3 Completed</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
