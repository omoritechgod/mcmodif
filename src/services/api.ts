// Base API configuration and utilities
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mdoilandgas.com/mcdee/backend/public';

// API Response types
export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Request configuration
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

// Base API client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  private getFormDataHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return {
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  async request<T = any>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      requiresAuth = true
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    
    const requestHeaders = requiresAuth 
      ? { ...this.getAuthHeaders(), ...headers }
      : { 'Content-Type': 'application/json', 'Accept': 'application/json', ...headers };

    const requestConfig: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body) {
      if (body instanceof FormData) {
        // For FormData, remove Content-Type to let browser set it with boundary
        const formDataHeaders = requiresAuth 
          ? { ...this.getFormDataHeaders(), ...headers }
          : { 'Accept': 'application/json', ...headers };
        delete formDataHeaders['Content-Type'];
        requestConfig.headers = formDataHeaders;
        requestConfig.body = body;
      } else {
        requestConfig.body = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(url, requestConfig);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  }

  // Convenience methods
  async get<T = any>(endpoint: string, requiresAuth = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', requiresAuth });
  }

  async post<T = any>(endpoint: string, data?: any, requiresAuth = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: data, requiresAuth });
  }

  async put<T = any>(endpoint: string, data?: any, requiresAuth = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body: data, requiresAuth });
  }

  async delete<T = any>(endpoint: string, requiresAuth = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', requiresAuth });
  }

  async uploadFile<T = any>(endpoint: string, formData: FormData, requiresAuth = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: formData, requiresAuth });
  }
}

// Create API client instance
export const apiClient = new ApiClient(BASE_URL);

// Export base URL for direct usage if needed
export { BASE_URL };