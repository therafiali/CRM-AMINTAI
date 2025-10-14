const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

export interface ApiError {
    status: number;
    message: string;
    details?: unknown;
}

async function request<T>(
    path: string,
    options: RequestInit = {},
    token?: string | null
): Promise<T> {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const err: ApiError = {
            status: res.status,
            message: data.message || res.statusText,
            details: data.errors,
        };
        throw err;
    }
    return res.json() as Promise<T>;
}



export const http = {
    get: <T>(url: string, token?: string) => request<T>(url, { method: "GET" }, token),
    post: <T>(url: string, body: unknown, token?: string) =>
        request<T>(url, { method: "POST", body: JSON.stringify(body) }, token),
    put: <T>(url: string, body: unknown, token?: string) =>
        request<T>(url, { method: "PUT", body: JSON.stringify(body) }, token),
    del: <T>(url: string, token?: string) => request<T>(url, { method: "DELETE" }, token),
};
