import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { leadsApi, type ListLeadsParams, type ListLeadsResult } from "../lead.api";


export function useLeads(params: ListLeadsParams): UseQueryResult<ListLeadsResult> {
    return useQuery<ListLeadsResult>({
        queryKey: ["leads", params],
        queryFn: () => leadsApi.list(params),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60, // 1 minute
    });
}
