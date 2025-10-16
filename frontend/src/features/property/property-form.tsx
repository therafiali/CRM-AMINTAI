// src/features/properties/components/property-form.tsx
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
const propertyFormSchema = z.object({
    title: z.string().min(1, "Property title is required"),
    address: z.string().min(1, "Address is required"),
    price: z.coerce.number().min(0, "Price must be positive").optional().or(z.literal("")),
    type: z.enum(["residential", "commercial", "land", "rental"]),
    bedrooms: z.coerce.number().min(0, "Bedrooms must be 0 or more").optional().or(z.literal("")),
    bathrooms: z.coerce.number().min(0, "Bathrooms must be 0 or more").optional().or(z.literal("")),
    area: z.coerce.number().min(0, "Area must be positive").optional().or(z.literal("")),
    status: z.enum(["available", "under_contract", "sold", "rented"]),
    description: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface PropertyFormProps {
    onSubmit: (data: PropertyFormValues) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
    initialData?: Partial<PropertyFormValues>;
}

export function PropertyForm({ 
    onSubmit, 
    onCancel, 
    isLoading = false, 
    initialData 
}: PropertyFormProps) {
    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(propertyFormSchema),
        defaultValues: {
            title: initialData?.title || "",
            address: initialData?.address || "",
            price: initialData?.price || undefined,
            type: initialData?.type || "residential",
            bedrooms: initialData?.bedrooms || undefined,
            bathrooms: initialData?.bathrooms || undefined,
            area: initialData?.area || undefined,
            status: initialData?.status || "available",
            description: initialData?.description || "",
        },
    });

    const handleSubmit = async (data: PropertyFormValues) => {
        // Convert empty strings to undefined for optional fields
        const submitData = {
            ...data,
            price: data.price || undefined,
            bedrooms: data.bedrooms || undefined,
            bathrooms: data.bathrooms || undefined,
            area: data.area || undefined,
            description: data.description || undefined,
        };
        await onSubmit(submitData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Property Title *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Beautiful Modern House in Downtown" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Address */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Full Address *</FormLabel>
                                <FormControl>
                                    <Input placeholder="123 Main Street, City, State, ZIP" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Price */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
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

                    {/* Type */}
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Property Type *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="residential">Residential</SelectItem>
                                        <SelectItem value="commercial">Commercial</SelectItem>
                                        <SelectItem value="land">Land</SelectItem>
                                        <SelectItem value="rental">Rental</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Status */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="under_contract">Under Contract</SelectItem>
                                        <SelectItem value="sold">Sold</SelectItem>
                                        <SelectItem value="rented">Rented</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Bedrooms */}
                    <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bedrooms</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        placeholder="3" 
                                        {...field} 
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Bathrooms */}
                    <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bathrooms</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        placeholder="2" 
                                        {...field} 
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Area */}
                    <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Area (sq ft)</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        placeholder="1800" 
                                        {...field} 
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Describe the property features, amenities, location advantages..." 
                                    className="min-h-[120px]"
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
                        {initialData ? "Update Property" : "Create Property"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}