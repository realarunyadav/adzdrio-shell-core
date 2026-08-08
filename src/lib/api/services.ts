import { api } from "./client";

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  value: number;
  // ... other fields
}

export const leadsService = {
  getAll: () => api.get<Lead[]>("/leads"),
  getById: (id: string) => api.get<Lead>(`/leads/${id}`),
  create: (data: Partial<Lead>) => api.post<Lead>("/leads", data),
  update: (id: string, data: Partial<Lead>) => api.patch<Lead>(`/leads/${id}`, data),
};

export const financeService = {
  getStats: () => api.get<any>("/finance/stats"),
  getInvoices: () => api.get<any[]>("/finance/invoices"),
};

export const incentiveService = {
  getPrograms: () => api.get<any[]>("/incentives/programs"),
  getAchievements: () => api.get<any[]>("/incentives/achievements"),
};

export const automationService = {
  getWorkflows: () => api.get<any[]>("/automation/workflows"),
  getExecutions: () => api.get<any[]>("/automation/executions"),
};
