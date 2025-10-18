import { useState, type ChangeEvent, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createLead, type LeadPayload } from "./hooks/mutations/lead";

export default function LeadFormModal() {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState<LeadPayload>({
        name: "",
        email: "",
        phone: "",
        status: "New",
        source: "",
        notes: "",
        assignedToId: undefined,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: LeadPayload) => createLead(data),
        onSuccess: (res) => {
            toast.success(`✅ Lead "${res.lead.name}" created successfully`);
            queryClient.invalidateQueries({ queryKey: ["leads"] });
            setFormData({
                name: "",
                email: "",
                phone: "",
                status: "New",
                source: "",
                notes: "",
            });
            setOpen(false); // ✅ close modal after success
        },
        onError: (err: any) => {
            toast.error(err.message || "Error creating lead");
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "assignedToId" ? Number(value) || undefined : value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* ✅ Button to open modal */}
            <DialogTrigger asChild>
                <Button>Create Lead</Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create New Lead</DialogTitle>
                </DialogHeader>

                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="source">Source</Label>
                                <Input
                                    id="source"
                                    name="source"
                                    value={formData.source}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* <div>
                                <Label htmlFor="assignedToId">Assigned To (User ID)</Label>
                                <Input
                                    id="assignedToId"
                                    name="assignedToId"
                                    type="number"
                                    value={formData.assignedToId || ""}
                                    onChange={handleChange}
                                />
                            </div> */}

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full mt-4"
                            >
                                {isPending ? "Creating..." : "Create Lead"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}
