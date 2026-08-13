import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Filter, Plus, Eye, Receipt, FileText, Mail, Download, ShieldCheck, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoPayroll } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/finance/payroll")({
  component: PayrollPage,
});

function PayrollPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Payroll Processing"
        description="Manage employee compensation, incentives and salary disbursements."
        actions={<Button size="sm" className="bg-orange-600 hover:bg-orange-700 font-bold"><Plus className="mr-2 h-4 w-4" /> Process Payroll</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest">Pay Period</p>
            <p className="text-xl font-black mt-1">August 2026</p>
         </div>
         <div className="p-4 rounded-xl border border-border bg-background">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Gross Payroll</p>
            <p className="text-xl font-black mt-1">₹ 1.2M</p>
         </div>
         <div className="p-4 rounded-xl border border-border bg-background">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Incentives</p>
            <p className="text-xl font-black mt-1">₹ 145K</p>
         </div>
         <div className="p-4 rounded-xl border border-border bg-background">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Employees</p>
            <p className="text-xl font-black mt-1">42</p>
         </div>
      </div>

      <SectionCard>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Input placeholder="Search employees..." className="h-9 w-64 text-xs" />
            <Button variant="outline" size="sm" className="h-9"><Filter className="h-3.5 w-3.5 mr-2" /> Filters</Button>
          </div>
          <div className="p-2 px-3 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center gap-2">
            <ShieldCheck className="size-4 text-blue-600" />
            <span className="text-[10px] font-bold text-blue-900 uppercase">HR data sync active</span>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-y border-border/60 bg-muted/20">
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Employee</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Role</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Base Salary</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Incentive</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right text-red-600">Deduc.</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Net Salary</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-center">Status</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {demoPayroll.map((emp) => (
                <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{emp.employeeName}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{emp.employeeId}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{emp.role}</td>
                  <td className="py-4 px-6 text-right text-xs font-medium">₹ {emp.baseSalary.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right text-xs font-bold text-green-600">+₹ {emp.incentive.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right text-xs font-medium text-red-600">-₹ {emp.deductions.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right text-xs font-black">₹ {emp.netSalary.toLocaleString()}</td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={emp.status === 'Paid' ? 'default' : 'secondary'} className="text-[9px] uppercase font-bold">{emp.status}</Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                       <Button variant="ghost" size="sm" title="View Slip"><Receipt className="h-3.5 w-3.5" /></Button>
                       <Button variant="ghost" size="sm" title="Send Slip"><Mail className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}