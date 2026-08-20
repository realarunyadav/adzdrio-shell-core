/**
 * LEGAL SERVICE LAYER TYPES
 */

export interface LegalTemplate {
  id: string;
  organization_id: string;
  business_id?: string;
  name: string;
  type: string;
  status: 'Draft' | 'Active' | 'Archived';
  content?: string;
  variables: any[];
  created_by?: string;
  created_at: string;
  updated_at: string;
  metadata: Record<string, any>;
}

export interface LegalVersion {
  id: string;
  organization_id: string;
  business_id?: string;
  template_id: string;
  version: string;
  status: 'Draft' | 'Active' | 'Deprecated' | 'Read-only';
  effective_from: string;
  effective_to?: string;
  content?: string;
  created_by?: string;
  created_at: string;
  metadata: Record<string, any>;
}

export interface LegalDocument {
  id: string;
  organization_id: string;
  business_id: string;
  customer_id?: string;
  template_id?: string;
  version_id?: string;
  related_entity_id?: string;
  related_entity_type?: string;
  name: string;
  type: string;
  category?: string;
  version?: string;
  status: 'Draft' | 'Active' | 'Expired' | 'Archived' | 'Pending Signature' | 'Signed';
  owner_employee_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  metadata: Record<string, any>;
}

export interface LegalSignature {
  id: string;
  organization_id: string;
  business_id: string;
  document_id: string;
  signer_employee_id?: string;
  signer_customer_id?: string;
  status: 'Requested' | 'Sent' | 'Opened' | 'Signed' | 'Declined' | 'Expired';
  provider?: string;
  provider_reference?: string;
  requested_at: string;
  signed_at?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ComplianceRule {
  id: string;
  organization_id: string;
  business_id?: string;
  term: string;
  category?: string;
  severity: 'Blocker' | 'Warning' | 'Info';
  status: 'Active' | 'Inactive';
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}
