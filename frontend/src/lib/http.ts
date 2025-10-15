import { authStorage } from "@/features/auth/auth-storage";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

export interface ApiError {
    status: number;
    message: string;
    details?: unknown;
}

async function request<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {

    const token = authStorage.getToken();
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

    // 🔥 Handle unauthorized / forbidden globally
    if (res.status === 401 || res.status === 403) {
        authStorage.clear();
        // Optional: redirect to login page (if in browser)
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        throw new Error("Unauthorized or session expired");
    }

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
    get: <T>(url: string) => request<T>(url, { method: "GET" }),
    post: <T>(url: string, body: unknown) =>
        request<T>(url, { method: "POST", body: JSON.stringify(body) }),
    put: <T>(url: string, body: unknown) =>
        request<T>(url, { method: "PUT", body: JSON.stringify(body) }),
    patch: <T>(url: string, body?: unknown) =>
        request<T>(url, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
    del: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};
