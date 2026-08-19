-- ABOS CRM — PHASE 10 FINANCE FOUNDATION
-- IMPLEMENTATION STEP 1 — FINANCE TRANSACTIONS LEDGER

-- 1. CREATE FINANCE TYPE ENUM
DO $$ BEGIN
    CREATE TYPE public.finance_type AS ENUM ('payment', 'refund', 'adjustment');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. CREATE public.finance_transactions
CREATE TABLE IF NOT EXISTS public.finance_transactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
    business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
    customer_id uuid NOT NULL REFERENCES public.crm_customers(id) ON DELETE RESTRICT,
    sale_id uuid REFERENCES public.sales(id) ON DELETE RESTRICT,
    subscription_id uuid REFERENCES public.sales_subscriptions(id) ON DELETE RESTRICT,
    type public.finance_type NOT NULL,
    amount numeric NOT NULL,
    currency text NOT NULL,
    status text NOT NULL,
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. GRANTS
GRANT SELECT, INSERT, UPDATE, DELETE ON public.finance_transactions TO authenticated;
GRANT ALL ON public.finance_transactions TO service_role;

-- 4. RLS ENABLEMENT
ALTER TABLE public.finance_transactions ENABLE ROW LEVEL SECURITY;

-- 5. BUSINESS & ORGANIZATION INTEGRITY TRIGGERS

-- Function to verify cross-table integrity for financial transactions
CREATE OR REPLACE FUNCTION public.check_finance_transaction_integrity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_org_id uuid;
    target_biz_id uuid;
BEGIN
    -- 1. Verify Organization & Business consistency with Customer
    SELECT organization_id, business_id INTO target_org_id, target_biz_id
    FROM public.crm_customers WHERE id = NEW.customer_id;
    
    IF NEW.organization_id != target_org_id THEN
        RAISE EXCEPTION 'Organization mismatch: Transaction (%) does not match Customer (%)', NEW.organization_id, target_org_id;
    END IF;
    
    IF NEW.business_id != target_biz_id THEN
        RAISE EXCEPTION 'Business mismatch: Transaction (%) does not match Customer (%)', NEW.business_id, target_biz_id;
    END IF;

    -- 2. Verify Sale consistency (if provided)
    IF NEW.sale_id IS NOT NULL THEN
        SELECT organization_id, business_id INTO target_org_id, target_biz_id
        FROM public.sales WHERE id = NEW.sale_id;
        
        IF NEW.organization_id != target_org_id OR NEW.business_id != target_biz_id THEN
            RAISE EXCEPTION 'Integrity failure: Sale does not belong to the specified Organization/Business';
        END IF;
    END IF;

    -- 3. Verify Subscription consistency (if provided)
    IF NEW.subscription_id IS NOT NULL THEN
        SELECT organization_id, business_id INTO target_org_id, target_biz_id
        FROM public.sales_subscriptions WHERE id = NEW.subscription_id;
        
        IF NEW.organization_id != target_org_id OR NEW.business_id != target_biz_id THEN
            RAISE EXCEPTION 'Integrity failure: Subscription does not belong to the specified Organization/Business';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER tr_finance_transaction_integrity
    BEFORE INSERT OR UPDATE ON public.finance_transactions
    FOR EACH ROW EXECUTE FUNCTION public.check_finance_transaction_integrity();

-- 6. UPDATED_AT TRIGGER
CREATE TRIGGER tr_finance_transactions_updated_at
    BEFORE UPDATE ON public.finance_transactions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 7. RLS POLICIES

-- OWNER (110): Organization-wide visibility
CREATE POLICY "OWNER full access to transactions"
ON public.finance_transactions
FOR ALL
TO authenticated
USING (public.is_owner(auth.uid()))
WITH CHECK (public.is_owner(auth.uid()));

-- ADMIN (100): Technical read-only visibility (scoping enforced via is_admin)
CREATE POLICY "ADMIN read-only access to transactions"
ON public.finance_transactions
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- MANAGER (80): Business scoped visibility
CREATE POLICY "MANAGER business access to transactions"
ON public.finance_transactions
FOR SELECT
TO authenticated
USING (public.can_access_business(auth.uid(), business_id));

-- SALES (60): Business scoped visibility (matching Manager for now as per audit)
CREATE POLICY "SALES business access to transactions"
ON public.finance_transactions
FOR SELECT
TO authenticated
USING (public.can_access_business(auth.uid(), business_id));

-- SUPPORT (40): Restricted access (placeholder for future fine-grained rules)
-- Currently inherits via can_access_business if assigned, but audit suggests restriction.

-- 8. INDEXES
CREATE INDEX idx_finance_transactions_org ON public.finance_transactions(organization_id);
CREATE INDEX idx_finance_transactions_biz ON public.finance_transactions(business_id);
CREATE INDEX idx_finance_transactions_customer ON public.finance_transactions(customer_id);
CREATE INDEX idx_finance_transactions_sale ON public.finance_transactions(sale_id);
CREATE INDEX idx_finance_transactions_subscription ON public.finance_transactions(subscription_id);
CREATE INDEX idx_finance_transactions_type ON public.finance_transactions(type);
CREATE INDEX idx_finance_transactions_status ON public.finance_transactions(status);
CREATE INDEX idx_finance_transactions_created ON public.finance_transactions(created_at);
