# Plan - Complete Owner/Admin Sales & Incentive Configuration

Implement the high-fidelity Sales and Incentive configuration modules within the Admin Studio. This includes pricing plans, tax rules, multi-tier incentive slabs, and referral programs, all wired to the persistent mock data layer.

## User Review Required

> [!IMPORTANT]
> This plan focuses on the *Admin/Owner* view for configuring these rules, not the employee-facing dashboard.

- **Sales Config**: Does the proposed Plan management (Basic/Pro/Enterprise) meet the "Multi-Business" requirement?
- **Incentive Engine**: We'll implement a "Slab Builder" for Sales. Should we support fixed amounts, percentages, or both for rewards?
- **Referral Rules**: Will support multi-tier rewards (e.g., Reward 1 for the first 5 referrals, Reward 2 for 5+).

## Proposed Changes

### 1. Mock Data Layer Expansion
- Add `demoSalesPlans` and `demoTaxRules` to `src/lib/mock/workspace.demo.ts` (already partially added, will ensure full coverage).
- Expand `DemoIncentiveRule` to include multi-tier slab definitions.
- Add helper functions to simulate/calculate rewards based on rules.

### 2. Sales Configuration (`/modules/admin/sales`)
- **Plans Tab**: List existing plans with status toggles. Add a "Plan Detail Modal" to edit features, pricing, and associated business entities.
- **Payment Links**: Implement a UI for configuring global payment link behaviors (expiry, redirect URLs, brand overrides).
- **Tax Rules**: A comprehensive table for GST/TDS/VAT rules with effective dates.

### 3. Incentive Engine & Referrals (`/modules/admin/incentives`)
- **Slab Builder**: A visual UI to add/remove incentive tiers (e.g., "0-10 Sales: ₹5,000", "11-20 Sales: ₹12,000").
- **Referral Rewards**: Configuration for multi-step referral rewards.
- **Preview Engine**: A "Simulator" where admins can enter a sales volume to see how much an employee would earn under a specific rule before activating it.

### 4. Integration & Navigation
- Finalize `src/core/modules/modules.config.ts` registration.
- Ensure `⌘K` search supports finding Incentive Rules and Sales Plans.

## Technical Details

- **Components**: Use `SectionCard`, `DataTable` (or standard tables matching the admin style), and `Tabs`.
- **State**: Use local React state for wizards/modals, persisting to the `demo*` exports in `workspace.demo.ts`.
- **Validation**: Zod-based validation for rule effective dates and overlapping tiers.

## Strategy & Security

- **Rule Versioning**: Mock implementation of versioning (Version 1.0, 1.1) to show audit history.
- **Owner Scope**: These routes are restricted to the `Admin` role via existing route guards.
