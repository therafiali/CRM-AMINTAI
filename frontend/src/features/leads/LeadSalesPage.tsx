import { DataTable, useUrlTableState } from "@/components/table";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { useUpdateLead } from "./hooks/mutations/useUpdateLeads";
import { StatusBadge } from "@/components/ui/StatusBadge";
import SalesSummaryCards from "./SalesSummarycard";


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

export function LeadsSales() {
  const { page, pageSize, sortBy, sortDir, setPage, setPageSize, setSort } =
    useUrlTableState({
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

  console.log(data);

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
        updateMutation.mutate({
          id: Number(row.id),
          payload: { status: "Lost" },
        });
      },
    },
  ];

  return (
    <section className="mt-10 px-2">
      <h1 className="scroll-m-20 my-8 text-start text-4xl font-extrabold tracking-tight text-balance">
        Sales
      </h1>
      <SalesSummaryCards />
      <DataTable<RowLead>
        columns={[
          { key: "name", header: "Name", sortable: true },
          { key: "email", header: "Email" },
          { key: "phone", header: "Phone" },
          {
            key: "status",
            header: "Status",
            sortable: true,
            render: (row) => <StatusBadge status={row.status} />,
          },

          { key: "source", header: "Source" },
          { key: "createdAt", header: "Created", sortable: true },
          { key: "assignedTo", header: "Assigned To", sortable: true },
          //   {
          //     key: "assignedTo",
          //     header: "Assigned To",
          //     render: (row) =>
          //       row.assignedTo === "Unassigned" ? (
          //         <div className="flex items-center gap-2">
          //           <span className="text-muted-foreground">Unassigned</span>
          //           <UserSelectPopover />
          //         </div>
          //       ) : (
          //         <span>{row.assignedTo}</span>
          //       ),
          //   },
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
        //   rowActions={rowActions}
      />
    </section>
  );
}
