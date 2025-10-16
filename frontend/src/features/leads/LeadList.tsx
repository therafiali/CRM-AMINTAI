import { DataTable, useUrlTableState } from "@/components/table";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { useUpdateLead } from "./hooks/mutations/useUpdateLeads";
import { UserSelectPopover } from "@/components/layout/UserSelectPopover";

import { AlertCircle, CheckCircle2, User, UserPlus } from "lucide-react";
import SalesSummaryCards from "./SalesSummaryCard";

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

    const assignmentStats = [
    {
      label: "Unassigned Leads",
      value: 42,
      icon: UserPlus,
      gradient: "from-orange-500/10 to-orange-500/5",
      iconColor: "text-orange-500",
    },
    {
      label: "Assigned Leads",
      value: 156,
      icon: User,
      gradient: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-500",
    },
    {
      label: "Recently Assigned",
      value: 15,
      icon: CheckCircle2,
      gradient: "from-green-500/10 to-green-500/5",
      iconColor: "text-green-500",
    },
    {
      label: "Pending Follow-ups",
      value: 8,
      icon: AlertCircle,
      gradient: "from-yellow-500/10 to-yellow-500/5",
      iconColor: "text-yellow-500",
    },
  ]


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
    <>
    <SalesSummaryCards cards={assignmentStats} />
    <DataTable<RowLead>
      columns={[
        { key: "name", header: "Name", sortable: true },
        { key: "email", header: "Email" },
        { key: "phone", header: "Phone" },
        // { key: "status", header: "Status", sortable: true },
        { key: "source", header: "Source" },
        { key: "createdAt", header: "Created", sortable: true },
        {
          key: "assignedTo",
          header: "Assigned To",
          render: (row) =>
            row.assignedTo === "Unassigned" ? (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Unassigned</span>
                <UserSelectPopover />
              </div>
            ) : (
              <span>{row.assignedTo}</span>
            ),
        },
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
    </>
  );
}
