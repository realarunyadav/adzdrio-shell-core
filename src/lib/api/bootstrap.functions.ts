import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * First-owner provisioning.
 *
 * All authority checks live in the database function
 * `public.bootstrap_first_owner`, which is atomic, advisory-locked and
 * refuses to run once any OWNER role exists. No service-role key is used
 * and nothing is trusted from the browser.
 */

export const getInitializationStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("is_system_initialized");
    if (error) throw new Error(error.message);
    return { initialized: Boolean(data) };
  });

export const provisionFirstOwner = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { organizationName: string; organizationSlug: string }) => {
    const name = String(input?.organizationName ?? "").trim();
    const slug = String(input?.organizationSlug ?? "")
      .trim()
      .toLowerCase();
    if (name.length < 2) throw new Error("Organization name is required");
    if (!/^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/.test(slug)) {
      throw new Error("Slug must be lowercase letters, numbers and hyphens");
    }
    return { organizationName: name, organizationSlug: slug };
  })
  .handler(async ({ data, context }) => {
    const { data: orgId, error } = await context.supabase.rpc("bootstrap_first_owner", {
      _org_name: data.organizationName,
      _org_slug: data.organizationSlug,
    });
    if (error) throw new Error(error.message);
    return { organizationId: orgId as string };
  });
