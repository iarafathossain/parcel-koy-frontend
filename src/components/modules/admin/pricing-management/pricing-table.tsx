"use client";

import { getAllPricingAction } from "@/actions/pricing-action";
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
import { IPricingRule } from "@/types/pricing-type";
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
import CreatePricingRule from "./create-pricing-rule";
import DeletePricingRule from "./delete-pricing-rule";
import EditPricingRule from "./edit-pricing-rule";
import { getPricingColumns } from "./pricing-columns";
import ViewPricingRule from "./view-pricing-rule";

interface PricingTableProps {
  initialQueryString: string;
}

type PricingModalType = ModalType | "create";

const PricingTable = ({ initialQueryString }: PricingTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSortingTransitionPending, startSortingTransition] = useTransition();

  const [activeModal, setActiveModal] = useState<PricingModalType>(null);
  const [selectedRule, setSelectedRule] = useState<IPricingRule | null>(null);

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
    data: pricingDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["pricing-rules", queryString],
    queryFn: () => getAllPricingAction(queryString),
  });

  const pricingRules = pricingDataResponse?.data || [];
  const meta: PaginationMeta | undefined = pricingDataResponse?.meta;

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

  const handleView = useCallback((rule: IPricingRule) => {
    setSelectedRule(rule);
    setActiveModal("view");
  }, []);

  const handleEdit = useCallback((rule: IPricingRule) => {
    setSelectedRule(rule);
    setActiveModal("edit");
  }, []);

  const handleDelete = useCallback((rule: IPricingRule) => {
    setSelectedRule(rule);
    setActiveModal("delete");
  }, []);

  const pricingColumns = useMemo(
    () => getPricingColumns(handleView),
    [handleView],
  );

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => setSelectedRule(null), 200);
  };

  return (
    <>
      <DataTable
        data={pricingRules}
        columns={pricingColumns}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onDelete: handleDelete,
          viewLabel: "View Details",
          editLabel: "Edit Rule",
          deleteLabel: "Delete Rule",
        }}
        isLoading={isLoading || isFetching || isSortingTransitionPending}
        emptyMessage="No pricing rules found!"
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
          placeholder: "Search pricing rule...",
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
            Add Pricing Rule
          </Button>
        }
        meta={meta}
      />

      <CommonModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={
          activeModal === "create"
            ? "Create Pricing Rule"
            : activeModal === "view"
              ? "Pricing Rule Details"
              : activeModal === "edit"
                ? "Edit Pricing Rule"
                : "Delete Pricing Rule"
        }
      >
        {activeModal === "create" && (
          <CreatePricingRule onSuccess={closeModal} />
        )}

        {activeModal === "view" && selectedRule && (
          <ViewPricingRule rule={selectedRule} />
        )}

        {activeModal === "edit" && selectedRule && (
          <EditPricingRule rule={selectedRule} onSuccess={closeModal} />
        )}

        {activeModal === "delete" && selectedRule && (
          <DeletePricingRule rule={selectedRule} onSuccess={closeModal} />
        )}
      </CommonModal>
    </>
  );
};

export default PricingTable;
