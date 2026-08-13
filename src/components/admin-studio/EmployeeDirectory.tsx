import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoEmployees, DemoEmployee } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { EmployeeDetailsDrawer } from "./drawers/EmployeeDetailsDrawer";

export function EmployeeDirectory() {
  const [selectedEmployee, setSelectedEmployee] = React.useState<DemoEmployee | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleRowClick = (emp: DemoEmployee) => {
    setSelectedEmployee(emp);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-4">
      <EmployeeDetailsDrawer 
        employee={selectedEmployee} 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />
      <div className="rounded-xl border border-border/40 bg-accent/10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Code</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Name</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Role</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Department</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoEmployees.map((emp) => (
              <TableRow 
                key={emp.id} 
                className="border-border/40 hover:bg-accent/30 transition-colors cursor-pointer"
                onClick={() => handleRowClick(emp)}
              >
                <TableCell className="text-xs font-mono font-bold text-muted-foreground">{emp.code}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8 rounded-lg">
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xs font-bold">{emp.name}</div>
                      <div className="text-[9px] text-muted-foreground">{emp.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-medium">{emp.role}</TableCell>
                <TableCell className="text-xs">{emp.department}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(
                    "text-[9px] font-black uppercase tracking-tighter h-5",
                    emp.status === 'Active' ? "border-emerald-500/20 text-emerald-600" : "border-amber-500/20 text-amber-600"
                  )}>
                    {emp.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-right text-muted-foreground">
                  {new Date(emp.lastActive).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
