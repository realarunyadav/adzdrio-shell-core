-- Security Hardening for CRM triggers

ALTER FUNCTION public.check_business_org_match() SET search_path = public;
ALTER FUNCTION public.check_lead_assignment_integrity() SET search_path = public;
ALTER FUNCTION public.handle_updated_at() SET search_path = public;
