import { 
  Zap, 
  Play, 
  Settings, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  History, 
  Plus, 
  ChevronRight, 
  Filter,
  ArrowRight,
  MoreVertical,
  Mail,
  Bell,
  Check,
  User,
  Ticket,
  Package,
  ShieldCheck,
  RefreshCw,
  Search,
  Activity,
  Code,
  Box,
  CornerDownRight,
  Trash2,
  Copy,
  ToggleLeft,
  ToggleRight,
  Database
} from "lucide-react";

export type WorkflowStatus = "active" | "inactive" | "draft" | "error";

export type TriggerType = 
  | "record_created" 
  | "record_updated" 
  | "status_changed" 
  | "payment_received" 
  | "payment_verified" 
  | "sale_created" 
  | "subscription_expiring" 
  | "ticket_created" 
  | "ticket_escalated" 
  | "follow_up_due" 
  | "employee_event" 
  | "inventory_threshold_reached";

export type ConditionOperator = 
  | "equals" 
  | "not_equals" 
  | "greater_than" 
  | "less_than" 
  | "contains" 
  | "is_empty" 
  | "is_not_empty";

export type ActionType = 
  | "create_record" 
  | "update_record" 
  | "assign_record" 
  | "create_follow_up" 
  | "create_task" 
  | "send_email" 
  | "send_notification" 
  | "add_tag" 
  | "remove_tag" 
  | "request_approval" 
  | "create_support_ticket" 
  | "create_activation_task";

export interface WorkflowCondition {
  id: string;
  field: string;
  operator: ConditionOperator;
  value: string;
}

export interface WorkflowAction {
  id: string;
  type: ActionType;
  config: Record<string, any>;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  trigger: TriggerType;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  version: number;
  successRate: number;
  totalExecutions: number;
  lastRun?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExecutionLog {
  id: string;
  workflowId: string;
  workflowName: string;
  trigger: TriggerType;
  recordId: string;
  recordName: string;
  status: "success" | "failed" | "retrying";
  startedAt: string;
  completedAt?: string;
  actionsExecuted: string[];
  error?: string;
  retryCount: number;
}

export const TRIGGER_LABELS: Record<TriggerType, { label: string; icon: any }> = {
  record_created: { label: "Record Created", icon: Plus },
  record_updated: { label: "Record Updated", icon: Settings },
  status_changed: { label: "Status Changed", icon: RefreshCw },
  payment_received: { label: "Payment Received", icon: Database },
  payment_verified: { label: "Payment Verified", icon: ShieldCheck },
  sale_created: { label: "Sale Created", icon: Zap },
  subscription_expiring: { label: "Subscription Expiring", icon: Clock },
  ticket_created: { label: "Ticket Created", icon: Ticket },
  ticket_escalated: { label: "Ticket Escalated", icon: AlertCircle },
  follow_up_due: { label: "Follow-up Due", icon: Calendar },
  employee_event: { label: "Employee Event", icon: User },
  inventory_threshold_reached: { label: "Inventory Threshold Reached", icon: Package },
};

export const ACTION_LABELS: Record<ActionType, { label: string; icon: any }> = {
  create_record: { label: "Create Record", icon: Plus },
  update_record: { label: "Update Record", icon: Settings },
  assign_record: { label: "Assign Record", icon: User },
  create_follow_up: { label: "Create Follow-up", icon: Clock },
  create_task: { label: "Create Task", icon: CheckCircle2 },
  send_email: { label: "Send Email", icon: Mail },
  send_notification: { label: "Send Notification", icon: Bell },
  add_tag: { label: "Add Tag", icon: Tag },
  remove_tag: { label: "Remove Tag", icon: Trash2 },
  request_approval: { label: "Request Approval", icon: ShieldCheck },
  create_support_ticket: { label: "Create Support Ticket", icon: Ticket },
  create_activation_task: { label: "Create Activation Task", icon: Zap },
};

import { Calendar, Tag } from "lucide-react";
