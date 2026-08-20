-- Fix infinite recursion in employees table RLS
-- The recursive "Managers can view subordinates" policy is the most likely cause.

-- 1. Drop the problematic recursive policy
DROP POLICY IF EXISTS "Managers can view subordinates" ON public.employees;

-- 2. Ensure security functions are SECURITY DEFINER to break RLS recursion chains
-- (These functions are intended to bypass RLS to check roles authoritativeley)
ALTER FUNCTION public.has_role(uuid, public.app_role) SECURITY DEFINER;
ALTER FUNCTION public.is_owner(uuid) SECURITY DEFINER;
ALTER FUNCTION public.is_admin(uuid) SECURITY DEFINER;

-- 3. Re-grant EXECUTE permissions
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_owner(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;

-- 4. Re-create a safer version of the managers policy that doesn't use WITH RECURSIVE
-- This checks if the current user is the direct manager of the employee record.
CREATE POLICY "Managers can view subordinates v2"
ON public.employees
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.employees mgr
    WHERE mgr.id = employees.reports_to_id 
    AND mgr.profile_id = auth.uid()
  )
);
