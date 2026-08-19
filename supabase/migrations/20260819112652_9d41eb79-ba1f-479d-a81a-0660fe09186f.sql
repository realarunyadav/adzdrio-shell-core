-- Security Hardening for can_access_business

-- 1. Ensure search_path is set (was already set, but reinforcing for linter compliance)
ALTER FUNCTION public.can_access_business(uuid, uuid) SET search_path = public;

-- 2. Revoke execute from all except service_role
REVOKE EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) TO service_role;
