import { supabase } from "@/integrations/supabase/client";
import { createServerFn } from "@tanstack/react-start";
import { 
  Subscription, 
  Renewal, 
  RefundRequest 
} from "./services.types";
import { Json } from "@/integrations/supabase/types";

/**
 * Sales Service Layer - Supabase Implementation
 * Handles Plans, Sales, and Subscriptions with multi-tenant scoping.
 */

// --- Mapping Helpers ---

const mapDbPlan = (dbPlan: any) => ({
  id: dbPlan.id,
  name: dbPlan.name,
  description: dbPlan.description,
  price: Number(dbPlan.price),
  currency: dbPlan.currency,
  billingPeriod: dbPlan.billing_period,
  features: dbPlan.features as string[],
  status: dbPlan.status,
  business: "Active Business", // Placeholder for join
  activeSales: 0, // Placeholder for count
  created: dbPlan.created_at,
});

const mapDbSale = (dbSale: any) => ({
  id: dbSale.id,
  customerId: dbSale.customer_id,
  customerName: dbSale.crm_customers?.full_name || "Unknown Customer",
  business: "Business", // Placeholder
  amount: Number(dbSale.final_amount) + (Number(dbSale.discount) || 0),
  discount: Number(dbSale.discount) || 0,
  finalAmount: Number(dbSale.final_amount),
  status: dbSale.status,
  paymentStatus: dbSale.payment_status,
  created: dbSale.created_at,
  salesEmployeeName: dbSale.employees?.display_name || "Unknown Representative",
  planName: dbSale.sales_plans?.name || "Manual Sale",
  phone: dbSale.crm_customers?.phone,
  email: dbSale.crm_customers?.email,
  notes: (dbSale.metadata as any)?.notes || "",
});

const mapDbSubscription = (dbSub: any): Subscription => ({
  id: dbSub.id,
  customerId: dbSub.customer_id,
  planId: dbSub.plan_id || "",
  planName: dbSub.sales_plans?.name || "Unknown Plan",
  status: (dbSub.status || "pending").toLowerCase() as Subscription["status"],
  purchaseDate: dbSub.created_at,
  startDate: dbSub.start_date || dbSub.created_at,
  endDate: dbSub.end_date || dbSub.created_at,
  termMonths: dbSub.term_months || 0,
  amount: Number(dbSub.amount || 0),
  currency: dbSub.currency || "INR",
  autoRenew: dbSub.auto_renew || false,
  renewalPolicy: (dbSub.renewal_policy || "manual_decision") as Subscription["renewalPolicy"],
  metadata: (dbSub.metadata as any) || {},
});

// --- Server Functions (Thin Wrappers) ---

export const getSalesPlans = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("sales_plans")
      .select("*")
      .eq("status", "Active");
    
    if (error) throw error;
    return (data || []).map(mapDbPlan);
  });

export const getSales = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("sales")
      .select(`
        *,
        crm_customers (full_name, phone, email),
        sales_plans (name),
        employees (id, profile_id)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    // Note: We'd ideally join with profiles for employee names, 
    // but the current schema uses profile_id in employees.
    return (data || []).map(mapDbSale);
  });

export const createSale = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const { data: sale, error } = await supabase
      .from("sales")
      .insert({
        organization_id: data.organization_id,
        business_id: data.business_id,
        customer_id: data.customer_id,
        plan_id: data.plan_id,
        final_amount: data.final_amount,
        discount: data.discount,
        currency: data.currency || "INR",
        status: data.status || "Won",
        payment_status: data.payment_status || "Pending",
        metadata: data.metadata || {},
      })
      .select()
      .single();

    if (error) throw error;
    return sale;
  });

export const getSubscriptions = createServerFn({ method: "GET" })
  .inputValidator((data: { customerId?: string } | undefined) => data)
  .handler(async ({ data }) => {
    let query = supabase
      .from("sales_subscriptions")
      .select(`
        *,
        sales_plans (name)
      `);

    if (data?.customerId) {
      query = query.eq("customer_id", data.customerId);
    }

    const { data: subs, error } = await query;
    if (error) throw error;
    return (subs || []).map(mapDbSubscription);
  });

// --- Service Exports ---

export const salesPlanService = {
  getAll: getSalesPlans,
};

export const dealService = {
  getAll: getSales,
  create: createSale,
};

export const subscriptionService = {
  getAll: getSubscriptions,
};
