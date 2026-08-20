-- PHASE 14.2 SUPPORT RLS SECURITY HARDENING
-- Helper functions (security definer, fixed search_path)

CREATE OR REPLACE FUNCTION public.user_org(_user_id uuid)
RETURNS uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT organization_id FROM public.profiles WHERE id = _user_id
$$;

CREATE OR REPLACE FUNCTION public.current_employee_id(_user_id uuid)
RETURNS uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT id FROM public.employees WHERE profile_id = _user_id LIMIT 1
$$;

-- Ticket-level scope: OWNER org-wide, MANAGER business-scoped, SUPPORT assigned-only.
CREATE OR REPLACE FUNCTION public.can_access_ticket(_user_id uuid, _ticket_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.support_tickets t
    WHERE t.id = _ticket_id
      AND t.organization_id = public.user_org(_user_id)
      AND (
        public.is_owner(_user_id)
        OR (public.has_role(_user_id, 'MANAGER') AND public.can_access_business(_user_id, t.business_id))
        OR (
          public.has_role(_user_id, 'SUPPORT')
          AND public.can_access_business(_user_id, t.business_id)
          AND t.assigned_employee_id = public.current_employee_id(_user_id)
        )
      )
  )
$$;

-- Relationship integrity for ticket writes (RLS-level, mirrors the trigger).
CREATE OR REPLACE FUNCTION public.support_ticket_write_ok(_org uuid, _biz uuid, _customer uuid, _employee uuid, _category uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = _biz AND b.organization_id = _org)
    AND EXISTS (SELECT 1 FROM public.crm_customers c WHERE c.id = _customer AND c.organization_id = _org AND c.business_id = _biz)
    AND (_employee IS NULL OR EXISTS (
      SELECT 1 FROM public.employees e WHERE e.id = _employee AND e.organization_id = _org AND (e.business_id IS NULL OR e.business_id = _biz)))
    AND (_category IS NULL OR EXISTS (
      SELECT 1 FROM public.support_categories sc WHERE sc.id = _category AND sc.organization_id = _org))
$$;

CREATE OR REPLACE FUNCTION public.support_message_write_ok(_org uuid, _biz uuid, _ticket uuid, _sender uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    EXISTS (SELECT 1 FROM public.support_tickets t WHERE t.id = _ticket AND t.organization_id = _org AND t.business_id = _biz)
    AND (_sender IS NULL OR EXISTS (
      SELECT 1 FROM public.employees e WHERE e.id = _sender AND e.organization_id = _org AND (e.business_id IS NULL OR e.business_id = _biz)))
$$;

REVOKE ALL ON FUNCTION public.user_org(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.current_employee_id(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.can_access_ticket(uuid, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.support_ticket_write_ok(uuid, uuid, uuid, uuid, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.support_message_write_ok(uuid, uuid, uuid, uuid) FROM PUBLIC;

-- RLS predicates run as the caller, so authenticated must be able to execute the helpers.
GRANT EXECUTE ON FUNCTION public.user_org(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.current_employee_id(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.can_access_ticket(uuid, uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.support_ticket_write_ok(uuid, uuid, uuid, uuid, uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.support_message_write_ok(uuid, uuid, uuid, uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_owner(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.can_access_business(uuid, uuid) TO authenticated, service_role;

-- Drop the coarse Phase 14.1 policies
DROP POLICY IF EXISTS "OWNER full access tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "ADMIN select tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "MANAGER business tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "SUPPORT assigned tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "OWNER full access messages" ON public.support_messages;
DROP POLICY IF EXISTS "ADMIN select messages" ON public.support_messages;
DROP POLICY IF EXISTS "STAFF access messages" ON public.support_messages;
DROP POLICY IF EXISTS "OWNER full access categories" ON public.support_categories;
DROP POLICY IF EXISTS "ADMIN select categories" ON public.support_categories;
DROP POLICY IF EXISTS "STAFF select categories" ON public.support_categories;
DROP POLICY IF EXISTS "OWNER full access articles" ON public.support_articles;
DROP POLICY IF EXISTS "ADMIN select articles" ON public.support_articles;
DROP POLICY IF EXISTS "STAFF select articles" ON public.support_articles;

-- ============ TICKETS ============
CREATE POLICY "tickets_owner_select" ON public.support_tickets FOR SELECT TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()));

CREATE POLICY "tickets_owner_insert" ON public.support_tickets FOR INSERT TO authenticated
WITH CHECK (
  public.is_owner(auth.uid())
  AND organization_id = public.user_org(auth.uid())
  AND public.support_ticket_write_ok(organization_id, business_id, customer_id, assigned_employee_id, category_id)
);

CREATE POLICY "tickets_owner_update" ON public.support_tickets FOR UPDATE TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()))
WITH CHECK (
  public.is_owner(auth.uid())
  AND organization_id = public.user_org(auth.uid())
  AND public.support_ticket_write_ok(organization_id, business_id, customer_id, assigned_employee_id, category_id)
);

CREATE POLICY "tickets_owner_delete" ON public.support_tickets FOR DELETE TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()));

-- ADMIN: technical read-only oversight
CREATE POLICY "tickets_admin_select" ON public.support_tickets FOR SELECT TO authenticated
USING (public.is_admin(auth.uid()) AND organization_id = public.user_org(auth.uid()));

-- MANAGER: business-scoped operational access (no delete)
CREATE POLICY "tickets_manager_select" ON public.support_tickets FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'MANAGER')
  AND organization_id = public.user_org(auth.uid())
  AND public.can_access_business(auth.uid(), business_id)
);

CREATE POLICY "tickets_manager_insert" ON public.support_tickets FOR INSERT TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'MANAGER')
  AND organization_id = public.user_org(auth.uid())
  AND public.can_access_business(auth.uid(), business_id)
  AND public.support_ticket_write_ok(organization_id, business_id, customer_id, assigned_employee_id, category_id)
);

CREATE POLICY "tickets_manager_update" ON public.support_tickets FOR UPDATE TO authenticated
USING (
  public.has_role(auth.uid(), 'MANAGER')
  AND organization_id = public.user_org(auth.uid())
  AND public.can_access_business(auth.uid(), business_id)
)
WITH CHECK (
  public.has_role(auth.uid(), 'MANAGER')
  AND organization_id = public.user_org(auth.uid())
  AND public.can_access_business(auth.uid(), business_id)
  AND public.support_ticket_write_ok(organization_id, business_id, customer_id, assigned_employee_id, category_id)
);

-- SUPPORT: business scope AND assigned ticket only (no delete)
CREATE POLICY "tickets_support_select" ON public.support_tickets FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'SUPPORT')
  AND organization_id = public.user_org(auth.uid())
  AND public.can_access_business(auth.uid(), business_id)
  AND assigned_employee_id = public.current_employee_id(auth.uid())
);

