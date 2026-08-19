import { api } from "./client";

export interface EmployeeRecord {
  id: string;
  organizationId: string;
  profileId: string;
  businessId: string | null;
  employeeCode: string;
  designation: string | null;
  department: string | null;
  reportsToId: string | null;
  employmentStatus: string;
  joiningDate: string | null;
  trainingStatus: string;
  metadata: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
  // Joined profile fields
  userName: string;
  userEmail: string;
  // Joined manager name
  managerName?: string;
  // Joined business name
  businessName?: string;
}

export interface CreateEmployeePayload {
  profileId: string;
  organizationId: string;
  businessId?: string | null;
  employeeCode: string;
  designation?: string;
  department?: string;
  reportsToId?: string | null;
  employmentStatus?: string;
  joiningDate?: string | null;
  trainingStatus?: string;
  metadata?: Record<string, any>;
}

export type UpdateEmployeePayload = Partial<Omit<CreateEmployeePayload, "profileId" | "organizationId">>;

export const hrService = {
  listEmployees: (params?: { search?: string; businessId?: string; department?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.businessId && params.businessId !== "all") query.set("businessId", params.businessId);
    if (params?.department && params.department !== "all") query.set("department", params.department);
    if (params?.status && params.status !== "all") query.set("status", params.status);
    
    return api.get<EmployeeRecord[]>(`/api/hr/employees${query.toString() ? `?${query.toString()}` : ""}`);
  },
  
  getEmployee: (id: string) => api.get<EmployeeRecord>(`/api/hr/employees/${id}`),
  
  createEmployee: (payload: CreateEmployeePayload) =>
    api.post<EmployeeRecord>("/api/hr/employees", payload),
    
  updateEmployee: (id: string, payload: UpdateEmployeePayload) =>
    api.patch<EmployeeRecord>(`/api/hr/employees/${id}`, payload),

  // New helper for user/profile selection within the organization
  getOrgProfiles: () => api.get<any[]>("/api/auth/organization-profiles"),
  
  // New helper for business selection
  getOrgBusinesses: () => api.get<any[]>("/api/auth/organization-businesses"),
};
