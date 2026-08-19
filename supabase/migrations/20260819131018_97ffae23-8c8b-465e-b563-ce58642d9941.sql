-- ABOS CRM — PHASE 14.1 SUPPORT DATABASE FOUNDATION
-- IMPLEMENTATION

-- 1. CREATE SUPPORT CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.support_categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Index for organization scoping
CREATE INDEX IF NOT EXISTS idx_support_categories_org ON public.support_categories(organization_id);

-- 2. CREATE SUPPORT TICKETS TABLE
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
    business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
    customer_id uuid NOT NULL REFERENCES public.crm_customers(id) ON DELETE RESTRICT,
    assigned_employee_id uuid REFERENCES public.employees(id) ON DELETE SET NULL,
    category_id uuid REFERENCES public.support_categories(id) ON DELETE SET NULL,
    subject text NOT NULL,
    status text NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Assigned', 'In Progress', 'Waiting', 'Resolved', 'Closed')),
    priority text NOT NULL CHECK (priority IN ('Critical', 'High', 'Medium', 'Low')),
    sla_status text NOT NULL DEFAULT 'Healthy' CHECK (sla_status IN ('Healthy', 'Approaching', 'Breached')),
    due_time timestamptz,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. CREATE SUPPORT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.support_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
    business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
    ticket_id uuid NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
    sender_employee_id uuid REFERENCES public.employees(id) ON DELETE SET NULL,
    body text NOT NULL,
    visibility text NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'internal')),
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 4. CREATE SUPPORT ARTICLES TABLE (KNOWLEDGE BASE)
CREATE TABLE IF NOT EXISTS public.support_articles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    category_id uuid REFERENCES public.support_categories(id) ON DELETE SET NULL,
    title text NOT NULL,
    content text NOT NULL,
    status text NOT NULL DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft', 'Archived')),
    views integer DEFAULT 0,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 5. GRANTS
GRANT SELECT, INSERT, UPDATE, DELETE ON public.support_categories TO authenticated;
GRANT ALL ON public.support_categories TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.support_tickets TO authenticated;
GRANT ALL ON public.support_tickets TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.support_messages TO authenticated;
GRANT ALL ON public.support_messages TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.support_articles TO authenticated;
GRANT ALL ON public.support_articles TO service_role;

-- 6. ENABLE RLS
ALTER TABLE public.support_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_articles ENABLE ROW LEVEL SECURITY;

-- 7. INTEGRITY PROTECTION TRIGGER
CREATE OR REPLACE FUNCTION public.check_support_integrity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_org_id uuid;
    target_biz_id uuid;
BEGIN
    -- 1. Verify Organization consistency for categories
    IF TG_TABLE_NAME = 'support_categories' THEN
        RETURN NEW; -- Standard RLS handles organization_id check
    END IF;

    -- 2. Verify Ticket integrity
    IF TG_TABLE_NAME = 'support_tickets' THEN
        -- Check Customer belongs to Organization
        SELECT organization_id, business_id INTO target_org_id, target_biz_id
        FROM public.crm_customers WHERE id = NEW.customer_id;
        
        IF NEW.organization_id != target_org_id THEN
            RAISE EXCEPTION 'Organization mismatch: Ticket (%) does not match Customer (%)', NEW.organization_id, target_org_id;
        END IF;

        IF NEW.business_id != target_biz_id THEN
            RAISE EXCEPTION 'Business mismatch: Ticket (%) does not match Customer (%)', NEW.business_id, target_biz_id;
        END IF;

        -- Check Business belongs to Organization
        SELECT organization_id INTO target_org_id
        FROM public.businesses WHERE id = NEW.business_id;

        IF NEW.organization_id != target_org_id THEN
            RAISE EXCEPTION 'Organization mismatch: Ticket (%) does not match Business (%)', NEW.organization_id, target_org_id;
        END IF;

        -- Check Assigned Employee belongs to Organization
        IF NEW.assigned_employee_id IS NOT NULL THEN
            SELECT organization_id INTO target_org_id
            FROM public.employees WHERE id = NEW.assigned_employee_id;

            IF NEW.organization_id != target_org_id THEN
                RAISE EXCEPTION 'Organization mismatch: Ticket (%) does not match Assigned Employee (%)', NEW.organization_id, target_org_id;
            END IF;
        END IF;
    END IF;

    -- 3. Verify Message integrity
    IF TG_TABLE_NAME = 'support_messages' THEN
        -- Check Ticket exists and matches Organization/Business
        SELECT organization_id, business_id INTO target_org_id, target_biz_id
        FROM public.support_tickets WHERE id = NEW.ticket_id;

        IF NEW.organization_id != target_org_id OR NEW.business_id != target_biz_id THEN
            RAISE EXCEPTION 'Integrity failure: Message Organization/Business does not match Ticket';
        END IF;

        -- Check Sender Employee matches Organization
        IF NEW.sender_employee_id IS NOT NULL THEN
            SELECT organization_id INTO target_org_id
            FROM public.employees WHERE id = NEW.sender_employee_id;

            IF NEW.organization_id != target_org_id THEN
                RAISE EXCEPTION 'Organization mismatch: Message sender (%) does not match Organization (%)', NEW.sender_employee_id, target_org_id;
            END IF;
        END IF;
    END IF;

    -- 4. Verify Article integrity
    IF TG_TABLE_NAME = 'support_articles' THEN
        IF NEW.category_id IS NOT NULL THEN
            SELECT organization_id INTO target_org_id
            FROM public.support_categories WHERE id = NEW.category_id;

            IF NEW.organization_id != target_org_id THEN
                RAISE EXCEPTION 'Organization mismatch: Article (%) does not match Category (%)', NEW.organization_id, target_org_id;
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

