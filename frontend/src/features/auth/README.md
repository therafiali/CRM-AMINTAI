### Auth Module Guide

This document explains how authentication works end-to-end in this app: token storage, API calls, context state, hooks, and route protection. It includes code references to the exact places in the codebase.

---

## High-level flow

- **Login**: User submits credentials → `authApi.login` → backend returns `token` and `user` → we call `setAuth` in `AuthContext` to persist token and set runtime state.
- **Hydration on app load**: If a token exists in storage, `AuthContext` calls `userApi.getMe` to fetch the canonical user profile and populate context.
- **Making requests**: All requests go through `http` and include the `Authorization: Bearer <token>` header if a token is provided.
- **Route protection**: `PrivateRoute` redirects to `/login` when unauthenticated.
- **Logout**: Clears token + user from context and storage, then redirects to `/login`.

---

## Storage

The token is stored in `localStorage` under a namespaced key. Access is centralized in `auth-storage`.

```1:8:src/features/auth/auth-storage.ts
const TOKEN_KEY = "crm.auth.token";

export const authStorage = {
    getToken: () => localStorage.getItem(TOKEN_KEY),
    setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    clear: () => localStorage.removeItem(TOKEN_KEY),
};
```

Notes:
- Components and hooks should never call `localStorage` directly; use `AuthContext` or specific hooks.

---

## HTTP client

All API traffic is funneled through a tiny wrapper over `fetch`. If a token is provided, the `Authorization` header is attached.

```1:42:src/lib/http.ts
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
```

---

## API layer

### Login API

```1:18:src/features/auth/auth.api.ts
// src/features/auth/api/auth.api.ts
import { http } from "@/lib/http";
import {
    type AuthResponse,
    apiLoginEnvelopeSchema,
    adaptApiUserToUser,
} from "./auth.types";

export const authApi = {
    login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
        const envelope = await http.post<unknown>("/auth/login", data);
        const parsed = apiLoginEnvelopeSchema.parse(envelope);
        return {
            token: parsed.data.token,
            user: adaptApiUserToUser(parsed.data.user),
        };
    },
};
```

### Current user API

```1:13:src/features/auth/user.api.ts
import { http } from "@/lib/http";
import { adaptApiUserToUser, apiUserSchema, type User } from "./auth.types";

export const userApi = {
    getMe: async (token: string): Promise<User> => {
        const data = await http.get<unknown>("/auth/me", token);
        const parsed = apiUserSchema.parse(data);
        return adaptApiUserToUser(parsed);
    },
};
```

---

## Token utilities

These are helpers for decoding and checking expiry. We currently use server `/auth/me` as the source of truth for user profile.

```1:27:src/features/auth/token.ts
export interface DecodedJwt {
    exp?: number; // seconds since epoch
    iat?: number;
    sub?: string | number;
    [key: string]: unknown;
}

export function decodeJwt(token: string): DecodedJwt | null {
    try {
        const [, payload] = token.split(".");
        if (!payload) return null;
        const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(json) as DecodedJwt;
    } catch {
        return null;
    }
}

export function isJwtExpired(token: string, skewSeconds = 0): boolean {
    const decoded = decodeJwt(token);
    if (!decoded?.exp) return false;
    const nowSeconds = Math.floor(Date.now() / 1000) + skewSeconds;
    return decoded.exp <= nowSeconds;
}
```

---

## Context: runtime auth state

The `AuthContext` stores the current `token`, `user`, and hydration state. On mount, it hydrates the user if a token exists. It also provides `setAuth` and `logout`.

```1:69:src/features/auth/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../auth.types";
import { authStorage } from "../auth-storage";
import { userApi } from "@/features/auth/user.api";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isHydrating: boolean;
    setAuth: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(authStorage.getToken());
    const [user, setUser] = useState<User | null>(null);
    const [isHydrating, setIsHydrating] = useState(false);

    useEffect(() => {
        // On app load, if a token exists, hydrate the user profile
        const bootstrap = async () => {
            if (!token) return;
            setIsHydrating(true);
            try {
                const profile = await userApi.getMe(token);
                setUser(profile);
            } catch {
                // If token is invalid/expired, clear auth state
                authStorage.clear();
                setToken(null);
                setUser(null);
            } finally {
                setIsHydrating(false);
            }
        };
        void bootstrap();
    }, []);

    const setAuth = (token: string, user: User) => {
        authStorage.setToken(token);
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        authStorage.clear();
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated: !!token, isHydrating, setAuth, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
};
```

Key points:
- `isAuthenticated` is computed from the presence of a `token`.
- `isHydrating` gates early renders while fetching `/auth/me`.
- `setAuth` persists token and sets user for immediate UI update after login.

---

## Hooks

### useAuth
Lightweight selector for token and auth status.

```1:8:src/features/auth/hooks/useAuth.ts
// src/features/auth/hooks/useAuth.ts
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const { user, token, isAuthenticated } = useAuthContext();
    return { user, token, isAuthenticated };
};
```

### useLogin
Handles the login submission flow: calls API, updates context, redirects.

```1:18:src/features/auth/hooks/useLogin.ts
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { authApi } from "../auth.api";

export const useLogin = () => {
    const { setAuth } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        const res = await authApi.login({ email, password });
        setAuth(res.token, res.user);
        navigate("/");
    };

    return { login };
};
```

### useLogout
Clears auth state and navigates away.

```1:14:src/features/auth/hooks/useLogout.ts
// src/features/auth/hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const useLogout = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    return () => {
        logout();
        navigate("/login");
    };
};
```

### useUser
UI-friendly access to the current user with a loading flag.

```1:9:src/features/auth/hooks/useUser.ts
import { useAuthContext } from "../context/AuthContext";

export const useUser = () => {
    const { user, isHydrating } = useAuthContext();
    return { user, isLoading: isHydrating };
};
```

---

## Route protection

Routes under `PrivateRoute` require authentication.

```1:12:src/components/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function PrivateRoute() {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return <Outlet />;
}
```

Usage in router:

```8:15:src/router.tsx
const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    {
        element: <PrivateRoute />,
        children: [
            { path: "/", element: <App /> },
        ],
    },
    { path: "*", element: <LoginPage /> },
]);
```

---

## Displaying the user in UI

Example from `App.tsx` showing how to display name/email using `useUser`:

```1:24:src/App.tsx
import { useUser } from "@/features/auth/hooks/useUser";

function App() {
  const { user, isLoading } = useUser();

  return (
    <>
      <section className="p-6 space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        {isLoading && <p className="text-sm text-gray-500">Loading user...</p>}
        {!isLoading && user && (
          <div className="rounded border p-4">
            <p className="text-lg">Welcome, <span className="font-medium">{user.name || user.email}</span></p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        )}
      </section>
    </>
  )
}
```

---

## Error handling & expiry

- API wrapper throws a structured `ApiError` containing `status` and `message` when a response is not OK.
- If `/auth/me` fails during hydration, we clear token and user to force a re-login.
- You can use `isJwtExpired(token)` to preemptively handle expiry (e.g., auto-logout or refresh flows) if needed.

---

## Extending the module

- Add a refresh token flow: intercept 401s in the HTTP layer, attempt to refresh, retry original request, otherwise logout.
- Persist user profile separately if you want to avoid calling `/auth/me` on every reload.
- Add role/permission helpers and guards based on the `User` fields.


