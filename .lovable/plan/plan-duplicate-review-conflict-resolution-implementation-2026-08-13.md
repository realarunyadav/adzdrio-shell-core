# Plan: Duplicate Review & Conflict Resolution Implementation

Implement the Owner/Admin Data Quality workspace for duplicate detection, comparison, and resolution within the existing Admin Studio architecture.

## 1. Mock Data Extension
- Add `DuplicateCase` and `DuplicateAudit` models to `src/lib/mock/workspace.demo.ts`.
- Create realistic demo cases for Customers, Leads, Employees, and Businesses.
- Include "Clear duplicate", "Possible duplicate with conflicts", and "Not-a-duplicate" scenarios.
- Add session-persistent state for tracking resolutions and audit logs.

## 2. Duplicate Review Workspace
- Create `src/routes/modules.admin.duplicates.tsx` as the main dashboard.
- Implement high-density KPI cards for duplicate counts and status.
- Add advanced filtering by Entity Type, Business, Status, and Import ID.
- Integrate with `GlobalSearchOverlay.tsx`.

## 3. High-Density Review Table
- Implement the primary record list with confidence scores and matching reasons.
- Add visual indicators for match strength.
- Map statuses: Pending Review, Confirmed, Not Duplicate, Merged, Rejected.

## 4. Side-by-Side Conflict Resolver
- Create `src/components/admin-studio/modals/ConflictResolutionModal.tsx`.
- Implement a 4-step workflow:
  1. **Compare**: Visual side-by-side field comparison with diff highlighting.
  2. **Resolve**: Field-level value selection (Keep A, Keep B, or custom selection).
  3. **Preview**: Final merge preview showing source -> result.
  4. **Confirm**: Final safety check and audit creation.
- Display related data counts (Leads, Sales, etc.) to ensure safety.

## 5. Integration & Routing
- Update `src/routes/modules.admin.tsx` to include the "Data Quality" tab.
- Link conceptually to the Data Import flow by displaying Import IDs and sources.
- Register new routes and verify tab persistence.

## 6. QA & Audit
- Implement the resolution success/failure states.
- Verify audit logging for every action.
- Test responsive stacking for mobile views.
- Ensure first-click responsiveness across all actions.

## Technical Details
- **Architecture**: TanStack Router with nested admin modules.
- **Styling**: Tailwind v4 with the established Gold/Navy/Slate enterprise theme.
- **Components**: shadcn/ui (Dialog, Tabs, Badge, Table, ScrollArea).
- **Icons**: Lucide-react (Copy, GitMerge, ShieldCheck, AlertCircle).
