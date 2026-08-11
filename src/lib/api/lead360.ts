import { api } from "./client";

export interface LeadActivity {
  id: string;
  leadId: string;
  actorId?: string | null;
  action: string;
  details?: Record<string, any> | null;
  createdAt: string;
}

export interface LeadTask {
  id: string;
  leadId: string;
  assigneeId?: string | null;
  title: string;
  description?: string | null;
  taskType: "FOLLOW_UP" | "CALL" | "WHATSAPP" | "EMAIL" | "MEETING" | "OTHER";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  dueAt?: string | null;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadConversionResult {
  success: boolean;
  leadId: string;
  contactId: string;
  accountId: string | null;
  message: string;
}

export const lead360Service = {
  getActivities: (leadId: string) => api.get<LeadActivity[]>(`/api/leads/${leadId}/activities`),
  addActivity: (leadId: string, data: { action: string; note?: string; details?: Record<string, unknown> }) =>
    api.post<LeadActivity>(`/api/leads/${leadId}/activities`, data),
  getTasks: (leadId: string, includeCompleted = true) =>
    api.get<LeadTask[]>(`/api/leads/${leadId}/tasks?includeCompleted=${includeCompleted}`),
  createTask: (leadId: string, data: Partial<LeadTask> & { title: string }) =>
    api.post<LeadTask>(`/api/leads/${leadId}/tasks`, data),
  updateTask: (leadId: string, taskId: string, data: Partial<LeadTask>) =>
    api.patch<LeadTask>(`/api/leads/${leadId}/tasks/${taskId}`, data),
  deleteTask: (leadId: string, taskId: string) =>
    api.delete(`/api/leads/${leadId}/tasks/${taskId}`),
  convert: (leadId: string, data?: { accountName?: string; contactEmail?: string }) =>
    api.post<LeadConversionResult>(`/api/leads/${leadId}/convert`, data ?? {}),
};
