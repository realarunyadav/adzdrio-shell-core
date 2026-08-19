import { supabase } from "@/integrations/supabase/client";
import { Customer, RapidLead, Renewal, RefundRequest, Subscription, Device, DeviceGroup, ReferralReward, LeadListResponse } from "./services.types";
import { Json } from "@/integrations/supabase/types";

/**
 * CRM Service Layer - Supabase Implementation
 * Handles Customers and Leads with multi-tenant scoping.
 */

// Helper for mapping Supabase Lead to RapidLead type
const mapDbLead = (dbLead: any): RapidLead => {
  const leadData = (dbLead.lead_data as any) || {};
  return {
    id: dbLead.id,
    salespersonId: dbLead.assigned_employee_id || "",
    customerName: leadData["customerName"] || leadData["full_name"] || "Unnamed Lead",
    customerEmail: leadData["email"] || leadData["customerEmail"] || "",
    customerPhone: leadData["phone"] || leadData["customerPhone"] || "",
    selectedPlanId: leadData["selectedPlanId"] || "standard",
    price: Number(leadData["price"] || 0),
    duration: Number(leadData["duration"] || 0),
    devices: Array.isArray(leadData["devices"]) ? leadData["devices"] : [],
    status: (dbLead.status || "new").toLowerCase() as RapidLead["status"],
    confirmationUrl: leadData["confirmationUrl"] || "",
    createdAt: dbLead.created_at,
    expiresAt: leadData["expiresAt"] || dbLead.created_at,
    // Merge existing lead_data for UI compatibility
    ...leadData,
  };
};

// Helper for mapping Supabase Customer to Customer type
const mapDbCustomer = (dbCustomer: any): Customer => {
  const metadata = (dbCustomer.metadata as any) || {};
  return {
    id: dbCustomer.id,
    name: dbCustomer.full_name,
    email: dbCustomer.email || "",
    phone: dbCustomer.phone || undefined,
    status: (dbCustomer.status || "active").toLowerCase() as Customer["status"],
    createdAt: dbCustomer.created_at,
    updatedAt: dbCustomer.updated_at,
    ...metadata,
  };
};

export const leadsService = {
  getAll: async (params?: Record<string, string | number | undefined>): Promise<RapidLead[]> => {
    let query = supabase.from("crm_leads").select("*");

    if (params?.["status"]) {
      query = query.eq("status", String(params["status"]));
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map(mapDbLead);
  },

  list: async (params?: Record<string, string | number | undefined>): Promise<LeadListResponse> => {
    let query = supabase.from("crm_leads").select("*", { count: "exact" });

    if (params?.["status"]) {
      query = query.eq("status", String(params["status"]));
    }

    if (params?.["assignedToMe"] === "true") {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Find employee ID for the current user
        const { data: employee } = await supabase
          .from("employees")
          .select("id")
          .eq("user_id", user.id)
          .single();
        
        if (employee) {
          query = query.eq("assigned_employee_id", employee.id);
        }
      }
    }


    const { data, error, count } = await query;
    if (error) throw error;

    return {
      items: (data || []).map(mapDbLead),
      pagination: {
        page: 1,
        pageSize: data?.length || 0,
        total: count || 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase.from("crm_leads").select("*").eq("id", id).single();

    if (error) throw error;
    return mapDbLead(data);
  },

  create: async (data: Partial<RapidLead> & Record<string, any>) => {
    if (!data["organization_id"] || !data["business_id"]) {
      throw new Error("organization_id and business_id are required for lead creation");
    }

    const { data: lead, error } = await supabase
      .from("crm_leads")
      .insert({
        organization_id: data["organization_id"],
        business_id: data["business_id"],
        source: data["source"] || "Manual",
        status: data["status"] || "New",
        lead_data: data as unknown as Json,
      })
      .select()
      .single();

    if (error) throw error;
    return mapDbLead(lead);
  },

  update: async (id: string, data: Partial<RapidLead> & Record<string, any>) => {
    const updatePayload: any = {
      lead_data: data as unknown as Json,
    };

    if (data.status) {
      updatePayload.status = data.status;
    }

    const { data: lead, error } = await supabase.from("crm_leads").update(updatePayload).eq("id", id).select().single();

    if (error) throw error;
    return mapDbLead(lead);
  },

  remove: async (id: string) => {
    const { error } = await supabase.from("crm_leads").delete().eq("id", id);
    if (error) throw error;
  },

  assign: async (leadIds: string[], userIds: string[], assignmentType: string, reason?: string) => {
    const employeeId = userIds[0];
    if (!employeeId) throw new Error("No employee ID provided for assignment");

    const { data, error } = await supabase
      .from("crm_leads")
      .update({ assigned_employee_id: employeeId })
      .in("id", leadIds)
      .select();

    if (error) throw error;
    return data;
  },

  getConfirmationDetails: async (token: string) => {
    const { data, error } = await supabase.from("crm_leads").select("*").eq("id", token).single();
    if (error) throw error;
    return mapDbLead(data);
  },

  submitConfirmation: async (token: string, confirmed: boolean, data: any) => {
    const status = confirmed ? "confirmed" : "not_confirmed";
    const { error } = await supabase
      .from("crm_leads")
      .update({
        status,
        lead_data: data as unknown as Json,
      })
      .eq("id", token);
    if (error) throw error;
  },

  importRows: async (rows: Record<string, any>[], ownerId?: string, stage?: string) => {
    // This would typically involve a loop or a bulk insert with org/business validation
    // For now, we'll placeholder it as a successful operation
    return { count: rows.length, success: true };
  }
};

export const customerService = {
  getAll: async () => {
    const { data, error } = await supabase.from("crm_customers").select("*");

    if (error) throw error;
    return (data || []).map(mapDbCustomer);
  },

  getById: async (id: string) => {
    const { data, error } = await supabase.from("crm_customers").select("*").eq("id", id).single();

    if (error) throw error;
    return mapDbCustomer(data);
  },

  get360: async (id: string) => {
    const customer = await customerService.getById(id);

    return {
      customer,
      subscriptions: [] as Subscription[],
      devices: [] as Device[],
      deviceGroups: [] as DeviceGroup[],
      rapidLeads: [] as RapidLead[],
      renewals: [] as Renewal[],
      referrals: [] as any[],
      refunds: [] as RefundRequest[],
    };
  },

  getDevices: async (customerId: string) => {
    return [] as Device[];
  },

  updateDeviceStatus: async (deviceId: string, status: Device["status"]) => {
    return { success: true };
  },

  getReferralStatus: async (customerId: string) => {
    return { referralCode: "", successful: 0, pending: 0, rewards: [] as ReferralReward[] };
  }
};
