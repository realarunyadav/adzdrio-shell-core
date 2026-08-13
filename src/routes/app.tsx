import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/app")({
  component: () => (
    <AppShell>
      <div className="flex-1">
        {/* The actual dashboard content will be here */}
        <h1>Dashboard</h1>
      </div>
    </AppShell>
  ),
});
