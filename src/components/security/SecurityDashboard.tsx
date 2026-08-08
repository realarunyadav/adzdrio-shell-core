import { 
  ShieldCheck, 
  History, 
  ShieldAlert, 
  Lock, 
  Users, 
  Settings,
  Activity,
  AlertTriangle
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export function SecurityDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform Security"
        title="Security & Identity Center"
        description="Monitor system-wide authentication, authorization, and audit integrity."
        actions={
          <Button variant="outline" size="sm">
            <History className="mr-2 size-3.5" />
            View Audit Log
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard title="Failed Logins (24h)" value="18" icon={AlertTriangle} />
        <StatsCard title="Locked Accounts" value="2" icon={Lock} />
        <StatsCard title="Active Sessions" value="142" icon={Users} />
        <StatsCard title="Security Events" value="1,244" icon={Activity} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="System Alerts" contentClassName="p-0">
          <Table>
            <TableBody>
              {[
                { event: "Failed Password Attempt", actor: "admin_user", time: "2m ago", severity: "Warning" },
                { event: "Account Lockout: r.kumar", actor: "System", time: "15m ago", severity: "Danger" },
                { event: "Role Modification: Admin", actor: "a.jain", time: "1h ago", severity: "Info" },
              ].map((alert, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-xs">{alert.event}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{alert.actor}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge tone={alert.severity === 'Danger' ? 'danger' : alert.severity === 'Warning' ? 'warning' : 'neutral'}>
                      {alert.severity}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard title="Configuration Policies">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Password rotation enabled</span>
              <StatusBadge tone="success">Enabled</StatusBadge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">MFA enforced for Admin</span>
              <StatusBadge tone="success">Enabled</StatusBadge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Session inactivity timeout</span>
              <span className="text-xs font-bold text-muted-foreground">30 Mins</span>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon }: any) {
  return (
    <Card className="surface-sunken">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
        </div>
        <div className="size-10 rounded-lg bg-background border flex items-center justify-center">
          <Icon className="size-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
