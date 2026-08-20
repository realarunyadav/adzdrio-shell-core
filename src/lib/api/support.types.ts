/**
 * SUPPORT SERVICE LAYER TYPES
 */

export interface SupportCategory {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface SupportTicket {
  id: string;
  organization_id: string;
  business_id: string;
  customer_id: string;
  category_id: string | null;
  assigned_employee_id: string | null;
  subject: string;
  status: string;
  priority: string;
  metadata: any;
  created_at: string | null;
  updated_at: string | null;
  due_time: string | null;
  sla_status: string;
  // Join fields
  customer_name?: string;
  category_name?: string;
  business_name?: string;
}

export interface SupportMessage {
  id: string;
  organization_id: string;
  business_id: string;
  ticket_id: string;
  sender_employee_id: string | null;
  body: string;
  visibility: string;
  is_internal: boolean;
  metadata: any;
  created_at: string | null;
  updated_at: string | null;
  // Join fields
  sender_name?: string;
}


export interface SupportArticle {
  id: string;
  organization_id: string;
  category_id: string | null;
  title: string;
  content: string;
  status: string;
  views: number | null;
  metadata: any;
  created_at: string | null;
  updated_at: string | null;
  // Join fields
  category_name?: string;
}

export interface SupportTicketFilters {
  status?: string;
  priority?: string;
  category_id?: string;
  customer_id?: string;
  assigned_employee_id?: string;
  business_id?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface SupportArticleFilters {
  category_id?: string;
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}
