import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon, 
  ShieldCheck, 
  Clock, 
  UserCheck,
  Filter,
  Download
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

export const Route = createFileRoute("/app/support/reports")({
  component: SupportReportsPage,
});

function SupportReportsPage() {
  const slaTrendData = [
    { name: 'Mon', met: 98, breached: 2 },
    { name: 'Tue', met: 95, breached: 5 },
    { name: 'Wed', met: 99, breached: 1 },
    { name: 'Thu', met: 92, breached: 8 },
    { name: 'Fri', met: 96, breached: 4 },
    { name: 'Sat', met: 100, breached: 0 },
    { name: 'Sun', met: 100, breached: 0 },
  ];

  const categoryData = [
    { name: 'Billing', value: 40, color: 'var(--color-primary)' },
    { name: 'Technical', value: 30, color: '#22c55e' },
    { name: 'Account', value: 20, color: '#f59e0b' },
    { name: 'Other', value: 10, color: '#94a3b8' },
  ];

  const agentCsatData = [
    { name: 'Ankit', csat: 4.8 },
    { name: 'Sonia', csat: 4.9 },
    { name: 'Rahul', csat: 4.7 },
    { name: 'Vikram', csat: 4.5 },
    { name: 'Priya', csat: 4.6 },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Support Module"
        title="Support Analytics & Reports"
        description="Enterprise-grade performance metrics, SLA compliance and customer satisfaction intelligence."
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Custom Range
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardKpiCard title="Overall CSAT" value="4.78/5" trend="+2.4%" icon={UserCheck} />
        <DashboardKpiCard title="Avg Resolution" value="3.8h" trend="-12.1%" icon={Clock} />
        <DashboardKpiCard title="SLA Compliance" value="96.2%" trend="+0.5%" icon={ShieldCheck} />
        <DashboardKpiCard title="First Response" value="18m" trend="-4.2%" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <SectionCard title="SLA Compliance Trend" description="Comparison of tickets meeting vs breaching service levels.">
             <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slaTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--color-muted-foreground)' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--color-muted-foreground)' }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', paddingTop: '20px' }} />
                  <Bar dataKey="met" stackId="a" fill="#22c55e" name="SLA Met (%)" barSize={40} />
                  <Bar dataKey="breached" stackId="a" fill="#ef4444" name="SLA Breached (%)" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <SectionCard title="Tickets by Category" description="Volume distribution across support categories.">
             <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12">
          <SectionCard title="Agent CSAT Performance" description="Customer satisfaction ratings per support agent.">
             <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentCsatData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" opacity={0.5} />
                  <XAxis 
                    type="number" 
                    domain={[0, 5]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--color-muted-foreground)' }} 
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--color-muted-foreground)' }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}
                  />
                  <Bar dataKey="csat" fill="var(--color-primary)" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
