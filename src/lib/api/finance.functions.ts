import { supabase } from "@/integrations/supabase/client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * FINANCE SERVICE LAYER - SUPABASE IMPLEMENTATION
 * Handles Transactions and Invoices with multi-tenant scoping.
 */

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
