import { api } from "./client";

/**
 * CUSTOMER / DEVICE / SUBSCRIPTION DATA MODEL
 */

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  referralCode?: string;
  referredById?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  planName: string;
  status: 'active' | 'expired' | 'pending' | 'cancelled' | 'suspended';
  purchaseDate: string;
  startDate: string;
  endDate: string;
  termMonths: number;
  amount: number;
  currency: string;
  autoRenew: boolean;
  renewalPolicy: 'carry_forward' | 'forfeit_remaining' | 'manual_decision';
  metadata?: Record<string, any>;
}

export interface Device {
  id: string;
  customerId: string;
  type: string; // e.g., 'Smart TV', 'Smartphone', 'Firestick'
  brand?: string;
  model?: string;
  nickname?: string;
  macAddress?: string;
  ipAddress?: string;
  status: 'active' | 'standby' | 'inactive';
  lastActiveAt?: string;
  deviceGroupId?: string;
}

export interface DeviceGroup {
  id: string;
  customerId: string;
  name: string; // e.g., 'Living Room Group'
  singleActiveRule: boolean; // Only one device in group can be active at a time
}

export interface DeviceCompatibilityRule {
  id: string;
  deviceType: string;
  compatibleTypes: string[];
  singleActiveSessionRequired: boolean;
}

/**
 * RAPID LEAD / CONFIRMATION WORKFLOW
 */

export interface RapidLead {
  id: string;
  salespersonId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  selectedPlanId: string;
  price: number;
  duration: number; // months
  devices: string[]; // List of intended device types/names
  referralCode?: string;
  status: 'draft' | 'sent' | 'opened' | 'confirmed' | 'not_confirmed' | 'expired';
  confirmationUrl: string;
  tcVersionAccepted?: string;
  refundPolicyVersionAccepted?: string;
  declineReason?: string;
  feedback?: string;
  confirmedAt?: string;
  expiresAt: string;
  createdAt: string;
}

export interface PolicyVersion {
  id: string;
  type: 'terms_and_conditions' | 'refund_policy';
  version: string;
  content: string;
  effectiveDate: string;
  isActive: boolean;
}

/**
 * RENEWAL & REFERRALS
 */

export interface Renewal {
  id: string;
  subscriptionId: string;
  customerId: string;
  previousEndDate: string;
  newStartDate: string;
  newEndDate: string;
  termMonths: number;
  amount: number;
  adjustmentType: 'carry_forward' | 'forfeit_remaining' | 'none';
  adjustmentReason?: string;
  authorizedBy?: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  referralCode: string;
  status: 'pending' | 'validated' | 'reward_earned' | 'invalid';
  rewardId?: string;
  createdAt: string;
}

export interface ReferralReward {
  id: string;
  referralId: string;
  customerId: string;
  rewardType: 'extension' | 'discount' | 'credit';
  value: number;
  status: 'pending' | 'active' | 'used' | 'expired';
  expiryDate?: string;
}

/**
 * REFUNDS
 */

export interface RefundRequest {
  id: string;
  saleId: string;
  subscriptionId: string;
  customerId: string;
  requestedAmount: number;
  calculatedRefundAmount: number;
  reason: string;
  status: 'pending_review' | 'approved' | 'processed' | 'rejected';
  policyVersionId: string;
  reviewedBy?: string;
  approvedBy?: string;
  createdAt: string;
}

/**
 * API SERVICE CONTRACTS
 */

export const leadsService = {
  getAll: () => api.get<RapidLead[]>("/leads"),
  getById: (id: string) => api.get<RapidLead>(`/leads/${id}`),
  create: (data: Partial<RapidLead>) => api.post<RapidLead>("/leads", data),
  update: (id: string, data: Partial<RapidLead>) => api.patch<RapidLead>(`/leads/${id}`, data),
  
  // Rapid Lead specific
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
  
  // Device management
  getDevices: (customerId: string) => api.get<Device[]>(`/customers/${customerId}/devices`),
  updateDeviceStatus: (deviceId: string, status: Device['status']) => 
    api.patch(`/devices/${deviceId}/status`, { status }),
  
  // Referrals
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

export const incentiveService = {
  getPrograms: () => api.get<any[]>("/incentives/programs"),
  getAchievements: () => api.get<any[]>("/incentives/achievements"),
};

export const automationService = {
  getWorkflows: () => api.get<any[]>("/automation/workflows"),
  getExecutions: () => api.get<any[]>("/automation/executions"),
};

export const adminService = {
  getPolicyVersions: (type: PolicyVersion['type']) => api.get<PolicyVersion[]>(`/admin/policies/${type}`),
  updatePolicy: (type: PolicyVersion['type'], content: string) => 
    api.post<PolicyVersion>(`/admin/policies/${type}`, { content }),
  getDeviceCompatibilityRules: () => api.get<DeviceCompatibilityRule[]>("/admin/device-compatibility"),
};
