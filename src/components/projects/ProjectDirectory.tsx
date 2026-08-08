import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Clock, 
  Users,
  Briefcase,
  IndianRupee,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ProjectDirectory = () => {
  const projects = [
    {
      id: "PRJ-001",
      name: "ABOS Core Framework Implementation",
      owner: "Sarah Johnson",
      dept: "Engineering",
      status: "Active",
      priority: "P1",
      progress: 72,
      budget: "₹45.0L",
      deadline: "Aug 20, 2026",
      health: "Stable"
    },
    {
      id: "PRJ-002",
      name: "Enterprise Data Migration",
      owner: "Michael Chen",
      dept: "Infrastructure",
      status: "Active",
      priority: "P2",
      progress: 45,
      budget: "₹18.5L",
      deadline: "Sep 15, 2026",
      health: "At Risk"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search projects..." className="pl-10 h-10 border-slate-200" />
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
              <ListIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((project) => (
          <Card key={project.id} className="border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1">
                  <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-widest ${project.health === 'Stable' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-rose-600 bg-rose-50 border-rose-100'}`}>
                    {project.health}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-bold">{project.id}</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer mb-3 leading-tight">
                {project.name}
              </h4>
              
              <div className="grid grid-cols-2 gap-y-3 mb-5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Owner</span>
                  <span className="text-xs font-semibold text-slate-700">{project.owner}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Budget</span>
                  <span className="text-xs font-semibold text-slate-700">{project.budget}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Deadline</span>
                  <span className="text-xs font-semibold text-slate-700">{project.deadline}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Priority</span>
                  <Badge className="w-fit text-[9px] h-4 px-1.5 bg-slate-900">{project.priority}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-400 uppercase">Progress</span>
                  <span className="text-slate-900">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-1.5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
