import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  useNavigate,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ShieldCheck, RefreshCw } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppShell } from "@/components/layout/AppShell";
import { RbacProvider } from "@/core/rbac/RbacProvider";
import { AuthProvider, useAuth } from "@/lib/auth/AuthProvider";
import { ThemeProvider } from "@/core/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { GlobalCommandPalette } from "@/components/shared/GlobalCommandPalette";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Try again</button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Go home</a>
        </div>
      </div>
    </div>
  );
}

function ConnectionErrorScreen({ message }: { message?: string | null }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy p-6 text-center">
      <div className="max-w-md rounded-2xl border border-border/40 bg-background/95 p-8 shadow-elevated">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
          <RefreshCw className="size-6" />
        </div>
        <h1 className="text-xl font-black tracking-tight">Backend connection unavailable</h1>
        <p className="mt-2 text-sm text-muted-foreground">ABOS cannot validate the current session right now.</p>
        {message && <p className="mt-3 text-xs text-muted-foreground/70">{message}</p>}
        <button onClick={() => window.location.reload()} className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-xs font-black uppercase tracking-widest text-primary-foreground">
          Retry connection
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ABOS — Adzdrio Business Operating System" },
      { name: "description", content: "Enterprise business operating system for Adzdrio India Services Pvt. Ltd." },
      { name: "author", content: "Adzdrio India Services Pvt. Ltd." },
      { property: "og:title", content: "ABOS — Adzdrio Business Operating System" },
      { property: "og:description", content: "Enterprise business operating system for Adzdrio India Services Pvt. Ltd." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider><InnerRoot /></AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function InnerRoot() {
  const { user, status, error } = useAuth();
  const { location } = useRouterState();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "unauthenticated" && location.pathname !== "/auth") {
      navigate({ to: "/auth", replace: true });
    }
    if (status === "authenticated" && location.pathname === "/auth") {
      navigate({ to: "/", replace: true });
    }
  }, [status, location.pathname, navigate]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 rounded-xl bg-primary flex items-center justify-center animate-pulse"><ShieldCheck className="size-7 text-primary-foreground" /></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Initializing ABOS</span>
        </div>
      </div>
    );
  }

  if (status === "connection_error") {
    return <ConnectionErrorScreen message={error} />;
  }

  const isAuthPage = location.pathname === "/auth";
  const isAppPage = location.pathname === "/app" || location.pathname.startsWith("/app/");

  return (
    <RbacProvider>
      {isAuthPage ? (
        <Outlet />
      ) : (
        <AppShell>
          <Outlet />
        </AppShell>
      )}
      <GlobalCommandPalette />
      <Toaster position="top-right" richColors closeButton />
    </RbacProvider>
  );
}
