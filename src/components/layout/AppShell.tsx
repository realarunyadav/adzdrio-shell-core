import type { ReactNode } from "react";

import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { appConfig } from "@/config/app.config";
import { bootstrapModules } from "@/core/modules/modules.config";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

bootstrapModules();

/** Global application shell: navigation, header and content region. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={appConfig.shell.sidebarDefaultOpen}>
      <div className="abos-shell flex min-h-screen w-full bg-background selection:bg-primary/20">
        <AppSidebar />
        <SidebarInset className="abos-shell__inset min-w-0 overflow-hidden flex flex-col relative bg-transparent">
          <div
            aria-hidden="true"
            className="abos-shell__ambient pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="abos-shell__orb abos-shell__orb--one" />
            <div className="abos-shell__orb abos-shell__orb--two" />
            <div className="abos-shell__grid" />
          </div>
          <AppHeader />
          <main className="abos-main relative flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5 lg:px-7 lg:py-6">
            <div className="abos-content mx-auto w-full max-w-[1600px] space-y-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
