-- One-time, atomic, idempotent first-owner provisioning.
CREATE OR REPLACE FUNCTION public.is_system_initialized()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'OWNER')
$$;

CREATE OR REPLACE FUNCTION public.bootstrap_first_owner(_org_name text, _org_slug text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text;
  v_name text;
  v_org_id uuid;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Serialize concurrent bootstrap attempts
  PERFORM pg_advisory_xact_lock(hashtext('abos_bootstrap_first_owner'));

  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'OWNER') THEN
    RAISE EXCEPTION 'System already initialized: an OWNER already exists';
  END IF;

  IF _org_name IS NULL OR btrim(_org_name) = '' THEN
    RAISE EXCEPTION 'Organization name is required';
  END IF;
  IF _org_slug IS NULL OR btrim(_org_slug) = '' THEN
    RAISE EXCEPTION 'Organization slug is required';
  END IF;

  SELECT email, COALESCE(raw_user_meta_data->>'display_name', raw_user_meta_data->>'full_name', split_part(email, '@', 1))
    INTO v_email, v_name
  FROM auth.users WHERE id = v_uid;

  INSERT INTO public.organizations (name, slug)
  VALUES (btrim(_org_name), lower(btrim(_org_slug)))
  RETURNING id INTO v_org_id;

  INSERT INTO public.profiles (id, organization_id, display_name, email)
  VALUES (v_uid, v_org_id, v_name, v_email)
  ON CONFLICT (id) DO UPDATE
    SET organization_id = EXCLUDED.organization_id,
        display_name = COALESCE(public.profiles.display_name, EXCLUDED.display_name),
        email = COALESCE(public.profiles.email, EXCLUDED.email),
        updated_at = now();

  UPDATE public.organizations SET owner_id = v_uid WHERE id = v_org_id;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (v_uid, 'OWNER')
  ON CONFLICT DO NOTHING;

  RETURN v_org_id;
END;
$$;

REVOKE ALL ON FUNCTION public.bootstrap_first_owner(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.bootstrap_first_owner(text, text) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.is_system_initialized() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_system_initialized() TO anon, authenticated, service_role;