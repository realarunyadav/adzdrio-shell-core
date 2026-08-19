-- Security Hardening for Sales Foundation
ALTER FUNCTION public.check_sale_integrity() SET search_path = public;
ALTER FUNCTION public.check_subscription_integrity() SET search_path = public;
