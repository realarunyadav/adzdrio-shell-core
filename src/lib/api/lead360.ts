// This module is currently a placeholder for Lead 360 sub-resources (Activities, Tasks).
// Backend controllers for these routes are currently pending.
// Do NOT call these endpoints in production until the corresponding routes are deployed.

export interface LeadActivity {
  id: string;
  leadId: string;
  actorId?: string | null;
  action: string;
  details?: Record<string, any> | null;
  createdAt: string;
}

export interface LeadTask {
  id: string;
  leadId: string;
  assigneeId?: string | null;
  title: string;
  description?: string | null;
  taskType: "FOLLOW_UP" | "CALL" | "WHATSAPP" | "EMAIL" | "MEETING" | "OTHER";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  dueAt?: string | null;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export const lead360Service = {
  // Routes disabled - backend controllers not yet implemented
  getActivities: async (_leadId: string): Promise<LeadActivity[]> => [],
  addActivity: async (_leadId: string, _data: any) => { throw new Error("Activity tracking is coming in next phase"); },
  getTasks: async (_leadId: string) => [],
  createTask: async (_leadId: string, _data: any) => { throw new Error("Task management is coming in next phase"); },
  updateTask: async (_leadId: string, _taskId: string, _data: any) => { throw new Error("Task management is coming in next phase"); },
  deleteTask: async (_leadId: string, _taskId: string) => { throw new Error("Task management is coming in next phase"); },
};
