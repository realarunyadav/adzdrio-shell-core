-- ABOS CRM Phase 15.2: Legal Database Foundation

-- 1. Create Legal Templates table
CREATE TABLE public.legal_templates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE,
    name text NOT NULL,
    type text NOT NULL,
    status text NOT NULL DEFAULT 'Draft',
    content text,
    variables jsonb DEFAULT '[]'::jsonb,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    metadata jsonb DEFAULT '{}'::jsonb,
    CONSTRAINT legal_templates_status_check CHECK (status IN ('Draft', 'Active', 'Archived'))
);

-- 2. Create Legal Versions table
CREATE TABLE public.legal_versions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE,
    template_id uuid REFERENCES public.legal_templates(id) ON DELETE CASCADE NOT NULL,
    version text NOT NULL,
    status text NOT NULL DEFAULT 'Draft',
    effective_from timestamptz DEFAULT now(),
    effective_to timestamptz,
    content text,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    metadata jsonb DEFAULT '{}'::jsonb,
    CONSTRAINT legal_versions_status_check CHECK (status IN ('Draft', 'Active', 'Deprecated', 'Read-only'))
);

-- 3. Create Legal Documents table
CREATE TABLE public.legal_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid REFERENCES public.organizations(id) ON DELETE RESTRICT NOT NULL,
    business_id uuid REFERENCES public.businesses(id) ON DELETE RESTRICT NOT NULL,
    customer_id uuid REFERENCES public.crm_customers(id) ON DELETE RESTRICT,
    template_id uuid REFERENCES public.legal_templates(id) ON DELETE SET NULL,
    version_id uuid REFERENCES public.legal_versions(id) ON DELETE SET NULL,
    related_entity_id uuid,
    related_entity_type text,
    name text NOT NULL,
    type text NOT NULL,
    category text,
    version text,
    status text NOT NULL DEFAULT 'Draft',
    owner_employee_id uuid REFERENCES public.employees(id) ON DELETE SET NULL,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    metadata jsonb DEFAULT '{}'::jsonb,
    CONSTRAINT legal_documents_status_check CHECK (status IN ('Draft', 'Active', 'Expired', 'Archived', 'Pending Signature', 'Signed'))
);

-- 4. Create Legal Signatures table
CREATE TABLE public.legal_signatures (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid REFERENCES public.organizations(id) ON DELETE RESTRICT NOT NULL,
    business_id uuid REFERENCES public.businesses(id) ON DELETE RESTRICT NOT NULL,
    document_id uuid REFERENCES public.legal_documents(id) ON DELETE CASCADE NOT NULL,
    signer_employee_id uuid REFERENCES public.employees(id) ON DELETE SET NULL,
    signer_customer_id uuid REFERENCES public.crm_customers(id) ON DELETE SET NULL,
    status text NOT NULL DEFAULT 'Requested',
    provider text,
    provider_reference text,
    requested_at timestamptz DEFAULT now(),
    signed_at timestamptz,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT legal_signatures_status_check CHECK (status IN ('Requested', 'Sent', 'Opened', 'Signed', 'Declined', 'Expired'))
);

-- 5. Create Compliance Rules table
CREATE TABLE public.compliance_rules (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE,
    term text NOT NULL,
    category text,
    severity text NOT NULL,
    status text NOT NULL DEFAULT 'Active',
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT compliance_rules_severity_check CHECK (severity IN ('Blocker', 'Warning', 'Info')),
    CONSTRAINT compliance_rules_status_check CHECK (status IN ('Active', 'Inactive'))
);

-- 6. Grant Data API access (PostgREST)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_templates TO authenticated;
GRANT ALL ON public.legal_templates TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_versions TO authenticated;
GRANT ALL ON public.legal_versions TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_documents TO authenticated;
GRANT ALL ON public.legal_documents TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_signatures TO authenticated;
GRANT ALL ON public.legal_signatures TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.compliance_rules TO authenticated;
GRANT ALL ON public.compliance_rules TO service_role;

-- 7. Enable RLS
ALTER TABLE public.legal_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_rules ENABLE ROW LEVEL SECURITY;

-- ============ RLS POLICIES ============

-- Templates & Rules
CREATE POLICY "legal_templates_owner_all" ON public.legal_templates FOR ALL TO authenticated
USING (public.is_owner(auth.uid()))
WITH CHECK (public.is_owner(auth.uid()));

CREATE POLICY "legal_templates_admin_all" ON public.legal_templates FOR ALL TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "legal_templates_scoped_select" ON public.legal_templates FOR SELECT TO authenticated
USING (public.can_access_business(auth.uid(), business_id));

CREATE POLICY "compliance_rules_owner_all" ON public.compliance_rules FOR ALL TO authenticated
USING (public.is_owner(auth.uid()))
WITH CHECK (public.is_owner(auth.uid()));

CREATE POLICY "compliance_rules_admin_all" ON public.compliance_rules FOR ALL TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Versions
CREATE POLICY "legal_versions_owner_all" ON public.legal_versions FOR ALL TO authenticated
USING (public.is_owner(auth.uid()))
WITH CHECK (public.is_owner(auth.uid()));

CREATE POLICY "legal_versions_admin_select" ON public.legal_versions FOR SELECT TO authenticated
USING (true);

CREATE POLICY "legal_versions_scoped_select" ON public.legal_versions FOR SELECT TO authenticated
USING (public.can_access_business(auth.uid(), business_id));

-- Documents
CREATE POLICY "legal_docs_owner_all" ON public.legal_documents FOR ALL TO authenticated
USING (public.is_owner(auth.uid()))
WITH CHECK (public.is_owner(auth.uid()));

CREATE POLICY "legal_docs_admin_all" ON public.legal_documents FOR ALL TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "legal_docs_manager_all" ON public.legal_documents FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'MANAGER') AND public.can_access_business(auth.uid(), business_id))
WITH CHECK (public.has_role(auth.uid(), 'MANAGER') AND public.can_access_business(auth.uid(), business_id));

CREATE POLICY "legal_docs_sales_all" ON public.legal_documents FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'SALES') AND public.can_access_business(auth.uid(), business_id))
WITH CHECK (public.has_role(auth.uid(), 'SALES') AND public.can_access_business(auth.uid(), business_id));

CREATE POLICY "legal_docs_support_select" ON public.legal_documents FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'SUPPORT') AND public.can_access_business(auth.uid(), business_id));

-- Signatures
CREATE POLICY "legal_sigs_owner_all" ON public.legal_signatures FOR ALL TO authenticated
USING (public.is_owner(auth.uid()))
WITH CHECK (public.is_owner(auth.uid()));

CREATE POLICY "legal_sigs_admin_all" ON public.legal_signatures FOR ALL TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "legal_sigs_scoped_select" ON public.legal_signatures FOR SELECT TO authenticated
USING (public.can_access_business(auth.uid(), business_id));

CREATE POLICY "legal_sigs_scoped_insert" ON public.legal_signatures FOR INSERT TO authenticated
WITH CHECK (public.can_access_business(auth.uid(), business_id) AND (public.has_role(auth.uid(), 'MANAGER') OR public.has_role(auth.uid(), 'SALES')));

-- 8. Hardening
ALTER FUNCTION public.has_role(uuid, public.app_role) SET search_path = public;
ALTER FUNCTION public.is_owner(uuid) SET search_path = public;
ALTER FUNCTION public.is_admin(uuid) SET search_path = public;
ALTER FUNCTION public.can_access_business(uuid, uuid) SET search_path = public;
