import { api } from "./client";

export const crmRelationsService = {
  accounts: {
    list: (params?: { search?: string; status?: string }) => {
      const q = new URLSearchParams();
      if (params?.search) q.set("search", params.search);
      if (params?.status) q.set("status", params.status);
      return api.get<any[]>(`/api/crm/accounts${q.toString() ? `?${q}` : ""}`);
    },
    get: (id: string) => api.get<any>(`/api/crm/accounts/${id}`),
    create: (data: any) => api.post<any>("/api/crm/accounts", data),
    update: (id: string, data: any) => api.patch<any>(`/api/crm/accounts/${id}`, data),
    remove: (id: string) => api.delete(`/api/crm/accounts/${id}`),
  },
  contacts: {
    list: (params?: { search?: string; accountId?: string; status?: string }) => {
      const q = new URLSearchParams();
      if (params?.search) q.set("search", params.search);
      if (params?.accountId) q.set("accountId", params.accountId);
      if (params?.status) q.set("status", params.status);
      return api.get<any[]>(`/api/crm/contacts${q.toString() ? `?${q}` : ""}`);
    },
    get: (id: string) => api.get<any>(`/api/crm/contacts/${id}`),
    create: (data: any) => api.post<any>("/api/crm/contacts", data),
    update: (id: string, data: any) => api.patch<any>(`/api/crm/contacts/${id}`, data),
    remove: (id: string) => api.delete(`/api/crm/contacts/${id}`),
  },
  deals: {
    list: (params?: { search?: string; stage?: string; ownerId?: string; accountId?: string }) => {
      const q = new URLSearchParams();
      Object.entries(params ?? {}).forEach(([key, value]) => { if (value) q.set(key, value); });
      return api.get<any[]>(`/api/deals${q.toString() ? `?${q}` : ""}`);
    },
    get: (id: string) => api.get<any>(`/api/deals/${id}`),
    create: (data: any) => api.post<any>("/api/deals", data),
    update: (id: string, data: any) => api.patch<any>(`/api/deals/${id}`, data),
    remove: (id: string) => api.delete(`/api/deals/${id}`),
    pipeline: () => api.get<any>("/api/deals/pipeline"),
  },
};
