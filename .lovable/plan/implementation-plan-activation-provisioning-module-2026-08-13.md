# Implementation Plan - Activation & Provisioning Module

Implement a high-fidelity Activation & Provisioning module within the ABOS Enterprise shell. This module will handle the workflow from payment verification to successful service provisioning, linked to existing customer and sale data.

## User Review Required

> [!IMPORTANT]
> This is a frontend prototype. No real IPTV/device provisioning APIs will be connected. All actions will update local mock state only.

- Does the proposed "Activation Queue" capture all necessary operational fields for your workflow?
- Are the "Assignment Workspace" KPIs aligned with how you measure employee workload?

## Proposed Changes

### 1. Data Layer Extension
- **File:** `src/lib/mock/workspace.demo.ts`
- Define `DemoActivation` and `DemoActivationActivity` interfaces.
- Append mock activation records linked to existing `SALE-1001`, `SALE-1002`, etc., and customers like "Arjun Sharma".
- Add `getActivationModel()` to centralize activation-related calculations (SLA, status distribution).

### 2. Module Registration
- **File:** `src/core/modules/modules.config.ts`
- Update the `activation` module definition to use `/app/activation` as `basePath`.
- Add sub-navigation items: Dashboard, Queue, Assignments, History.

### 3. Shared Components
- **File:** `src/components/activation/ActivationDetailsDrawer.tsx`
- Build a multi-tab drawer (Overview, Activity, Subscription, Payment, History, Notes).
- Implement status transition buttons (Verify Payment, Assign, Start, Complete, etc.) with logic to show only valid next steps.
- **File:** `src/components/activation/CreateActivationWizard.tsx`
- Implement a 6-step wizard for manual activation entry.

### 4. Route Implementation
- **File:** `src/routes/app/activation/index.tsx` (Dashboard)
- KPI cards, activation volume trend (Recharts), and status distribution.
- **File:** `src/routes/app/activation/queue.tsx` (Operational Queue)
- Dense table with tabs for each status and comprehensive filtering.
- **File:** `src/routes/app/activation/assignments.tsx` (Manager Workspace)
- Workload distribution charts and employee capacity indicators.
- **File:** `src/routes/app/activation/history.tsx` (Audit Log)
- Historical records of completed/failed activations.

## Technical Details

- **Routing:** Uses TanStack Router with path-based navigation for sub-modules.
- **State Management:** Prototype state will be managed locally via React state or shared mock updates.
- **Visuals:** Standardized using existing `SectionCard`, `DashboardKpiCard`, and `PageHeader` components.
- **Consistency:** Aug 2026 timeline used for all new mock records to match existing modules.

## Resource Impact
- Adding ~10 new files.
- No impact on existing CRM, Sales, Finance, or Support routes.
