import { api } from "./client";
export * from "./services.types";
import { Customer, Subscription, Device, DeviceGroup, RapidLead, Renewal, ReferralReward, RefundRequest, PolicyVersion, DeviceCompatibilityRule } from "./services.types";

export const authService = {
  login: (credentials: { email: string; password: string }) => api.post<any>("/api/auth/login", credentials),
  logout: () => api.post("/api/auth/logout"),
  getCurrentSession: () => api.get<{ user: any }>("/api/auth/me"),
  getOrganizationUsers: () => api.get<any[]>("/api/auth/users"),
};

export interface Product { id: string; sku: string; name: string; description?: string; category: string; price: number; currency: string; status: "active" | "archived"; metadata?: Record<string, any>; }
export interface Warehouse { id: string; name: string; location: string; code: string; }
export interface StockLevel { productId: string; warehouseId: string; quantity: number; reserved: number; available: number; }
export interface DealPipelineItem { stage: "NEW" | "QUALIFIED" | "PROPOSAL" | "NEGOTIATION" | "WON" | "LOST"; count: number; totalAmount: number; weightedAmount: number; }

export const inventoryService = {
  getProducts: () => api.get<Product[]>("/api/inventory/products"), getProductById: (id: string) => api.get<Product>(`/api/inventory/products/${id}`), getWarehouses: () => api.get<Warehouse[]>("/api/inventory/warehouses"),
  getStockLevels: (productId?: string) => api.get<StockLevel[]>(`/api/inventory/stock${productId ? `?productId=${encodeURIComponent(productId)}` : ""}`), getMovements: () => api.get<any[]>("/api/inventory/movements"), createTransfer: (data: any) => api.post("/api/inventory/transfers", data), getPurchaseOrders: () => api.get<any[]>("/api/inventory/purchase-orders"), getGRNs: () => api.get<any[]>("/api/inventory/grns"), getVendors: () => api.get<any[]>("/api/inventory/vendors"), getAnalytics: () => api.get<any>("/api/inventory/analytics"),
};

export const aiService = { chat: (message: string, context?: any) => api.post<any>("/api/ai/chat", { message, context }), streamChat: (message: string) => `${(import.meta as any).env["VITE_API_BASE_URL"]}/api/ai/chat/stream?message=${encodeURIComponent(message)}`, transcribe: (audioUrl: string) => api.post<any>("/api/ai/transcribe", { audioUrl }), analyzeCall: (transcriptId: string) => api.post<any>("/api/ai/analyze-call", { transcriptId }), getSalesCoach: (leadId: string) => api.get<any>(`/api/ai/sales-coach/${leadId}`), knowledgeSearch: (query: string) => api.get<any>(`/api/ai/knowledge?q=${encodeURIComponent(query)}`), getExecutiveSummary: (module: string) => api.get<any>(`/api/ai/summary/${module}`), submitFeedback: (aiResponseId: string, feedback: any) => api.post(`/api/ai/feedback/${aiResponseId}`, feedback) };

export const storageService = { getUploadUrl: (filename: string, category: string) => api.post<{ url: string; key: string }>("/api/storage/upload-url", { filename, category }), getDownloadUrl: (key: string) => api.get<{ url: string }>(`/api/storage/download-url?key=${encodeURIComponent(key)}`), deleteFile: (key: string) => api.delete(`/api/storage/files?key=${encodeURIComponent(key)}`), uploadFile: async (file: File, category: string, onProgress?: (pct: number) => void) => { const { url, key } = await storageService.getUploadUrl(file.name, category); return new Promise<{ key: string }>((resolve, reject) => { const xhr = new XMLHttpRequest(); xhr.open("PUT", url); xhr.setRequestHeader("Content-Type", file.type); if (onProgress) xhr.upload.onprogress = (event) => { if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100)); }; xhr.onload = () => xhr.status >= 200 && xhr.status < 300 ? resolve({ key }) : reject(new Error("Failed to upload to storage")); xhr.onerror = () => reject(new Error("Network error during upload")); xhr.send(file); }); } };

export { leadsService } from "./crm.functions";
export { salesPlanService, dealService, subscriptionService } from "./sales.functions";
import { financeTransactions, financeInvoices, getFinanceAnalytics, getInvoiceAnalytics } from "./finance.functions";
export { financeTransactions, financeInvoices, getFinanceAnalytics, getInvoiceAnalytics };


