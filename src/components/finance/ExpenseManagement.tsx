import { Receipt, Search, Filter, Plus, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SectionCard } from '@/components/shared/SectionCard';
import { Card } from '@/components/ui/card';

const expenses = [
  { id: "EXP-2026-042", category: "Software", amount: "₹12,500", vendor: "AWS", employee: "Rajesh K.", status: "Approved", date: "Aug 12, 2026" },
  { id: "EXP-2026-043", category: "Travel", amount: "₹4,200", vendor: "Uber", employee: "Priya S.", status: "Pending", date: "Aug 14, 2026" },
  { id: "EXP-2026-044", category: "Marketing", amount: "₹25,000", vendor: "Google Ads", employee: "Amit V.", status: "Review", date: "Aug 15, 2026" },
];

export function ExpenseManagement() {
  return (
    <SectionCard 
      title="Expense Operations" 
      description="Manage corporate spend, employee reimbursements, and multi-level approval workflows."
    >
      <div className="space-y-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-none bg-muted/30 shadow-none">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Pending Approval</div>
            <div className="text-xl font-black">₹48,200</div>
          </Card>
          <Card className="p-4 border-none bg-muted/30 shadow-none">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Approved (MTD)</div>
            <div className="text-xl font-black">₹2,15,400</div>
          </Card>
          <Card className="p-4 border-none bg-muted/30 shadow-none">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Rejected (MTD)</div>
            <div className="text-xl font-black">₹8,500</div>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search expenses, vendors..." className="pl-10 h-10 border-border/50 focus:ring-primary/20" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="w-3.5 h-3.5 mr-2" />
              Categories
            </Button>
            <Button size="sm" className="h-9">
              <Plus className="w-3.5 h-3.5 mr-2" />
              Log Expense
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto border border-border/40 rounded-xl">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Category</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Amount</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Vendor / Employee</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((exp) => (
                <TableRow key={exp.id} className="hover:bg-muted/5">
                  <TableCell className="font-bold text-xs">{exp.id}</TableCell>
                  <TableCell className="text-xs font-medium">{exp.category}</TableCell>
                  <TableCell className="font-black text-xs">{exp.amount}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">{exp.vendor}</span>
                      <span className="text-[10px] text-muted-foreground">{exp.employee}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={exp.status === 'Approved' ? 'success' : exp.status === 'Pending' ? 'warning' : 'info'}>{exp.status}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" title="View Receipt">
                        <Receipt className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" title="Approval History">
                        <Clock className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </SectionCard>
  );
}
