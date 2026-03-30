"use client";

import { getAllZonesAction } from "@/actions/zone-action";
import CommonModal from "@/components/shared/modal/common-modal";
import DataTable from "@/components/shared/table/data-table";
import {
  DataTableFilterConfig,
  DataTableFilterValue,
  DataTableFilterValues,
} from "@/components/shared/table/data-table-filters";
import { Button } from "@/components/ui/button";
import { constants } from "@/constants";
import { parsePositiveInt } from "@/helpers/parse-positive-int";
import { PaginationMeta } from "@/types/api-type";
import { ModalType } from "@/types/enum-type";
import { IZone } from "@/types/zone-type";
import { useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import CreateZone from "./create-zone";
import DeleteZone from "./delete-zone";
import EditZone from "./edit-zone";
import ViewZone from "./view-zone";
import { zoneColumns } from "./zone-columns";

interface ZoneTableProps {
  initialQueryString: string;
}

type ZoneModalType = ModalType | "create";

const ZoneTable = ({ initialQueryString }: ZoneTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSortingTransitionPending, startSortingTransition] = useTransition();

  const [activeModal, setActiveModal] = useState<ZoneModalType>(null);
  const [selectedZone, setSelectedZone] = useState<IZone | null>(null);

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
      pageIndex: page - 1,
      pageSize: limit,
    };
  }, [searchParams]);

  const searchTermFromUrl = searchParams.get("searchTerm") ?? "";
  const isActiveFilterFromUrl = searchParams.get("isActive") ?? "";
  const isInsideDhakaFilterFromUrl = searchParams.get("isInsideDhaka") ?? "";

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
      const currentQuery = window.location.search.replace(/^\?/, "");

      if (nextQuery === currentQuery) {
        return;
      }

      const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

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
    data: zonesDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["zones", queryString],
    queryFn: () => getAllZonesAction(queryString),
  });

  const zones = zonesDataResponse?.data || [];
  const meta: PaginationMeta | undefined = zonesDataResponse?.meta;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "isInsideDhaka",
        label: "Coverage",
        type: "single-select",
        options: [
          {
            label: "Inside Dhaka",
            value: "true",
          },
          {
            label: "Outside Dhaka",
            value: "false",
          },
        ],
      },
      {
        id: "isActive",
        label: "Status",
        type: "single-select",
        options: [
          {
            label: "Active",
            value: "true",
          },
          {
            label: "Inactive",
            value: "false",
          },
        ],
      },
    ];
  }, []);

  const filterValues = useMemo<DataTableFilterValues>(() => {
    return {
      isInsideDhaka: isInsideDhakaFilterFromUrl,
      isActive: isActiveFilterFromUrl,
    };
  }, [isActiveFilterFromUrl, isInsideDhakaFilterFromUrl]);

  const handleFilterChange = useCallback(
    (filterId: string, value: DataTableFilterValue | undefined) => {
      const params = new URLSearchParams(window.location.search);
      const nextValue = typeof value === "string" ? value : "";

      if (nextValue) {
        params.set(filterId, nextValue);
      } else {
        params.delete(filterId);
      }

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
    params.delete("isInsideDhaka");
    params.delete("isActive");
    params.set("page", "1");

    setOptimisticPaginationState((prevState) => ({
      pageIndex: 0,
      pageSize: prevState.pageSize,
    }));

    updateUrlAndRefresh(params);
  }, [updateUrlAndRefresh]);

  const handleView = (zone: IZone) => {
    setSelectedZone(zone);
    setActiveModal("view");
  };

  const handleEdit = (zone: IZone) => {
    setSelectedZone(zone);
    setActiveModal("edit");
  };

  const handleDelete = (zone: IZone) => {
    setSelectedZone(zone);
    setActiveModal("delete");
  };

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => setSelectedZone(null), 200);
  };

  return (
    <>
      <DataTable
        data={zones}
        columns={zoneColumns}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onDelete: handleDelete,
          viewLabel: "View Details",
          editLabel: "Edit Zone",
          deleteLabel: "Delete Zone",
        }}
        isLoading={isLoading || isFetching || isSortingTransitionPending}
        emptyMessage="No zones found!"
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
          placeholder: "Search zone by name or slug...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValues,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        toolbarAction={
          <Button type="button" onClick={() => setActiveModal("create")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Zone
          </Button>
        }
        meta={meta}
      />

      <CommonModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={
          activeModal === "create"
            ? "Create Zone"
            : activeModal === "view"
              ? "Zone Details"
              : activeModal === "edit"
                ? "Edit Zone"
                : "Delete Zone"
        }
      >
        {activeModal === "create" && <CreateZone onSuccess={closeModal} />}

        {activeModal === "view" && selectedZone && (
          <ViewZone zone={selectedZone} />
        )}

        {activeModal === "edit" && selectedZone && (
          <EditZone zone={selectedZone} onSuccess={closeModal} />
        )}

        {activeModal === "delete" && selectedZone && (
          <DeleteZone zone={selectedZone} onClose={closeModal} />
        )}
      </CommonModal>
    </>
  );
};

export default ZoneTable;
