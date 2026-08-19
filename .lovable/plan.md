# Phase 6: Finance Domain Foundation

This plan implements the core database schema for the Finance domain, establishing the source of truth for revenue, collections, and financial auditing.

## 1. Database Schema (Migration)

### Step 1: Core Finance Tables
Create the foundational tables for transactions, invoices, and payments.

```sql
-- 1. Financial Accounts (Internal ledgers/accounts)
CREATE TABLE public.financial_accounts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    business_id uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
    name text NOT NULL,
    type text NOT NULL CHECK (type IN ('asset', 'liability', 'equity', 'revenue', 'expense')),
    currency text NOT NULL DEFAULT 'USD',
    balance numeric NOT NULL DEFAULT 0,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Invoices
CREATE TABLE public.invoices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    business_id uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
    customer_id uuid NOT NULL, -- references external customer identity
    invoice_number text UNIQUE NOT NULL,
    amount numeric NOT NULL,
    currency text NOT NULL DEFAULT 'USD',
    status text NOT NULL CHECK (status IN ('draft', 'sent', 'paid', 'void', 'overdue')),
    due_date date,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. Payments (Collections)
CREATE TABLE public.payments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    business_id uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
    invoice_id uuid REFERENCES public.invoices(id) ON DELETE SET NULL,
    amount numeric NOT NULL,
    currency text NOT NULL DEFAULT 'USD',
    method text NOT NULL CHECK (method IN ('card', 'bank_transfer', 'cash', 'credit')),
    status text NOT NULL CHECK (status IN ('pending', 'verified', 'failed', 'refunded')),
    transaction_reference text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now()
);
```

### Step 2: Grants and RLS
Apply strict multi-tenant protection.

```sql
GRANT SELECT, INSERT, UPDATE ON public.financial_accounts TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.invoices TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.payments TO authenticated;

ALTER TABLE public.financial_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- OWNER & ADMIN see everything in their org
CREATE POLICY "Finance access for privileged roles" ON public.financial_accounts
    FOR ALL TO authenticated
    USING (
        public.has_role(auth.uid(), 'OWNER') OR 
        public.has_role(auth.uid(), 'ADMIN')
    );

-- Repeat similar for invoices/payments
```

## 2. API Integration
Update `src/lib/api/services.ts` to bridge these new tables via server functions (future step) or direct client calls where appropriate.

## 3. Data Integrity Rules
- **Multi-Currency**: Enforce no-sum across different `currency` fields.
- **Audit**: Every financial record creation triggers an `audit_log` entry.

## 4. Verification
- Verify table creation and RLS policies.
- Ensure `FinanceDashboard` can eventually consume this live data.
