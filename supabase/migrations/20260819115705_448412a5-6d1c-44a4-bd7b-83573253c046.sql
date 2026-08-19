-- Phase 6: CRM Foundation (Customers + Leads)

-- Re-create handle_updated_at if not present in the current database state
-- (It was in migrations but information_schema check failed to find it)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 1. Create CRM Customers table (External Contacts)
CREATE TABLE public.crm_customers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
    business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
    full_name text NOT NULL,
    email text,
    phone text,
    status text NOT NULL DEFAULT 'active',
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    
    -- Ensure business belongs to the organization
    CONSTRAINT customer_business_org_match 
        CHECK (organization_id IS NOT NULL AND business_id IS NOT NULL)
);

-- 2. Create CRM Leads table
CREATE TABLE public.crm_leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
    business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
    source text,
    status text NOT NULL DEFAULT 'New',
    assigned_employee_id uuid REFERENCES public.employees(id) ON DELETE SET NULL,
    lead_data jsonb NOT NULL DEFAULT '{}'::jsonb,
    converted_at timestamptz,
    converted_customer_id uuid REFERENCES public.crm_customers(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Integrity Triggers: Ensure business and organization match
CREATE OR REPLACE FUNCTION public.check_business_org_match()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = NEW.business_id AND organization_id = NEW.organization_id
    ) THEN
        RAISE EXCEPTION 'Business ID % does not belong to Organization ID %', NEW.business_id, NEW.organization_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_crm_customers_business_org_match
    BEFORE INSERT OR UPDATE ON public.crm_customers
    FOR EACH ROW EXECUTE FUNCTION public.check_business_org_match();

CREATE TRIGGER tr_crm_leads_business_org_match
    BEFORE INSERT OR UPDATE ON public.crm_leads
    FOR EACH ROW EXECUTE FUNCTION public.check_business_org_match();

-- 4. Integrity Triggers: Ensure assigned employee belongs to the same organization/business
CREATE OR REPLACE FUNCTION public.check_lead_assignment_integrity()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.assigned_employee_id IS NOT NULL THEN
        -- Check organization match
        IF NOT EXISTS (
            SELECT 1 FROM public.employees 
            WHERE id = NEW.assigned_employee_id AND organization_id = NEW.organization_id
        ) THEN
            RAISE EXCEPTION 'Assigned Employee % does not belong to Organization %', NEW.assigned_employee_id, NEW.organization_id;
        END IF;
        
        -- Check business match (enforcing business-scoped assignment)
        IF NOT EXISTS (
            SELECT 1 FROM public.employees 
            WHERE id = NEW.assigned_employee_id AND business_id = NEW.business_id
        ) THEN
            RAISE EXCEPTION 'Assigned Employee % does not belong to Business %', NEW.assigned_employee_id, NEW.business_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_crm_leads_assignment_integrity
    BEFORE INSERT OR UPDATE ON public.crm_leads
    FOR EACH ROW EXECUTE FUNCTION public.check_lead_assignment_integrity();

-- 5. Grant access
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_customers TO authenticated;
GRANT ALL ON public.crm_customers TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_leads TO authenticated;
GRANT ALL ON public.crm_leads TO service_role;

-- 6. Enable RLS
ALTER TABLE public.crm_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies: CRM Customers

-- OWNER: Full CRUD within their organization
CREATE POLICY "Owners can manage organization customers"
ON public.crm_customers FOR ALL
TO authenticated
USING (public.is_owner(auth.uid()));

-- ADMIN: Technical visibility (Select/Update) within organization
CREATE POLICY "Admins can view organization customers"
ON public.crm_customers FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'ADMIN')
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND organization_id = public.crm_customers.organization_id
    )
);

-- MANAGER/SALES/SUPPORT: Business scoped access
CREATE POLICY "Staff can access assigned business customers"
ON public.crm_customers FOR SELECT
TO authenticated
USING (public.can_access_business(auth.uid(), business_id));

-- 8. RLS Policies: CRM Leads

-- OWNER: Full CRUD within organization
CREATE POLICY "Owners can manage organization leads"
ON public.crm_leads FOR ALL
TO authenticated
USING (public.is_owner(auth.uid()));

-- ADMIN: Technical visibility within organization
CREATE POLICY "Admins can view organization leads"
ON public.crm_leads FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'ADMIN')
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND organization_id = public.crm_leads.organization_id
    )
);

-- MANAGER: Business scoped access
CREATE POLICY "Managers can access business leads"
ON public.crm_leads FOR ALL
TO authenticated
USING (
    public.has_role(auth.uid(), 'MANAGER')
    AND public.can_access_business(auth.uid(), business_id)
);

-- SALES: Assigned or business scoped access
CREATE POLICY "Sales can access business leads"
ON public.crm_leads FOR ALL
TO authenticated
USING (
    public.has_role(auth.uid(), 'SALES')
    AND public.can_access_business(auth.uid(), business_id)
);

-- 9. Indexes
CREATE INDEX idx_crm_customers_org_id ON public.crm_customers(organization_id);
CREATE INDEX idx_crm_customers_business_id ON public.crm_customers(business_id);
CREATE INDEX idx_crm_customers_status ON public.crm_customers(status);
CREATE INDEX idx_crm_customers_created_at ON public.crm_customers(created_at);

CREATE INDEX idx_crm_leads_org_id ON public.crm_leads(organization_id);
CREATE INDEX idx_crm_leads_business_id ON public.crm_leads(business_id);
CREATE INDEX idx_crm_leads_status ON public.crm_leads(status);
CREATE INDEX idx_crm_leads_assigned_employee ON public.crm_leads(assigned_employee_id);
CREATE INDEX idx_crm_leads_converted_customer ON public.crm_leads(converted_customer_id);
CREATE INDEX idx_crm_leads_created_at ON public.crm_leads(created_at);

-- 10. Updated At triggers
CREATE TRIGGER tr_crm_customers_updated_at
    BEFORE UPDATE ON public.crm_customers
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER tr_crm_leads_updated_at
    BEFORE UPDATE ON public.crm_leads
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
