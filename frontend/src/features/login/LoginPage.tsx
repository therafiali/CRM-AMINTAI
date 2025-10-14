// src/features/login/LoginPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";

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
}
