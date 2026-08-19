-- Revoke default public/authenticated execute permissions from security definer functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;

REVOKE EXECUTE ON FUNCTION public.is_owner(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_owner(uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.is_owner(uuid) FROM anon;

REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM anon;

-- Grant execute only to service_role (the engine itself for RLS checks)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.is_owner(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO service_role;

-- Note: In Supabase, RLS policies using SECURITY DEFINER functions work even if 'authenticated' doesn't have EXECUTE,
-- because the policy itself (owned by a privileged user/postgres) can call it, OR we grant execute specifically
-- for the RLS engine context. However, typically for RLS helpers, we keep EXECUTE to service_role.
