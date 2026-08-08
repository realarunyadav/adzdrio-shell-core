/**
 * Centralized API client for ABOS.
 * Target Backend: NestJS on Render
 */

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

class ApiClient {
  private baseUrl: string = import.meta.env.VITE_API_URL || "https://api.adzdrio.com";

  async get<T>(path: string): Promise<T> {
    // In the future, this will fetch from the NestJS backend
    // For now, it represents a pending connection
    throw new Error(`API Connection Pending: GET ${path}`);
  }

  async post<T>(path: string, body: any): Promise<T> {
    throw new Error(`API Connection Pending: POST ${path}`);
  }

  async patch<T>(path: string, body: any): Promise<T> {
    throw new Error(`API Connection Pending: PATCH ${path}`);
  }

  async delete<T>(path: string): Promise<T> {
    throw new Error(`API Connection Pending: DELETE ${path}`);
  }
}

export const api = new ApiClient();
