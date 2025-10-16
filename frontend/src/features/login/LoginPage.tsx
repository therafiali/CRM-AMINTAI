// src/features/login/LoginPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
<<<<<<< HEAD

export function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/20">
            <Card className="w-full max-w-sm shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">
                        CRM Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                        Don't have an account? <Link to="/register" className="text-primary underline-offset-4 hover:underline">Register</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
=======
import logo from "@/assets/logo-black.png"; // ⬅️ place your black logo here (rename accordingly)

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 relative overflow-hidden">
      {/* Soft blurred background */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30"></div>

      {/* Main Card */}
      <Card className="w-full max-w-sm shadow-lg bg-white backdrop-blur-md ">
        <CardHeader className="flex flex-col items-center space-y-2">
          <img
            src={logo}
            alt="Amin Tai CRM"
            className="w-60 h-auto object-contain bg-white backdrop-blur-md "
          />
          <CardTitle className="text-center text-2xl font-semibold tracking-tight text-gray-900">
            CRM Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <LoginForm />
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
>>>>>>> 171e6a2 (UI better)
}
