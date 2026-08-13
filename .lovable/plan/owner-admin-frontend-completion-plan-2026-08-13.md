# Owner / Admin Frontend Completion Plan

Complete the high-fidelity enterprise frontend for Owner/Admin roles, focusing on Admin Studio, Organization Management, People & Access, Security, Audit, and System Configuration.

## User Impact
Owners and Admins will have a comprehensive command center to manage the entire enterprise, including multi-brand support, employee lifecycles, and security oversight.

## Technical Details
- **Architecture**: All screens remain under the authenticated shell `/app` or `/modules/admin`.
- **Navigation**: Update `modules.config.ts` to ensure all Admin Studio categories are properly mapped.
- **State Management**: Use shared demo state in `workspace.demo.ts` for cross-component persistence during the session.
- **Components**: Create specialized Admin Studio sub-components for each management domain (Security, Audit, People, etc.).

## Proposed Changes

### Core Configuration
- Update `src/core/modules/modules.config.ts` to refine Admin Studio sub-navigation and groups.
- Update `src/lib/mock/workspace.demo.ts` with comprehensive models for:
  - `DemoEmployee` (with Code, Business Access, Session info)
  - `DemoAuditLog`
  - `DemoSecurityEvent`
  - `DemoIntegration`

### Routes & Components
#### 1. Organization & Business Management
- `src/routes/modules/admin/business.tsx`: Multi-brand management UI.
- `src/components/admin-studio/BusinessManager.tsx`: Dashboard for status, managers, and brand settings.

#### 2. People & Access
- `src/routes/modules/admin/employees.tsx`: Central employee directory.
- `src/components/admin-studio/EmployeeDirectory.tsx`: Detailed list with Employee Code, role, and status.
- `src/routes/modules/admin/roles.tsx`: Permissions hierarchy UI.

#### 3. Security & Audit
- `src/routes/modules/admin/security.tsx`: Security hub (sessions, device info, alerts).
- `src/routes/modules/admin/audit.tsx`: Immutable Audit Center with categories (CRM, HR, Finance).

#### 4. System & Integration
- `src/routes/modules/admin/integrations.tsx`: Integration Manager with cards for Leegality, Payment Gateways, etc.
- `src/routes/modules/admin/data.tsx`: Centralized Data Import/Export/Backup workspace.
- `src/routes/modules/admin/system.tsx`: Global settings (localization, business hours).

#### 5. Shared Infrastructure
- `src/components/shared/GlobalSearchOverlay.tsx`: Enhanced search supporting Phone, IDs, and filtered results.

## Verification Plan
### Automated Tests
- Playwright script to verify navigation from `/app` to each Admin Studio submodule.
- Verify visibility of "Employee Code" in the employee directory.

### Manual Verification
- Confirm `/auth` and existing `/app/crm`, `/app/sales`, etc. remain operational.
- Check loading/empty/error states for new Admin tables.
- Verify responsive layout on mobile viewports for Admin Studio.
