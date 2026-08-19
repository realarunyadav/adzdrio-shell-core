# Phase 12: Finance Live Analytics Implementation

This plan implements the live analytical layer for the Finance module, replacing mock data with currency-grouped real-time metrics from the database while strictly enforcing no mixed-currency aggregations.

## 1. Shared UI Refactor
Update `DashboardKpiCard` to support a list of currency-value pairs.
- **File**: `src/components/shared/DashboardKpiCard.tsx`
- **Change**: Refactor `value` prop to accept `string | Array<{ currency: string; value: string | number }>`
- **Logic**: If multiple values exist, render them as a stacked or comma-separated list with currency symbols.

## 2. Service Layer Aggregation
Implement high-performance server-side aggregation functions.
- **File**: `src/lib/api/finance.functions.ts`
- **Functions**:
  - `getFinanceAnalytics`: Returns currency-grouped maps for Gross Revenue (from `sales`), Collected Revenue (completed payments), and Refunds (completed refunds).
  - `getInvoiceAnalytics`: Returns counts and currency-grouped outstanding amounts for 'Sent' and 'Overdue' invoices.
- **Source Selection**: `sales` will be the authoritative source for Gross Revenue to avoid double-counting with pending/draft invoices.

## 3. Data Flow Migration
Connect the Finance UI to the new service functions using TanStack Query.
- **File**: `src/components/finance/FinanceDashboard.tsx`
- **Change**: Replace internal `useEffect` state with `useSuspenseQuery` hooks for `finance-analytics` and `invoice-analytics`.
- **File**: `src/routes/app/finance/revenue.tsx`
- **Change**: Update page to use live queries and handle multi-currency series in charts.

## 4. Technical Specifications
- **Multi-Currency**: Aggregations performed via SQL `GROUP BY currency` where possible, or precise grouping in TypeScript.
- **Zero-Record State**: If queries return empty results, UI displays "0" or "No data" instead of falling back to mock values.
- **Security**: All queries use the authenticated Supabase client, inheriting business-scoped RLS policies.
- **Mock Intact**: Prototype data files remain for internal development testing but are disconnected from the primary Finance views.

## User Review Required
> [!IMPORTANT]
> Gross Revenue is being sourced from the **Sales** table rather than Invoices to ensure we capture the total billable intent regardless of whether an invoice has been generated yet. Is this alignment correct for your business model?