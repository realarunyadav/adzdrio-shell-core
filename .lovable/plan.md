# Plan: ABOS CRM — Phase 9 Sales Service Layer Integration

Implement the service layer for the Sales domain, connecting the frontend UI to live Supabase data.

## User Review Required

> [!IMPORTANT]
> The implementation uses `sales_plans`, `sales`, and `sales_subscriptions` tables. UI components will transition from mock data to live TanStack Query hooks.

- **Sales Plans**: Live catalog for the Create Sale Wizard.
- **Deals/Sales**: Real-time pipeline and transaction tracking.
- **Subscriptions**: Active service management and renewals.

## Technical Details

### 1. API Service Layer
Create `src/lib/api/sales.functions.ts` to implement:
- `salesPlanService`: CRUD for `sales_plans`.
- `dealService` (renamed/expanded): CRUD for `sales` table (Deals).
- `subscriptionService`: CRUD for `sales_subscriptions`.
- `salesService` (utility): Aggregates for dashboards and Customer 360.

### 2. Frontend Integration
Update routes and components to use `useQuery` and `useMutation` via `useServerFn`:
- `src/routes/app/sales/plans.tsx`: Fetch live plans.
- `src/routes/app/sales/deals.tsx`: Fetch live transaction records.
- `src/components/sales/CreateSaleWizard.tsx`: Fetch live plans for selection and implement `createSale` mutation.
- `src/components/sales/SaleDetailsDrawer.tsx`: Fetch detailed sale/deal data.
- `src/routes/app/sales/index.tsx`: Update Sales Command Center KPIs with live aggregates.

### 3. Customer 360 Enhancements
Update `customerService.get360` in `src/lib/api/crm.functions.ts` to include:
- Associated sales/deals.
- Active subscriptions.
