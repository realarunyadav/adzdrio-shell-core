-- 1. Create businesses table
CREATE TABLE public.businesses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    code text NOT NULL,
    status text DEFAULT 'active' CHECK (status IN ('active', 'warning', 'paused', 'inactive')),
    settings jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    -- Enforce uniqueness of code within an organization
    UNIQUE (organization_id, code)
);

-- 2. Connect user_roles to businesses
ALTER TABLE public.user_roles 
ADD CONSTRAINT user_roles_business_id_fkey 
FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE;

-- 3. Grant access
GRANT SELECT, INSERT, UPDATE, DELETE ON public.businesses TO authenticated;
GRANT ALL ON public.businesses TO service_role;

-- 4. Enable RLS
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- 5. Business RLS Policies

-- OWNER: Full access to all businesses in their organization
CREATE POLICY "Owners can manage all businesses in their organization"
ON public.businesses FOR ALL
TO authenticated
USING (
  public.is_owner(auth.uid()) AND 
  organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
);

-- ADMIN: Technical/operational access
CREATE POLICY "Admins can view all businesses in their organization"
ON public.businesses FOR SELECT
TO authenticated
USING (
  public.is_admin(auth.uid()) AND 
  organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
);

-- Scoped roles (MANAGER, SALES, SUPPORT, VIEWER): Access restricted to their assigned business_id
CREATE POLICY "Scoped roles can view their assigned business"
ON public.businesses FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
      AND (business_id = public.businesses.id OR business_id IS NULL)
  )
);

-- 6. Helper function for business access verification (Security Definer)
CREATE OR REPLACE FUNCTION public.can_access_business(_user_id uuid, _business_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    -- Case 1: Owner of the organization the business belongs to
    SELECT 1 FROM public.profiles p
    JOIN public.organizations o ON o.id = p.organization_id
    JOIN public.businesses b ON b.organization_id = o.id
    WHERE p.id = _user_id 
      AND b.id = _business_id
      AND public.is_owner(_user_id)
    
    UNION ALL
    
    -- Case 2: Admin of the organization
    SELECT 1 FROM public.profiles p
    JOIN public.businesses b ON b.organization_id = p.organization_id
    WHERE p.id = _user_id 
      AND b.id = _business_id
      AND public.is_admin(_user_id)

    UNION ALL

    -- Case 3: Explicitly scoped in user_roles
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id 
      AND (business_id = _business_id OR (business_id IS NULL AND role IN ('OWNER', 'ADMIN')))
  )
$$;

-- Grant execute on new helper
REVOKE EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) TO service_role;
