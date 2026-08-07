import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { appConfig } from "@/config/app.config";
import { bootstrapModules } from "@/core/modules/modules.config";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
bootstrapModules();
/** Global application shell: navigation, header and content region. */
export function AppShell({ children }) {
    return (<SidebarProvider defaultOpen={appConfig.shell.sidebarDefaultOpen}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="min-w-0 bg-background overflow-hidden flex flex-col">
          <AppHeader />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1400px] space-y-6 animate-in fade-in duration-300">
              {children}
            </div>
          </main>
        </SidebarInset>

      </div>
    </SidebarProvider>);
}
