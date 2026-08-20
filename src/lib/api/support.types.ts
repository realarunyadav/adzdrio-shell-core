/**
 * SUPPORT SERVICE LAYER TYPES
 */

export interface SupportCategory {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  slug: string;
  icon: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  organization_id: string;
  business_id: string;
  customer_id: string;
  category_id: string | null;
  assigned_employee_id: string | null;
  ticket_number: string;
  subject: string;
  description: string | null;
  status: 'open' | 'in_progress' | 'waiting_on_customer' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  // Join fields
  customer_name?: string;
  assigned_employee_name?: string;
  category_name?: string;
  business_name?: string;
}

export interface SupportMessage {
  id: string;
  organization_id: string;
  business_id: string;
  ticket_id: string;
  sender_employee_id: string | null;
  content: string;
  is_internal: boolean;
  metadata: Record<string, any>;
  created_at: string;
  // Join fields
  sender_name?: string;
}

export interface SupportArticle {
  id: string;
  organization_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: 'draft' | 'published' | 'archived';
  is_internal: boolean;
  author_id: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
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
  is_internal?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}
