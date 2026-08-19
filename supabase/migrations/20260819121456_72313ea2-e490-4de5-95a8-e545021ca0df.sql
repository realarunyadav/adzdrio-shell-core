-- Phase 8: Sales Foundation (Plans, Sales, Subscriptions)

-- 1. Create Sales Plans table (Product Catalog)
CREATE TABLE public.sales_plans (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
    business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
    name text NOT NULL,
    price numeric NOT NULL CHECK (price >= 0),
    currency text NOT NULL,
    billing_period text NOT NULL, -- e.g., 'monthly', 'annual'
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
    features jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Create Sales table (Transaction / Deal Records)
CREATE TABLE public.sales (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
    business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
    customer_id uuid NOT NULL REFERENCES public.crm_customers(id) ON DELETE RESTRICT,
    assigned_employee_id uuid REFERENCES public.employees(id) ON DELETE SET NULL,
    plan_id uuid REFERENCES public.sales_plans(id) ON DELETE SET NULL,
    final_amount numeric NOT NULL CHECK (final_amount >= 0),
    currency text NOT NULL,
    status text NOT NULL DEFAULT 'New', -- Matches DemoSale: New, Qualified, Proposal, Negotiation, Won, Lost
    payment_status text NOT NULL DEFAULT 'Pending', -- Matches DemoSale: Paid, Pending, Failed, Refunded
    discount numeric DEFAULT 0 CHECK (discount >= 0),
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Create Sales Subscriptions table (Active Service Records)
CREATE TABLE public.sales_subscriptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
    business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
    customer_id uuid NOT NULL REFERENCES public.crm_customers(id) ON DELETE RESTRICT,
    plan_id uuid NOT NULL REFERENCES public.sales_plans(id) ON DELETE RESTRICT,
    sale_id uuid REFERENCES public.sales(id) ON DELETE SET NULL,
    status text NOT NULL DEFAULT 'pending', -- active, expired, pending, cancelled, suspended
    purchase_date date,
    start_date date,
    end_date date,
    term_months integer,
    amount numeric CHECK (amount >= 0),
    currency text NOT NULL,
    auto_renew boolean DEFAULT false,
    renewal_policy text, -- carry_forward, forfeit_remaining, manual_decision
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Integrity Triggers for Sales Plans
CREATE TRIGGER tr_sales_plans_business_org_match
    BEFORE INSERT OR UPDATE ON public.sales_plans
    FOR EACH ROW EXECUTE FUNCTION public.check_business_org_match();

-- 5. Integrity Triggers for Sales
CREATE TRIGGER tr_sales_business_org_match
    BEFORE INSERT OR UPDATE ON public.sales
    FOR EACH ROW EXECUTE FUNCTION public.check_business_org_match();

CREATE OR REPLACE FUNCTION public.check_sale_integrity()
RETURNS TRIGGER AS $$
BEGIN
    -- Check customer belongs to the organization
    IF NOT EXISTS (
        SELECT 1 FROM public.crm_customers 
        WHERE id = NEW.customer_id AND organization_id = NEW.organization_id
    ) THEN
        RAISE EXCEPTION 'Customer ID does not belong to Organization ID';
    END IF;

    -- Check customer belongs to the business
    IF NOT EXISTS (
        SELECT 1 FROM public.crm_customers 
        WHERE id = NEW.customer_id AND business_id = NEW.business_id
    ) THEN
        RAISE EXCEPTION 'Customer ID does not belong to Business ID';
    END IF;

    -- Check plan belongs to the organization/business if set
    IF NEW.plan_id IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1 FROM public.sales_plans 
            WHERE id = NEW.plan_id AND organization_id = NEW.organization_id AND business_id = NEW.business_id
        ) THEN
            RAISE EXCEPTION 'Plan ID does not belong to the same Organization/Business scope';
        END IF;
    END IF;

    -- Check employee belongs to the organization/business
    IF NEW.assigned_employee_id IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1 FROM public.employees 
            WHERE id = NEW.assigned_employee_id AND organization_id = NEW.organization_id
        ) THEN
            RAISE EXCEPTION 'Assigned Employee does not belong to Organization';
        END IF;
        
        -- Check business match (enforcing business-scoped assignment)
        IF NOT EXISTS (
            SELECT 1 FROM public.employees 
            WHERE id = NEW.assigned_employee_id AND business_id = NEW.business_id
        ) THEN
            RAISE EXCEPTION 'Assigned Employee does not belong to Business';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_sales_integrity
    BEFORE INSERT OR UPDATE ON public.sales
    FOR EACH ROW EXECUTE FUNCTION public.check_sale_integrity();

-- 6. Integrity Triggers for Subscriptions
CREATE TRIGGER tr_sales_subscriptions_business_org_match
    BEFORE INSERT OR UPDATE ON public.sales_subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.check_business_org_match();

