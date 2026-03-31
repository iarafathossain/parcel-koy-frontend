"use client";

import { getMyAssignedParcelsAction } from "@/actions/rider-action";
import CommonModal from "@/components/shared/modal/common-modal";
import {
  DataTableFilterConfig,
  DataTableFilterValue,
  DataTableFilterValues,
} from "@/components/shared/table/data-table-filters";
import { constants } from "@/constants";
import { parsePositiveInt } from "@/helpers/parse-positive-int";
import { PaginationMeta } from "@/types/api-type";
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

import DataTable from "@/components/shared/table/data-table";
import { assignmentColumns } from "./assignment-columns";
import UpdateParcelStatus from "./update-parcel-status";
import VerifyDeliveryOtp from "./verify-delivery-otp";

interface AssignmentTableProps {
  initialQueryString?: string;
}

// We define a specific ModalType for this page since it differs slightly from the global one
type AssignedModalType = "update-status" | "verify-otp" | null;

export const AssignmentTable = ({
  initialQueryString = "",
}: AssignmentTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSortingTransitionPending, startSortingTransition] = useTransition();

  const [activeModal, setActiveModal] = useState<AssignedModalType>(null);
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
    return [{ id: sortBy, desc: sortOrder === "desc" }];
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

      if (nextQuery === currentQuery) return;

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
      setOptimisticPaginationState((prev) => ({
        pageIndex: 0,
        pageSize: prev.pageSize,
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

      if (normalizedSearchTerm === currentSearchTerm) return;

      if (normalizedSearchTerm) {
        params.set("searchTerm", normalizedSearchTerm);
      } else {
        params.delete("searchTerm");
      }

      params.set("page", "1");
      setOptimisticPaginationState((prev) => ({
        pageIndex: 0,
        pageSize: prev.pageSize,
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
    queryKey: ["my-assigned-parcels", queryString],
    queryFn: () => getMyAssignedParcelsAction(queryString),
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
          { label: "PICKED_UP", value: "PICKED_UP" },
          { label: "OUT_FOR_DELIVERY", value: "OUT_FOR_DELIVERY" },
          { label: "DELIVERED", value: "DELIVERED" },
          { label: "DELIVERY_FAILED", value: "DELIVERY_FAILED" },
        ],
      },
    ];
  }, []);

  const filterValues = useMemo<DataTableFilterValues>(() => {
    return { status: statusFilterFromUrl };
  }, [statusFilterFromUrl]);

  const handleFilterChange = useCallback(
    (filterId: string, value: DataTableFilterValue | undefined) => {
      const params = new URLSearchParams(window.location.search);

      if (filterId === "status") {
        const nextStatusValue = typeof value === "string" ? value : "";
        if (nextStatusValue) params.set("status", nextStatusValue);
        else params.delete("status");
      }

      params.set("page", "1");
      setOptimisticPaginationState((prev) => ({
        pageIndex: 0,
        pageSize: prev.pageSize,
      }));
      updateUrlAndRefresh(params);
    },
    [updateUrlAndRefresh],
  );

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete("status");
    params.set("page", "1");
    setOptimisticPaginationState((prev) => ({
      pageIndex: 0,
      pageSize: prev.pageSize,
    }));
    updateUrlAndRefresh(params);
  }, [updateUrlAndRefresh]);

  // Modal Handlers
  const handleUpdateStatus = (parcel: IParcel) => {
    setSelectedParcel(parcel);
    setActiveModal("update-status");
  };

  const handleVerifyOtp = (parcel: IParcel) => {
    setSelectedParcel(parcel);
    setActiveModal("verify-otp");
  };

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => setSelectedParcel(null), 200);
  };

  // Generate columns via useMemo to fix TypeScript errors and pass action callbacks
  const columns = useMemo(
    () => assignmentColumns(handleUpdateStatus, handleVerifyOtp),
    [],
  );

  return (
    <>
      <DataTable
        data={parcels}
        columns={columns}
        isLoading={isLoading || isFetching || isSortingTransitionPending}
        emptyMessage="No assigned parcels found!"
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
          placeholder: "Search by tracking ID...",
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
          activeModal === "update-status"
            ? "Update Parcel Status"
            : "Verify Delivery OTP"
        }
      >
        {activeModal === "update-status" && selectedParcel && (
          <UpdateParcelStatus
            parcel={selectedParcel}
            isOpen={activeModal === "update-status"}
            onClose={closeModal}
          />
        )}

        {activeModal === "verify-otp" && selectedParcel && (
          <VerifyDeliveryOtp
            parcel={selectedParcel}
            isOpen={activeModal === "verify-otp"}
            onClose={closeModal}
          />
        )}
      </CommonModal>
    </>
  );
};
