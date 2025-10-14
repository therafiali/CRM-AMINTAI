// src/router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./features/login/LoginPage";
import { RegisterPage } from "@/features/register/RegisterPage";
import { PrivateRoute } from "./components/PrivateRoute";
import App from "./App";


const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
        element: <PrivateRoute />,
        children: [
            { path: "/", element: <App /> },
        ],
    },
    { path: "*", element: <LoginPage /> },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}
