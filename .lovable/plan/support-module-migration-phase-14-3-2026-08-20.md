# Support Module Migration (Phase 14.3)

Implement the live Support Service layer and migrate the Support Module (Command Center, Tickets Ledger, and Details) from mock data to the hardened Supabase backend.

## Technical Details

### 1. Types & Schema Mapping (`src/lib/api/support.types.ts`)
Define TypeScript interfaces matching the Supabase schema:
- `SupportCategory`: Ticket categories with SLA definitions.
- `SupportTicket`: Core ticket data with customer and employee relations.
- `SupportMessage`: Thread messages (public/internal).
- `SupportArticle`: Knowledge base content.
- `SupportStats`: Aggregated metrics for the Command Center.

### 2. Live Service Layer (`src/lib/api/support.functions.ts`)
Implement `createServerFn` handlers using `context.supabase` for secure data access:
- `getSupportStats`: Real-time KPI aggregation (Open, Pending, SLA Status).
- `listTickets`: Filterable ticket ledger with pagination.
- `getTicketDetails`: Full ticket context including message thread and activity.
- `updateTicket`: Status transitions and assignment.
- `addMessage`: Customer replies and internal notes.
- `listArticles`: Knowledge base retrieval.

### 3. Service Integration (`src/lib/api/services.ts`)
- Export `supportService` as the unified entry point for the frontend.

### 4. UI Migration
Refactor components to use `useSuspenseQuery` with the new server functions:
- `src/routes/app/support/index.tsx`: Replace mock stats with `getSupportStats`.
- `src/routes/app/support/tickets.tsx`: Replace `demoSupportTickets` with `listTickets`.
- `src/components/support/TicketDetailsDrawer.tsx`: Replace mock activities with live `SupportMessage` thread.

### 5. Security & Validation
- Enforce Zod input validation on all server functions.
- Verify that RLS hardened in Phase 14.2 correctly filters data based on user role (OWNER/ADMIN/MANAGER/SUPPORT).
