// src/features/properties/components/add-property-dialog.tsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PropertyForm } from "./property-form";
import { propertiesApi, type CreatePropertyPayload } from "./property.api";
import { toast } from "sonner";


export function AddPropertyDialog() {
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: propertiesApi.create,
        onSuccess: () => {
            // Invalidate properties query to refresh the list
            queryClient.invalidateQueries({ queryKey: ["properties"] });

            toast.message("Sucess")

            setOpen(false);
        },
        onError: (error: Error) => {
            toast.message(error.message)
        },
    });

    const handleSubmit = async (data: CreatePropertyPayload) => {
        await createMutation.mutateAsync(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add New Property</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Property</DialogTitle>
                    <DialogDescription>
                        List a new property in your real estate portfolio. Fill in the details below.
                    </DialogDescription>
                </DialogHeader>

                <PropertyForm
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                    isLoading={createMutation.isPending}
                />
            </DialogContent>
        </Dialog>
    );
}