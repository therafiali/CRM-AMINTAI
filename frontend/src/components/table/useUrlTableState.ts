import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type SortDirection = "asc" | "desc";

export interface TableUrlState {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortDir?: SortDirection;
    q?: string;
}

export interface UseUrlTableStateOptions {
    defaultPage?: number;
    defaultPageSize?: number;
    allowedPageSizes?: number[];
    defaultSortBy?: string;
    defaultSortDir?: SortDirection;
}

export interface UseUrlTableStateResult extends TableUrlState {
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setSort: (sortBy?: string, sortDir?: SortDirection) => void;
    setQuery: (q?: string) => void;
    reset: () => void;
}

function parsePositiveInt(value: string | null | undefined, fallback: number): number {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? Math.trunc(n) : fallback;
}

export function useUrlTableState(options: UseUrlTableStateOptions = {}): UseUrlTableStateResult {
    const {
        defaultPage = 1,
        defaultPageSize = 10,
        allowedPageSizes,
        defaultSortBy,
        defaultSortDir,
    } = options;

    const [searchParams, setSearchParams] = useSearchParams();

    const initial = useMemo<TableUrlState>(() => {
        const pageFromUrl = parsePositiveInt(searchParams.get("page"), defaultPage);
        const sizeFromUrl = parsePositiveInt(searchParams.get("pageSize"), defaultPageSize);
        const pageSize = allowedPageSizes?.includes(sizeFromUrl) ? sizeFromUrl : defaultPageSize;
        const sortBy = searchParams.get("sortBy") ?? defaultSortBy;
        const sortDir = (searchParams.get("sortDir") as SortDirection | null) ?? defaultSortDir;
        const q = searchParams.get("q") ?? undefined;
        return { page: pageFromUrl, pageSize, sortBy: sortBy || undefined, sortDir: sortDir || undefined, q };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [state, setState] = useState<TableUrlState>(initial);

    const updateUrl = useCallback((next: Partial<TableUrlState>) => {
        const merged: TableUrlState = { ...state, ...next };
        const params = new URLSearchParams(searchParams);
        params.set("page", String(merged.page));
        params.set("pageSize", String(merged.pageSize));
        if (merged.sortBy) params.set("sortBy", merged.sortBy); else params.delete("sortBy");
        if (merged.sortDir) params.set("sortDir", merged.sortDir); else params.delete("sortDir");
        if (merged.q) params.set("q", merged.q); else params.delete("q");
        setSearchParams(params, { replace: true });
    }, [searchParams, setSearchParams, state]);

    const setPage = useCallback((page: number) => {
        setState((s) => ({ ...s, page }));
        updateUrl({ page });
    }, [updateUrl]);

    const setPageSize = useCallback((pageSize: number) => {
        const validSize = allowedPageSizes?.includes(pageSize) ? pageSize : pageSize;
        setState((s) => ({ ...s, pageSize: validSize, page: 1 }));
        updateUrl({ pageSize: validSize, page: 1 });
    }, [allowedPageSizes, updateUrl]);

    const setSort = useCallback((sortBy?: string, sortDir?: SortDirection) => {
        setState((s) => ({ ...s, sortBy, sortDir }));
        updateUrl({ sortBy, sortDir });
    }, [updateUrl]);

    const setQuery = useCallback((q?: string) => {
        setState((s) => ({ ...s, q, page: 1 }));
        updateUrl({ q, page: 1 });
    }, [updateUrl]);

    const reset = useCallback(() => {
        const base: TableUrlState = {
            page: defaultPage,
            pageSize: defaultPageSize,
            sortBy: defaultSortBy,
            sortDir: defaultSortDir,
            q: undefined,
        };
        setState(base);
        updateUrl(base);
    }, [defaultPage, defaultPageSize, defaultSortBy, defaultSortDir, updateUrl]);

    return { ...state, setPage, setPageSize, setSort, setQuery, reset };
}


