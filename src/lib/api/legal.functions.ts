import { supabase } from "@/integrations/supabase/client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { 
  LegalTemplate, 
  LegalVersion, 
  LegalDocument, 
  LegalSignature, 
  ComplianceRule 
} from "./legal.types";

/**
 * LEGAL SERVICE LAYER - SUPABASE IMPLEMENTATION
 * Handles Templates, Versions, Documents, Signatures, and Compliance Rules.
 */

// --- Legal Templates ---

export const listLegalTemplates = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => 
    z.object({
      business_id: z.string().optional(),
      status: z.string().optional(),
    }).optional().parse(data || {})
  )
  .handler(async ({ data }) => {
    let query = supabase.from("legal_templates").select("*");
    
    if (data?.business_id) query = query.eq("business_id", data.business_id);
    if (data?.status) query = query.eq("status", data.status);
    
    const { data: templates, error } = await query.order("name");
    if (error) throw error;
    return (templates || []) as unknown as LegalTemplate[];
  });

export const getLegalTemplateById = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: template, error } = await supabase
      .from("legal_templates")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error) throw error;
    return template as unknown as LegalTemplate;
  });

export const createLegalTemplate = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const { data: template, error } = await supabase
      .from("legal_templates")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return template as unknown as LegalTemplate;
  });

export const updateLegalTemplate = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => 
    z.object({ 
      id: z.string(), 
      data: z.record(z.any()) 
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { data: template, error } = await supabase
      .from("legal_templates")
      .update(data.data as any)
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw error;
    return template as unknown as LegalTemplate;
  });

// --- Legal Versions ---

export const listLegalVersions = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ templateId: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: versions, error } = await supabase
      .from("legal_versions")
      .select("*")
      .eq("template_id", data.templateId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (versions || []) as unknown as LegalVersion[];
  });

export const getLegalVersionById = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: version, error } = await supabase
      .from("legal_versions")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error) throw error;
    return version as unknown as LegalVersion;
  });

export const createLegalVersion = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const { data: version, error } = await supabase
      .from("legal_versions")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return version as unknown as LegalVersion;
  });

// --- Legal Documents ---

export const listLegalDocuments = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => 
    z.object({
      business_id: z.string().optional(),
      customer_id: z.string().optional(),
      status: z.string().optional(),
      category: z.string().optional(),
    }).optional().parse(data || {})
  )
  .handler(async ({ data }) => {
    let query = supabase.from("legal_documents").select("*");
    
    if (data?.business_id) query = query.eq("business_id", data.business_id);
    if (data?.customer_id) query = query.eq("customer_id", data.customer_id);
    if (data?.status) query = query.eq("status", data.status);
    if (data?.category) query = query.eq("category", data.category);
    
    const { data: documents, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;
    return (documents || []) as unknown as LegalDocument[];
  });

export const getLegalDocumentById = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: document, error } = await supabase
      .from("legal_documents")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error) throw error;
    return document as unknown as LegalDocument;
  });

export const createLegalDocument = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const { data: document, error } = await supabase
      .from("legal_documents")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return document as unknown as LegalDocument;
  });

export const updateLegalDocument = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => 
    z.object({ 
      id: z.string(), 
      data: z.record(z.any()) 
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { data: document, error } = await supabase
      .from("legal_documents")
      .update(data.data as any)
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw error;
    return document as unknown as LegalDocument;
  });

// --- Legal Signatures ---

export const listLegalSignatures = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ documentId: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: signatures, error } = await supabase
      .from("legal_signatures")
      .select("*")
      .eq("document_id", data.documentId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (signatures || []) as unknown as LegalSignature[];
  });

export const getLegalSignatureById = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: signature, error } = await supabase
      .from("legal_signatures")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error) throw error;
    return signature as unknown as LegalSignature;
  });

// --- Compliance Rules ---

export const listComplianceRules = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => 
    z.object({
      business_id: z.string().optional(),
      category: z.string().optional(),
      severity: z.string().optional(),
    }).optional().parse(data || {})
  )
  .handler(async ({ data }) => {
    let query = supabase.from("compliance_rules").select("*");
    
    if (data?.business_id) query = query.eq("business_id", data.business_id);
    if (data?.category) query = query.eq("category", data.category);
    if (data?.severity) query = query.eq("severity", data.severity);
    
    const { data: rules, error } = await query.order("term");
    if (error) throw error;
    return (rules || []) as unknown as ComplianceRule[];
  });

export const getComplianceRuleById = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: rule, error } = await supabase
      .from("compliance_rules")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error) throw error;
    return rule as unknown as ComplianceRule;
  });

export const createComplianceRule = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const { data: rule, error } = await supabase
      .from("compliance_rules")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return rule as unknown as ComplianceRule;
  });

export const updateComplianceRule = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => 
    z.object({ 
      id: z.string(), 
      data: z.record(z.any()) 
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { data: rule, error } = await supabase
      .from("compliance_rules")
      .update(data.data as any)
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw error;
    return rule as unknown as ComplianceRule;
  });

export const legalTemplates = {
  list: listLegalTemplates,
  getById: getLegalTemplateById,
  create: createLegalTemplate,
  update: updateLegalTemplate,
};

export const legalVersions = {
  list: listLegalVersions,
  getById: getLegalVersionById,
  create: createLegalVersion,
};

export const legalDocuments = {
  list: listLegalDocuments,
  getById: getLegalDocumentById,
  create: createLegalDocument,
  update: updateLegalDocument,
};

export const legalSignatures = {
  list: listLegalSignatures,
  getById: getLegalSignatureById,
};

export const complianceRules = {
  list: listComplianceRules,
  getById: getComplianceRuleById,
  create: createComplianceRule,
  update: updateComplianceRule,
};
