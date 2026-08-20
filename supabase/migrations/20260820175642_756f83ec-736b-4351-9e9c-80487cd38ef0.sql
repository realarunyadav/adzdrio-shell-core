-- Resolve infinite recursion in employees table RLS
-- The previous attempt at a simpler Managers policy still triggered recursion because
-- it was likely competing with other policies or the way they were evaluated.

-- 1. Drop all policies on employees to start clean
DROP POLICY IF EXISTS "Owners have full access to organization employees" ON public.employees;
DROP POLICY IF EXISTS "Admins can manage organization employees" ON public.employees;
DROP POLICY IF EXISTS "Employees can view own record" ON public.employees;
DROP POLICY IF EXISTS "Managers can view business employees" ON public.employees;
DROP POLICY IF EXISTS "Managers can view subordinates v2" ON public.employees;
DROP POLICY IF EXISTS "Staff can view peers in same business" ON public.employees;

-- 2. Create simplified policies using SECURITY DEFINER functions to break recursion
-- is_owner() and is_admin() are SECURITY DEFINER, so they don't trigger RLS when checking roles.

CREATE POLICY "Owners have full access to organization employees"
ON public.employees
FOR ALL
TO authenticated
USING (public.is_owner(auth.uid()));

CREATE POLICY "Admins can manage organization employees"
ON public.employees
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Employees can view own record"
ON public.employees
FOR SELECT
TO authenticated
USING (profile_id = auth.uid());

-- Simplified Managers policy that avoids any sub-queries back to employees or profiles
-- by relying on the user_roles table which is the source of truth for scope.
CREATE POLICY "Managers can view business employees"
ON public.employees
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'MANAGER'
    AND (business_id = employees.business_id OR business_id IS NULL)
  )
);

-- Re-grant execute on functions to authenticated role
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_owner(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_employee_id(uuid) TO authenticated;
