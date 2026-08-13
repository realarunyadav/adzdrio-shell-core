---
name: Multi-Business CRM Polishing
description: Polishing the CRM modules (Follow-ups, Callbacks, Customers) with realistic mock data, improved UI density, and a dedicated Customer Details drawer.
type: feature
---
## Implementation Plan

### 1. Sidebar Fix
- Modify `src/components/layout/AppSidebar.tsx` to remove the hardcoded "Dashboard" link in the sub-menu, as the parent module link already serves this purpose when clicked.

### 2. Enhanced Mock Data
- Update `src/lib/mock/workspace.demo.ts` with:
    - Expanded `DemoLead` interface to support more fields (type, scheduled time, priority, callback reason, etc.).
    - Richer `demoLeads` array with records specifically tagged for Follow-ups and Callbacks (Due Today, Upcoming, Overdue, Completed).
    - New `demoCustomers` array with sales/financial metadata.

### 3. CRM Module Polishing
- **Follow-ups (`src/routes/app/crm/follow-ups.tsx`)**: 
    - Implement tab-based filtering (Due Today, Upcoming, Overdue, Completed).
    - Add realistic empty states for each tab.
    - Improve table columns: Customer, Business, Assigned, Type, Due Date/Time, Priority, Status, Last Activity.
- **Callbacks (`src/routes/app/crm/callbacks.tsx`)**:
    - Implement tab-based filtering.
    - Improve table columns: Customer, Business, Phone, Assigned, Requested By, Scheduled Date/Time, Priority, Status, Reason.
    - Refine "Call Now" action styling.
- **Customers (`src/routes/app/crm/customers.tsx`)**:
    - richer table: Customer, Business, Phone, Email, Assigned, Status, Last Activity, Next Follow-up, Total Sales, Pending.
    - Add business/employee/status filters.
    - Add bulk selection and export UI.

### 4. Customer Details Drawer
- Create `src/components/crm/CustomerDetailsDrawer.tsx` (derived from `LeadDetailsDrawer` pattern):
    - Header: Status, Priority, Name, Business, Assigned, Contact Info.
    - Quick Actions: Call, Message, Add Follow-up, Schedule Callback, Note.
    - Summary Grid: Total Sales, Pending, Last Activity, Next Follow-up, Since.
    - Tabs: Overview, Activity (timeline), Sales, Follow-ups, Callbacks, Payments, Notes, Documents.

### 5. Shared Interactions
- Ensure Lead Pool and My Leads continue to use their existing drawers while Customers uses the new enhanced version.
- Unified enterprise styling (orange/gold accents, high-density typography).
