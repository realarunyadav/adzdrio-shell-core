REVOKE ALL ON FUNCTION public.is_system_initialized() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_system_initialized() TO authenticated, service_role;