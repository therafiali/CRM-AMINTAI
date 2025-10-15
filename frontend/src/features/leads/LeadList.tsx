import { DataTable, useUrlTableState } from "@/components/table";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { useUpdateLead } from "./hooks/mutations/useUpdateLeads";

type RowLead = {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
    status: string;
    source?: string | null;
    assignedTo?: string | null;
    createdAt: string;
};

export function LeadsList() {
    const { page, pageSize, sortBy, sortDir, setPage, setPageSize, setSort } = useUrlTableState({
        defaultPage: 1,
        defaultPageSize: 10,
        defaultSortBy: "createdAt",
        defaultSortDir: "desc",
    });

    const { data, isLoading, error } = useLeads({
        page,
        limit: pageSize,
        sortBy: sortBy || undefined,
        sortDir: sortDir || undefined,
    });

    const updateMutation = useUpdateLead();

    const rows: RowLead[] = (data?.items ?? []).map((l) => ({
        id: String(l.id),
        name: l.name,
        email: l.email,
        phone: l.phone,
        status: l.status,
        source: l.source,
        assignedTo: l.assignedToName ?? "Unassigned",
        createdAt: new Date(l.createdAt).toLocaleDateString(),
    }));

    const total = data?.meta.total ?? 0;

    const rowActions = [
        {
            label: "Mark Contacted",
            variant: "primary" as const,
            onClick: (row: any) => {
                // disable double-click while mutation pending for this row?
                updateMutation.mutate({
                    id: Number(row.id),
                    payload: { status: "Contacted" },
                });
            },
        },
        {
            label: "Mark Lost",
            variant: "danger" as const,
            onClick: (row: any) => {
                updateMutation.mutate({ id: Number(row.id), payload: { status: "Lost" } });
            },
        },
    ];

    return (
        <DataTable<RowLead>
            columns={[
                { key: "name", header: "Name", sortable: true },
                { key: "email", header: "Email" },
                { key: "phone", header: "Phone" },
                { key: "status", header: "Status", sortable: true },
                { key: "source", header: "Source" },
                { key: "assignedTo", header: "Assigned To" },
                { key: "createdAt", header: "Created", sortable: true },
            ]}
            rows={rows}
            keyField="id"
            isLoading={isLoading}
            error={error ? (error as any)?.message || "Failed to load leads" : null}
            sortBy={sortBy}
            sortDir={sortDir}
            onSortChange={setSort}
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            rowActions={rowActions}
        />
    );
}
