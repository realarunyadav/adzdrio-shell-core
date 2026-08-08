import { createFileRoute } from "@tanstack/react-router";
import { SecurityDashboard } from "@/components/security/SecurityDashboard";

export const Route = createFileRoute("/settings/security")({
  component: () => (
    <div className="p-6">
      <SecurityDashboard />
    </div>
  ),
});
