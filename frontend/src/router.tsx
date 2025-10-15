// src/router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./features/login/LoginPage";
import { RegisterPage } from "@/features/register/RegisterPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { appRoutes } from "@/routes/routeConfig";


const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
        element: <PrivateRoute />,
        children: [
            {
                element: <AppLayout />,
                children: appRoutes.map((r) => ({ path: r.path, element: r.element })),
            },
        ],
    },
    { path: "*", element: <LoginPage /> },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}
