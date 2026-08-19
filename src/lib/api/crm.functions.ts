import { supabase } from "@/integrations/supabase/client";
import { Customer, RapidLead, Renewal, RefundRequest, Subscription, Device, DeviceGroup, ReferralReward } from "./services.types";

/**
 * CRM Service Layer - Supabase Implementation
 * Handles Customers and Leads with multi-tenant scoping.
 */

// Helper for mapping Supabase Lead to RapidLead type
const mapDbLead = (dbLead: any): RapidLead => ({
  id: dbLead.id,
  salespersonId: dbLead.assigned_employee_id || '',
  customerName: dbLead.lead_data?.customerName || dbLead.lead_data?.full_name || 'Unnamed Lead',
  customerEmail: dbLead.lead_data?.email || dbLead.lead_data?.customerEmail || '',
  customerPhone: dbLead.lead_data?.phone || dbLead.lead_data?.customerPhone || '',
  selectedPlanId: dbLead.lead_data?.selectedPlanId || 'standard',
  price: Number(dbLead.lead_data?.price || 0),
  duration: Number(dbLead.lead_data?.duration || 0),
  devices: Array.isArray(dbLead.lead_data?.devices) ? dbLead.lead_data.devices : [],
  status: dbLead.status.toLowerCase() as RapidLead['status'],
  confirmationUrl: dbLead.lead_data?.confirmationUrl || '',
  createdAt: dbLead.created_at,
  expiresAt: dbLead.lead_data?.expiresAt || dbLead.created_at,
  // Mapping other fields if needed by existing UI
  ...dbLead.lead_data
});

// Helper for mapping Supabase Customer to Customer type
const mapDbCustomer = (dbCustomer: any): Customer => ({
  id: dbCustomer.id,
  name: dbCustomer.full_name,
  email: dbCustomer.email || '',
  phone: dbCustomer.phone,
  status: dbCustomer.status.toLowerCase() as Customer['status'],
  createdAt: dbCustomer.created_at,
  updatedAt: dbCustomer.updated_at,
  ...dbCustomer.metadata
});

export const leadsService = {
  list: async (params?: Record<string, string | number | undefined>) => {
    let query = supabase
      .from('crm_leads')
      .select('*', { count: 'exact' });

    if (params?.status) {
      query = query.eq('status', params.status);
    }
    
    if (params?.assignedToMe === 'true') {
        // This assumes we have the user's profile/employee ID. 
        // In practice, RLS handles visibility, but for "My Leads" we might need a specific filter
        // We'll handle specific "My Leads" logic in the hook or by passing the employee ID
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
        hasPreviousPage: false
      }
    };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('crm_leads')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return mapDbLead(data);
  },

  create: async (data: Partial<RapidLead> & Record<string, any>) => {
    // We need organization_id and business_id from context usually.
    // For now, we assume RLS handles it or they are passed in metadata.
    const { data: lead, error } = await supabase
      .from('crm_leads')
      .insert({
        source: data.source || 'Manual',
        status: data.status || 'New',
        lead_data: data
      })
      .select()
      .single();
    
    if (error) throw error;
    return mapDbLead(lead);
  },

  update: async (id: string, data: Partial<RapidLead> & Record<string, any>) => {
    const { data: lead, error } = await supabase
      .from('crm_leads')
      .update({
        status: data.status,
        lead_data: data
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return mapDbLead(lead);
  },

  assign: async (leadIds: string[], userIds: string[], assignmentType: string, reason?: string) => {
    // Assuming userIds[0] is the employee_id
    const { data, error } = await supabase
      .from('crm_leads')
      .update({ assigned_employee_id: userIds[0] })
      .in('id', leadIds)
      .select();
    
    if (error) throw error;
    return data;
  }
};

export const customerService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('crm_customers')
      .select('*');
    
    if (error) throw error;
    return (data || []).map(mapDbCustomer);
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('crm_customers')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return mapDbCustomer(data);
  },

  get360: async (id: string) => {
    const customer = await customerService.getById(id);
    
    // Future tables - returning empty arrays as per instructions
    return {
      customer,
      subscriptions: [],
      devices: [],
      deviceGroups: [],
      rapidLeads: [],
      renewals: [],
      referrals: [],
      refunds: []
    };
  }
};
