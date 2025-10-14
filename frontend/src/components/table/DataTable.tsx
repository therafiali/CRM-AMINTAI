import { useMemo } from "react";

export type SortDirection = "asc" | "desc";

export type TableColumn<TData> = {
    key: keyof TData | string;
    header: string;
    width?: string | number;
    align?: "left" | "center" | "right";
    sortable?: boolean;
    render?: (row: TData) => React.ReactNode;
};

export type RowAction<TData> = {
    label: string;
    onClick: (row: TData) => void;
    variant?: "primary" | "secondary" | "danger" | "ghost";
};

export interface DataTableProps<TData> {
    columns: Array<TableColumn<TData>>;
    rows: TData[];
    keyField?: keyof TData | ((row: TData, index: number) => string);
    isLoading?: boolean;
    error?: string | null;
    // sorting
    sortBy?: string;
    sortDir?: SortDirection;
    onSortChange?: (sortBy?: string, sortDir?: SortDirection) => void;
    // pagination
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    pageSizeOptions?: number[];
    // actions
    rowActions?: Array<RowAction<TData>>;
    // empty state
    emptyMessage?: string;
}

function classNames(...list: Array<string | false | undefined>): string {
    return list.filter(Boolean).join(" ");
}

export function DataTable<TData>(props: DataTableProps<TData>) {
    const {
        columns,
        rows,
        keyField,
        isLoading,
        error,
        sortBy,
        sortDir,
        onSortChange,
        page,
        pageSize,
        total,
        onPageChange,
        onPageSizeChange,
        pageSizeOptions = [10, 20, 50],
        rowActions,
        emptyMessage = "No data to display",
    } = props;

    const totalPages = Math.max(1, Math.ceil(total / Math.max(pageSize, 1)));

    const headers = useMemo(() => {
        return columns.map((col) => {
            const active = sortBy === String(col.key);
            const nextDir: SortDirection | undefined = !active
                ? "asc"
                : sortDir === "asc"
                    ? "desc"
                    : undefined;
            return { col, active, nextDir };
        });
    }, [columns, sortBy, sortDir]);

    return (
        <div className="w-full">
            <div className="overflow-x-auto border rounded-md">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50">
                            {columns.map((col, idx) => {
                                const h = headers[idx];
                                return (
                                    <th
                                        key={String(col.key)}
                                        style={{ width: col.width }}
                                        className={classNames(
                                            "px-3 py-2 font-medium text-gray-700",
                                            col.align === "right" && "text-right",
                                            col.align === "center" && "text-center"
                                        )}
                                    >
                                        <div className="flex items-center gap-1">
                                            <span>{col.header}</span>
                                            {col.sortable && (
                                                <button
                                                    type="button"
                                                    className="text-xs text-gray-500 hover:text-gray-800"
                                                    onClick={() => onSortChange?.(h.active ? (h.nextDir ? String(col.key) : undefined) : String(col.key), h.nextDir)}
                                                >
                                                    {h.active ? (sortDir === "asc" ? "▲" : sortDir === "desc" ? "▼" : "") : "⇅"}
                                                </button>
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                            {rowActions && rowActions.length > 0 && <th className="px-3 py-2 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td className="px-3 py-4 text-center text-gray-500" colSpan={columns.length + (rowActions?.length ? 1 : 0)}>
                                    Loading...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td className="px-3 py-4 text-center text-red-600" colSpan={columns.length + (rowActions?.length ? 1 : 0)}>
                                    {error}
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td className="px-3 py-8 text-center text-gray-500" colSpan={columns.length + (rowActions?.length ? 1 : 0)}>
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, rowIndex) => {
                                const rowKey = typeof keyField === "function" ? keyField(row, rowIndex) : keyField ? String((row as any)[keyField as keyof TData]) : String(rowIndex);
                                return (
                                    <tr key={rowKey} className="border-t">
                                        {columns.map((col) => (
                                            <td
                                                key={String(col.key)}
                                                className={classNames("px-3 py-2", col.align === "right" && "text-right", col.align === "center" && "text-center")}
                                            >
                                                {col.render ? col.render(row) : String((row as any)[col.key as keyof TData] ?? "")}
                                            </td>
                                        ))}
                                        {rowActions && rowActions.length > 0 && (
                                            <td className="px-3 py-2 text-right whitespace-nowrap">
                                                <div className="inline-flex gap-2">
                                                    {rowActions.map((action) => (
                                                        <button
                                                            key={action.label}
                                                            type="button"
                                                            className={classNames(
                                                                "px-2 py-1 rounded border text-xs",
                                                                action.variant === "primary" && "bg-blue-600 text-white border-blue-600",
                                                                action.variant === "secondary" && "bg-gray-100 text-gray-900 border-gray-300",
                                                                action.variant === "danger" && "bg-red-600 text-white border-red-600",
                                                                action.variant === "ghost" && "bg-transparent text-gray-700 border-transparent"
                                                            )}
                                                            onClick={() => action.onClick(row)}
                                                        >
                                                            {action.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-3 mt-3">
                <div className="text-sm text-gray-600">
                    Page {Math.min(page, totalPages)} of {totalPages} • {total} total
                </div>
                <div className="flex items-center gap-2">
                    <select
                        className="border rounded px-2 py-1 text-sm"
                        value={pageSize}
                        onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
                    >
                        {pageSizeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt} / page
                            </option>
                        ))}
                    </select>
                    <div className="inline-flex gap-1">
                        <button
                            type="button"
                            className="px-2 py-1 border rounded text-sm"
                            disabled={page <= 1}
                            onClick={() => onPageChange(1)}
                        >
                            « First
                        </button>
                        <button
                            type="button"
                            className="px-2 py-1 border rounded text-sm"
                            disabled={page <= 1}
                            onClick={() => onPageChange(Math.max(1, page - 1))}
                        >
                            ‹ Prev
                        </button>
                        <button
                            type="button"
                            className="px-2 py-1 border rounded text-sm"
                            disabled={page >= totalPages}
                            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                        >
                            Next ›
                        </button>
                        <button
                            type="button"
                            className="px-2 py-1 border rounded text-sm"
                            disabled={page >= totalPages}
                            onClick={() => onPageChange(totalPages)}
                        >
                            Last »
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


