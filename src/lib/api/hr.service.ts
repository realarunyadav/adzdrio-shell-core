import { api } from "./client";

export interface EmployeeRecord {
  id: string;
  organizationId: string;
  userId: string;
  employeeCode: string;
  designation: string | null;
  department: string | null;
  team: string | null;
  managerUserId: string | null;
  employmentStatus: string;
  joiningDate: string | null;
  trainingStatus: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  userEmail: string;
  userStatus: string;
  userRoles: unknown;
}

export interface CreateEmployeePayload {
  userId: string;
  employeeCode: string;
  designation?: string | undefined;
  department?: string | undefined;
  team?: string | undefined;
  managerUserId?: string | undefined;
  employmentStatus?: string | undefined;
  joiningDate?: string | undefined;
  trainingStatus?: string | undefined;
}

export type UpdateEmployeePayload = Partial<Omit<CreateEmployeePayload, "userId">>;

export const hrService = {
  listEmployees: (search?: string) =>
    api.get<EmployeeRecord[]>(
      `/api/hr/employees${search?.trim() ? `?search=${encodeURIComponent(search.trim())}` : ""}`,
    ),
  getEmployee: (id: string) => api.get<EmployeeRecord>(`/api/hr/employees/${id}`),
  createEmployee: (payload: CreateEmployeePayload) =>
    api.post<EmployeeRecord>("/api/hr/employees", payload),
  updateEmployee: (id: string, payload: UpdateEmployeePayload) =>
    api.patch<EmployeeRecord>(`/api/hr/employees/${id}`, payload),
};
