# Phase 1: Dependency-Safe Database Foundation

This plan implements the initial identity foundation for ABOS CRM, strictly adhering to the locked OWNER (Rank 110) and ADMIN (Rank 100) hierarchy while avoiding circular dependencies.

## 1. Database Schema (Migration)

### Step 1: Organizations (Anchor)
Create the `organizations` table without the `owner_id` constraint to break the circular dependency.

```sql
CREATE TABLE public.organizations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    settings jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
```

### Step 2: Profiles (Identity)
Create the `profiles` table referencing `auth.users` and `organizations`.

```sql
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
    display_name text,
    email text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
```

### Step 3: Authority Foundation (Roles & Functions)
Implement the `app_role` enum and the `user_roles` table.

```sql
CREATE TYPE public.app_role AS enum ('OWNER', 'ADMIN', 'MANAGER', 'SALES', 'SUPPORT', 'VIEWER');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    business_id uuid, -- Nullable, for future business-level scoping
    UNIQUE (user_id, role, business_id)
);
```

### Step 4: Circularity Resolution
Add the `owner_id` to `organizations` as a nullable reference to `profiles`.

```sql
ALTER TABLE public.organizations ADD COLUMN owner_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL;
```

## 2. Security Model (RLS & Functions)

### Security Definer Helpers
To avoid recursive RLS, we use `SECURITY DEFINER` functions to check roles.

- `public.is_owner(uid uuid)`: Checks if the user has the `OWNER` role in `user_roles`.
- `public.is_admin(uid uuid)`: Checks if the user has the `ADMIN` role in `user_roles`.
- `public.get_user_org(uid uuid)`: Returns the `organization_id` for a given user.

### Protection Rules
- **OWNER-only Protection**: Policies on `organizations` and `user_roles` (where `role='OWNER'`) will use `is_owner(auth.uid())`.
- **ADMIN Restriction**: Policies will explicitly deny `ADMIN` from modifying any row where `role='OWNER'` or where the user is an `is_owner` principal.

## 3. Technical Implementation Details
- **No Circular FK Failure**: The two-stage `organizations` creation ensures the database engine accepts the schema.
- **No Recursive RLS**: Role checks are performed via functions targeting the `user_roles` table, which itself has simple ownership-based RLS.
- **Frontend Health**: Existing TanStack Start build and `AuthProvider` bypass remain untouched during this database-only step.

## 4. Verification Plan
1. **Schema Check**: Verify all tables, enums, and FKs exist.
2. **Dependency Check**: Ensure `owner_id` in `organizations` and `organization_id` in `profiles` work correctly without conflict.
3. **Role Check**: Verify `is_owner` correctly identifies an owner and rejects an admin.
4. **Build Check**: Ensure the React application still compiles and runs.
