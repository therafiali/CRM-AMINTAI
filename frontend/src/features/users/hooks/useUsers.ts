import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { usersApi, type ListUsersParams, type ListUsersResult } from "@/features/users/users.api";
import { useAuthContext } from "@/features/auth/context/AuthContext";

export function useUsers(params: ListUsersParams): UseQueryResult<ListUsersResult> {
    const { token } = useAuthContext();
    return useQuery<ListUsersResult>({
        queryKey: ["users", params],
        queryFn: () => usersApi.list(params, token || undefined),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60, // 1 minute
    });
}


