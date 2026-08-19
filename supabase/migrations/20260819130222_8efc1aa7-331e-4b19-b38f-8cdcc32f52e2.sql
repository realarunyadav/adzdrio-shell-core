-- Revoke public execute from security definer functions created in Phase 13
REVOKE EXECUTE ON FUNCTION public.check_finance_currency_integrity() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_invoice_currency_integrity() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.sync_finance_lifecycle() FROM PUBLIC;

-- Revoke from authenticated/anon roles explicitly (though PUBLIC covers it, be explicit)
REVOKE EXECUTE ON FUNCTION public.check_finance_currency_integrity() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.check_invoice_currency_integrity() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_finance_lifecycle() FROM anon, authenticated;

-- Grant to service_role (triggers run as owner, but service_role might call them)
GRANT EXECUTE ON FUNCTION public.check_finance_currency_integrity() TO service_role;
GRANT EXECUTE ON FUNCTION public.check_invoice_currency_integrity() TO service_role;
GRANT EXECUTE ON FUNCTION public.sync_finance_lifecycle() TO service_role;