CREATE POLICY "tickets_support_insert" ON public.support_tickets FOR INSERT TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'SUPPORT')
  AND organization_id = public.user_org(auth.uid())
  AND public.can_access_business(auth.uid(), business_id)
  AND assigned_employee_id = public.current_employee_id(auth.uid())
  AND public.support_ticket_write_ok(organization_id, business_id, customer_id, assigned_employee_id, category_id)
);

CREATE POLICY "tickets_support_update" ON public.support_tickets FOR UPDATE TO authenticated
USING (
  public.has_role(auth.uid(), 'SUPPORT')
  AND organization_id = public.user_org(auth.uid())
  AND public.can_access_business(auth.uid(), business_id)
  AND assigned_employee_id = public.current_employee_id(auth.uid())
)
WITH CHECK (
  public.has_role(auth.uid(), 'SUPPORT')
  AND organization_id = public.user_org(auth.uid())
  AND public.can_access_business(auth.uid(), business_id)
  AND assigned_employee_id = public.current_employee_id(auth.uid())
  AND public.support_ticket_write_ok(organization_id, business_id, customer_id, assigned_employee_id, category_id)
);

-- ============ MESSAGES ============
CREATE POLICY "messages_owner_select" ON public.support_messages FOR SELECT TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()));

CREATE POLICY "messages_owner_insert" ON public.support_messages FOR INSERT TO authenticated
WITH CHECK (
  public.is_owner(auth.uid())
  AND organization_id = public.user_org(auth.uid())
  AND public.support_message_write_ok(organization_id, business_id, ticket_id, sender_employee_id)
);

CREATE POLICY "messages_owner_update" ON public.support_messages FOR UPDATE TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()))
WITH CHECK (
  public.is_owner(auth.uid())
  AND organization_id = public.user_org(auth.uid())
  AND public.support_message_write_ok(organization_id, business_id, ticket_id, sender_employee_id)
);

CREATE POLICY "messages_owner_delete" ON public.support_messages FOR DELETE TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()));

-- ADMIN: technical oversight limited to customer-facing messages; internal notes stay hidden.
CREATE POLICY "messages_admin_select_public" ON public.support_messages FOR SELECT TO authenticated
USING (
  public.is_admin(auth.uid())
  AND organization_id = public.user_org(auth.uid())
  AND visibility = 'public'
);

