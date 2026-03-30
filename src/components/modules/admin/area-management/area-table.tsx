"use client";

import { getAllAreasAction } from "@/actions/area-action";
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
import { IArea } from "@/types/area-type";
import { ModalType } from "@/types/enum-type";
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
import { areaColumns } from "./area-columns";
import CreateArea from "./create-area";
import DeleteArea from "./delete-area";
import EditArea from "./edit-area";
import ViewArea from "./view-area";

interface AreaTableProps {
  initialQueryString: string;
}

type AreaModalType = ModalType | "create";

const AreaTable = ({ initialQueryString }: AreaTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSortingTransitionPending, startSortingTransition] = useTransition();

  const [activeModal, setActiveModal] = useState<AreaModalType>(null);
  const [selectedArea, setSelectedArea] = useState<IArea | null>(null);

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
    data: areasDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["areas", queryString],
    queryFn: () => getAllAreasAction(queryString),
  });

  const areas = areasDataResponse?.data || [];
  const meta: PaginationMeta | undefined = areasDataResponse?.meta;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
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
      isActive: isActiveFilterFromUrl,
    };
  }, [isActiveFilterFromUrl]);

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
    params.delete("isActive");
    params.set("page", "1");

    setOptimisticPaginationState((prevState) => ({
      pageIndex: 0,
      pageSize: prevState.pageSize,
    }));

    updateUrlAndRefresh(params);
  }, [updateUrlAndRefresh]);

  const handleView = (area: IArea) => {
    setSelectedArea(area);
    setActiveModal("view");
  };

  const handleEdit = (area: IArea) => {
    setSelectedArea(area);
    setActiveModal("edit");
  };

  const handleDelete = (area: IArea) => {
    setSelectedArea(area);
    setActiveModal("delete");
  };

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => setSelectedArea(null), 200);
  };

  return (
    <>
      <DataTable
        data={areas}
        columns={areaColumns}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onDelete: handleDelete,
          viewLabel: "View Details",
          editLabel: "Edit Area",
          deleteLabel: "Delete Area",
        }}
        isLoading={isLoading || isFetching || isSortingTransitionPending}
        emptyMessage="No areas found!"
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
          placeholder: "Search area by name, slug...",
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
            Add Area
          </Button>
        }
        meta={meta}
      />

      <CommonModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={
          activeModal === "create"
            ? "Create Area"
            : activeModal === "view"
              ? "Area Details"
              : activeModal === "edit"
                ? "Edit Area"
                : "Delete Area"
        }
      >
        {activeModal === "create" && <CreateArea onSuccess={closeModal} />}

        {activeModal === "view" && selectedArea && (
          <ViewArea area={selectedArea} />
        )}

        {activeModal === "edit" && selectedArea && (
          <EditArea area={selectedArea} onSuccess={closeModal} />
        )}

        {activeModal === "delete" && selectedArea && (
          <DeleteArea area={selectedArea} onSuccess={closeModal} />
        )}
      </CommonModal>
    </>
  );
};

export default AreaTable;
