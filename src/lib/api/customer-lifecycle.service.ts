import { api } from "./client";

export interface LifecyclePayment {
  id: string;
  customerId: string;
  subscriptionId?: string | null;
  amount: number;
  currency: string;
  status: string;
  provider?: string | null;
  providerReference?: string | null;
  createdAt?: string;
  verifiedAt?: string | null;
}

export interface LifecycleInvoice {
  id: string;
  customerId: string;
  subscriptionId?: string | null;
  paymentId?: string | null;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: string;
  issuedAt?: string;
  createdAt?: string;
}

export interface LifecycleCustomer {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  status?: string;
}

export const customerLifecycleService = {
  listCustomers: (search?: string) =>
    api.get<LifecycleCustomer[]>(`/api/customers${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  listPayments: (customerId?: string) =>
    api.get<LifecyclePayment[]>(`/api/payments${customerId ? `?customerId=${encodeURIComponent(customerId)}` : ""}`),
  verifyPayment: (id: string) => api.post<LifecyclePayment>(`/api/payments/${encodeURIComponent(id)}/verify`),
  listInvoices: (customerId?: string) =>
    api.get<LifecycleInvoice[]>(`/api/invoices${customerId ? `?customerId=${encodeURIComponent(customerId)}` : ""}`),
};
