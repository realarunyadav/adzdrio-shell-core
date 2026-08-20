REVOKE EXECUTE ON FUNCTION public.user_org(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.current_employee_id(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.can_access_ticket(uuid, uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.support_ticket_write_ok(uuid, uuid, uuid, uuid, uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.support_message_write_ok(uuid, uuid, uuid, uuid) FROM anon;