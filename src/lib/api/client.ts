/**
 * Centralized API client for ABOS.
 * Target backend: production NestJS deployment.
 *
 * The API base URL must be supplied through VITE_API_BASE_URL. We intentionally
 * do not fall back to localhost because a published build must never silently
 * send production traffic to a developer machine.
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    public override message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function getApiBaseUrl(): string | null {
  // Use a fallback if VITE_API_BASE_URL is not provided to prevent fatal bootstrap errors
  // while still throwing errors during actual requests if configuration is missing.
  const configured = String((import.meta as ImportMeta & { env: Record<string, string | undefined> }).env['VITE_API_BASE_URL'] ?? '').trim();
  return configured ? configured.replace(/\/+$/, '') : null;
}

class ApiClient {
  private get baseUrl(): string | null {
    return getApiBaseUrl();
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
      let errorData: { message?: string; code?: string; details?: unknown };
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }

      if (response.status === 401) {
        localStorage.removeItem('abos_auth_token');
        window.dispatchEvent(new CustomEvent('abos:auth:unauthorized'));
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
    timeoutMs = 30000
  ): Promise<T> {
    if (!this.baseUrl) {
      throw new ApiError(0, 'ABOS API is not configured. Legacy service unavailable.');
    }
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
      return await this.handleResponse<T>(response);
    } catch (error: unknown) {
      if (error instanceof ApiError) throw error;
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiError(408, 'Request timeout');
      }
      const message = error instanceof Error ? error.message : 'Network failure';
      throw new ApiError(0, message);
    } finally {
      clearTimeout(id);
    }
  }

  async get<T>(path: string, options?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  async post<T>(path: string, body?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body === undefined ? null : JSON.stringify(body),
    });
  }

  async put<T>(path: string, body?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: body === undefined ? null : JSON.stringify(body),
    });
  }

  async patch<T>(path: string, body?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: body === undefined ? null : JSON.stringify(body),
    });
  }

  async delete<T>(path: string, options?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient();
