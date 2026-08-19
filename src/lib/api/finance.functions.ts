import { supabase } from "@/integrations/supabase/client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * FINANCE SERVICE LAYER - SUPABASE IMPLEMENTATION
 * Handles Transactions and Invoices with multi-tenant scoping.
 */

export interface CurrencyValue {
  currency: string;
  value: number;
}

export interface FinanceAnalytics {
  grossRevenue: CurrencyValue[];
  collectedRevenue: CurrencyValue[];
  refunds: CurrencyValue[];
  netRevenue: CurrencyValue[];
}

export interface InvoiceAnalytics {
  total: number;
  paid: number;
  overdue: number;
  outstandingAmount: CurrencyValue[];
}

export interface FinanceTransaction {
  id: string;
  organization_id: string;
  business_id: string;
  customer_id?: string;
  sale_id?: string;
  subscription_id?: string;
  type: 'payment' | 'refund' | 'adjustment' | 'payout' | 'expense';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'voided' | 'refunded';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  // Join fields
  customer_name?: string;
}

export interface FinanceInvoice {
  id: string;
  organization_id: string;
  business_id: string;
  customer_id: string;
  sale_id?: string;
  subscription_id?: string;
  invoice_number: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'voided' | 'cancelled';
  issue_date: string;
  due_date: string;
  paid_at?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  // Join fields
  customer_name?: string;
}

export const financeTransactions = {
  list: createServerFn({ method: "GET" })
    .inputValidator((data: unknown) => 
      z.object({
        businessId: z.string().optional(),
        customerId: z.string().optional(),
        type: z.string().optional(),
        status: z.string().optional(),
      }).parse(data)
    )
    .handler(async ({ data }) => {
      let query = supabase
        .from("finance_transactions")
        .select(`
          *,
          crm_customers!finance_transactions_customer_id_fkey(full_name)
        `);

      if (data.businessId) query = query.eq("business_id", data.businessId);
      if (data.customerId) query = query.eq("customer_id", data.customerId);
      if (data.type) query = query.eq("type", data.type as any);
      if (data.status) query = query.eq("status", data.status as any);

      const { data: txns, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;

      return (txns || []).map(t => ({
        ...t,
        customer_name: (t.crm_customers as any)?.full_name || 'Unknown'
      })) as unknown as FinanceTransaction[];
    }),

  getById: createServerFn({ method: "GET" })
    .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
    .handler(async ({ data }) => {
      const { data: txn, error } = await supabase
        .from("finance_transactions")
        .select(`
          *,
          crm_customers!finance_transactions_customer_id_fkey(full_name)
        `)
        .eq("id", data.id)
        .single();
      
      if (error) throw error;
      return {
        ...txn,
        customer_name: (txn.crm_customers as any)?.full_name || 'Unknown'
      } as unknown as FinanceTransaction;
    })
};

export const financeInvoices = {
  list: createServerFn({ method: "GET" })
    .inputValidator((data: unknown) => 
      z.object({
        businessId: z.string().optional(),
        customerId: z.string().optional(),
        status: z.string().optional(),
      }).parse(data)
    )
    .handler(async ({ data }) => {
      let query = supabase
        .from("finance_invoices")
        .select(`
          *,
          crm_customers!finance_invoices_customer_id_fkey(full_name)
        `);

      if (data.businessId) query = query.eq("business_id", data.businessId);
      if (data.customerId) query = query.eq("customer_id", data.customerId);
      if (data.status) query = query.eq("status", data.status as any);

      const { data: invs, error } = await query.order('issue_date', { ascending: false });
      if (error) throw error;

      return (invs || []).map(i => ({
        ...i,
        customer_name: (i.crm_customers as any)?.full_name || 'Unknown'
      })) as unknown as FinanceInvoice[];
    }),

  getById: createServerFn({ method: "GET" })
    .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
    .handler(async ({ data }) => {
      const { data: inv, error } = await supabase
        .from("finance_invoices")
        .select(`
          *,
          crm_customers!finance_invoices_customer_id_fkey(full_name)
        `)
        .eq("id", data.id)
        .single();
      
      if (error) throw error;
      return {
        ...inv,
        customer_name: (inv.crm_customers as any)?.full_name || 'Unknown'
      } as unknown as FinanceInvoice;
    })
};

export const getFinanceAnalytics = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => 
    z.object({
      businessId: z.string().optional(),
    }).optional().parse(data || {})
  )
  .handler(async ({ data }) => {
    // 1. Gross Revenue (from sales)
    let salesQuery = supabase
      .from("sales")
      .select("final_amount, currency")
      .eq("status", "Won");
    if (data?.businessId) salesQuery = salesQuery.eq("business_id", data.businessId);
    const { data: sales, error: salesErr } = await salesQuery;
    if (salesErr) throw salesErr;

    // 2. Collected Revenue (completed payment transactions)
    let paymentsQuery = supabase
      .from("finance_transactions")
      .select("amount, currency")
      .eq("type", "payment")
      .eq("status", "completed");
    if (data?.businessId) paymentsQuery = paymentsQuery.eq("business_id", data.businessId);
    const { data: payments, error: paymentsErr } = await paymentsQuery;
    if (paymentsErr) throw paymentsErr;

    // 3. Refunds (completed refund transactions)
    let refundsQuery = supabase
      .from("finance_transactions")
      .select("amount, currency")
      .eq("type", "refund")
      .eq("status", "completed");
    if (data?.businessId) refundsQuery = refundsQuery.eq("business_id", data.businessId);
    const { data: refunds, error: refundsErr } = await refundsQuery;
    if (refundsErr) throw refundsErr;

    // Aggregation Logic
    const grossMap: Record<string, number> = {};
    const collectedMap: Record<string, number> = {};
    const refundMap: Record<string, number> = {};
    const netMap: Record<string, number> = {};

    (sales || []).forEach(s => {
      grossMap[s.currency] = (grossMap[s.currency] || 0) + Number(s.final_amount);
    });

    (payments || []).forEach(p => {
      collectedMap[p.currency] = (collectedMap[p.currency] || 0) + Number(p.amount);
    });

    (refunds || []).forEach(r => {
      refundMap[r.currency] = (refundMap[r.currency] || 0) + Number(r.amount);
    });

    // Net Revenue = Gross - Refunds (per currency)
    Object.keys(grossMap).forEach(curr => {
      netMap[curr] = (grossMap[curr] || 0) - (refundMap[curr] || 0);
    });

    return {
      grossRevenue: Object.entries(grossMap).map(([currency, value]) => ({ currency, value })),
      collectedRevenue: Object.entries(collectedMap).map(([currency, value]) => ({ currency, value })),
      refunds: Object.entries(refundMap).map(([currency, value]) => ({ currency, value })),
      netRevenue: Object.entries(netMap).map(([currency, value]) => ({ currency, value })),
    } as FinanceAnalytics;
  });

