import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { leadsApi } from "../../lead.api";

export function useUpdateLead() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: any }) =>
            leadsApi.update(id, payload),
        onSuccess: () => {
            toast.success("Lead updated");
            qc.invalidateQueries({ queryKey: ["leads"] });
        },
        onError: (err: any) => {
            toast.error(err?.message || "Failed to update lead");
        },
    });
}