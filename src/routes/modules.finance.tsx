import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionCard } from '@/components/shared/SectionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  FileText, 
  Receipt, 
  Briefcase, 
  BarChart3, 
  ShieldCheck, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  History, 
  PieChart, 
  Download, 
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataToolbar } from '@/components/shared/DataToolbar';
import { SearchBar } from '@/components/shared/SearchBar';

export const Route = createFileRoute('/modules/finance')({
  component: FinanceWorkspace,
});

function FinanceWorkspace() {
  return (
    <div className="flex flex-col gap-6 p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <PageHeader 
        title="Finance & Accounting" 
        description="Unified enterprise financial operations, treasury, and compliance workspace."
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Reports
            </Button>
            <Button className="shadow-md bg-primary hover:bg-primary/90 text-white font-medium">
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </div>
        }
      />

      {/* Executive KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Revenue", value: "₹42,50,000", change: "+12.5%", trend: "up", icon: TrendingUp },
          { label: "Net Expenses", value: "₹18,20,000", change: "-5.2%", trend: "down", icon: Receipt },
          { label: "Net Profit", value: "₹24,30,000", change: "+18.1%", trend: "up", icon: BarChart3 },
          { label: "Cash on Hand", value: "₹55,60,000", change: "+8.3%", trend: "up", icon: CreditCard },
        ].map((stat, i) => (
          <Card key={i} className="p-5 border-none shadow-card hover:shadow-elevated transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-primary/5 transition-colors">
                <stat.icon className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
              </div>
              <Badge 
                variant={stat.trend === "up" ? "outline" : "destructive"} 
                className={`flex gap-1 items-center px-2 py-0.5 text-[11px] font-bold ${stat.trend === 'up' ? 'border-emerald-100 text-emerald-600 bg-emerald-50/50' : ''}`}
              >
                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium text-slate-500 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 border-none shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-50">
            <CardTitle className="text-lg font-bold text-slate-800">Financial Performance</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs font-medium">Monthly</Button>
              <Button variant="ghost" size="sm" className="text-xs font-medium text-slate-400">Quarterly</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] flex items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <BarChart3 className="w-8 h-8 opacity-20" />
                <span className="text-sm font-medium">Interactive Chart Engine</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-card">
          <CardHeader className="pb-2 border-b border-slate-50">
            <CardTitle className="text-lg font-bold text-slate-800">Health Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-500">GST Summary</span>
                <span className="text-slate-900">₹4,20,500</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-500">Receivables</span>
                <span className="text-slate-900">₹12,80,000</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-500">Payables</span>
                <span className="text-slate-900">₹8,40,000</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '30%' }} />
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Health Score</div>
                <div className="text-xl font-bold text-emerald-600">A+ / Excellent</div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                94
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList className="bg-slate-100/80 backdrop-blur-md p-1 rounded-xl border border-white/50 w-fit">
          <TabsTrigger value="invoices" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Invoices</TabsTrigger>
          <TabsTrigger value="expenses" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Expenses</TabsTrigger>
          <TabsTrigger value="payments" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Payments</TabsTrigger>
          <TabsTrigger value="accounts" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Accounts</TabsTrigger>
          <TabsTrigger value="reports" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Reports</TabsTrigger>
          <TabsTrigger value="tax" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Taxation</TabsTrigger>
          <TabsTrigger value="audit" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard 
            title="Invoice Directory" 
            description="Enterprise billing management, PDF generation, and automated collections tracking."
          >
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 max-w-sm">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search invoices, clients..." className="pl-10 h-10 border-slate-200 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm" className="h-10">
                    Status
                  </Button>
                </div>
              </div>
              <div className="h-[400px] flex items-center justify-center text-slate-400 bg-slate-50/30 border-2 border-dashed border-slate-100 rounded-2xl">
                <div className="flex flex-col items-center gap-3">
                  <FileText className="w-12 h-12 opacity-10" />
                  <p className="text-sm font-medium">Ready for Invoice Data Stream</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="expenses" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard 
            title="Expense Management" 
            description="Manage corporate spend, employee reimbursements, and receipt digitization."
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="md:col-span-2 h-[400px] flex items-center justify-center text-slate-400 bg-slate-50/30 border-2 border-dashed border-slate-100 rounded-2xl">
                Approval Workflow UI
              </div>
              <div className="space-y-4">
                <Card className="border-none shadow-sm bg-slate-50/50 p-4">
                  <h4 className="text-sm font-bold text-slate-700 mb-4">Pending Approvals</h4>
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Receipt className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-800">Travel Expense</div>
                            <div className="text-[10px] text-slate-500">Rajesh Kumar • Marketing</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-900">₹4,200</div>
                          <div className="text-[9px] text-primary hover:underline cursor-pointer font-bold">Review</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="payments" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard 
            title="Payment Hub" 
            description="Real-time transaction monitoring for all incoming and outgoing capital flows."
          >
            <div className="h-[400px] flex items-center justify-center text-slate-400 bg-slate-50/30 border-2 border-dashed border-slate-100 rounded-2xl mt-4">
              Transaction History Table
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="accounts" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard 
            title="Chart of Accounts" 
            description="Structured general ledger mapping all enterprise assets, liabilities, and equity."
          >
            <div className="h-[400px] flex items-center justify-center text-slate-400 bg-slate-50/30 border-2 border-dashed border-slate-100 rounded-2xl mt-4">
              Ledger Hierarchy Tree
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="reports" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Statement Generator" description="Generate P&L, Balance Sheets, and Cash Flow statements.">
               <div className="space-y-4 mt-4">
                 {[
                   { name: "Profit & Loss Statement", type: "Standard" },
                   { name: "Balance Sheet", type: "Standard" },
                   { name: "Cash Flow Statement", type: "Standard" },
                   { name: "Trial Balance", type: "Accounting" }
                 ].map((report, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                     <div className="flex items-center gap-3">
                       <BarChart3 className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                       <div>
                         <div className="text-sm font-bold text-slate-800">{report.name}</div>
                         <div className="text-[10px] text-slate-500 uppercase tracking-widest">{report.type}</div>
                       </div>
                     </div>
                     <Download className="w-4 h-4 text-slate-400 hover:text-primary" />
                   </div>
                 ))}
               </div>
            </SectionCard>
            <SectionCard title="Sales Intelligence" description="Revenue analytics by region, product, and client.">
               <div className="h-[250px] flex items-center justify-center text-slate-400">
                 <PieChart className="w-12 h-12 opacity-10" />
               </div>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="tax" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard 
            title="Taxation & Compliance" 
            description="Manage GST, TDS, and statutory tax filing requirements."
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              {['GSTR-1', 'GSTR-3B', 'TDS Summary', 'Income Tax'].map(tax => (
                <Card key={tax} className="p-4 border-none shadow-sm bg-slate-50/50">
                  <div className="text-xs font-bold text-slate-500 mb-2">{tax} Status</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold">Compliant</span>
                  </div>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-4 text-primary text-xs font-bold underline">Download Forms</Button>
                </Card>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="audit" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard 
            title="Financial Audit Trail" 
            description="Immutable log of all financial activities, approvals, and system changes."
          >
            <div className="space-y-4 mt-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex gap-4 p-4 border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-slate-500" />
                    </div>
                    {i < 5 && <div className="w-px h-full bg-slate-100" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Invoice #INV-2024-00{i} Modified</div>
                    <div className="text-xs text-slate-500 mb-2">Aug 07, 2026 • 15:02 UTC</div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-200" />
                      <span className="text-[11px] font-medium text-slate-600">Admin User • Updated status to 'Sent'</span>
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
