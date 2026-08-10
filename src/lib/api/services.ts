import { api } from "./client";
export * from "./services.types";
import {
  Customer,
  Subscription,
  Device,
  DeviceGroup,
  RapidLead,
  Renewal,
  Referral,
  ReferralReward,
  RefundRequest,
  PolicyVersion,
  DeviceCompatibilityRule,
} from "./services.types";

/**
 * AUTH SERVICE
 * Managed by the ABOS NestJS backend.
 */
export const authService = {
  login: (credentials: { email: string; password: string }) =>
    api.post<any>("/api/auth/login", credentials),
  logout: () => api.post("/api/auth/logout"),
  getCurrentSession: () => api.get<{ user: any }>("/api/auth/me"),
};

/** INVENTORY SERVICE — reserved for future backend modules. */
export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  currency: string;
  status: "active" | "archived";
  metadata?: Record<string, any>;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  code: string;
}

export interface StockLevel {
  productId: string;
  warehouseId: string;
  quantity: number;
  reserved: number;
  available: number;
}

export const inventoryService = {
  getProducts: () => api.get<Product[]>("/api/inventory/products"),
  getProductById: (id: string) => api.get<Product>(`/api/inventory/products/${id}`),
  getWarehouses: () => api.get<Warehouse[]>("/api/inventory/warehouses"),
  getStockLevels: (productId?: string) =>
    api.get<StockLevel[]>(`/api/inventory/stock${productId ? `?productId=${encodeURIComponent(productId)}` : ""}`),
  getMovements: () => api.get<any[]>("/api/inventory/movements"),
  createTransfer: (data: any) => api.post("/api/inventory/transfers", data),
  getPurchaseOrders: () => api.get<any[]>("/api/inventory/purchase-orders"),
  getGRNs: () => api.get<any[]>("/api/inventory/grns"),
  getVendors: () => api.get<any[]>("/api/inventory/vendors"),
  getAnalytics: () => api.get<any>("/api/inventory/analytics"),
};

/** AI SERVICE */
export const aiService = {
  chat: (message: string, context?: any) => api.post<any>("/api/ai/chat", { message, context }),
  streamChat: (message: string, context?: any) =>
    `${(import.meta as any).env["VITE_API_BASE_URL"]}/api/ai/chat/stream?message=${encodeURIComponent(message)}`,
  transcribe: (audioUrl: string) => api.post<any>("/api/ai/transcribe", { audioUrl }),
  analyzeCall: (transcriptId: string) => api.post<any>("/api/ai/analyze-call", { transcriptId }),
  getSalesCoach: (leadId: string) => api.get<any>(`/api/ai/sales-coach/${leadId}`),
  knowledgeSearch: (query: string) => api.get<any>(`/api/ai/knowledge?q=${encodeURIComponent(query)}`),
  getExecutiveSummary: (module: string) => api.get<any>(`/api/ai/summary/${module}`),
  submitFeedback: (aiResponseId: string, feedback: any) => api.post(`/api/ai/feedback/${aiResponseId}`, feedback),
};

/** STORAGE SERVICE */
export const storageService = {
  getUploadUrl: (filename: string, category: string) =>
    api.post<{ url: string; key: string }>("/api/storage/upload-url", { filename, category }),
  getDownloadUrl: (key: string) =>
    api.get<{ url: string }>(`/api/storage/download-url?key=${encodeURIComponent(key)}`),
  deleteFile: (key: string) => api.delete(`/api/storage/files?key=${encodeURIComponent(key)}`),
  uploadFile: async (file: File, category: string, onProgress?: (pct: number) => void) => {
    const { url, key } = await storageService.getUploadUrl(file.name, category);
    return new Promise<{ key: string }>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url);
      xhr.setRequestHeader("Content-Type", file.type);
      if (onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
        };
      }
      xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve({ key }) : reject(new Error("Failed to upload to storage")));
      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(file);
    });
  },
};

