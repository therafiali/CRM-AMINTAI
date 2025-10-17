// hooks/useAssignLead.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateLead } from "./useUpdateLeads";


interface AssignLeadOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useAssignLead(options?: AssignLeadOptions) {
  const queryClient = useQueryClient();
  const updateMutation = useUpdateLead();

  return useMutation({
    mutationFn: async ({ leadId, userId }: { leadId: number; userId: string }) => {
      return updateMutation.mutateAsync({
        id: leadId,
        payload: { 
          status: "assigned", 
          assignedToId: parseInt(userId) 
        },
      });
    },
    onMutate: async ({ leadId, userId }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['leads'] });

      // Snapshot the previous value
      const previousLeads = queryClient.getQueryData(['leads']);

      // Optimistically update to the new value
      queryClient.setQueryData(['leads'], (old: any) => {
        if (!old?.items) return old;
        
        return {
          ...old,
          items: old.items.map((lead: any) =>
            lead.id === leadId
              ? { 
                  ...lead, 
                  status: "assigned",
                  assignedToId: parseInt(userId),
                  assignedToName: "Loading..." // Temporary value
                }
              : lead
          ),
        };
      });

      return { previousLeads };
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      options?.onSuccess?.();
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousLeads) {
        queryClient.setQueryData(['leads'], context.previousLeads);
      }
      options?.onError?.(error);
    },
  });
}