-- MANAGER (business scope) and SUPPORT (assigned tickets) may read internal notes in scope.
CREATE POLICY "messages_scoped_select" ON public.support_messages FOR SELECT TO authenticated
USING (
  organization_id = public.user_org(auth.uid())
  AND (public.has_role(auth.uid(), 'MANAGER') OR public.has_role(auth.uid(), 'SUPPORT'))
  AND public.can_access_ticket(auth.uid(), ticket_id)
);

CREATE POLICY "messages_scoped_insert" ON public.support_messages FOR INSERT TO authenticated
WITH CHECK (
  organization_id = public.user_org(auth.uid())
  AND (public.has_role(auth.uid(), 'MANAGER') OR public.has_role(auth.uid(), 'SUPPORT'))
  AND public.can_access_ticket(auth.uid(), ticket_id)
  AND sender_employee_id = public.current_employee_id(auth.uid())
  AND public.support_message_write_ok(organization_id, business_id, ticket_id, sender_employee_id)
);

CREATE POLICY "messages_scoped_update" ON public.support_messages FOR UPDATE TO authenticated
USING (
  organization_id = public.user_org(auth.uid())
  AND (public.has_role(auth.uid(), 'MANAGER') OR public.has_role(auth.uid(), 'SUPPORT'))
  AND public.can_access_ticket(auth.uid(), ticket_id)
  AND sender_employee_id = public.current_employee_id(auth.uid())
)
WITH CHECK (
  organization_id = public.user_org(auth.uid())
  AND (public.has_role(auth.uid(), 'MANAGER') OR public.has_role(auth.uid(), 'SUPPORT'))
  AND public.can_access_ticket(auth.uid(), ticket_id)
  AND sender_employee_id = public.current_employee_id(auth.uid())
  AND public.support_message_write_ok(organization_id, business_id, ticket_id, sender_employee_id)
);

-- ============ CATEGORIES (reference data) ============
CREATE POLICY "categories_owner_select" ON public.support_categories FOR SELECT TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()));

CREATE POLICY "categories_owner_insert" ON public.support_categories FOR INSERT TO authenticated
WITH CHECK (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()));

CREATE POLICY "categories_owner_update" ON public.support_categories FOR UPDATE TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()))
WITH CHECK (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()));

CREATE POLICY "categories_owner_delete" ON public.support_categories FOR DELETE TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()));

CREATE POLICY "categories_staff_select" ON public.support_categories FOR SELECT TO authenticated
USING (
  organization_id = public.user_org(auth.uid())
  AND (
    public.is_admin(auth.uid())
    OR public.has_role(auth.uid(), 'MANAGER')
    OR public.has_role(auth.uid(), 'SUPPORT')
  )
);

-- ============ ARTICLES (knowledge base) ============
CREATE POLICY "articles_owner_select" ON public.support_articles FOR SELECT TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()));

CREATE POLICY "articles_owner_insert" ON public.support_articles FOR INSERT TO authenticated
WITH CHECK (
  public.is_owner(auth.uid())
  AND organization_id = public.user_org(auth.uid())
  AND (category_id IS NULL OR EXISTS (
    SELECT 1 FROM public.support_categories sc
    WHERE sc.id = category_id AND sc.organization_id = support_articles.organization_id))
);

CREATE POLICY "articles_owner_update" ON public.support_articles FOR UPDATE TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()))
WITH CHECK (
  public.is_owner(auth.uid())
  AND organization_id = public.user_org(auth.uid())
  AND (category_id IS NULL OR EXISTS (
    SELECT 1 FROM public.support_categories sc
    WHERE sc.id = category_id AND sc.organization_id = support_articles.organization_id))
);

CREATE POLICY "articles_owner_delete" ON public.support_articles FOR DELETE TO authenticated
USING (public.is_owner(auth.uid()) AND organization_id = public.user_org(auth.uid()));

CREATE POLICY "articles_staff_select" ON public.support_articles FOR SELECT TO authenticated
USING (
  organization_id = public.user_org(auth.uid())
  AND (
    public.is_admin(auth.uid())
    OR public.has_role(auth.uid(), 'MANAGER')
    OR public.has_role(auth.uid(), 'SUPPORT')
  )
);

-- ============ GRANTS ============
REVOKE ALL ON public.support_tickets FROM anon;
REVOKE ALL ON public.support_messages FROM anon;
REVOKE ALL ON public.support_categories FROM anon;
REVOKE ALL ON public.support_articles FROM anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.support_tickets TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.support_messages TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.support_categories TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.support_articles TO authenticated;
GRANT ALL ON public.support_tickets TO service_role;
GRANT ALL ON public.support_messages TO service_role;
GRANT ALL ON public.support_categories TO service_role;
GRANT ALL ON public.support_articles TO service_role;