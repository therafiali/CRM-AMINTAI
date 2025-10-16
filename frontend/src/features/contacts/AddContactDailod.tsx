// src/features/contacts/components/add-contact-dialog.tsx
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
import { contactsApi, type CreateContactPayload } from "./contacts.api";
import { ContactForm } from "./Contact-Form";
import { toast } from "sonner";



export function AddContactDialog() {
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: contactsApi.create,
        onSuccess: () => {
            // Invalidate contacts query to refresh the list
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            toast.message('Error')

            setOpen(false);
        },
        onError: (error: Error) => {
            toast.message('Error')
        }
    });

    const handleSubmit = async (data: CreateContactPayload) => {
        await createMutation.mutateAsync(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add New Contact</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                    <DialogDescription>
                        Create a new contact for your real estate CRM. Fill in the details below.
                    </DialogDescription>
                </DialogHeader>

                <ContactForm
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                    isLoading={createMutation.isPending}
                />
            </DialogContent>
        </Dialog>
    );
}