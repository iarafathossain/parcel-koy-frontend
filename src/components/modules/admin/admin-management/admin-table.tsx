"use client";

import { getAllAdminsAction } from "@/actions/admin-action";
import { getAllHubsAction } from "@/actions/hub-action";
import DataTable from "@/components/shared/table/data-table";
import {
  DataTableFilterConfig,
  DataTableFilterValue,
  DataTableFilterValues,
} from "@/components/shared/table/data-table-filters";
import { constants } from "@/constants";
import { parsePositiveInt } from "@/helpers/parse-positive-int";
import { PaginationMeta } from "@/types/api-type";
import { IHub } from "@/types/hub-type";
import { IAdmin } from "@/types/user-type";
import { useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { adminColumns } from "./admin-columns";

interface AdminTableProps {
  initialQueryString: string;
}

const AdminTable = ({ initialQueryString }: AdminTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSortingTransitionPending, startSortingTransition] = useTransition();

  const queryStringFromUrl = useMemo(
    () => searchParams.toString(),
    [searchParams],
  );
  const queryString = queryStringFromUrl || initialQueryString;

  const paginationStateFromUrl = useMemo<PaginationState>(() => {
    const page = parsePositiveInt(
      searchParams.get("page"),
      constants.DEFAULT_PAGE,
    );
    const limit = parsePositiveInt(
      searchParams.get("limit"),
      constants.DEFAULT_LIMIT,
    );
    return {
      pageIndex: page - 1, // Convert to zero-based index
      pageSize: limit,
    };
  }, [searchParams]);

  const searchTermFromUrl = searchParams.get("searchTerm") ?? "";
  const genderFilterFromUrl = searchParams.get("user.gender") ?? "";
  const userStatusFilterFromUrl = searchParams.get("user.status") ?? "";

  const hubNameFromUrl = useMemo(
    () => searchParams.getAll(constants.HUBS_FILTER_KEY),
    [searchParams],
  );

  const sortingStateFromUrl = useMemo(() => {
    const sortBy = searchParams.get("sortBy") ?? "";
    const sortOrder = searchParams.get("sortOrder") ?? "asc";

    if (!sortBy || (sortOrder !== "asc" && sortOrder !== "desc")) {
      return [];
    }

    return [
      {
        id: sortBy,
        desc: sortOrder === "desc",
      },
    ];
  }, [searchParams]);

  const [optimisticSortingState, setOptimisticSortingState] =
    useState<SortingState>(sortingStateFromUrl);
  const [optimisticPaginationState, setOptimisticPaginationState] =
    useState<PaginationState>(paginationStateFromUrl);

  useEffect(() => {
    setOptimisticSortingState(sortingStateFromUrl);
  }, [sortingStateFromUrl]);

  useEffect(() => {
    setOptimisticPaginationState(paginationStateFromUrl);
  }, [paginationStateFromUrl]);

  const updateUrlAndRefresh = useCallback(
    (params: URLSearchParams) => {
      const nextQuery = params.toString();
      const currentQuery = window.location.search.replace(/^\?/, ""); // Remove leading '?'

      if (nextQuery === currentQuery) {
        // If the query string hasn't changed, do nothing
        return;
      }

      const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

      // update URL immediately for optimistic UX, then refresh the server component
      window.history.pushState(null, "", nextUrl);

      startSortingTransition(() => {
        router.refresh();
      });
    },
    [pathname, router, startSortingTransition],
  );

  const handleSortingChange = useCallback(
    (state: SortingState) => {
      setOptimisticSortingState(state);

      const params = new URLSearchParams(window.location.search);
      const nextSorting = state[0];

      if (nextSorting) {
        params.set("sortBy", nextSorting.id);
        params.set("sortOrder", nextSorting.desc ? "desc" : "asc");
      } else {
        params.delete("sortBy");
        params.delete("sortOrder");
      }

      // Reset to first page when sort order changes.
      params.set("page", "1");

      setOptimisticPaginationState((prevState) => ({
        pageIndex: 0,
        pageSize: prevState.pageSize,
      }));

      updateUrlAndRefresh(params);
    },
    [updateUrlAndRefresh],
  );

  const handlePaginationChange = useCallback(
    (state: PaginationState) => {
      setOptimisticPaginationState(state);

      const params = new URLSearchParams(window.location.search);
      params.set("page", String(state.pageIndex + 1));
      params.set("limit", String(state.pageSize));

      updateUrlAndRefresh(params);
    },
    [updateUrlAndRefresh],
  );

  const handleDebouncedSearchChange = useCallback(
    (searchTerm: string) => {
      const params = new URLSearchParams(window.location.search);
      const normalizedSearchTerm = searchTerm.trim();
      const currentSearchTerm = params.get("searchTerm") ?? "";

      if (normalizedSearchTerm === currentSearchTerm) {
        return;
      }

      if (normalizedSearchTerm) {
        params.set("searchTerm", normalizedSearchTerm);
      } else {
        params.delete("searchTerm");
      }

      // Start from first page when search query changes.
      params.set("page", "1");

      setOptimisticPaginationState((prevState) => ({
        pageIndex: 0,
        pageSize: prevState.pageSize,
      }));

      updateUrlAndRefresh(params);
    },
    [updateUrlAndRefresh],
  );

  const {
    data: adminDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["admins", queryString],
    queryFn: () => getAllAdminsAction(queryString),
  });

  const { data: hubsResponse } = useQuery({
    queryKey: ["hubs"],
    queryFn: () => getAllHubsAction(),
  });

  const admins = adminDataResponse?.data || [];
  const hubs = useMemo<IHub[]>(() => {
    return hubsResponse?.data ?? [];
  }, [hubsResponse]);

  const meta: PaginationMeta | undefined = adminDataResponse?.meta;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "user.gender",
        label: "Gender",
        type: "single-select",
        options: [
          {
            label: "Male",
            value: "MALE",
          },
          {
            label: "Female",
            value: "FEMALE",
          },
          {
            label: "Other",
            value: "OTHER",
          },
        ],
      },
      {
        id: "user.status",
        label: "Status",
        type: "single-select",
        options: [
          {
            label: "ACTIVE",
            value: "ACTIVE",
          },
          {
            label: "BLOCKED",
            value: "BLOCKED",
          },
          {
            label: "DELETED",
            value: "DELETED",
          },
        ],
      },
      {
        id: constants.HUBS_FILTER_KEY,
        label: "Hubs",
        type: "multi-select",
        options: hubs.map((h) => ({
          label: h.name,
          value: h.name,
        })),
      },
    ];
  }, [hubs]);

  const filterValues = useMemo<DataTableFilterValues>(() => {
    return {
      "user.gender": genderFilterFromUrl,
      "user.status": userStatusFilterFromUrl,
      [constants.HUBS_FILTER_KEY]: hubNameFromUrl,
    };
  }, [genderFilterFromUrl, userStatusFilterFromUrl, hubNameFromUrl]);

  const handleFilterChange = useCallback(
    (filterId: string, value: DataTableFilterValue | undefined) => {
      const params = new URLSearchParams(window.location.search);

      if (filterId === "user.gender") {
        const nextGenderValue = typeof value === "string" ? value : "";
        if (nextGenderValue) {
          params.set("user.gender", nextGenderValue);
        } else {
          params.delete("user.gender");
        }
      }

      if (filterId === "user.status") {
        const nextStatusValue = typeof value === "string" ? value : "";
        if (nextStatusValue) {
          params.set("user.status", nextStatusValue);
        } else {
          params.delete("user.status");
        }
      }

      if (filterId === constants.HUBS_FILTER_KEY) {
        params.delete(constants.HUBS_FILTER_KEY);

        const nextHubs = Array.isArray(value) ? value : [];
        nextHubs.forEach((slug) => {
          if (typeof slug === "string" && slug.length > 0) {
            params.append(constants.HUBS_FILTER_KEY, slug);
          }
        });
      }

      // Reset to first page when any filter changes.
      params.set("page", "1");

      setOptimisticPaginationState((prevState) => ({
        pageIndex: 0,
        pageSize: prevState.pageSize,
      }));

      updateUrlAndRefresh(params);
    },
    [updateUrlAndRefresh],
  );

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete("user.gender");
    params.delete("user.status");
    params.delete(constants.HUBS_FILTER_KEY);
    params.set("page", "1");

    setOptimisticPaginationState((prevState) => ({
      pageIndex: 0,
      pageSize: prevState.pageSize,
    }));

    updateUrlAndRefresh(params);
  }, [updateUrlAndRefresh]);

  const handleView = (admin: IAdmin) => {
    // Implement view logic here
    console.log("View admin:", admin);
  };

  const handleEdit = (admin: IAdmin) => {
    // Implement edit logic here
    console.log("Edit admin:", admin);
  };

  const handleDelete = (admin: IAdmin) => {
    // Implement delete logic here
    console.log("Delete admin:", admin);
  };

  return (
    <DataTable
      data={admins}
      columns={adminColumns}
      actions={{
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
      isLoading={isLoading || isFetching || isSortingTransitionPending}
      emptyMessage="No admins found!"
      sorting={{
        state: optimisticSortingState,
        onSortingChange: handleSortingChange,
      }}
      pagination={{
        state: optimisticPaginationState,
        onPaginationChange: handlePaginationChange,
      }}
      search={{
        initialValue: searchTermFromUrl,
        placeholder: "Search admin by name, email...",
        debounceMs: 700,
        onDebouncedChange: handleDebouncedSearchChange,
      }}
      filters={{
        configs: filterConfigs,
        values: filterValues,
        onFilterChange: handleFilterChange,
        onClearAll: clearAllFilters,
      }}
      meta={meta}
    />
  );
};

export default AdminTable;
