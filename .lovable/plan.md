# Phase 15.4: Legal UI Live Wiring Plan

Connect the existing Legal UI components to the live `legalService` layer (Supabase-backed server functions).

## 1. Map UI to Service Layer

- `src/routes/modules.admin.legal.tsx` (Templates/Prohibited Terms)
  - Templates list: `legalService.listTemplates()`
  - Create template: `legalService.createTemplate()`
  - Update template: `legalService.updateTemplate()`
  - Prohibited Terms list: `legalService.listComplianceRules()`
- `src/components/admin-studio/PolicyManager.tsx`
  - Policy versions list: `legalService.listVersions()`
  - Create new version: `legalService.createVersion()`
- `src/components/admin-studio/drawers/DocumentDetailsDrawer.tsx`
  - Document details: `legalService.getDocumentById()`
  - Signatures/Activity: `legalService.listSignatures()`
- `src/components/admin-studio/modals/LegalTemplateModal.tsx`
  - Validation check: `legalService.listComplianceRules()` (scans content)

## 2. Implementation Steps

### A. Route Wiring (`/modules/admin/legal`)
- Replace `React.useState(demoLegalTemplates)` with `useSuspenseQuery` for templates.
- Wire `handleSave` to `useMutation` calling `legalService.createTemplate/updateTemplate`.
- Wire "Prohibited Terms" tab to `legalService.listComplianceRules()`.
- Add `Skeleton` loaders for table and grid views.

### B. Component Wiring
- **PolicyManager**: Transition `adminService.getPolicyVersions` (legacy) to `legalService.listVersions()` and `listLegalTemplates()`.
- **LegalTemplateModal**: Replace `demoProhibitedTerms` filter with a live check against `legalService.listComplianceRules()`.
- **DocumentDetailsDrawer**: Fetch live signatures and version history using TanStack Query.

### C. UI/UX Refinement
- Implement loading states using `Skeleton` from shadcn.
- Add `EmptyState` patterns for when no templates/rules exist.
- Ensure error boundaries catch service failures.

## 3. Technical Details

- **Query Keys**: 
  - `['legal', 'templates']`
  - `['legal', 'compliance-rules']`
  - `['legal', 'versions', templateId]`
  - `['legal', 'documents', documentId]`
  - `['legal', 'signatures', documentId]`
- **RBAC**: Enforce `110` (Owner) and `100` (Admin) checks at the route/component level.
- **Loading UI**: Use `TableSkeleton` for the templates ledger.
