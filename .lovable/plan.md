# Implementation Plan - Owner Command Center & Admin Studio UI

Build a comprehensive "Owner Command Center" as the default `/app` dashboard and a dedicated "Admin Studio" landing page. All data will remain mock/prototype-only.

## User Review Required

> [!IMPORTANT]
> - I will be replacing the current "CRM Dashboard" at `/app` with the "Owner Command Center".
> - Admin Studio will now have a visual landing page instead of a basic list.
> - All calculations and data remain mock/simulated.

## Proposed Changes

### 1. Mock Data Layer
- Update `src/lib/mock/workspace.demo.ts` with:
    - Detailed business-specific performance data (Revenue, Sales, Leads by brand).
    - Team performance metrics (Employee names, sales, conversion).
    - Finance snapshot (Paid, Pending, Refunds, Expenses).
    - HR stats (Active, Leave, Attendance).
    - Critical alerts (Security events, payment failures).
    - Company-wide activity feed items.

### 2. Owner Command Center (the new `/app`)
- Transform `src/routes/app.tsx`:
    - **Header**: Add title "Owner Command Center", subtitle, and date range presets.
    - **KPI Row**: Premium cards for Revenue, Paid Sales, Active Customers, New Leads, Conversion Rate, and Pending Payments.
    - **Business Performance**: A comparing view of all brands/businesses.
    - **Sales & CRM Analytics**: Charts for trends and funnel visualization.
    - **Team Performance**: A searchable table of employees and their key metrics.
    - **Finance & HR Snapshots**: Side-by-side overview panels.
    - **Needs Attention**: High-severity alerts section.
    - **Activity Feed**: Company-wide events.

### 3. Admin Studio Landing Page
- Update `src/components/admin-studio/AdminStudioHome.tsx` (and `src/routes/modules.admin.tsx` if needed):
    - Create a grid of "Category Cards" (Organization, People & Access, CRM, Sales, HR, Legal, Communication, Integrations, Security, Data, System).
    - Each card will display its sub-modules and a brief description.
    - Link categories to placeholder pages.

### 4. Components & Refinement
- Create/Refine shared components in `src/components/shared`:
    - `BusinessPerformanceCard.tsx`: For comparing brands.
    - `AlertBanner.tsx`: For the "Needs Attention" section.
    - `SimpleChart.tsx`: A lightweight wrapper for visual trends.
    - `AdminCategoryCard.tsx`: For the Admin Studio grid.

## Technical Details

- **Responsive Grid**: Use `grid-cols-12` layouts to efficiently use desktop space while stacking for mobile.
- **Lucide Icons**: Use standard enterprise icons for different business domains.
- **State States**: Implement `Skeleton` loaders and "No Data" overlays as requested for each major widget.

