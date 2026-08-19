-- 1. Create organizations table (anchor, nullable owner_id)
CREATE TABLE public.organizations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    settings jsonb DEFAULT '{}'::jsonb,
    owner_id uuid, -- Will reference profiles(id) later
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Create profiles table (identity)
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
    display_name text,
    email text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. Resolve circularity: Add FK to organizations.owner_id
ALTER TABLE public.organizations ADD CONSTRAINT organizations_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.profiles(id) ON DELETE SET NULL;

-- 4. Create app_role enum
CREATE TYPE public.app_role AS enum ('OWNER', 'ADMIN', 'MANAGER', 'SALES', 'SUPPORT', 'VIEWER');

-- 5. Create user_roles table (authority foundation)
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    business_id uuid, -- For future scoping
    created_at timestamptz DEFAULT now(),
    UNIQUE (user_id, role, business_id)
);

-- 6. Grant basic access (required by Lovable Cloud/PostgREST)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.organizations TO authenticated;
GRANT ALL ON public.organizations TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- 7. Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 8. Security Definer Helper Functions
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_owner(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'OWNER')
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'ADMIN')
$$;

-- 9. RLS Policies

-- Profiles: Users can see their own profile and owners/admins can see all org profiles
CREATE POLICY "Users can see own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Owners and Admins can see org profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (
  public.is_owner(auth.uid()) OR public.is_admin(auth.uid())
);

-- User Roles: Users can see own roles, Owners can manage all
CREATE POLICY "Users can see own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Owners can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.is_owner(auth.uid()));

-- Organizations: Only owners can manage their organization
CREATE POLICY "Owners can manage their organization"
ON public.organizations FOR ALL
TO authenticated
USING (public.is_owner(auth.uid()));

CREATE POLICY "Authenticated users can see their organization"
ON public.organizations FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND organization_id = public.organizations.id
  )
);
