import * as React from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Bell, Moon, Sun, ShieldCheck, LifeBuoy } from "lucide-react";
import { BusinessSwitcher } from "@/components/workspace/BusinessSwitcher";

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
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { GlobalNotificationCenter } from "@/components/shared/GlobalNotificationCenter";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings as SettingsIcon } from "lucide-react";
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
  const { logout } = useAuth();
  const navigate = useNavigate();
  const primaryRole = roles[0] ? roleMap[roles[0]]?.name : undefined;

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/auth" });
  };

  const initials = (principal?.displayName ?? "AB")
    .split(" ")
    .map((part: string) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/50 glass-effect px-3 sm:px-5 lg:px-6 premium-transition">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <Separator orientation="vertical" className="hidden h-5 sm:block" />
      
      <div className="flex items-center px-1">
        <BusinessSwitcher />
      </div>

      {appConfig.shell.showBreadcrumbs ? (
        <Breadcrumb className="hidden min-w-0 md:block">
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink asChild>
                <Link to="/" className="font-semibold">{appConfig.productShortName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="flex min-w-0 items-center gap-1.5 sm:gap-2.5">
                <BreadcrumbSeparator />
                <BreadcrumbItem className="min-w-0">
                  {crumb.isLast ? (
                    <BreadcrumbPage className="truncate capitalize font-semibold">{crumb.label}</BreadcrumbPage>
                  ) : (
                    <span className="truncate capitalize text-muted-foreground">{crumb.label}</span>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      ) : null}

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        {appConfig.shell.showGlobalSearch ? (
          <div className="hidden w-64 lg:block xl:w-80">
            <GlobalSearch />
          </div>
        ) : null}

        {allowUserToggle ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={toggle}
            aria-label={resolvedMode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {resolvedMode === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        ) : null}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl" asChild aria-label="Security settings">
                <Link to="/settings/security">
                  <ShieldCheck className="size-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Security settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl"
          aria-label="Notifications"
          onClick={() => setNotificationsOpen(true)}
        >
          <Bell className="size-4" />
        </Button>

        <GlobalNotificationCenter open={notificationsOpen} onOpenChange={setNotificationsOpen} />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl" asChild aria-label="Support">
                <a href={appConfig.support.documentationUrl}>
                  <LifeBuoy className="size-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Help & Support</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" className="hidden h-6 sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group flex items-center gap-2 rounded-xl border border-transparent p-1 transition-colors outline-none hover:border-border/50 hover:bg-accent/40">
              <Avatar className="size-8 border border-border/50 shadow-sm">
                <AvatarFallback className="bg-navy text-[10px] font-bold text-navy-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden max-w-32 text-left leading-tight sm:block">
                <p className="truncate text-xs font-bold text-foreground group-hover:text-primary">{principal?.displayName}</p>
                <p className="truncate text-[10px] font-medium text-muted-foreground/70">{primaryRole}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-surface border-border/40">
            <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-widest opacity-50">Account</DropdownMenuLabel>
            <DropdownMenuItem asChild className="cursor-pointer font-bold text-xs">
              <Link to="/settings" className="flex items-center">
                <User className="mr-2 size-4" /> Profile Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer font-bold text-xs">
              <Link to="/settings" className="flex items-center">
                <SettingsIcon className="mr-2 size-4" /> Preferences
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/40" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer font-bold text-xs text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="mr-2 size-4" /> Terminate Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
