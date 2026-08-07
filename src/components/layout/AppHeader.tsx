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
import { GlobalNotificationCenter } from "@/components/shared/GlobalNotificationCenter";

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
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const primaryRole = roles[0] ? roleMap[roles[0]]?.name : undefined;

  const initials = (principal?.displayName ?? "AB")
    .split(" ")
    .map((part: string) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/50 glass-effect px-4 sm:px-6 premium-transition">
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
          <div className="hidden lg:block">
            <SearchBar 
              placeholder="Search ABOS (⌘K)" 
              className="h-10 w-72 glass-surface"
            />
          </div>
        ) : null}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Quick Actions">
                <Zap className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quick Actions</TooltipContent>
          </Tooltip>
        </TooltipProvider>


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

        <Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => setNotificationsOpen(true)}>
          <Bell className="size-4" />
        </Button>

        <GlobalNotificationCenter open={notificationsOpen} onOpenChange={setNotificationsOpen} />

        <Separator orientation="vertical" className="hidden h-6 sm:block" />

        <button className="flex items-center gap-2 p-1 rounded-full hover:bg-accent/50 premium-transition border border-transparent hover:border-border/50 group">
          <Avatar className="size-8 border border-border/40 shadow-sm">
            <AvatarFallback className="bg-navy text-[10px] font-bold text-navy-foreground group-hover:bg-primary group-hover:text-primary-foreground premium-transition">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left leading-tight sm:block pr-2">
            <p className="text-xs font-bold text-foreground group-hover:text-primary premium-transition">{principal?.displayName}</p>
            <p className="text-[10px] font-medium text-muted-foreground/70">{primaryRole}</p>
          </div>
        </button>
      </div>
    </header>
  );
}