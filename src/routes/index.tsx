import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutGrid } from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { appConfig } from "@/config/app.config";
import { bootstrapModules } from "@/core/modules/modules.config";
import { moduleRegistry } from "@/core/modules/registry";
import { useRbac } from "@/core/rbac/RbacProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABOS Workspace — Adzdrio Business Operating System" },
      {
        name: "description",
        content:
          "Internal enterprise workspace for Adzdrio India Services: modular operations, people, finance and intelligence applications.",
      },
      { property: "og:title", content: "ABOS Workspace — Adzdrio Business Operating System" },
      {
        property: "og:description",
        content: "Internal enterprise workspace for Adzdrio India Services.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  bootstrapModules();
  const { can, principal } = useRbac();
  const modules = moduleRegistry
    .list()
    .filter((module) => module.id !== "overview" && (!module.permission || can(module.permission)));

  return (
    <>
      <PageHeader
        eyebrow={appConfig.organization}
        title={`Welcome, ${principal?.displayName ?? "user"}`}
        description={`${appConfig.productName} — the modular platform that hosts every Adzdrio business application.`}
      />

      <SectionCard
        title="Registered applications"
        description="Modules resolved from the module registry and filtered by your access role."
        contentClassName="p-0"
      >
        <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const body = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-9 items-center justify-center rounded-md bg-primary-soft text-accent-foreground">
                    <module.icon className="size-4" aria-hidden />
                  </span>
                  <StatusBadge tone={module.status === "available" ? "success" : "warning"}>
                    {module.status}
                  </StatusBadge>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-semibold text-foreground">{module.name}</p>
                  <p className="text-xs text-muted-foreground">{module.description}</p>
                </div>
              </>
            );
            const className =
              "block bg-card p-4 transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

            return module.status === "available" ? (
              <Link key={module.id} to="/settings" className={className}>
                {body}
              </Link>
            ) : (
              <Link
                key={module.id}
                to="/modules/$moduleId"
                params={{ moduleId: module.id }}
                className={className}
              >
                {body}
              </Link>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard
        title="Platform status"
        description="Shell foundation only. Business functionality is added module by module."
      >
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <LayoutGrid className="size-4" aria-hidden />
          <span>
            Version {appConfig.version} · {moduleRegistry.list().length} modules registered ·
            multi-tenancy {appConfig.tenant.enabled ? "enabled" : "prepared"}
          </span>
        </div>
      </SectionCard>
    </>
  );
}
