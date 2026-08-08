import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, AlertTriangle, TrendingUp, UserPlus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ResourcePlanning = () => {
  const departments = [
    { name: 'Engineering', load: 92, status: 'Overloaded', staff: 45 },
    { name: 'Product Design', load: 78, status: 'Healthy', staff: 12 },
    { name: 'Infrastructure', load: 65, status: 'Healthy', staff: 8 },
    { name: 'Quality Assurance', load: 88, status: 'Near Limit', staff: 15 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Avg. Utilization", value: "84%", icon: Users, color: "text-blue-500" },
          { label: "Overallocated", value: "6 Staff", icon: AlertTriangle, color: "text-rose-500" },
          { label: "Open Positions", value: "12", icon: UserPlus, color: "text-emerald-500" },
          { label: "Total Capacity", value: "4,800h", icon: TrendingUp, color: "text-indigo-500" }
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-2.5 rounded-xl bg-slate-50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                <div className="text-xl font-black text-slate-900">{stat.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Departmental Utilization</h3>
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <Input placeholder="Search departments..." className="pl-8 h-8 text-xs border-slate-200" />
              </div>
            </div>
            <div className="space-y-6">
              {departments.map((dept, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{dept.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{dept.staff} Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-[9px] font-bold ${dept.load > 90 ? 'text-rose-600 bg-rose-50' : 'text-slate-600'}`}>
                        {dept.status}
                      </Badge>
                      <span className="text-sm font-black text-slate-900">{dept.load}%</span>
                    </div>
                  </div>
                  <Progress value={dept.load} className={`h-2 ${dept.load > 90 ? '[&>div]:bg-rose-500' : ''}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Overallocated Resources</h3>
            <div className="space-y-4">
              {[
                { name: "Alex Rivera", role: "Sr. Backend", load: "115%", projects: 4 },
                { name: "Priya Shah", role: "Lead Designer", load: "108%", projects: 3 },
                { name: "John Doe", role: "DevOps Eng", load: "102%", projects: 5 }
              ].map((res, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-rose-50/50 border border-rose-100/50">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{res.name}</span>
                    <span className="text-[10px] text-slate-500">{res.role} • {res.projects} Projects</span>
                  </div>
                  <div className="text-xs font-black text-rose-600">{res.load}</div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 text-[10px] font-bold uppercase tracking-widest h-10 border-slate-200 hover:bg-slate-50">
              Redistribute Workload
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