CREATE OR REPLACE FUNCTION public.check_subscription_integrity()
RETURNS TRIGGER AS $$
BEGIN
    -- Check customer match
    IF NOT EXISTS (
        SELECT 1 FROM public.crm_customers 
        WHERE id = NEW.customer_id AND organization_id = NEW.organization_id AND business_id = NEW.business_id
    ) THEN
        RAISE EXCEPTION 'Customer/Organization/Business mismatch for subscription';
    END IF;

    -- Check plan match
    IF NOT EXISTS (
        SELECT 1 FROM public.sales_plans 
        WHERE id = NEW.plan_id AND organization_id = NEW.organization_id AND business_id = NEW.business_id
    ) THEN
        RAISE EXCEPTION 'Plan/Organization/Business mismatch for subscription';
    END IF;

    -- Check sale match if provided
    IF NEW.sale_id IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1 FROM public.sales 
            WHERE id = NEW.sale_id AND organization_id = NEW.organization_id AND business_id = NEW.business_id AND customer_id = NEW.customer_id
        ) THEN
            RAISE EXCEPTION 'Sale/Organization/Business/Customer mismatch for subscription';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_sales_subscriptions_integrity
    BEFORE INSERT OR UPDATE ON public.sales_subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.check_subscription_integrity();

-- 7. Grant access
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sales_plans TO authenticated;
GRANT ALL ON public.sales_plans TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sales TO authenticated;
GRANT ALL ON public.sales TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sales_subscriptions TO authenticated;
GRANT ALL ON public.sales_subscriptions TO service_role;

-- 8. Enable RLS
ALTER TABLE public.sales_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_subscriptions ENABLE ROW LEVEL SECURITY;

-- 9. RLS Policies: Sales Plans

CREATE POLICY "Owners can manage organization sales plans"
ON public.sales_plans FOR ALL
TO authenticated
USING (public.is_owner(auth.uid()));

CREATE POLICY "Admins can view organization sales plans"
ON public.sales_plans FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'ADMIN')
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND organization_id = public.sales_plans.organization_id
    )
);

CREATE POLICY "Staff can view business sales plans"
ON public.sales_plans FOR SELECT
TO authenticated
USING (public.can_access_business(auth.uid(), business_id));

-- 10. RLS Policies: Sales

CREATE POLICY "Owners can manage organization sales"
ON public.sales FOR ALL
TO authenticated
USING (public.is_owner(auth.uid()));

CREATE POLICY "Admins can view organization sales"
ON public.sales FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'ADMIN')
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND organization_id = public.sales.organization_id
    )
);

CREATE POLICY "Managers can manage business sales"
ON public.sales FOR ALL
TO authenticated
USING (
    public.has_role(auth.uid(), 'MANAGER')
    AND public.can_access_business(auth.uid(), business_id)
);

CREATE POLICY "Sales staff can access assigned business sales"
ON public.sales FOR ALL
TO authenticated
USING (
    public.has_role(auth.uid(), 'SALES')
    AND public.can_access_business(auth.uid(), business_id)
);

-- 11. RLS Policies: Subscriptions

CREATE POLICY "Owners can manage organization subscriptions"
ON public.sales_subscriptions FOR ALL
TO authenticated
USING (public.is_owner(auth.uid()));

CREATE POLICY "Admins can view organization subscriptions"
ON public.sales_subscriptions FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'ADMIN')
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND organization_id = public.sales_subscriptions.organization_id
    )
);

CREATE POLICY "Staff can view business subscriptions"
ON public.sales_subscriptions FOR SELECT
TO authenticated
USING (public.can_access_business(auth.uid(), business_id));

-- 12. Indexes
CREATE INDEX idx_sales_plans_org_id ON public.sales_plans(organization_id);
CREATE INDEX idx_sales_plans_business_id ON public.sales_plans(business_id);
CREATE INDEX idx_sales_plans_status ON public.sales_plans(status);

CREATE INDEX idx_sales_org_id ON public.sales(organization_id);
CREATE INDEX idx_sales_business_id ON public.sales(business_id);
CREATE INDEX idx_sales_customer_id ON public.sales(customer_id);
CREATE INDEX idx_sales_assigned_employee ON public.sales(assigned_employee_id);
CREATE INDEX idx_sales_plan_id ON public.sales(plan_id);
CREATE INDEX idx_sales_status ON public.sales(status);
CREATE INDEX idx_sales_created_at ON public.sales(created_at);

CREATE INDEX idx_sales_subs_org_id ON public.sales_subscriptions(organization_id);
CREATE INDEX idx_sales_subs_business_id ON public.sales_subscriptions(business_id);
CREATE INDEX idx_sales_subs_customer_id ON public.sales_subscriptions(customer_id);
CREATE INDEX idx_sales_subs_plan_id ON public.sales_subscriptions(plan_id);
CREATE INDEX idx_sales_subs_sale_id ON public.sales_subscriptions(sale_id);
CREATE INDEX idx_sales_subs_status ON public.sales_subscriptions(status);
CREATE INDEX idx_sales_subs_end_date ON public.sales_subscriptions(end_date);

-- 13. Updated At Triggers
CREATE TRIGGER tr_sales_plans_updated_at
    BEFORE UPDATE ON public.sales_plans
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER tr_sales_updated_at
    BEFORE UPDATE ON public.sales
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER tr_sales_subscriptions_updated_at
    BEFORE UPDATE ON public.sales_subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
