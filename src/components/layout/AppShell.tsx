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
      <div className="flex min-h-screen w-full bg-background/95 selection:bg-primary/20">
        <AppSidebar />
        <SidebarInset className="min-w-0 bg-transparent overflow-hidden flex flex-col relative">
          <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none opacity-[0.03] dark:bg-grid-slate-800" />
          <AppHeader />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1400px] space-y-6 animate-in fade-in duration-300">
              {children}
            </div>
          </main>
        </SidebarInset>

      </div>
    </SidebarProvider>
  );
}