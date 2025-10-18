// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { AppRouter } from "@/router";
import { QueryProvider } from "./providers/QueryProvider";
import { ThemeProvider } from "./components/theme/theme-provider";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider >
      <AuthProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>
);
