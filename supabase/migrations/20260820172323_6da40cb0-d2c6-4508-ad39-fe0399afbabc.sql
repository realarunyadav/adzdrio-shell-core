-- Revoke Public Execute from SECURITY DEFINER functions to address linter warnings
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

REVOKE EXECUTE ON FUNCTION public.is_owner(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_owner(uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.is_owner(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_owner(uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) TO service_role;

-- Hardening other security definer functions discovered in linter
REVOKE EXECUTE ON FUNCTION public.is_system_initialized() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_system_initialized() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.is_system_initialized() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_system_initialized() TO service_role;

REVOKE EXECUTE ON FUNCTION public.bootstrap_first_owner(text, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.bootstrap_first_owner(text, text) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.bootstrap_first_owner(text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.bootstrap_first_owner(text, text) TO service_role;

REVOKE EXECUTE ON FUNCTION public.user_org(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.user_org(uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.user_org(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.user_org(uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.current_employee_id(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.current_employee_id(uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.current_employee_id(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.current_employee_id(uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.support_ticket_write_ok(uuid, uuid, uuid, uuid, uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.support_ticket_write_ok(uuid, uuid, uuid, uuid, uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.support_ticket_write_ok(uuid, uuid, uuid, uuid, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.support_ticket_write_ok(uuid, uuid, uuid, uuid, uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.can_access_ticket(uuid, uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.can_access_ticket(uuid, uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_ticket(uuid, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.can_access_ticket(uuid, uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.support_message_write_ok(uuid, uuid, uuid, uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.support_message_write_ok(uuid, uuid, uuid, uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.support_message_write_ok(uuid, uuid, uuid, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.support_message_write_ok(uuid, uuid, uuid, uuid) TO service_role;
