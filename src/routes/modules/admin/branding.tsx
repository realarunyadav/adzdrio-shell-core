import { createFileRoute } from "@tanstack/react-router";
import { BrandingBuilder } from "@/components/admin-studio/BrandingBuilder";
import { PageHeader } from "@/components/shared/PageHeader";

export const Route = createFileRoute("/modules/admin/branding")({
  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="Branding & Identity"
        description="Manage enterprise visual assets, typography, and portal styles."
      />
      <BrandingBuilder />
    </div>
  ),
});
