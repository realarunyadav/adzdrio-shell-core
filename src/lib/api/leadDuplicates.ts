import { api } from "./client";

export interface DuplicateLeadRecord {
  id: string;
  firstName: string;
  lastName: string;
  companyName?: string | null;
  email?: string | null;
  primaryPhone?: string | null;
  status: string;
  stage: string;
  ownerId?: string | null;
  duplicateOfId?: string | null;
  createdAt: string;
}

export interface DuplicateGroup {
  leadIds: string[];
  matchedBy: string[];
  leads: DuplicateLeadRecord[];
}

export const leadDuplicatesService = {
  list: () => api.get<DuplicateGroup[]>("/api/lead-duplicates"),
  mark: (leadId: string, duplicateOfId: string) =>
    api.patch<DuplicateLeadRecord>(`/api/lead-duplicates/${leadId}/mark`, { duplicateOfId }),
  restore: (leadId: string) =>
    api.patch<DuplicateLeadRecord>(`/api/lead-duplicates/${leadId}/restore`),
};
