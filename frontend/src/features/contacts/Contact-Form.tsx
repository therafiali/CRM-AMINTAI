// src/features/contacts/components/contact-form.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

// Form validation schema
const contactFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().optional(),
    type: z.enum(["buyer", "seller", "both", "tenant"]),
    budget: z.coerce.number().min(0, "Budget must be positive").optional().or(z.literal("")),
    notes: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
    onSubmit: (data: ContactFormValues) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
    initialData?: Partial<ContactFormValues>;
}

export function ContactForm({ 
    onSubmit, 
    onCancel, 
    isLoading = false, 
    initialData 
}: ContactFormProps) {
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: initialData?.name || "",
            email: initialData?.email || "",
            phone: initialData?.phone || "",
            type: initialData?.type || "buyer",
            budget: initialData?.budget || undefined,
            notes: initialData?.notes || "",
        },
    });

    const handleSubmit = async (data: ContactFormValues) => {
        // Convert empty strings to undefined for optional fields
        const submitData = {
            ...data,
            email: data.email || undefined,
            phone: data.phone || undefined,
            budget: data.budget || undefined,
            notes: data.notes || undefined,
        };
        await onSubmit(submitData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Type */}
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Type *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="buyer">Buyer</SelectItem>
                                        <SelectItem value="seller">Seller</SelectItem>
                                        <SelectItem value="both">Buyer & Seller</SelectItem>
                                        <SelectItem value="tenant">Tenant</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        {...field} 
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="+1 (555) 123-4567" 
                                        {...field} 
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Budget */}
                    <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Budget ($)</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        placeholder="500000" 
                                        {...field} 
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Notes */}
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Additional notes about this contact..." 
                                    className="min-h-[100px]"
                                    {...field} 
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-4">
                    {onCancel && (
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? "Update Contact" : "Create Contact"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}