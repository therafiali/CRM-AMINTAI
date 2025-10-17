import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "./schema";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const STATIC_ROLES = [
    { id: 4, name: "sales-manager" },
    { id: 5, name: "sales-agent" },
    { id: 6, name: "admin" },
];

const STATIC_DEPARTMENTS = [
    { id: 4, name: "sales" },
    { id: 6, name: "admin" },
];

export function RegisterForm() {
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            roleId: 2,
            departmentId: 2,
        },
    });

    const registerMutation = useRegister();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const onSubmit = async (values: RegisterFormValues) => {
        setError(null);
        setSuccess(null);
        try {
            await registerMutation.mutateAsync(values);
            setSuccess("User registered successfully");
            form.reset({
                name: "",
                email: "",
                password: "",
                roleId: 2,
                departmentId: 2,
            });
        } catch (e: any) {
            setError(e?.message || "Registration failed");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Rafi Ali" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="rafi@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="StrongPass123!" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="departmentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                                <select
                                    className="h-9 w-full rounded-md border px-3 text-sm bg-transparent"
                                    value={field.value}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                >
                                    {STATIC_DEPARTMENTS.map((d) => (
                                        <option key={d.id} value={d.id}>{d.name.toUpperCase()}</option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="roleId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <select
                                    className="h-9 w-full rounded-md border px-3 text-sm bg-transparent"
                                    value={field.value}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                >
                                    {STATIC_ROLES.map((r) => (
                                        <option key={r.id} value={r.id}>{r.name.toUpperCase()}</option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                {success && <p className="text-sm text-green-600 text-center">{success}</p>}

                <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? "Registering..." : "Register"}
                </Button>
            </form>
        </Form>
    );
}


