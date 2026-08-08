/**
 * Centralized API client for ABOS.
 * Target Backend: NestJS on Render
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    public override message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private get baseUrl(): string {
    return (import.meta as any).env['VITE_API_BASE_URL'] || "http://localhost:3000";
  }

  private get headers(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    const token = localStorage.getItem('abos_auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: response.statusText };
      }

      // Handle specific status codes
      if (response.status === 401) {
        // Handle unauthorized - trigger logout or refresh
        console.warn('Unauthorized request, session may have expired.');
        // window.dispatchEvent(new CustomEvent('abos:auth:unauthorized'));
      }

      throw new ApiError(
        response.status,
        errorData.message || 'An unexpected error occurred',
        errorData.code,
        errorData.details
      );
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
    timeoutMs: number = 30000
  ): Promise<T> {
    const url = `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
        signal: controller.signal,
      });
      clearTimeout(id);
      return await this.handleResponse<T>(response);
    } catch (error: any) {
      clearTimeout(id);
      if (error.name === 'AbortError') {
        throw new ApiError(408, 'Request timeout');
      }
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, error.message || 'Network failure');
    }
  }

  async get<T>(path: string, options?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  async post<T>(path: string, body?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : null,
    });
  }

  async put<T>(path: string, body?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : null,
    });
  }

  async patch<T>(path: string, body?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : null,
    });
  }

  async delete<T>(path: string, options?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient();