-- Apply integrity triggers
CREATE TRIGGER tr_support_tickets_integrity
    BEFORE INSERT OR UPDATE ON public.support_tickets
    FOR EACH ROW EXECUTE FUNCTION public.check_support_integrity();

CREATE TRIGGER tr_support_messages_integrity
    BEFORE INSERT OR UPDATE ON public.support_messages
    FOR EACH ROW EXECUTE FUNCTION public.check_support_integrity();

CREATE TRIGGER tr_support_articles_integrity
    BEFORE INSERT OR UPDATE ON public.support_articles
    FOR EACH ROW EXECUTE FUNCTION public.check_support_integrity();

-- 8. UPDATED_AT TRIGGERS
CREATE TRIGGER tr_support_categories_updated_at BEFORE UPDATE ON public.support_categories FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_support_messages_updated_at BEFORE UPDATE ON public.support_messages FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_support_articles_updated_at BEFORE UPDATE ON public.support_articles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 9. RLS POLICIES

-- SUPPORT_CATEGORIES & SUPPORT_ARTICLES: Organization-wide scoping
CREATE POLICY "OWNER full access categories" ON public.support_categories FOR ALL TO authenticated USING (public.is_owner(auth.uid()));
CREATE POLICY "ADMIN select categories" ON public.support_categories FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "STAFF select categories" ON public.support_categories FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND organization_id = public.support_categories.organization_id)
);

CREATE POLICY "OWNER full access articles" ON public.support_articles FOR ALL TO authenticated USING (public.is_owner(auth.uid()));
CREATE POLICY "ADMIN select articles" ON public.support_articles FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "STAFF select articles" ON public.support_articles FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND organization_id = public.support_articles.organization_id)
);

-- SUPPORT_TICKETS: Hierarchy based scoping
CREATE POLICY "OWNER full access tickets" ON public.support_tickets FOR ALL TO authenticated USING (public.is_owner(auth.uid()));
CREATE POLICY "ADMIN select tickets" ON public.support_tickets FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "MANAGER business tickets" ON public.support_tickets FOR SELECT TO authenticated USING (public.can_access_business(auth.uid(), business_id));
CREATE POLICY "SUPPORT assigned tickets" ON public.support_tickets FOR ALL TO authenticated USING (
    public.can_access_business(auth.uid(), business_id) OR assigned_employee_id = (SELECT id FROM public.employees WHERE profile_id = auth.uid())
);

-- SUPPORT_MESSAGES: Internal note protection
CREATE POLICY "OWNER full access messages" ON public.support_messages FOR ALL TO authenticated USING (public.is_owner(auth.uid()));
CREATE POLICY "ADMIN select messages" ON public.support_messages FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "STAFF access messages" ON public.support_messages FOR ALL TO authenticated USING (
    public.can_access_business(auth.uid(), business_id)
);
-- Note: Customer access policy will be added when customer portal is implemented.

-- 10. INDEXES
CREATE INDEX IF NOT EXISTS idx_support_tickets_org ON public.support_tickets(organization_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_biz ON public.support_tickets(business_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_customer ON public.support_tickets(customer_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned ON public.support_tickets(assigned_employee_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON public.support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created ON public.support_tickets(created_at);

CREATE INDEX IF NOT EXISTS idx_support_messages_ticket ON public.support_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_support_messages_org ON public.support_messages(organization_id);
CREATE INDEX IF NOT EXISTS idx_support_messages_created ON public.support_messages(created_at);

CREATE INDEX IF NOT EXISTS idx_support_articles_org ON public.support_articles(organization_id);
CREATE INDEX IF NOT EXISTS idx_support_articles_cat ON public.support_articles(category_id);
CREATE INDEX IF NOT EXISTS idx_support_articles_status ON public.support_articles(status);

-- 11. SECURITY DEFINER HARDENING
REVOKE EXECUTE ON FUNCTION public.check_support_integrity() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_support_integrity() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_support_integrity() TO service_role;
