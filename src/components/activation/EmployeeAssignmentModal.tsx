import * as React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/sheet"; // Using Sheet or Dialog? The prompt says "assignment modal, selector, dropdown"
// Actually I'll use standard Dialog for a modal feel
import { 
  Dialog as ShadcnDialog, 
  DialogContent as ShadcnDialogContent, 
  DialogHeader as ShadcnDialogHeader, 
  DialogTitle as ShadcnDialogTitle,
  DialogFooter as ShadcnDialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, User, Users, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { demoTeamPerformance } from "@/lib/mock/workspace.demo";

interface EmployeeAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (employee: any) => void;
  suggestedEmployeeId?: string;
}

export function EmployeeAssignmentModal({ 
  open, 
  onOpenChange, 
  onConfirm,
  suggestedEmployeeId 
}: EmployeeAssignmentModalProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedEmployee, setSelectedEmployee] = React.useState<any>(null);

  // Filter for provisioning-like employees (using demoTeamPerformance as base)
  const employees = demoTeamPerformance.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.role.toLowerCase().includes(searchQuery.toLowerCase())
  ).map(e => ({
    ...e,
    // Add workload/capacity mock data for this view
    workload: e.leads, // Using leads as proxy for workload
    capacity: 20,
    isSuggested: e.id.toString() === suggestedEmployeeId
  }));

  React.useEffect(() => {
    if (open) {
      const suggested = employees.find(e => e.isSuggested);
      if (suggested) setSelectedEmployee(suggested);
    }
  }, [open, suggestedEmployeeId]);

  const handleConfirm = () => {
    if (selectedEmployee) {
      onConfirm(selectedEmployee);
      onOpenChange(false);
    }
  };

  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange}>
      <ShadcnDialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border bg-background">
        <ShadcnDialogHeader className="p-6 bg-muted/5 border-b border-border/40">
          <ShadcnDialogTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
            <Users className="size-5 text-primary" />
            Assign Provisioning Employee
          </ShadcnDialogTitle>
        </ShadcnDialogHeader>

        <div className="p-4 border-b border-border/40">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or role..." 
              className="pl-10 h-10 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-4 space-y-2">
          {employees.map((employee) => {
            const workloadPercent = (employee.workload / employee.capacity) * 100;
            const isSelected = selectedEmployee?.id === employee.id;
            
            return (
              <div 
                key={employee.id}
                onClick={() => setSelectedEmployee(employee)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                    : "border-border hover:border-primary/40 hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "size-10 rounded-full flex items-center justify-center font-black text-xs uppercase transition-colors",
                    isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  )}>
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-black uppercase leading-none">{employee.name}</p>
                      {employee.isSuggested && (
                        <Badge className="text-[8px] font-black uppercase h-4 bg-purple-500 hover:bg-purple-500 border-none">Suggested</Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">{employee.role}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black uppercase text-muted-foreground mb-1">Workload</span>
                    <div className="w-24 bg-muted rounded-full h-1 overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all",
                          workloadPercent > 80 ? "bg-red-500" : workloadPercent > 50 ? "bg-amber-500" : "bg-green-500"
                        )} 
                        style={{ width: `${workloadPercent}%` }}
                      />
                    </div>
                    <span className="text-[8px] font-bold text-muted-foreground mt-1 uppercase">
                      {employee.workload}/{employee.capacity} Active
                    </span>
                  </div>
                  {isSelected && <Check className="size-4 text-primary" />}
                </div>
              </div>
            );
          })}
        </div>

        <ShadcnDialogFooter className="p-6 bg-muted/5 border-t border-border/40 gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="font-black uppercase text-[10px] tracking-widest h-10 px-6"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!selectedEmployee}
            className="bg-primary hover:bg-primary/90 font-black uppercase text-[10px] tracking-widest h-10 px-6"
          >
            Confirm Assignment
          </Button>
        </ShadcnDialogFooter>
      </ShadcnDialogContent>
    </ShadcnDialog>
  );
}