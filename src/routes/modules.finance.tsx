import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionCard } from '@/components/shared/SectionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, FileText, Receipt, Briefcase, BarChart3, ShieldCheck } from 'lucide-react';

export const Route = createFileRoute('/modules/finance')({
  component: FinanceWorkspace,
});

function FinanceWorkspace() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <PageHeader 
        title="Finance & Accounting" 
        description="Enterprise financial operations, billing, and reporting cockpit."
        action={
          <div className="flex gap-2">
            <Button variant="outline">Export Reports</Button>
            <Button>Create Invoice</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Revenue", value: "₹42,50,000", change: "+12.5%", trend: "up" },
          { label: "Expenses", value: "₹18,20,000", change: "-5.2%", trend: "down" },
          { label: "Profit", value: "₹24,30,000", change: "+18.1%", trend: "up" },
          { label: "Cash Flow", value: "₹55,60,000", change: "+8.3%", trend: "up" },
        ].map((stat, i) => (
          <Card key={i} className="p-4 shadow-card hover:shadow-elevated transition-shadow duration-200">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="flex justify-between items-end mt-2">
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <Badge variant={stat.trend === "up" ? "default" : "destructive"} className="flex gap-1 items-center">
                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList className="bg-slate-100 p-1 rounded-lg">
          <TabsTrigger value="invoices" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Invoices</TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Expenses</TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Payments</TabsTrigger>
          <TabsTrigger value="accounts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Accounts</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <SectionCard title="Invoice Directory" description="Manage all client billings and status tracking.">
            <div className="h-64 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
              [Invoice Data Table]
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <SectionCard title="Expense Management" description="Track category-based spend and employee reimbursements.">
            <div className="h-64 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
              [Expense Approval Workflow]
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <SectionCard title="Payment Hub" description="Overview of all incoming and outgoing financial transactions.">
            <div className="h-64 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
              [Payment Transaction Log]
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <SectionCard title="Chart of Accounts" description="Categorized financial ledger overview.">
            <div className="h-64 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
              [Ledger Hierarchy]
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionCard title="Profit & Loss" description="Current financial performance summary.">
              <div className="h-32 flex items-center justify-center text-slate-400">P&L Preview</div>
            </SectionCard>
            <SectionCard title="GST Report" description="Tax filing and compliance summary.">
              <div className="h-32 flex items-center justify-center text-slate-400">GST Preview</div>
            </SectionCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
