import { supabase } from "@/integrations/supabase/client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { 
  SupportCategory, 
  SupportTicket, 
  SupportMessage, 
  SupportArticle
} from "./support.types";

/**
 * SUPPORT SERVICE LAYER - SUPABASE IMPLEMENTATION
 * Handles Tickets, Messages, Knowledge Base, and Categories with multi-tenant scoping.
 */

// --- Support Categories ---

export const listSupportCategories = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("support_categories")
      .select("*")
      .eq("status", "active")
      .order("name");

    if (error) throw error;
    return (data || []) as unknown as SupportCategory[];
  });

export const getSupportCategoryById = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: category, error } = await supabase
      .from("support_categories")
      .select("*")
      .eq("id", data.id)
      .single();

    if (error) throw error;
    return category as unknown as SupportCategory;
  });

export const createSupportCategory = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const { data: category, error } = await supabase
      .from("support_categories")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return category as unknown as SupportCategory;
  });

export const updateSupportCategory = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => 
    z.object({ 
      id: z.string(), 
      data: z.record(z.any()) 
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { data: category, error } = await supabase
      .from("support_categories")
      .update(data.data as any)
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw error;
    return category as unknown as SupportCategory;
  });

// --- Support Tickets ---

export const listSupportTickets = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => 
    z.object({
      status: z.string().optional(),
      priority: z.string().optional(),
      category_id: z.string().optional(),
      customer_id: z.string().optional(),
      assigned_employee_id: z.string().optional(),
      business_id: z.string().optional(),
      search: z.string().optional(),
      page: z.number().default(1),
      pageSize: z.number().default(20),
    }).optional().parse(data || {})
  )
  .handler(async ({ data }) => {
    const filter = data || { page: 1, pageSize: 20 };
    let query = supabase
      .from("support_tickets")
      .select(`
        *,
        crm_customers(full_name),
        support_categories(name),
        businesses(name)
      `, { count: 'exact' });

    if (filter.status) query = query.eq("status", filter.status);
    if (filter.priority) query = query.eq("priority", filter.priority);
    if (filter.category_id) query = query.eq("category_id", filter.category_id);
    if (filter.customer_id) query = query.eq("customer_id", filter.customer_id);
    if (filter.assigned_employee_id) query = query.eq("assigned_employee_id", filter.assigned_employee_id);
    if (filter.business_id) query = query.eq("business_id", filter.business_id);
    if (filter.search) {
      query = query.or(`subject.ilike.%${filter.search}%`);
    }

    const from = (filter.page - 1) * filter.pageSize;
    const to = from + filter.pageSize - 1;

    const { data: tickets, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      items: (tickets || []).map(t => ({
        ...t,
        customer_name: (t.crm_customers as any)?.full_name,
        category_name: (t.support_categories as any)?.name,
        business_name: (t.businesses as any)?.name,
      })) as unknown as SupportTicket[],
      total: count || 0
    };
  });

export const getSupportTicketById = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: ticket, error } = await supabase
      .from("support_tickets")
      .select(`
        *,
        crm_customers(full_name, email, phone),
        support_categories(name),
        businesses(name)
      `)
      .eq("id", data.id)
      .single();

    if (error) throw error;
    
    return {
      ...ticket,
      customer_name: (ticket.crm_customers as any)?.full_name,
      category_name: (ticket.support_categories as any)?.name,
      business_name: (ticket.businesses as any)?.name
    } as unknown as SupportTicket;
  });

export const createSupportTicket = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const { data: ticket, error } = await supabase
      .from("support_tickets")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return ticket as unknown as SupportTicket;
  });

export const updateSupportTicket = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => 
    z.object({ 
      id: z.string(), 
      data: z.record(z.any()) 
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { data: ticket, error } = await supabase
      .from("support_tickets")
      .update(data.data as any)
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw error;
    return ticket as unknown as SupportTicket;
  });

// --- Support Messages ---

export const listSupportMessages = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ ticketId: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: messages, error } = await supabase
      .from("support_messages")
      .select(`
        *
      `)
      .eq("ticket_id", data.ticketId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return (messages || []) as unknown as SupportMessage[];
  });

export const createSupportMessage = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const { data: message, error } = await supabase
      .from("support_messages")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return message as unknown as SupportMessage;
  });

// --- Support Articles ---

export const listSupportArticles = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => 
    z.object({
      category_id: z.string().optional(),
      status: z.string().optional(),
      search: z.string().optional(),
      page: z.number().default(1),
      pageSize: z.number().default(20),
    }).optional().parse(data || {})
  )
  .handler(async ({ data }) => {
    const filter = data || { page: 1, pageSize: 20 };
    let query = supabase
      .from("support_articles")
      .select(`
        *,
        support_categories(name)
      `, { count: 'exact' });

    if (filter.category_id) query = query.eq("category_id", filter.category_id);
    if (filter.status) query = query.eq("status", filter.status);
    if (filter.search) {
      query = query.or(`title.ilike.%${filter.search}%,content.ilike.%${filter.search}%`);
    }

    const from = (filter.page - 1) * filter.pageSize;
    const to = from + filter.pageSize - 1;

    const { data: articles, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      items: (articles || []).map(a => ({
        ...a,
        category_name: (a.support_categories as any)?.name,
      })) as unknown as SupportArticle[],
      total: count || 0
    };
  });

export const getSupportArticleById = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: article, error } = await supabase
      .from("support_articles")
      .select(`
        *,
        support_categories(name)
      `)
      .eq("id", data.id)
      .single();

    if (error) throw error;

    return {
      ...article,
      category_name: (article.support_categories as any)?.name
    } as unknown as SupportArticle;
  });

export const createSupportArticle = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const { data: article, error } = await supabase
      .from("support_articles")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return article as unknown as SupportArticle;
  });

export const updateSupportArticle = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => 
    z.object({ 
      id: z.string(), 
      data: z.record(z.any()) 
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { data: article, error } = await supabase
      .from("support_articles")
      .update(data.data as any)
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw error;
    return article as unknown as SupportArticle;
  });

export const supportCategories = {
  list: listSupportCategories,
  getById: getSupportCategoryById,
  create: createSupportCategory,
  update: updateSupportCategory,
};

export const supportTickets = {
  list: listSupportTickets,
  getById: getSupportTicketById,
  create: createSupportTicket,
  update: updateSupportTicket,
};

export const supportMessages = {
  list: listSupportMessages,
  create: createSupportMessage,
};

export const supportArticles = {
  list: listSupportArticles,
  getById: getSupportArticleById,
  create: createSupportArticle,
  update: updateSupportArticle,
};
