import * as React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Building2, 
  History, 
  Clock, 
  Smartphone,
  ChevronRight,
  Target,
  Zap
} from "lucide-react";
import { DemoEmployee } from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";

export function EmployeeDetailsDrawer({ 
  employee, 
  open, 
  onOpenChange 
}: { 
  employee: DemoEmployee | null; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  if (!employee) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl border-l border-border/40 glass-surface p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-border/40 bg-accent/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-16 rounded-2xl bg-navy flex items-center justify-center text-navy-foreground text-xl font-black uppercase">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <SheetTitle className="text-lg font-black uppercase tracking-tight">{employee.name}</SheetTitle>
                  <Badge variant="outline" className={cn(
                    "text-[9px] font-black uppercase tracking-tighter h-5",
                    employee.status === 'Active' ? "border-emerald-500/20 text-emerald-600" : "border-amber-500/20 text-amber-600"
                  )}>
                    {employee.status}
                  </Badge>
                </div>
                <SheetDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Employee ID: {employee.code} • {employee.department}
                </SheetDescription>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1 h-9 text-[10px] font-black uppercase tracking-widest bg-primary">
                Edit Profile
              </Button>
              <Button variant="outline" className="flex-1 h-9 text-[10px] font-black uppercase tracking-widest">
                Reset Password
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
            {/* Contact Information */}
            <section className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <Shield className="size-3.5" /> Identity & Contact
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <InfoBlock label="Email Address" value={employee.email} icon={Mail} />
                <InfoBlock label="Phone Number" value={employee.phone} icon={Phone} />
                <InfoBlock label="Primary Role" value={employee.role} icon={Shield} />
                <InfoBlock label="Department" value={employee.department} icon={Building2} />
              </div>
            </section>

            {/* Business Access */}
            <section className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <Building2 className="size-3.5" /> Business Access Scope
              </h4>
              <div className="flex flex-wrap gap-2">
                {employee.businessIds.map(bizId => (
                  <Badge key={bizId} variant="secondary" className="bg-accent/50 text-[9px] font-black uppercase tracking-widest px-3 py-1">
                    {bizId}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Active Session */}
            <section className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <Smartphone className="size-3.5" /> Active Session
              </h4>
              {employee.session ? (
                <div className="rounded-xl border border-border/40 bg-accent/5 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-background border border-border/40 flex items-center justify-center">
                      <Smartphone className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">{employee.session.device}</div>
                      <div className="text-[9px] text-muted-foreground uppercase">{employee.session.ip} • {employee.session.location}</div>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-[9px] font-black uppercase tracking-widest text-red-600 h-8">Logout</Button>
                </div>
              ) : (
                <p className="text-[10px] text-muted-foreground uppercase italic font-medium">No active session detected.</p>
              )}
            </section>

            {/* Recent Activity Logs */}
            <section className="space-y-4 pb-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <History className="size-3.5" /> Recent Platform Activity
              </h4>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-3 relative pb-3 last:pb-0 group">
                    <div className="size-8 rounded-lg bg-accent/30 border border-border/40 flex items-center justify-center shrink-0">
                      <Target className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="text-[11px] font-bold">Modified CRM Field Configuration</div>
                      <div className="text-[9px] text-muted-foreground uppercase">2 hours ago • Admin Studio</div>
                    </div>
                    <ChevronRight className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function InfoBlock({ label, value, icon: Icon }: any) {
  return (
    <div className="space-y-1.5 p-3 rounded-lg bg-accent/5 border border-border/30">
      <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-muted-foreground">
        <Icon className="size-3" /> {label}
      </div>
      <div className="text-xs font-bold truncate">{value}</div>
    </div>
  );
}