/**
 * CRM SERVICES
 * These paths mirror the backend controllers exactly.
 */
export interface LeadListResponse {
  items: any[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

function mapLead(lead: any): RapidLead {
  const customerName = [lead.firstName, lead.lastName].filter(Boolean).join(" ").trim() || lead.companyName || "Unnamed Lead";
  return {
    ...lead,
    customerName,
    customerEmail: lead.email ?? "",
    customerPhone: lead.primaryPhone,
    selectedPlanId: lead.selectedPlanId ?? "standard",
    price: Number(lead.price ?? lead.expectedValue ?? 0),
    duration: Number(lead.duration ?? 0),
    devices: Array.isArray(lead.devices) ? lead.devices : [],
    status: String(lead.status ?? lead.stage ?? "new").toLowerCase() as RapidLead["status"],
    priority: lead.priority ?? "Normal",
    nextFollowUp: lead.nextFollowUp ?? null,
    confirmationUrl: lead.confirmationUrl ?? "",
    expiresAt: lead.expiresAt ?? lead.createdAt,
    createdAt: lead.createdAt,
  } as RapidLead;
}

function normalizeLeadCreate(data: Partial<RapidLead> & Record<string, any>) {
  if (data.firstName || data.lastName) return data;
  const name = String(data.customerName ?? "").trim();
  const [firstName, ...rest] = name.split(/\s+/);
  return {
    ...data,
    firstName: firstName || "Lead",
    lastName: rest.join(" ") || "Contact",
    email: data.customerEmail,
    primaryPhone: data.customerPhone,
    source: data.source,
    score: data.score ?? 0,
    notes: data.notes,
  };
}

export const leadsService = {
  /** Backward-compatible list used by the existing CRM UI. */
  getAll: async (params?: Record<string, string | number | undefined>): Promise<RapidLead[]> => {
    const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value !== undefined && value !== "") query.set(key, String(value));
    });
    const response = await api.get<LeadListResponse>(`/api/leads${query.toString() ? `?${query}` : ""}`);
    return (response?.items ?? []).map(mapLead);
  },
  list: async (params?: Record<string, string | number | undefined>): Promise<{ items: RapidLead[]; pagination: LeadListResponse["pagination"] }> => {
    const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value !== undefined && value !== "") query.set(key, String(value));
    });
    const response = await api.get<LeadListResponse>(`/api/leads${query.toString() ? `?${query}` : ""}`);
    return { items: (response?.items ?? []).map(mapLead), pagination: response.pagination };
  },
  getById: async (id: string) => mapLead(await api.get<any>(`/api/leads/${id}`)),
  create: async (data: Partial<RapidLead> & Record<string, any>) => mapLead(await api.post<any>("/api/leads", normalizeLeadCreate(data))),
  update: async (id: string, data: Partial<RapidLead> & Record<string, any>) => mapLead(await api.patch<any>(`/api/leads/${id}`, normalizeLeadCreate(data))),
  remove: (id: string) => api.delete(`/api/leads/${id}`),
  importRows: (rows: Record<string, any>[], ownerId?: string, stage?: string) =>
    api.post("/api/leads/import", { rows, ownerId, stage }),
  assign: (leadIds: string[], userIds: string[], assignmentType: string, reason?: string) =>
    api.post("/api/leads/assign", { leadIds, userIds, assignmentType, reason }),
};

export const accountService = {
  getAll: (params?: { search?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.status) query.set("status", params.status);
    return api.get<any[]>(`/api/crm/accounts${query.toString() ? `?${query}` : ""}`);
  },
  getById: (id: string) => api.get<any>(`/api/crm/accounts/${id}`),
  create: (data: any) => api.post("/api/crm/accounts", data),
  update: (id: string, data: any) => api.patch(`/api/crm/accounts/${id}`, data),
  remove: (id: string) => api.delete(`/api/crm/accounts/${id}`),
};

