import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { usersApi, type ListUsersParams, type ListUsersResult } from "@/features/users/users.api";


export function useUsers(params: ListUsersParams): UseQueryResult<ListUsersResult> {
    return useQuery<ListUsersResult>({
        queryKey: ["users", params],
        queryFn: () => usersApi.list(params),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60, // 1 minute
    });
}


