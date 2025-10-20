/**
 * Centralized API client for all fetch requests
 * Eliminates code duplication and provides consistent error handling
 */

export class ApiError extends Error {
  constructor(message: string, public status: number, public data?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClient {
  private static async request<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new ApiError(
          data.error || `Request failed: ${res.status}`,
          res.status,
          data
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : "Network error",
        0
      );
    }
  }

  static get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  static post<T>(
    url: string,
    data: unknown,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static put<T>(url: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }
}
