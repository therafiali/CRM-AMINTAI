import { DataTable, useUrlTableState } from "@/components/table";
import { useUsers } from "@/features/users/hooks/useUsers";

type RowUser = {
    id: string;
    name: string;
    email: string;
    department: string;
    roles: string[];
};

export function UsersList() {
    const { page, pageSize, sortBy, sortDir, setPage, setPageSize, setSort } = useUrlTableState({
        defaultPage: 1,
        defaultPageSize: 10,
        defaultSortBy: "name",
        defaultSortDir: "asc",
    });

    const { data, isLoading, error } = useUsers({ page, limit: pageSize, sortBy: sortBy || undefined, sortDir: sortDir || undefined });
    const rows: RowUser[] = (data?.items ?? []).map((u) => ({
        id: String(u.id),
        name: u.name || u.email,
        email: u.email,
        department: u.departmentName.toUpperCase(),
        roles: [u.roleName.toUpperCase()],
    }));
    const total = data?.meta.total ?? 0;

    return (
        <DataTable<RowUser>
            columns={[
                { key: "name", header: "Name", sortable: true },
                { key: "department", header: "Department", sortable: true },
                { key: "roles", header: "Roles", render: (r) => r.roles.join(", ") },
                { key: "email", header: "Email" },
            ]}
            rows={rows}
            keyField="id"
            isLoading={isLoading}
            error={error ? (error as any)?.message || "Failed to load users" : null}
            sortBy={sortBy}
            sortDir={sortDir}
            onSortChange={setSort}
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
        // rowActions={[
        //     { label: "View", variant: "secondary", onClick: (r: RowUser) => alert(`View ${r.name}`) },
        //     { label: "Edit", variant: "primary", onClick: (r: RowUser) => alert(`Edit ${r.name}`) },
        // ]}
        />
    );
}