export const getInvoiceAnalytics = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => 
    z.object({
      businessId: z.string().optional(),
    }).optional().parse(data || {})
  )
  .handler(async ({ data }) => {
    let query = supabase
      .from("finance_invoices")
      .select("amount, currency, status");
    
    if (data?.businessId) query = query.eq("business_id", data.businessId);

    const { data: invoices, error } = await query;
    if (error) throw error;

    const counts = {
      total: (invoices || []).length,
      paid: (invoices || []).filter(i => i.status === 'paid').length,
      overdue: (invoices || []).filter(i => i.status === 'overdue').length,
    };

    const outstandingMap: Record<string, number> = {};
    (invoices || []).filter(i => ['sent', 'overdue'].includes(i.status)).forEach(i => {
      outstandingMap[i.currency] = (outstandingMap[i.currency] || 0) + Number(i.amount);
    });

    return {
      ...counts,
      outstandingAmount: Object.entries(outstandingMap).map(([currency, value]) => ({ currency, value })),
    } as InvoiceAnalytics;
  });

export interface ReconciliationData {
  currency: string;
  totalAmount: number;
  collected: number;
  refunded: number;
  netCollected: number;
  outstanding: number;
}

export const getReconciliation = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => 
    z.object({
      saleId: z.string().optional().nullable(),
      invoiceId: z.string().optional().nullable(),
    }).parse(data)
  )
  .handler(async ({ data }) => {
    let targetCurrency = "";
    let targetAmount = 0;

    if (data.saleId) {
      const { data: sale } = await supabase.from("sales").select("final_amount, currency").eq("id", data.saleId).single();
      if (sale) {
        targetCurrency = sale.currency;
        targetAmount = Number(sale.final_amount);
      }
    } else if (data.invoiceId) {
      const { data: inv } = await supabase.from("finance_invoices").select("amount, currency").eq("id", data.invoiceId).single();
      if (inv) {
        targetCurrency = inv.currency;
        targetAmount = Number(inv.amount);
      }
    }

    if (!targetCurrency) throw new Error("Target record not found or currency missing");

    const { data: txns } = await supabase
      .from("finance_transactions")
      .select("amount, type, status")
      .or(`sale_id.eq.${data.saleId || 'null'}, metadata->>invoice_id.eq.${data.invoiceId || 'null'}`)
      .eq("currency", targetCurrency)
      .eq("status", "completed");

    const collected = (txns || []).filter(t => t.type === 'payment').reduce((sum, t) => sum + Number(t.amount), 0);
    const refunded = (txns || []).filter(t => t.type === 'refund').reduce((sum, t) => sum + Number(t.amount), 0);
    const netCollected = collected - refunded;
    const outstanding = targetAmount - netCollected;

    return {
      currency: targetCurrency,
      totalAmount: targetAmount,
      collected,
      refunded,
      netCollected,
      outstanding: Math.max(0, outstanding),
    } as ReconciliationData;
  });