export const accountService = { getAll: (params?: { search?: string; status?: string }) => { const query = new URLSearchParams(); if (params?.search) query.set("search", params.search); if (params?.status) query.set("status", params.status); return api.get<any[]>(`/api/crm/accounts${query.toString() ? `?${query}` : ""}`); }, getById: (id: string) => api.get<any>(`/api/crm/accounts/${id}`), create: (data: any) => api.post("/api/crm/accounts", data), update: (id: string, data: any) => api.patch(`/api/crm/accounts/${id}`, data), remove: (id: string) => api.delete(`/api/crm/accounts/${id}`) };
export const contactService = { getAll: (params?: { search?: string; accountId?: string; status?: string }) => { const query = new URLSearchParams(); if (params?.search) query.set("search", params.search); if (params?.accountId) query.set("accountId", params.accountId); if (params?.status) query.set("status", params.status); return api.get<any[]>(`/api/crm/contacts${query.toString() ? `?${query}` : ""}`); }, getById: (id: string) => api.get<any>(`/api/crm/contacts/${id}`), create: (data: any) => api.post("/api/crm/contacts", data), update: (id: string, data: any) => api.patch(`/api/crm/contacts/${id}`, data), remove: (id: string) => api.delete(`/api/crm/contacts/${id}`) };


export const customerService = { getAll: () => api.get<Customer[]>("/api/customers"), getById: (id: string) => api.get<Customer>(`/api/customers/${id}`), get360: (id: string) => api.get<{ customer: Customer; subscriptions: Subscription[]; devices: Device[]; deviceGroups: DeviceGroup[]; rapidLeads: RapidLead[]; renewals: Renewal[]; referrals: any[]; refunds: RefundRequest[] }>(`/api/customers/${id}/360`), getDevices: (customerId: string) => api.get<Device[]>(`/api/customers/${customerId}/devices`), updateDeviceStatus: (deviceId: string, status: Device["status"]) => api.patch(`/api/devices/${deviceId}/status`, { status }), getReferralStatus: (customerId: string) => api.get<{ referralCode: string; successful: number; pending: number; rewards: ReferralReward[] }>(`/api/customers/${customerId}/referrals`) };

export const financeService = {
  getStats: () => api.get<any>("/api/finance/stats"),
  getPayments: () => api.get<any[]>("/api/payments"),
  getInvoices: () => api.get<any[]>("/api/invoices"),
  getRefundRequests: () => api.get<RefundRequest[]>("/api/finance/refund-requests"),
  processRefund: (id: string, action: "approve" | "reject", data: any) => api.post(`/api/finance/refund-requests/${id}/${action}`, data),
  // New Live methods
  listTransactions: (params?: any) => financeTransactions.list(params),
  listInvoices: (params?: any) => financeInvoices.list(params),
  getFinanceAnalytics: (params?: any) => getFinanceAnalytics(params),
  getInvoiceAnalytics: (params?: any) => getInvoiceAnalytics(params),
};
export const auditService = {
  getLogs: () => api.get<any[]>("/api/audit-logs"),
  getActions: () => api.get<any[]>("/api/audit-logs/actions"),
};
export const kpiService = {
  getSnapshots: (params?: { businessId?: string; kpiKey?: string }) => {
    const query = new URLSearchParams();
    if (params?.businessId) query.set("businessId", params.businessId);
    if (params?.kpiKey) query.set("kpiKey", params.kpiKey);
    return api.get<any[]>(`/api/kpis/snapshots${query.toString() ? `?${query.toString()}` : ""}`);
  }
};
export const incentiveService = { getPrograms: () => api.get<any[]>("/api/incentives/programs"), getAchievements: () => api.get<any[]>("/api/incentives/achievements") };
export const automationService = { getWorkflows: () => api.get<any[]>("/api/automation/workflows"), getExecutions: () => api.get<any[]>("/api/automation/executions") };
export const adminService = { getPolicyVersions: (type: PolicyVersion["type"]) => api.get<PolicyVersion[]>(`/api/admin/policies/${type}`), updatePolicy: (type: PolicyVersion["type"], content: string) => api.post<PolicyVersion>(`/api/admin/policies/${type}`, { content }), getDeviceCompatibilityRules: () => api.get<DeviceCompatibilityRule[]>("/api/admin/device-compatibility") };
