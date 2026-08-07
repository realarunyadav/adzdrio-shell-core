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
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/50 bg-sidebar/95 backdrop-blur-xl">
      <SidebarHeader className="border-b border-sidebar-border/30 h-16 flex items-center">
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

      <SidebarContent className="scrollbar-thin">
        {tree.map(({ group, modules }) => (
          <SidebarGroup key={group.id} className="py-2">
            <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.16em] text-sidebar-foreground/40 font-bold px-4">
              {group.label}

            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {modules.map((module) => {
                  const planned = module.status !== "available";
                  const target = planned ? `/modules/${module.id}` : module.basePath;
                  const isActiveModule = isActive(target);
                  
                  return (
                    <Collapsible
                      key={module.id}
                      asChild
                      defaultOpen={isActiveModule}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton 
                            asChild 
                            isActive={isActiveModule} 
                            tooltip={module.name}
                            className={cn(
                              "premium-transition hover:bg-sidebar-accent/50",
                              isActiveModule && "bg-sidebar-primary shadow-lg shadow-sidebar-primary/20 text-sidebar-primary-foreground"
                            )}
                          >
                            {planned ? (
                              <Link
                                to="/modules/$moduleId"
                                params={{ moduleId: module.id }}
                                className="flex items-center gap-2"
                              >
                                <module.icon className="size-4 shrink-0" aria-hidden />
                                {!collapsed ? (
                                  <span className="flex flex-1 items-center justify-between gap-2">
                                    <span className="truncate">{module.name}</span>
                                    <span className="rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-sidebar-accent text-sidebar-foreground/70">
                                      Soon
                                    </span>
                                  </span>
                                ) : null}
                              </Link>
                            ) : (
                              <Link
                                to={module.basePath as any}
                                className="flex items-center gap-2"
                              >
                                <module.icon className="size-4 shrink-0" aria-hidden />
                                {!collapsed ? (
                                  <span className="flex flex-1 items-center justify-between gap-2">
                                    <span className="truncate">{module.name}</span>
                                    <ChevronRight className="ml-auto size-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                  </span>
                                ) : null}
                              </Link>
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        {!collapsed && !planned && (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                  <span className="text-[11px] text-sidebar-foreground/60 px-2 py-1 italic">
                                    No sub-modules
                                  </span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        )}
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                })}
              </SidebarMenu>

            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4 bg-sidebar-accent/10">
        {!collapsed ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-sidebar-foreground/40 font-bold uppercase">System Status</span>
              <span className="size-1.5 rounded-full bg-success animate-pulse" />
            </div>
            <p className="text-[10px] text-sidebar-foreground/50 leading-relaxed">
              v{appConfig.version} · Stable Release<br />
              Secure Enterprise Environment
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="size-2 rounded-full bg-success" />
          </div>
        )}
      </SidebarFooter>

    </Sidebar>
  );
}