export const contactService = {
  getAll: (params?: { search?: string; accountId?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.accountId) query.set("accountId", params.accountId);
    if (params?.status) query.set("status", params.status);
    return api.get<any[]>(`/api/crm/contacts${query.toString() ? `?${query}` : ""}`);
  },
  getById: (id: string) => api.get<any>(`/api/crm/contacts/${id}`),
  create: (data: any) => api.post("/api/crm/contacts", data),
  update: (id: string, data: any) => api.patch(`/api/crm/contacts/${id}`, data),
  remove: (id: string) => api.delete(`/api/crm/contacts/${id}`),
};

export const dealService = {
  getAll: (params?: { search?: string; stage?: string; ownerId?: string; accountId?: string }) => {
    const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
    return api.get<any[]>(`/api/deals${query.toString() ? `?${query}` : ""}`);
  },
  getById: (id: string) => api.get<any>(`/api/deals/${id}`),
  create: (data: any) => api.post("/api/deals", data),
  update: (id: string, data: any) => api.patch(`/api/deals/${id}`, data),
  remove: (id: string) => api.delete(`/api/deals/${id}`),
  getPipeline: () => api.get<any>("/api/deals/pipeline"),
};

/** Legacy customer APIs are retained but explicitly target the backend namespace. */
export const customerService = {
  getAll: () => api.get<Customer[]>("/api/customers"),
  getById: (id: string) => api.get<Customer>(`/api/customers/${id}`),
  get360: (id: string) => api.get<{
    customer: Customer;
    subscriptions: Subscription[];
    devices: Device[];
    deviceGroups: DeviceGroup[];
    rapidLeads: RapidLead[];
    renewals: Renewal[];
    referrals: Referral[];
    refunds: RefundRequest[];
  }>(`/api/customers/${id}/360`),
  getDevices: (customerId: string) => api.get<Device[]>(`/api/customers/${customerId}/devices`),
  updateDeviceStatus: (deviceId: string, status: Device["status"]) => api.patch(`/api/devices/${deviceId}/status`, { status }),
  getReferralStatus: (customerId: string) => api.get<{ referralCode: string; successful: number; pending: number; rewards: ReferralReward[] }>(`/api/customers/${customerId}/referrals`),
};

export const subscriptionService = {
  getAll: (customerId?: string) => api.get<Subscription[]>(`/api/subscriptions${customerId ? `?customerId=${encodeURIComponent(customerId)}` : ""}`),
  getRenewalOffers: (subscriptionId: string) => api.get<any[]>(`/api/subscriptions/${subscriptionId}/renewal-offers`),
  processRenewal: (data: Partial<Renewal>) => api.post<Renewal>("/api/renewals", data),
};

export const financeService = {
  getStats: () => api.get<any>("/api/finance/stats"),
  getInvoices: () => api.get<any[]>("/api/finance/invoices"),
  getRefundRequests: () => api.get<RefundRequest[]>("/api/finance/refund-requests"),
  processRefund: (id: string, action: "approve" | "reject", data: any) => api.post(`/api/finance/refund-requests/${id}/${action}`, data),
};

export const incentiveService = {
  getPrograms: () => api.get<any[]>("/api/incentives/programs"),
  getAchievements: () => api.get<any[]>("/api/incentives/achievements"),
};

export const automationService = {
  getWorkflows: () => api.get<any[]>("/api/automation/workflows"),
  getExecutions: () => api.get<any[]>("/api/automation/executions"),
};

export const adminService = {
  getPolicyVersions: (type: PolicyVersion["type"]) => api.get<PolicyVersion[]>(`/api/admin/policies/${type}`),
  updatePolicy: (type: PolicyVersion["type"], content: string) => api.post<PolicyVersion>(`/api/admin/policies/${type}`, { content }),
  getDeviceCompatibilityRules: () => api.get<DeviceCompatibilityRule[]>("/api/admin/device-compatibility"),
};
