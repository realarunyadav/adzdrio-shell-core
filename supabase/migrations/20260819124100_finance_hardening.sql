-- Security Hardening for Finance Transaction Integrity Function
ALTER FUNCTION public.check_finance_transaction_integrity() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.check_finance_transaction_integrity() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_finance_transaction_integrity() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.check_finance_transaction_integrity() FROM anon;
GRANT EXECUTE ON FUNCTION public.check_finance_transaction_integrity() TO service_role;
