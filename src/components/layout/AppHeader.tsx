import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Command as CommandIcon, Moon, Search, Sun, Zap } from "lucide-react";

import { appConfig } from "@/config/app.config";
import { moduleRegistry } from "@/core/modules/registry";
import { useRbac } from "@/core/rbac/RbacProvider";
import { useTheme } from "@/core/theme/ThemeProvider";
import { roleMap } from "@/core/rbac/roles.config";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SearchBar } from "@/components/shared/SearchBar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function useBreadcrumbs() {
  const pathname = useRouterState({ select: (router) => router.location.pathname });
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const module = moduleRegistry.get(segment);
    return {
      label: module?.name ?? segment.replace(/-/g, " "),
      isLast: index === segments.length - 1,
    };
  });
}

export function AppHeader() {
  const { principal, roles } = useRbac();
  const { resolvedMode, toggle, allowUserToggle } = useTheme();
  const crumbs = useBreadcrumbs();
  const primaryRole = roles[0] ? roleMap[roles[0]]?.name : undefined;

  const initials = (principal?.displayName ?? "AB")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card px-3 sm:px-4">
      <SidebarTrigger className="text-muted-foreground" />
      <Separator orientation="vertical" className="hidden h-5 sm:block" />

      {appConfig.shell.showBreadcrumbs ? (
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">{appConfig.productShortName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5 sm:gap-2.5">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {crumb.isLast ? (
                    <BreadcrumbPage className="capitalize">{crumb.label}</BreadcrumbPage>
                  ) : (
                    <span className="capitalize text-muted-foreground">{crumb.label}</span>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      ) : null}

      <div className="ml-auto flex items-center gap-2">
        {appConfig.shell.showGlobalSearch ? (
          <div className="relative hidden lg:block">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search ABOS"
              aria-label="Search"
              className="h-9 w-64 pl-8"
            />
          </div>
        ) : null}

        {allowUserToggle ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={resolvedMode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {resolvedMode === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        ) : null}

        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>

        <Separator orientation="vertical" className="hidden h-6 sm:block" />

        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback className="bg-navy text-xs font-semibold text-navy-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left leading-tight sm:block">
            <p className="text-xs font-medium text-foreground">{principal?.displayName}</p>
            <p className="text-[11px] text-muted-foreground">{primaryRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}