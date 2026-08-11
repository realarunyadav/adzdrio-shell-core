import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { appConfig } from "@/config/app.config";
import { bootstrapModules } from "@/core/modules/modules.config";
import { moduleRegistry } from "@/core/modules/registry";
import { roleDefinitions } from "@/core/rbac/roles.config";
import { useRbac } from "@/core/rbac/RbacProvider";
import { useTheme, type ThemeMode } from "@/core/theme/ThemeProvider";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Platform settings — ABOS" },
      {
        name: "description",
        content:
          "Configure the ABOS shell: theme mode, access role simulation and registered modules.",
      },
      { property: "og:title", content: "Platform settings — ABOS" },
      {
        property: "og:description",
        content: "Configure the ABOS shell: theme, roles and registered modules.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  bootstrapModules();
  const { roles, principal } = useRbac();
  const permissions = principal?.permissions ?? [];
  const { mode, setMode } = useTheme();
  const registered = moduleRegistry.list();

  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Settings"
        description="Shell-level configuration. Business configuration arrives with each module."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Appearance"
          description="Theme preference for this workstation."
        >
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="theme-mode">Theme mode</Label>
              <Select value={mode} onValueChange={(value) => setMode(value as ThemeMode)}>
                <SelectTrigger id="theme-mode" className="w-full sm:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">Match system</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
              <div>
                <p className="text-sm font-medium">Compact navigation</p>
                <p className="text-xs text-muted-foreground">
                  Collapse the sidebar to icons by default.
                </p>
              </div>
              <Switch disabled aria-label="Compact navigation" />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Access Identity"
          description="Your current enterprise identity and permissions from the backend."
        >
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Active roles</Label>
              <div className="flex flex-wrap gap-2">
                {roles.map(role => (
                  <Badge key={role} variant="secondary" className="font-bold">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {permissions.map((permission: string) => (
                <code
                  key={permission}
                  className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground"
                >
                  {permission}
                </code>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          className="lg:col-span-2"
          title="Registered modules"
          description={`${registered.length} modules registered in ${appConfig.productShortName}.`}
          contentClassName="p-0"
        >
          <ul className="divide-y divide-border">
            {registered.map((module) => (
              <li
                key={module.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
              >
                <div className="flex items-center gap-3">
                  <module.icon className="size-4 text-muted-foreground" aria-hidden />
                  <div>
                    <p className="text-sm font-medium text-foreground">{module.name}</p>
                    <p className="text-xs text-muted-foreground">{module.description}</p>
                  </div>
                </div>
                <StatusBadge tone={module.status === "available" ? "success" : "warning"}>
                  {module.status}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </>
  );
}