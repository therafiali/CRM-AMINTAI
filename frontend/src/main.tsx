// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { AppRouter } from "@/router";
import { QueryProvider } from "./providers/QueryProvider";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider >
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>
);
