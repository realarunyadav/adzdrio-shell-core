import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";


import { appConfig } from "@/config/app.config";
import { moduleRegistry } from "@/core/modules/registry";
import { useRbac } from "@/core/rbac/RbacProvider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";


/**
 * Navigation is rendered entirely from the module registry and filtered by
 * RBAC. The shell never references a module directly.
 */
export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { can } = useRbac();
  const pathname = useRouterState({ select: (router) => router.location.pathname });

  const tree = moduleRegistry.navigationTree((permission) =>
    permission ? can(permission) : true,
  );

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-1.5 py-1.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
            A
          </span>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-sidebar-accent-foreground">
                {appConfig.productShortName}
              </p>
              <p className="truncate text-[11px] text-sidebar-foreground/70">Adzdrio India</p>
            </div>
          ) : null}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {tree.map(({ group, modules }) => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.16em] text-sidebar-foreground/50">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {modules.map((module) => {
                  const planned = module.status !== "available";
                  const target = planned ? `/modules/${module.id}` : module.basePath;
                  const label = (
                    <>
                      <module.icon className="size-4 shrink-0" aria-hidden />
                      {!collapsed ? (
                        <span className="flex flex-1 items-center justify-between gap-2">
                          <span className="truncate">{module.name}</span>
                          {planned ? (
                            <span
                              className={cn(
                                "rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider",
                                "bg-sidebar-accent text-sidebar-foreground/70",
                              )}
                            >
                              Soon
                            </span>
                          ) : null}
                        </span>
                      ) : null}
                    </>
                  );
                  return (
                    <SidebarMenuItem key={module.id}>
                      <SidebarMenuButton asChild isActive={isActive(target)} tooltip={module.name}>
                        {planned ? (
                          <Link
                            to="/modules/$moduleId"
                            params={{ moduleId: module.id }}
                            className="flex items-center gap-2"
                          >
                            {label}
                          </Link>
                        ) : (
                          <Link
                            to={module.basePath === "/settings" ? "/settings" : "/"}
                            className="flex items-center gap-2"
                          >
                            {label}
                          </Link>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed ? (
          <p className="px-2 py-1 text-[11px] text-sidebar-foreground/50">
            v{appConfig.version} · Internal
          </p>
        ) : null}
      </SidebarFooter>
    </Sidebar>
  );
}