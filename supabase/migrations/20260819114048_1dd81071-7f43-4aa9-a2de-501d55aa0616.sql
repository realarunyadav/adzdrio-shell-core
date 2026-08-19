
-- 1. Audit Logs Table
CREATE TABLE public.audit_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    actor_id uuid NOT NULL REFERENCES auth.users(id),
    action text NOT NULL,
    target text,
    module text,
    severity text CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    metadata jsonb,
    ip_address text,
    created_at timestamptz DEFAULT now()
);

-- 2. KPI Snapshots Table
CREATE TABLE public.kpi_snapshots (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE,
    kpi_key text NOT NULL,
    kpi_value numeric NOT NULL,
    currency text,
    snapshot_date date DEFAULT current_date,
    metadata jsonb,
    created_at timestamptz DEFAULT now(),
    UNIQUE(organization_id, business_id, kpi_key, snapshot_date)
);

-- Grants
GRANT SELECT ON public.audit_logs TO authenticated;
GRANT INSERT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;

GRANT SELECT ON public.kpi_snapshots TO authenticated;
GRANT ALL ON public.kpi_snapshots TO service_role;

-- RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpi_snapshots ENABLE ROW LEVEL SECURITY;

-- OWNER (110) can see all logs
CREATE POLICY "OWNER can see all logs" ON public.audit_logs
    FOR SELECT TO authenticated
    USING (public.has_role(auth.uid(), 'OWNER'));

-- ADMIN (100) can see all logs
CREATE POLICY "ADMIN can see all logs" ON public.audit_logs
    FOR SELECT TO authenticated
    USING (public.has_role(auth.uid(), 'ADMIN'));

-- OWNER (110) can see all KPIs
CREATE POLICY "OWNER can see all KPIs" ON public.kpi_snapshots
    FOR SELECT TO authenticated
    USING (public.has_role(auth.uid(), 'OWNER'));
