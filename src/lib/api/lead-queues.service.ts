import { api } from "./client";

export interface LeadQueue { id: string; organizationId: string; name: string; rules: Record<string, unknown>; isActive: boolean; createdAt: string; updatedAt: string; }
export type QueueRule = { field: "source" | "stage" | "city" | "state" | "scoreMin" | "scoreMax"; operator: "equals" | "contains" | "gte" | "lte"; value: string; };

export const leadQueueService = {
  list: () => api.get<LeadQueue[]>("/api/lead-queues"),
  get: (id: string) => api.get<LeadQueue>(`/api/lead-queues/${id}`),
  create: (data: { name: string; rules?: Record<string, unknown>; isActive?: boolean }) => api.post<LeadQueue>("/api/lead-queues", data),
  update: (id: string, data: { name?: string; rules?: Record<string, unknown>; isActive?: boolean }) => api.patch<LeadQueue>(`/api/lead-queues/${id}`, data),
  remove: (id: string) => api.delete<{ success: boolean; id: string }>(`/api/lead-queues/${id}`),
};
