# Plan - Fix Activation Assignment Action

Fix the "ASSIGN EMPLOYEE" action in the Activation Details Drawer, which is currently non-functional for activations with "PENDING ASSIGNMENT" status.

## User Review Required

> [!IMPORTANT]
> I will implement a new `EmployeeAssignmentModal` component to handle the assignment flow. I'll also update the mock data state to ensure assignments persist during the session.

## Proposed Changes

### Activation Module

#### [NEW] `src/components/activation/EmployeeAssignmentModal.tsx`
- Create a new dialog component for selecting and confirming an employee assignment.
- Display available provisioning employees (name, role, workload, capacity).
- Include "Confirm Assignment" and "Cancel" actions.

#### `src/components/activation/ActivationDetailsDrawer.tsx`
- Connect the "ASSIGN EMPLOYEE" button to open the new `EmployeeAssignmentModal`.
- Implement a `handleAssign` callback that:
    - Updates the activation object in the `demoActivations` array.
    - Changes the status to `Assigned`.
    - Adds a record to `demoActivationActivities`.
    - Updates local state to reflect changes immediately in the drawer.

#### `src/lib/mock/workspace.demo.ts`
- Add a suggested assignee field to the `DemoActivation` interface if not present.
- Ensure `demoActivations` and `demoActivationActivities` are exported as mutable arrays (or provide helper functions to update them) so the prototype can simulate persistence.

## Technical Details
- Use `shadcn/ui` Dialog/Modal patterns for consistency.
- Implement state syncing to ensure the Activation Queue (the parent route) reflects the new assignment immediately after confirmation.
- The assignment status transition will be `Pending Assignment` -> `Assigned`.
