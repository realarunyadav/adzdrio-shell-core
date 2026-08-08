import { api } from "./client";
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
  DeviceCompatibilityRule
} from "./services.types";

/**
 * AUTH SERVICE
 * Managed by NestJS Backend
 */
export const authService = {
  login: (credentials: any) => api.post<{ user: any; token: string }>("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  getCurrentSession: () => api.get<any>("/auth/session"),
  refreshToken: () => api.post<{ token: string }>("/auth/refresh"),
  changePassword: (data: any) => api.post("/auth/change-password", data),
  resetPasswordRequest: (email: string) => api.post("/auth/reset-password/request", { email }),
  resetPasswordConfirm: (data: any) => api.post("/auth/reset-password/confirm", data),
  listSessions: () => api.get<any[]>("/auth/sessions"),
  revokeSession: (sessionId: string) => api.delete(`/auth/sessions/${sessionId}`),
};

/**
 * INVENTORY SERVICE
 */
export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  currency: string;
  status: 'active' | 'archived';
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
  getProducts: () => api.get<Product[]>("/inventory/products"),
  getProductById: (id: string) => api.get<Product>(`/inventory/products/${id}`),
  getWarehouses: () => api.get<Warehouse[]>("/inventory/warehouses"),
  getStockLevels: (productId?: string) => api.get<StockLevel[]>(`/inventory/stock${productId ? `?productId=${productId}` : ''}`),
  getMovements: () => api.get<any[]>("/inventory/movements"),
  createTransfer: (data: any) => api.post("/inventory/transfers", data),
  getPurchaseOrders: () => api.get<any[]>("/inventory/purchase-orders"),
  getGRNs: () => api.get<any[]>("/inventory/grns"),
  getVendors: () => api.get<any[]>("/inventory/vendors"),
  getAnalytics: () => api.get<any>("/inventory/analytics"),
};

/**
 * AI SERVICE
 * Provider-agnostic gateway through backend
 */
export const aiService = {
  chat: (message: string, context?: any) => api.post<any>("/ai/chat", { message, context }),
  streamChat: (message: string, context?: any) => `${(import.meta as any).env['VITE_API_BASE_URL']}/ai/chat/stream?message=${encodeURIComponent(message)}`,
  transcribe: (audioUrl: string) => api.post<any>("/ai/transcribe", { audioUrl }),
  analyzeCall: (transcriptId: string) => api.post<any>("/ai/analyze-call", { transcriptId }),
  getSalesCoach: (leadId: string) => api.get<any>(`/ai/sales-coach/${leadId}`),
  knowledgeSearch: (query: string) => api.get<any>(`/ai/knowledge?q=${encodeURIComponent(query)}`),
  getExecutiveSummary: (module: string) => api.get<any>(`/ai/summary/${module}`),
  submitFeedback: (aiResponseId: string, feedback: any) => api.post(`/ai/feedback/${aiResponseId}`, feedback),
};

/**
 * STORAGE SERVICE
 * Cloudflare R2 through backend signed URLs
 */
export const storageService = {
  getUploadUrl: (filename: string, category: string) => 
    api.post<{ url: string; key: string }>("/storage/upload-url", { filename, category }),
  getDownloadUrl: (key: string) => 
    api.get<{ url: string }>(`/storage/download-url?key=${encodeURIComponent(key)}`),
  deleteFile: (key: string) => 
    api.delete(`/storage/files?key=${encodeURIComponent(key)}`),
  
  // Frontend helper to perform actual upload to R2
  uploadFile: async (file: File, category: string, onProgress?: (pct: number) => void) => {
    const { url, key } = await storageService.getUploadUrl(file.name, category);
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.setRequestHeader('Content-Type', file.type);
      
      if (onProgress) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            onProgress(Math.round((e.loaded / e.total) * 100));
          }
        };
      }
      
      xhr.onload = () => {
        if (xhr.status === 200) resolve({ key });
        else reject(new Error('Failed to upload to storage'));
      };
      
      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(file);
    });
  }
};

/**
 * CRM & FINANCE (Existing Refined)
 */
export const leadsService = {
  getAll: () => api.get<RapidLead[]>("/leads"),
  getById: (id: string) => api.get<RapidLead>(`/leads/${id}`),
  create: (data: Partial<RapidLead>) => api.post<RapidLead>("/leads", data),
  update: (id: string, data: Partial<RapidLead>) => api.patch<RapidLead>(`/leads/${id}`, data),
  generateConfirmationLink: (leadId: string) => api.post<{ url: string }>(`/leads/${leadId}/generate-link`, {}),
  getConfirmationDetails: (token: string) => api.get<RapidLead>(`/public/confirmations/${token}`),
  submitConfirmation: (token: string, confirmed: boolean, data: { reason?: string; feedback?: string }) => 
    api.post(`/public/confirmations/${token}/submit`, { confirmed, ...data }),
};

export const customerService = {
  getAll: () => api.get<Customer[]>("/customers"),
  getById: (id: string) => api.get<Customer>(`/customers/${id}`),
  get360: (id: string) => api.get<{
    customer: Customer;
    subscriptions: Subscription[];
    devices: Device[];
    deviceGroups: DeviceGroup[];
    rapidLeads: RapidLead[];
    renewals: Renewal[];
    referrals: Referral[];
    refunds: RefundRequest[];
  }>(`/customers/${id}/360`),
  getDevices: (customerId: string) => api.get<Device[]>(`/customers/${customerId}/devices`),
  updateDeviceStatus: (deviceId: string, status: Device['status']) => 
    api.patch(`/devices/${deviceId}/status`, { status }),
  getReferralStatus: (customerId: string) => api.get<{
    referralCode: string;
    successful: number;
    pending: number;
    rewards: ReferralReward[];
  }>(`/customers/${customerId}/referrals`),
};

export const subscriptionService = {
  getAll: (customerId?: string) => api.get<Subscription[]>(`/subscriptions${customerId ? `?customerId=${customerId}` : ''}`),
  getRenewalOffers: (subscriptionId: string) => api.get<any[]>(`/subscriptions/${subscriptionId}/renewal-offers`),
  processRenewal: (data: Partial<Renewal>) => api.post<Renewal>("/renewals", data),
};

export const financeService = {
  getStats: () => api.get<any>("/finance/stats"),
  getInvoices: () => api.get<any[]>("/finance/invoices"),
  getRefundRequests: () => api.get<RefundRequest[]>("/finance/refund-requests"),
  processRefund: (id: string, action: 'approve' | 'reject', data: any) => 
    api.post(`/finance/refund-requests/${id}/${action}`, data),
};

export const adminService = {
  getPolicyVersions: (type: PolicyVersion['type']) => api.get<PolicyVersion[]>(`/admin/policies/${type}`),
  updatePolicy: (type: PolicyVersion['type'], content: string) => 
    api.post<PolicyVersion>(`/admin/policies/${type}`, { content }),
  getDeviceCompatibilityRules: () => api.get<DeviceCompatibilityRule[]>("/admin/device-compatibility"),
};
