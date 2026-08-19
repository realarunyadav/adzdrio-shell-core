-- Security Hardening for handle_employee_updated_at

-- 1. Fix search path
ALTER FUNCTION public.handle_employee_updated_at() SET search_path = public;

-- 2. Revoke execute
REVOKE EXECUTE ON FUNCTION public.handle_employee_updated_at() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_employee_updated_at() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_employee_updated_at() FROM anon;
GRANT EXECUTE ON FUNCTION public.handle_employee_updated_at() TO service_role;
