# Implementation Plan - Multi-Business CRM/ERP App Shell & Dashboard

The objective is to implement a production-grade application shell and a comprehensive dashboard at the `/app` route, while maintaining the existing `/auth` screen as the entry point. This includes a premium sidebar, header, global search, and realistic mock data widgets.

## User Review Required

> [!IMPORTANT]
> This is a UI/UX prototype phase. Backend logic, authentication, and external integrations (calling, payments, legal) are mock implementations using local data.

- **Navigation Structure**: The sidebar will display the full hierarchy (CRM, Sales, Support, Finance, HR, Admin Studio) but items will lead to placeholder "Phase 2" views or the module dashboards where available.
- **Mock Data**: Dashboard KPIs and widgets will use realistic demo data to showcase the intended high-information-density design.
- **Authentication**: The `/auth` page remains functional; clicking "Authorize Session" will navigate to the `/app` dashboard.

## Proposed Changes

### Core Routing & Layout
- **`src/routes/__root.tsx`**: Update layout logic to ensure `/app` routes are wrapped in `AppShell` (Sidebar + Header) and `/auth` remains full-screen.
- **`src/routes/app.tsx`**: Enhance the dashboard with complete production-grade widgets: KPI cards, sales pipeline, activity feed, follow-up queue, callback queue, and recent collections.

### Sidebar & Navigation
- **`src/core/modules/modules.config.ts`**: Update the module registry with the full requested navigation structure (CRM, Sales, Support, Finance, HR, Admin Studio) and nested items.
- **`src/components/layout/AppSidebar.tsx`**: Enhance to support nested navigation and the expanded navigation tree.

### UI Components & Widgets
- **`src/components/workspace/BusinessSwitcher.tsx`**: Refine for a premium look with search and switch confirmation.
- **`src/components/search/GlobalSearch.tsx`**: Implement the categorized results UI (Customers, Leads, Employees, etc.) as placeholders.
- **`src/components/shared/DashboardKpiCard.tsx`**: Update for consistent premium styling.
- **New Dashboard Widgets**: Create or refine widgets for Follow-ups, Callbacks, and Payments in `src/routes/app.tsx`.

### Mock Data Layer
- **`src/lib/mock/workspace.demo.ts`**: Expand with data for all dashboard sections to ensure a "populated" feel.

## Technical Details
- **Architecture**: Separates presentation from logic using a mock data layer, allowing future backend integration by swapping the data source.
- **Styling**: Uses Tailwind v4 with the project's existing design system tokens for a cohesive "Enterprise Shell" aesthetic.
- **Responsiveness**: Desktop-first design with mobile-responsive adjustments for the sidebar and grid layouts.

## Verification Plan

### Automated Checks
- `bunx vitest` (if tests exist) to ensure no regressions in core logic.
- Type checking to verify component prop consistency.

### Manual Verification
1. Open the preview at `/auth` -> Verify the login card is centered.
2. Click "Authorize Session" -> Verify navigation to `/app`.
3. At `/app` -> Verify Sidebar (left), Header (top), and Dashboard (main content).
4. Verify Sidebar items match the requested hierarchy.
5. Verify Dashboard contains all requested widgets (KPIs, Activity, Queues).
6. Test Sidebar collapse/expand functionality.
