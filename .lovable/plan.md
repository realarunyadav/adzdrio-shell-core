# ABOS CRM — FIX is_owner RLS EXECUTE PERMISSION

Restore `EXECUTE` permission for `is_owner(uuid)` and other security definer functions to the `authenticated` role, ensuring existing RLS policies can evaluate them correctly.

## Proposed Database Changes

### 1. New Corrective Migration
Create `supabase/migrations/20260820172500_restore_execute_permissions.sql`:
- Grant `EXECUTE` on `public.is_owner(uuid)` to `authenticated`.
- Grant `EXECUTE` on `public.is_admin(uuid)` to `authenticated`.
- Grant `EXECUTE` on `public.has_role(uuid, public.app_role)` to `authenticated`.
- Grant `EXECUTE` on `public.can_access_business(uuid, uuid)` to `authenticated`.
- Grant `EXECUTE` on `public.can_access_ticket(uuid, uuid)` to `authenticated`.
- Grant `EXECUTE` on `public.current_employee_id(uuid)` to `authenticated`.
- Grant `EXECUTE` on `public.user_org(uuid)` to `authenticated`.
- Ensure `anon` role remains denied (`REVOKE EXECUTE ... FROM anon`).

## Technical Details
The previous migration `20260820172323` revoked `EXECUTE` from `authenticated` for these functions. However, many RLS policies in the system (e.g., `support_tickets`, `businesses`) call these functions while acting as the `authenticated` user. Without `EXECUTE` permission, PostgREST returns a 403 Forbidden error during RLS evaluation.

## Verification Plan

### Automated Verification
- Run a `lovable supabase query` to check if `authenticated` can now execute `is_owner(uuid)`.
- Use Playwright to verify that navigating to `/app` (as OWNER) no longer results in a 403/stalled state.
- Verify `user_roles` query succeeds for an authenticated user.

### Manual Verification
- Check Preview startup logs for console errors related to `is_owner`.
- Confirm `/app` access for `adzdrio@gmail.com` (OWNER).
- Confirm `/modules/admin` access remains restricted to ADMIN/OWNER.
