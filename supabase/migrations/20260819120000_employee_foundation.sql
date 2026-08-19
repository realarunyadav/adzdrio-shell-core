-- Phase 3: Employee Foundation

-- 1. Create public.employees table
CREATE TABLE public.employees (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
    business_id uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
    employee_code text NOT NULL,
    designation text,
    department text,
    reports_to_id uuid REFERENCES public.employees(id) ON DELETE SET NULL,
    employment_status text NOT NULL DEFAULT 'Active',
    joining_date date,
    training_status text DEFAULT 'Pending',
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(organization_id, employee_code)
);

-- 2. Grant access
GRANT SELECT, INSERT, UPDATE, DELETE ON public.employees TO authenticated;
GRANT ALL ON public.employees TO service_role;

-- 3. Enable RLS
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies

-- Policy: Employees can view their own record
CREATE POLICY "Employees can view own record"
ON public.employees
FOR SELECT
TO authenticated
USING (profile_id = auth.uid());

-- Policy: Owners have full access to their organization's employees
CREATE POLICY "Owners have full access to organization employees"
ON public.employees
FOR ALL
TO authenticated
USING (public.is_owner(auth.uid(), organization_id));

-- Policy: Admins can view/update records in their organization (technical/operational administration)
-- Note: Limited by rank and organization. Does not grant Owner authority.
CREATE POLICY "Admins can manage organization employees"
ON public.employees
FOR ALL
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') 
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND organization_id = public.employees.organization_id
    )
);

-- Policy: Managers can view employees in their assigned business scope
CREATE POLICY "Managers can view business employees"
ON public.employees
FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'manager')
    AND public.can_access_business(auth.uid(), business_id)
);

-- Policy: Manager/subordinate visibility (viewing direct/indirect subordinates)
CREATE POLICY "Managers can view subordinates"
ON public.employees
FOR SELECT
TO authenticated
USING (
    EXISTS (
        WITH RECURSIVE subordinate_tree AS (
            SELECT id FROM public.employees WHERE reports_to_id = (
                SELECT id FROM public.employees WHERE profile_id = auth.uid()
            )
            UNION ALL
            SELECT e.id FROM public.employees e
            INNER JOIN subordinate_tree st ON e.reports_to_id = st.id
        )
        SELECT 1 FROM subordinate_tree WHERE id = public.employees.id
    )
);

-- Policy: Sales/Support visibility (scoped to their business)
CREATE POLICY "Staff can view peers in same business"
ON public.employees
FOR SELECT
TO authenticated
USING (
    (public.has_role(auth.uid(), 'sales') OR public.has_role(auth.uid(), 'support'))
    AND public.can_access_business(auth.uid(), business_id)
);

-- 5. Indexes for performance
CREATE INDEX idx_employees_profile_id ON public.employees(profile_id);
CREATE INDEX idx_employees_organization_id ON public.employees(organization_id);
CREATE INDEX idx_employees_business_id ON public.employees(business_id);
CREATE INDEX idx_employees_reports_to_id ON public.employees(reports_to_id);

-- 6. Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER on_employee_updated
    BEFORE UPDATE ON public.employees
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

COMMENT ON TABLE public.employees IS 'Core HR and operational employee records. Sensitive financial data excluded.';
