"use client";

import { activateUserAction, blockUserAction } from "@/actions/admin-action";
import { getAllRidersAction } from "@/actions/rider-action";
import { getUserInfoAction } from "@/actions/user-action";
import CommonModal from "@/components/shared/modal/common-modal";
import DataTable from "@/components/shared/table/data-table";
import {
  DataTableFilterConfig,
  DataTableFilterValue,
  DataTableFilterValues,
} from "@/components/shared/table/data-table-filters";
import { constants } from "@/constants";
import { parsePositiveInt } from "@/helpers/parse-positive-int";
import { useUser } from "@/hooks/use-user";
import { PaginationMeta } from "@/types/api-type";
import { ModalType, Role, UserStatus } from "@/types/enum-type";
import { IRider } from "@/types/user-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import DeleteRider from "./delete-rider";
import EditRider from "./edit-rider";
import { riderColumns } from "./rider-columns";
import ViewRider from "./view-rider";

interface RiderTableProps {
  initialQueryString: string;
}

const RiderTable = ({ initialQueryString }: RiderTableProps) => {
  const { user } = useUser();

  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSortingTransitionPending, startSortingTransition] = useTransition();

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedRider, setSelectedRider] = useState<IRider | null>(null);

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
  const genderFilterFromUrl = searchParams.get("user.gender") ?? "";
  const userStatusFilterFromUrl = searchParams.get("user.status") ?? "";

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
    data: ridersDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["riders", queryString],
    queryFn: () => getAllRidersAction(queryString),
  });

  const { data: currentUserResponse } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getUserInfoAction(),
  });

  const effectiveUser = user ?? currentUserResponse;

  const riders = ridersDataResponse?.data || [];
  const meta: PaginationMeta | undefined = ridersDataResponse?.meta;

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
    ];
  }, []);

  const filterValues = useMemo<DataTableFilterValues>(() => {
    return {
      "user.gender": genderFilterFromUrl,
      "user.status": userStatusFilterFromUrl,
    };
  }, [genderFilterFromUrl, userStatusFilterFromUrl]);

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
    params.set("page", "1");

    setOptimisticPaginationState((prevState) => ({
      pageIndex: 0,
      pageSize: prevState.pageSize,
    }));

    updateUrlAndRefresh(params);
  }, [updateUrlAndRefresh]);

  const handleView = (rider: IRider) => {
    setSelectedRider(rider);
    setActiveModal("view");
  };

  const handleEdit = (rider: IRider) => {
    setSelectedRider(rider);
    setActiveModal("edit");
  };

  const handleDelete = (rider: IRider) => {
    setSelectedRider(rider);
    setActiveModal("delete");
  };

  const { mutateAsync: mutateUserStatus, isPending: isUpdatingUserStatus } =
    useMutation({
      mutationFn: async ({
        userId,
        action,
      }: {
        userId: string;
        action: "BLOCK" | "ACTIVE";
      }) => {
        if (action === "BLOCK") {
          return await blockUserAction({ userId });
        }

        return await activateUserAction({ userId });
      },
    });

  const handleStatusAction = async (rider: IRider) => {
    const userStatus = rider.user.status;
    const action = userStatus === UserStatus.ACTIVE ? "BLOCK" : "ACTIVE";
    const pendingMessage =
      action === "BLOCK" ? "Blocking user..." : "Activating user...";

    const toastId = toast.loading(pendingMessage);

    try {
      if (!rider.user.id) {
        toast.error("User information is missing. Please try again.");
        return;
      }

      const result = await mutateUserStatus({ userId: rider.user.id, action });

      if (!result.success) {
        toast.error(result.message || "Failed to update user status.");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["riders"] });
      toast.success(
        result.message ||
          (action === "BLOCK"
            ? "User blocked successfully."
            : "User activated successfully."),
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      toast.error(message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const getStatusActionLabel = (rider: IRider) => {
    if (rider.user.status === UserStatus.ACTIVE) {
      return "Block User";
    }

    if (rider.user.status === UserStatus.BLOCKED) {
      return "Active User";
    }

    return undefined;
  };

  const canManageRiderActions =
    effectiveUser?.role === Role.ADMIN ||
    effectiveUser?.role === Role.SUPER_ADMIN;

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => setSelectedRider(null), 200);
  };

  return (
    <>
      <DataTable
        data={riders}
        columns={riderColumns}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onDelete: canManageRiderActions ? handleDelete : undefined,
          onStatusAction: canManageRiderActions
            ? handleStatusAction
            : undefined,
          getStatusActionLabel: canManageRiderActions
            ? getStatusActionLabel
            : undefined,
        }}
        isLoading={
          isLoading ||
          isFetching ||
          isSortingTransitionPending ||
          isUpdatingUserStatus
        }
        emptyMessage="No riders found!"
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
          placeholder: "Search rider by name, email...",
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
            ? "View Rider Details"
            : activeModal === "edit"
              ? "Edit Rider"
              : "Delete Rider"
        }
      >
        {activeModal === "view" && selectedRider && (
          <ViewRider rider={selectedRider} />
        )}

        {activeModal === "edit" && selectedRider && (
          <EditRider rider={selectedRider} onSuccess={closeModal} />
        )}

        {activeModal === "delete" && selectedRider && (
          <DeleteRider rider={selectedRider} onClose={closeModal} />
        )}
      </CommonModal>
    </>
  );
};

export default RiderTable;
