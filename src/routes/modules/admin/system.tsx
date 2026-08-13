import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Globe, Bell, ShieldCheck, Mail, Database, Terminal, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/modules/admin/system")({
  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="System Configuration"
        description="Global environment variables, localization, and enterprise-wide technical settings."
      />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="glass-surface border-border/40 xl:col-span-2">
          <CardContent className="p-8 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-border/40 pb-2">
                <Globe className="size-4 text-primary" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Localization & Regional</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SystemField label="Default Timezone" value="Asia/Kolkata (IST)" />
                <SystemField label="Primary Currency" value="Indian Rupee (INR / ₹)" />
                <SystemField label="System Language" value="English (Global)" />
                <SystemField label="Date Format" value="DD-MM-YYYY" />
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-border/40 pb-2">
                <ShieldCheck className="size-4 text-primary" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Security Defaults</h3>
              </div>
              <div className="space-y-6">
                <ToggleSetting 
                  label="Enforce Multi-Factor Authentication (MFA)" 
                  description="Require all administrative users to use MFA for system access."
                  checked={true}
                />
                <ToggleSetting 
                  label="IP Whitelisting" 
                  description="Restrict Admin Studio access to authorized corporate IP ranges."
                  checked={true}
                />
                <ToggleSetting 
                  label="Session Termination on Idle" 
                  description="Automatically sign out users after 30 minutes of inactivity."
                  checked={true}
                />
              </div>
            </section>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass-surface border-border/40 bg-navy/5">
            <CardHeader className="p-6 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-muted-foreground" />
                <h3 className="text-[10px] font-black uppercase tracking-widest">Environment Info</h3>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <EnvRow label="Version" value="v1.2.4-stable" />
              <EnvRow label="Build ID" value="ABOS-2026-08-14-X" />
              <EnvRow label="Region" value="aws-ap-south-1" />
              <div className="pt-4 border-t border-border/40">
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="size-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">All Services Operational</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-surface border-border/40">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Global Control</h3>
              <Button className="w-full h-10 text-[10px] font-black uppercase tracking-widest bg-red-600 hover:bg-red-700">Enter Maintenance Mode</Button>
              <Button variant="outline" className="w-full h-10 text-[10px] font-black uppercase tracking-widest">Restart All Nodes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
});

function SystemField({ label, value }: any) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{label}</Label>
      <div className="h-10 px-3 rounded-lg border border-border/50 bg-accent/20 flex items-center text-xs font-bold">
        {value}
      </div>
    </div>
  );
}

function ToggleSetting({ label, description, checked }: any) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-0.5">
        <Label className="text-xs font-bold">{label}</Label>
        <p className="text-[10px] text-muted-foreground font-medium">{description}</p>
      </div>
      <Switch checked={checked} />
    </div>
  );
}

function EnvRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center text-[10px]">
      <span className="text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
      <span className="font-mono font-bold">{value}</span>
    </div>
  );
}

import { CardHeader } from "@/components/ui/card";
