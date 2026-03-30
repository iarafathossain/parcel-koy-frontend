"use client";

import { getAllParcelsAction } from "@/actions/parcel-action";
import CommonModal from "@/components/shared/modal/common-modal";
import DataTable from "@/components/shared/table/data-table";
import {
  DataTableFilterConfig,
  DataTableFilterValue,
  DataTableFilterValues,
} from "@/components/shared/table/data-table-filters";
import { constants } from "@/constants";
import { parsePositiveInt } from "@/helpers/parse-positive-int";
import { PaginationMeta } from "@/types/api-type";
import { ModalType } from "@/types/enum-type";
import { IParcel } from "@/types/parcel-type";
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
import AssignRider from "./assign-rider";
import { getParcelColumns } from "./parcel-columns";
import UpdateParcelStatus from "./update-parcel-status";
import ViewParcel from "./view-parcel";

interface ParcelTableProps {
  initialQueryString: string;
}

const ParcelTable = ({ initialQueryString }: ParcelTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSortingTransitionPending, startSortingTransition] = useTransition();

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedParcel, setSelectedParcel] = useState<IParcel | null>(null);

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
  const statusFilterFromUrl = searchParams.get("status") ?? "";

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
    data: parcelsDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["parcels", queryString],
    queryFn: () => getAllParcelsAction(queryString),
  });

  const parcels = parcelsDataResponse?.data || [];
  const meta: PaginationMeta | undefined = parcelsDataResponse?.meta;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "status",
        label: "Status",
        type: "single-select",
        options: [
          { label: "REQUESTED", value: "REQUESTED" },
          { label: "PICKUP_RIDER_ASSIGNED", value: "PICKUP_RIDER_ASSIGNED" },
          { label: "IN_TRANSIT", value: "IN_TRANSIT" },
          { label: "OUT_FOR_DELIVERY", value: "OUT_FOR_DELIVERY" },
          { label: "DELIVERED", value: "DELIVERED" },
          { label: "RETURNED_TO_MERCHANT", value: "RETURNED_TO_MERCHANT" },
          { label: "CANCELLED", value: "CANCELLED" },
        ],
      },
    ];
  }, []);

  const filterValues = useMemo<DataTableFilterValues>(() => {
    return {
      status: statusFilterFromUrl,
    };
  }, [statusFilterFromUrl]);

  const handleFilterChange = useCallback(
    (filterId: string, value: DataTableFilterValue | undefined) => {
      const params = new URLSearchParams(window.location.search);

      if (filterId === "status") {
        const nextStatusValue = typeof value === "string" ? value : "";
        if (nextStatusValue) {
          params.set("status", nextStatusValue);
        } else {
          params.delete("status");
        }
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
    params.delete("status");
    params.set("page", "1");

    setOptimisticPaginationState((prevState) => ({
      pageIndex: 0,
      pageSize: prevState.pageSize,
    }));

    updateUrlAndRefresh(params);
  }, [updateUrlAndRefresh]);

  const handleView = (parcel: IParcel) => {
    setSelectedParcel(parcel);
    setActiveModal("view");
  };

  const handleAssignRider = (parcel: IParcel) => {
    setSelectedParcel(parcel);
    setActiveModal("edit");
  };

  const handleUpdateStatus = (parcel: IParcel) => {
    setSelectedParcel(parcel);
    setActiveModal("delete");
  };

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => setSelectedParcel(null), 200);
  };

  const columns = useMemo(() => getParcelColumns(handleView), []);

  return (
    <>
      <DataTable
        data={parcels}
        columns={columns}
        actions={{
          onView: handleView,
          onEdit: handleAssignRider,
          onStatusAction: handleUpdateStatus,
          getStatusActionLabel: () => "Update Status",
          viewLabel: "View Details",
          editLabel: "Assign Rider",
        }}
        isLoading={isLoading || isFetching || isSortingTransitionPending}
        emptyMessage="No parcels found!"
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
          placeholder: "Search by tracking ID, merchant, receiver...",
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

      <CommonModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={
          activeModal === "view"
            ? "Parcel Details"
            : activeModal === "edit"
              ? "Assign Rider"
              : "Update Parcel Status"
        }
      >
        {activeModal === "view" && selectedParcel && (
          <ViewParcel parcel={selectedParcel} />
        )}

        {activeModal === "edit" && selectedParcel && (
          <AssignRider parcel={selectedParcel} onSuccess={closeModal} />
        )}

        {activeModal === "delete" && selectedParcel && (
          <UpdateParcelStatus parcel={selectedParcel} onSuccess={closeModal} />
        )}
      </CommonModal>
    </>
  );
};

export default ParcelTable;
