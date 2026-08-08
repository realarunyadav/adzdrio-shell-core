import { Workflow, ExecutionLog } from "./types";

export const mockWorkflows: Workflow[] = [
  {
    id: "wf-1",
    name: "Payment Verification Workflow",
    description: "Automates activation tasks and notifications after payment verification.",
    status: "active",
    trigger: "payment_verified",
    conditions: [],
    actions: [
      { id: "a1", type: "create_activation_task", config: { priority: "high" } },
      { id: "a2", type: "send_notification", config: { team: "Activation" } },
      { id: "a3", type: "send_email", config: { template: "welcome_customer" } }
    ],
    version: 2,
    successRate: 98.5,
    totalExecutions: 1240,
    lastRun: "2026-08-08T15:30:00Z",
    createdBy: "System Admin",
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-06-15T14:20:00Z"
  },
  {
    id: "wf-2",
    name: "Subscription Renewal Alert",
    description: "Triggers renewal tasks and notifications for expiring subscriptions.",
    status: "active",
    trigger: "subscription_expiring",
    conditions: [
      { id: "c1", field: "days_until_expiry", operator: "less_than", value: "30" }
    ],
    actions: [
      { id: "a4", type: "create_task", config: { title: "Renew Subscription" } },
      { id: "a5", type: "assign_record", config: { role: "Account Manager" } },
      { id: "a6", type: "send_notification", config: { target: "assignee" } }
    ],
    version: 1,
    successRate: 100,
    totalExecutions: 450,
    lastRun: "2026-08-08T09:15:00Z",
    createdBy: "Revenue Lead",
    createdAt: "2026-03-05T08:00:00Z",
    updatedAt: "2026-03-05T08:00:00Z"
  },
  {
    id: "wf-3",
    name: "Support SLA Breach Escalation",
    description: "Escalates tickets to management if SLA is breached.",
    status: "active",
    trigger: "ticket_escalated",
    conditions: [
      { id: "c2", field: "priority", operator: "equals", value: "high" }
    ],
    actions: [
      { id: "a7", type: "assign_record", config: { role: "Support Manager" } },
      { id: "a8", type: "send_notification", config: { priority: "urgent" } }
    ],
    version: 3,
    successRate: 94.2,
    totalExecutions: 85,
    lastRun: "2026-08-07T18:45:00Z",
    createdBy: "Support Head",
    createdAt: "2026-02-15T11:00:00Z",
    updatedAt: "2026-07-20T16:10:00Z"
  }
];

export const mockExecutions: ExecutionLog[] = [
  {
    id: "ex-1",
    workflowId: "wf-1",
    workflowName: "Payment Verification Workflow",
    trigger: "payment_verified",
    recordId: "PAY-9982",
    recordName: "Invoice #9982 - Acme Corp",
    status: "success",
    startedAt: "2026-08-08T15:30:00Z",
    completedAt: "2026-08-08T15:30:05Z",
    actionsExecuted: ["Create Activation Task", "Notify Team", "Send Customer Email"],
    retryCount: 0
  },
  {
    id: "ex-2",
    workflowId: "wf-3",
    workflowName: "Support SLA Breach Escalation",
    trigger: "ticket_escalated",
    recordId: "TKT-4412",
    recordName: "Critical System Outage - TechStream",
    status: "failed",
    startedAt: "2026-08-08T14:20:00Z",
    completedAt: "2026-08-08T14:20:02Z",
    actionsExecuted: ["Assign Manager"],
    error: "Notification service unreachable",
    retryCount: 1
  }
];
