/**
 * SHARED TYPES FOR ABOS API SERVICES
 */

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  referralCode?: string;
  referredById?: string;
  business?: string;
  assignedToName?: string;
  totalSales?: string;
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
  type: string;
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
  name: string;
  singleActiveRule: boolean;
}

export interface DeviceCompatibilityRule {
  id: string;
  deviceType: string;
  compatibleTypes: string[];
  singleActiveSessionRequired: boolean;
}

export interface RapidLead {
  id: string;
  salespersonId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  selectedPlanId: string;
  price: number;
  duration: number;
  devices: string[];
  referralCode?: string;
  status: 'draft' | 'sent' | 'opened' | 'confirmed' | 'not_confirmed' | 'expired' | 'new';
  confirmationUrl: string;
  tcVersionAccepted?: string;
  refundPolicyVersionAccepted?: string;
  declineReason?: string;
  feedback?: string;
  confirmedAt?: string;
  expiresAt: string;
  createdAt: string;
  updatedAt?: string;
  priority?: 'Low' | 'Normal' | 'High';
  source?: string;
  business?: string;
  notes?: string;
  assignedToName?: string;
}


export interface PolicyVersion {
  id: string;
  type: 'terms_and_conditions' | 'refund_policy';
  version: string;
  content: string;
  effectiveDate: string;
  isActive: boolean;
}

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

export interface LeadListResponse {
  items: RapidLead[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

