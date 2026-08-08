import { 
  LayoutGrid, 
  Settings, 
  ShieldCheck, 
  Bell, 
  Activity, 
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/SectionCard";

export function AdminStudioHome() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="surface-sunken">
          <CardContent className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Configuration Health</p>
              <Activity className="size-4 text-emerald-500" />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="text-2xl font-bold">98.2%</div>
              <Progress value={98.2} className="h-1.5" />
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="size-3 text-emerald-500" /> Optimized
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-sunken">
          <CardContent className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Modules</p>
              <LayoutGrid className="size-4 text-blue-500" />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div className="text-2xl font-bold">12 / 14</div>
              <p className="text-[10px] text-muted-foreground">2 Modules disabled</p>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-sunken">
          <CardContent className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pending Approvals</p>
              <ShieldCheck className="size-4 text-amber-500" />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div className="text-2xl font-bold">03</div>
              <p className="text-[10px] text-muted-foreground">Requires Super Admin action</p>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-sunken">
          <CardContent className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">System Alerts</p>
              <Bell className="size-4 text-danger" />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div className="text-2xl font-bold">0</div>
              <p className="text-[10px] text-muted-foreground font-medium text-emerald-500">System Healthy</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <SectionCard 
          className="md:col-span-4"
          title="Recent Configuration Changes"
          description="Track recent modifications to the system architecture and business rules."
        >
          <div className="space-y-4">
            {[
              { user: "Super Admin", action: "Updated Sales Stages", module: "CRM", time: "2 hours ago", status: "Success" },
              { user: "System", action: "Auto-backup complete", module: "Platform", time: "4 hours ago", status: "Success" },
              { user: "Admin (Finance)", action: "Modified GSTR-3B Rule", module: "Finance", time: "6 hours ago", status: "Review" },
              { user: "Super Admin", action: "Enabled Inventory Module", module: "Inventory", time: "1 day ago", status: "Success" },
            ].map((change, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                <div className="flex gap-3 items-center">
                  <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                    <Clock className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-none">{change.action}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {change.user} • {change.module}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={change.status === 'Success' ? 'secondary' : 'outline'} className="text-[10px] uppercase font-bold">
                    {change.status}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground mt-1">{change.time}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs" size="sm">
              View Audit Center <ArrowRight className="ml-2 size-3" />
            </Button>
          </div>
        </SectionCard>

        <SectionCard 
          className="md:col-span-3"
          title="Quick Configuration"
          description="Commonly accessed system settings and builders."
        >
          <div className="grid grid-cols-1 gap-2">
            {[
              { label: "Branding & Identity", icon: Settings },
              { label: "User Roles Matrix", icon: ShieldCheck },
              { label: "Notification Rules", icon: Bell },
              { label: "Workflow Designer", icon: Activity },
            ].map((action, i) => (
              <Button key={i} variant="outline" className="justify-start h-auto py-3 px-4">
                <action.icon className="mr-3 size-4 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-bold">{action.label}</p>
                  <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Manage system-wide {action.label.toLowerCase()}</p>
                </div>
              </Button>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="rounded-lg border border-danger/20 bg-danger/5 p-4 flex items-start gap-3">
        <AlertCircle className="size-5 text-danger shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-danger">Critical System Security</h4>
          <p className="text-xs text-danger/80 mt-1 max-w-2xl">
            You are currently in the Admin Studio with Super Admin privileges. Any configuration changes made here will impact all active enterprise users immediately. Ensure you test complex workflows before deployment.
          </p>
        </div>
      </div>
    </div>
  );
}
