# Production Readiness Audit & Repair

Audit and repair of the ABOS frontend to ensure it is production-ready and correctly integrated with the NestJS backend.

## User Review Required

> [!IMPORTANT]
> This plan involves disabling or hiding frontend features that lack corresponding backend endpoints to prevent production 404s.

- **Frontend Roles**: I will be standardizing roles to `ADMIN`, `MANAGER`, `SALES`, `SUPPORT`, and `VIEWER`.
- **CRM Flow**: I will replace the "Convert Lead" button with a "Create Deal" action to align with the backend's Deal-to-Customer conversion logic.
- **Data Cleanup**: All hardcoded demo data (Acme Corp, etc.) will be replaced with real API calls or empty states.

## Technical Details

### 1. Environment & Auth Foundation
- **Environment**: Ensure `VITE_API_BASE_URL` is used correctly in `src/lib/api/client.ts`.
- **Auth**: Update `AuthProvider.tsx` to handle backend response formats for user profile and roles.
- **RBAC**: Map backend permissions to frontend UI visibility in `RbacProvider.tsx`.

### 2. CRM Integration
- **Routes**: Redirect `/modules/leads` to `/modules/crm`.
- **Services**: Verify and fix `leadsService`, `dealService`, `accountService`, and `contactService` against actual NestJS controllers.
- **Pipeline**: Implement pipeline statistics using the specialized `/api/deals/pipeline` endpoint.

### 3. Cleanup & Hardening
- **Mock Removal**: Identify and strip static demo objects from components.
- **Navigation**: Update the sidebar to hide modules that are not yet functional in the backend.
- **Error Handling**: Replace generic "Failed to fetch" with status-specific messaging.

## Progress Tracking

- [ ] Environment & Auth Hardening
- [ ] CRM Backend Alignment
- [ ] Lead 360 & Deal Flow Repair
- [ ] Production Data Audit & Cleanup
- [ ] Final End-to-End Verification
