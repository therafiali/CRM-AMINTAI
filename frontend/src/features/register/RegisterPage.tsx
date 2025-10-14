import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RegisterForm } from "./RegisterForm";
import { Link } from "react-router-dom";

export function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Static department and role for now (id = 2)</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                        Already have an account? <Link to="/login" className="text-primary underline-offset-4 hover:underline">Login</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}


