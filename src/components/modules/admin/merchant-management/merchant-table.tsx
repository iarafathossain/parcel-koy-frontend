"use client";

import { activateUserAction, blockUserAction } from "@/actions/admin-action";
import { getAllMerchantsAction } from "@/actions/merchant-action";
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
import { IMerchant } from "@/types/user-type";
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
import DeleteMerchant from "./delete-merchant";
import EditMerchant from "./edit-merchant";
import { merchantColumns } from "./merchant-columns";
import ViewMerchant from "./view-merchant";

interface MerchantTableProps {
  initialQueryString: string;
}

const MerchantTable = ({ initialQueryString }: MerchantTableProps) => {
  const { user } = useUser();

  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSortingTransitionPending, startSortingTransition] = useTransition();

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<IMerchant | null>(
    null,
  );

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
    data: merchantsDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["merchants", queryString],
    queryFn: () => getAllMerchantsAction(queryString),
  });

  const { data: currentUserResponse } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getUserInfoAction(),
  });

  const effectiveUser = user ?? currentUserResponse;

  const merchants = merchantsDataResponse?.data || [];
  const meta: PaginationMeta | undefined = merchantsDataResponse?.meta;

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

  const handleView = (merchant: IMerchant) => {
    setSelectedMerchant(merchant);
    setActiveModal("view");
  };

  const handleEdit = (merchant: IMerchant) => {
    setSelectedMerchant(merchant);
    setActiveModal("edit");
  };

  const handleDelete = (merchant: IMerchant) => {
    setSelectedMerchant(merchant);
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

  const handleStatusAction = async (merchant: IMerchant) => {
    const userStatus = merchant.user.status;
    const action = userStatus === UserStatus.ACTIVE ? "BLOCK" : "ACTIVE";
    const pendingMessage =
      action === "BLOCK" ? "Blocking user..." : "Activating user...";

    const toastId = toast.loading(pendingMessage);

    try {
      if (!merchant.user.id) {
        toast.error("User information is missing. Please try again.");
        return;
      }

      const result = await mutateUserStatus({
        userId: merchant.user.id,
        action,
      });

      if (!result.success) {
        toast.error(result.message || "Failed to update user status.");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["merchants"] });
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

  const getStatusActionLabel = (merchant: IMerchant) => {
    if (merchant.user.status === UserStatus.ACTIVE) {
      return "Block User";
    }

    if (merchant.user.status === UserStatus.BLOCKED) {
      return "Active User";
    }

    return undefined;
  };

  const canManageMerchantActions =
    effectiveUser?.role === Role.ADMIN ||
    effectiveUser?.role === Role.SUPER_ADMIN;

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => setSelectedMerchant(null), 200);
  };

  return (
    <>
      <DataTable
        data={merchants}
        columns={merchantColumns}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onDelete: canManageMerchantActions ? handleDelete : undefined,
          onStatusAction: canManageMerchantActions
            ? handleStatusAction
            : undefined,
          getStatusActionLabel: canManageMerchantActions
            ? getStatusActionLabel
            : undefined,
        }}
        isLoading={
          isLoading ||
          isFetching ||
          isSortingTransitionPending ||
          isUpdatingUserStatus
        }
        emptyMessage="No merchants found!"
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
          placeholder: "Search merchant by name, email...",
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
            ? "View Merchant Details"
            : activeModal === "edit"
              ? "Edit Merchant"
              : "Delete Merchant"
        }
      >
        {activeModal === "view" && selectedMerchant && (
          <ViewMerchant merchant={selectedMerchant} />
        )}

        {activeModal === "edit" && selectedMerchant && (
          <EditMerchant merchant={selectedMerchant} onSuccess={closeModal} />
        )}

        {activeModal === "delete" && selectedMerchant && (
          <DeleteMerchant merchant={selectedMerchant} onClose={closeModal} />
        )}
      </CommonModal>
    </>
  );
};

export default MerchantTable;
