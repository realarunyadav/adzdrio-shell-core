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

export const supportCategories = {
  list: createServerFn({ method: "GET" })
    .handler(async () => {
      const { data, error } = await supabase
        .from("support_categories")
        .select("*")
        .eq("status", "active")
        .order("name");

      if (error) throw error;
      return (data || []) as unknown as SupportCategory[];
    }),

  getById: createServerFn({ method: "GET" })
    .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
    .handler(async ({ data }) => {
      const { data: category, error } = await supabase
        .from("support_categories")
        .select("*")
        .eq("id", data.id)
        .single();

      if (error) throw error;
      return category as unknown as SupportCategory;
    }),

  create: createServerFn({ method: "POST" })
    .inputValidator((data: any) => data)
    .handler(async ({ data }) => {
      const { data: category, error } = await supabase
        .from("support_categories")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return category as unknown as SupportCategory;
    }),

  update: createServerFn({ method: "POST" })
    .inputValidator((data: unknown) => 
      z.object({ 
        id: z.string(), 
        data: z.record(z.any()) 
      }).parse(data)
    )
    .handler(async ({ data }) => {
      const { data: category, error } = await supabase
        .from("support_categories")
        .update(data.data)
        .eq("id", data.id)
        .select()
        .single();

      if (error) throw error;
      return category as unknown as SupportCategory;
    })
};

// --- Support Tickets ---

export const supportTickets = {
  list: createServerFn({ method: "GET" })
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
      }).parse(data || {})
    )
    .handler(async ({ data }) => {
      let query = supabase
        .from("support_tickets")
        .select(`
          *,
          crm_customers(full_name),
          support_categories(name),
          businesses(name)
        `, { count: 'exact' });

      if (data.status) query = query.eq("status", data.status);
      if (data.priority) query = query.eq("priority", data.priority);
      if (data.category_id) query = query.eq("category_id", data.category_id);
      if (data.customer_id) query = query.eq("customer_id", data.customer_id);
      if (data.assigned_employee_id) query = query.eq("assigned_employee_id", data.assigned_employee_id);
      if (data.business_id) query = query.eq("business_id", data.business_id);
      if (data.search) {
        query = query.or(`subject.ilike.%${data.search}%`);
      }

      const from = (data.page - 1) * data.pageSize;
      const to = from + data.pageSize - 1;

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
    }),

  getById: createServerFn({ method: "GET" })
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
    }),

  create: createServerFn({ method: "POST" })
    .inputValidator((data: any) => data)
    .handler(async ({ data }) => {
      const { data: ticket, error } = await supabase
        .from("support_tickets")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return ticket as unknown as SupportTicket;
    }),

  update: createServerFn({ method: "POST" })
    .inputValidator((data: unknown) => 
      z.object({ 
        id: z.string(), 
        data: z.record(z.any()) 
      }).parse(data)
    )
    .handler(async ({ data }) => {
      const { data: ticket, error } = await supabase
        .from("support_tickets")
        .update(data.data)
        .eq("id", data.id)
        .select()
        .single();

      if (error) throw error;
      return ticket as unknown as SupportTicket;
    })
};

// --- Support Messages ---

export const supportMessages = {
  list: createServerFn({ method: "GET" })
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
    }),

  create: createServerFn({ method: "POST" })
    .inputValidator((data: any) => data)
    .handler(async ({ data }) => {
      const { data: message, error } = await supabase
        .from("support_messages")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return message as unknown as SupportMessage;
    })
};

// --- Support Articles ---

export const supportArticles = {
  list: createServerFn({ method: "GET" })
    .inputValidator((data: unknown) => 
      z.object({
        category_id: z.string().optional(),
        status: z.string().optional(),
        search: z.string().optional(),
        page: z.number().default(1),
        pageSize: z.number().default(20),
      }).parse(data || {})
    )
    .handler(async ({ data }) => {
      let query = supabase
        .from("support_articles")
        .select(`
          *,
          support_categories(name)
        `, { count: 'exact' });

      if (data.category_id) query = query.eq("category_id", data.category_id);
      if (data.status) query = query.eq("status", data.status);
      if (data.search) {
        query = query.or(`title.ilike.%${data.search}%,content.ilike.%${data.search}%`);
      }

      const from = (data.page - 1) * data.pageSize;
      const to = from + data.pageSize - 1;

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
    }),

  getById: createServerFn({ method: "GET" })
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
    }),

  create: createServerFn({ method: "POST" })
    .inputValidator((data: any) => data)
    .handler(async ({ data }) => {
      const { data: article, error } = await supabase
        .from("support_articles")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return article as unknown as SupportArticle;
    }),

  update: createServerFn({ method: "POST" })
    .inputValidator((data: unknown) => 
      z.object({ 
        id: z.string(), 
        data: z.record(z.any()) 
      }).parse(data)
    )
    .handler(async ({ data }) => {
      const { data: article, error } = await supabase
        .from("support_articles")
        .update(data.data)
        .eq("id", data.id)
        .select()
        .single();

      if (error) throw error;
      return article as unknown as SupportArticle;
    })
};
