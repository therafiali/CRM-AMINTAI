import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { usersApi, type ListUsersParams, type ListUsersResult, type UsernameItem } from "@/features/users/users.api";


export function useUsers(params: ListUsersParams): UseQueryResult<ListUsersResult> {
    return useQuery<ListUsersResult>({
        queryKey: ["users", params],
        queryFn: () => usersApi.list(params),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60, // 1 minute
    });
}


export function useUsernames(): UseQueryResult<UsernameItem[]> {
    return useQuery<UsernameItem[]>({
        queryKey: ["users", "usernames"],
        queryFn: async () => {
            const response = await usersApi.usernames();
            return response.users;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}