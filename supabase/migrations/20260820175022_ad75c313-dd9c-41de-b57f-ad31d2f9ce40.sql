-- Restore EXECUTE permissions for authenticated users to allow RLS policy evaluation
-- These permissions were accidentally revoked in the previous migration, causing PostgREST 403 errors

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_owner(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.user_org(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_employee_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_ticket(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.support_ticket_write_ok(uuid, uuid, uuid, uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.support_message_write_ok(uuid, uuid, uuid, uuid) TO authenticated;

-- Ensure anon still has no access to these internal security functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_owner(uuid) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.user_org(uuid) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.current_employee_id(uuid) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.can_access_ticket(uuid, uuid) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.support_ticket_write_ok(uuid, uuid, uuid, uuid, uuid) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.support_message_write_ok(uuid, uuid, uuid, uuid) FROM anon, PUBLIC;
