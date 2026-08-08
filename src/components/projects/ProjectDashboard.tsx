import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Briefcase, AlertOctagon, TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react';

export const ProjectDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      { title: "Portfolio Health", val: "88%", color: "text-emerald-500" },
      { title: "Active Projects", val: "24" },
      { title: "Delayed", val: "3", color: "text-destructive" },
      { title: "Budget Utilization", val: "62%" }
    ].map((stat, i) => (
      <Card key={i}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-bold text-slate-400">{stat.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stat.val}</div>
        </CardContent>
      </Card>
    ))}
  </div>
);
