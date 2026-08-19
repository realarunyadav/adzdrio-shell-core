-- Phase 10.2: Finance Invoice Foundation

-- 1. Create Finance Invoices table
CREATE TABLE public.finance_invoices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
    business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
    customer_id uuid NOT NULL REFERENCES public.crm_customers(id) ON DELETE RESTRICT,
    sale_id uuid REFERENCES public.sales(id) ON DELETE SET NULL,
    subscription_id uuid REFERENCES public.sales_subscriptions(id) ON DELETE SET NULL,
    invoice_number text NOT NULL,
    amount numeric NOT NULL CHECK (amount >= 0),
    currency text NOT NULL,
    status text NOT NULL DEFAULT 'Draft', -- Draft, Sent, Paid, Overdue, Void, Cancelled
    issue_date date,
    due_date date,
    paid_at timestamptz,
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Unique index for invoice numbers within an organization
CREATE UNIQUE INDEX idx_finance_invoices_number_org ON public.finance_invoices(organization_id, invoice_number);

-- 3. Integrity Triggers
CREATE OR REPLACE FUNCTION public.check_finance_invoice_integrity()
RETURNS TRIGGER AS $$
BEGIN
    -- Check organization/business matching for basic scope
    IF NOT EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = NEW.business_id AND organization_id = NEW.organization_id
    ) THEN
        RAISE EXCEPTION 'Business ID does not belong to the provided Organization ID';
    END IF;

    -- Check customer match
    IF NOT EXISTS (
        SELECT 1 FROM public.crm_customers 
        WHERE id = NEW.customer_id AND organization_id = NEW.organization_id AND business_id = NEW.business_id
    ) THEN
        RAISE EXCEPTION 'Customer/Organization/Business mismatch for invoice';
    END IF;

    -- Check sale match if provided
    IF NEW.sale_id IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1 FROM public.sales 
            WHERE id = NEW.sale_id AND organization_id = NEW.organization_id AND business_id = NEW.business_id AND customer_id = NEW.customer_id
        ) THEN
            RAISE EXCEPTION 'Sale/Organization/Business/Customer mismatch for invoice';
        END IF;
    END IF;

    -- Check subscription match if provided
    IF NEW.subscription_id IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1 FROM public.sales_subscriptions 
            WHERE id = NEW.subscription_id AND organization_id = NEW.organization_id AND business_id = NEW.business_id AND customer_id = NEW.customer_id
        ) THEN
            RAISE EXCEPTION 'Subscription/Organization/Business/Customer mismatch for invoice';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_finance_invoice_integrity
    BEFORE INSERT OR UPDATE ON public.finance_invoices
    FOR EACH ROW EXECUTE FUNCTION public.check_finance_invoice_integrity();

-- 4. Grant access
GRANT SELECT, INSERT, UPDATE, DELETE ON public.finance_invoices TO authenticated;
GRANT ALL ON public.finance_invoices TO service_role;

-- 5. Enable RLS
ALTER TABLE public.finance_invoices ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- OWNER (110): Full organization-scoped access
CREATE POLICY "OWNER full access to invoices"
ON public.finance_invoices FOR ALL
TO authenticated
USING (public.is_owner(auth.uid()))
WITH CHECK (public.is_owner(auth.uid()));

-- ADMIN (100): Technical read-only visibility
CREATE POLICY "ADMIN read-only access to invoices"
ON public.finance_invoices FOR SELECT
TO authenticated
USING (
    public.is_admin(auth.uid())
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND organization_id = public.finance_invoices.organization_id
    )
);

-- MANAGER (80): Business-scoped access
CREATE POLICY "MANAGER business access to invoices"
ON public.finance_invoices FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'MANAGER')
    AND public.can_access_business(auth.uid(), business_id)
);

-- SALES (60): Scoped access
CREATE POLICY "SALES business access to invoices"
ON public.finance_invoices FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'SALES')
    AND public.can_access_business(auth.uid(), business_id)
);

-- SUPPORT (40): Restricted visibility
CREATE POLICY "SUPPORT business access to invoices"
ON public.finance_invoices FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'SUPPORT')
    AND public.can_access_business(auth.uid(), business_id)
);

-- VIEWER (20): Read-only visibility
CREATE POLICY "VIEWER business access to invoices"
ON public.finance_invoices FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'VIEWER')
    AND public.can_access_business(auth.uid(), business_id)
);

-- 7. Indexes for performance
CREATE INDEX idx_finance_invoices_org ON public.finance_invoices(organization_id);
CREATE INDEX idx_finance_invoices_biz ON public.finance_invoices(business_id);
CREATE INDEX idx_finance_invoices_customer ON public.finance_invoices(customer_id);
CREATE INDEX idx_finance_invoices_sale ON public.finance_invoices(sale_id);
CREATE INDEX idx_finance_invoices_subscription ON public.finance_invoices(subscription_id);
CREATE INDEX idx_finance_invoices_status ON public.finance_invoices(status);
CREATE INDEX idx_finance_invoices_currency ON public.finance_invoices(currency);
CREATE INDEX idx_finance_invoices_issue ON public.finance_invoices(issue_date);
CREATE INDEX idx_finance_invoices_due ON public.finance_invoices(due_date);

-- 8. Updated At Trigger
CREATE TRIGGER tr_finance_invoices_updated_at
    BEFORE UPDATE ON public.finance_invoices
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 9. Security Hardening for Trigger Function
ALTER FUNCTION public.check_finance_invoice_integrity() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.check_finance_invoice_integrity() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_finance_invoice_integrity() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.check_finance_invoice_integrity() FROM anon;
GRANT EXECUTE ON FUNCTION public.check_finance_invoice_integrity() TO service_role;
