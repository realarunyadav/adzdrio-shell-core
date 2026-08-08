export interface IncentiveProgram {
  id: string;
  name: string;
  description: string;
  effectiveDate: string;
  expiryDate?: string;
  status: 'draft' | 'active' | 'archived';
  scope: {
    type: 'individual' | 'team' | 'department' | 'role';
    ids: string[];
  };
  rules: {
    metric: 'sales' | 'revenue' | 'renewals' | 'custom';
    target: number;
    thresholds: { label: string; min: number; reward: number }[];
  }[];
  version: number;
}

export interface Achievement {
  id: string;
  programId: string;
  employeeId: string;
  period: string;
  value: number;
  status: 'pending' | 'verified' | 'approved' | 'payable' | 'paid';
  verifiedBy?: string;
  approvedBy?: string;
  paymentReference?: string;
}
