# ABOS Enterprise UI/UX + CRM Completeness Plan

Complete the ABOS product shell and CRM modules to be production-ready and enterprise-grade without changing existing business rules or navigation.

## User Review Required

> [!IMPORTANT]
> This plan focuses on "completeness" (UX consistency, empty states, loading indicators, functional shared components) while strictly adhering to your finalized business logic and CRM data contracts.

- **Notifications**: I will replace static demo data in the `GlobalNotificationCenter` with dynamic types and real-time empty states.
- **Search & Filters**: Standardizing the look and behavior of `SearchBar` and `DataToolbar` across all modules (CRM, HRMS, Finance, etc.).
- **Productivity Components**: Ensuring `UniversalActivityTimeline`, `UniversalComments`, and `UniversalFileManager` are consistently wired in every module that needs them.
- **Role/Permissions**: Hardening the UI to respect the existing RBAC matrix (ADMIN, MANAGER, SALES, SUPPORT, VIEWER) and masking "Phase 2" ERP features appropriately.

## Technical Details

### 1. Shared UI Standardization
- **`SearchBar.tsx`**: Add `onClear` support and refine the focus ring to match the "Premium" aesthetic.
- **`DataToolbar.tsx`**: Ensure consistent spacing and mobile responsiveness across all implementations.
- **`EmptyState.tsx`**: Standardize icons and actions for every module's "No Data" scenario.
- **`StatusBadge.tsx`**: Audit all modules to ensure color tones match the defined `StatusTone` palette.

### 2. CRM Module Refinement
- **`Lead360Dialog.tsx`**:
  - Replace the "Coming Soon" tabs for Activity and Tasks with the standard `UniversalActivityTimeline` and a basic `TaskViewer`.
  - Ensure "Create Deal" context is correctly passed and toasted.
- **`modules.crm.tsx`**: Add skeleton loaders for list views and verify bulk action placement.

### 3. ERP & Platform Shells (Completeness Pass)
- **Finance/Inventory/Projects**: Ensure these mock dashboards use the unified `SectionCard` and `DataToolbar` components.
- **Admin Studio**: Wire the `PolicyManager` to the existing API contracts instead of mock states.
- **HRMS**: Standardize the employee directory table to match the CRM lead table's interaction patterns.

### 4. Global Services
- **`GlobalNotificationCenter.tsx`**: Add a "Clear All" handler placeholder that interacts with `sonner` for immediate feedback.
- **`GlobalSearch.tsx`**: Add category filtering logic to the command list to improve discovery.
- **`GlobalCommandPalette.tsx`**: Synchronize shortcuts with the `AppSidebar` and `AppHeader`.

### 5. Interaction Hardening
- **Loading States**: Add `Suspense` boundaries and standard `<Loader2 />` overlays for every service call in `lib/api/services.ts`.
- **Error States**: Implement a standard `ErrorCard` for API failures.
- **Responsive Audit**: Fix layout breaking in the `CRM forecast` and `Renewal Center` on tablet viewports.

## Verification Plan

- **Visual Audit**: Compare every major route against the "Enterprise UI/UX" checklist (consistent headers, actions, and spacing).
- **Permission Check**: Log in as `VIEWER` and `SALES` roles to verify ERP modules show "Access Restricted" or "Phase 2" where intended.
- **Data Audit**: Verify that no new mock records are added; the UI should gracefully handle empty results from the Render backend.
