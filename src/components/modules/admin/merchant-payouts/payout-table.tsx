"use client";

import { getAllPendingPayoutsAction } from "@/actions/payout-action";
import CommonModal from "@/components/shared/modal/common-modal";
import DataTable from "@/components/shared/table/data-table";
import { PaginationMeta } from "@/types/api-type";
import { ModalType } from "@/types/enum-type";
import { IPayout } from "@/types/payout-type";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getPayoutColumns } from "./payout-columns";
import ProcessPayout from "./process-payout";
import ViewPayout from "./view-payout";

interface PayoutTableProps {
  initialQueryString: string;
}

const PayoutTable = ({ initialQueryString }: PayoutTableProps) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedPayout, setSelectedPayout] = useState<IPayout | null>(null);

  const {
    data: payoutResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["pending-payouts", initialQueryString],
    queryFn: () => getAllPendingPayoutsAction(initialQueryString),
  });

  const payouts = payoutResponse?.data || [];
  const meta: PaginationMeta | undefined = payoutResponse?.meta;

  const openModal = (type: ModalType, payout: IPayout) => {
    setActiveModal(type);
    setSelectedPayout(payout);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedPayout(null);
  };

  const columns = useMemo(
    () => getPayoutColumns((payout) => openModal("view", payout)),
    [],
  );

  return (
    <>
      <DataTable<IPayout>
        data={payouts}
        columns={columns}
        actions={{
          onView: (payout) => openModal("view", payout),
          onEdit: (payout) => openModal("edit", payout),
          viewLabel: "View",
          editLabel: "Process",
        }}
        isLoading={isLoading || isFetching}
        emptyMessage="No pending payout requests found."
        meta={meta}
      />

      <CommonModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={activeModal === "view" ? "Payout Details" : "Process Payout"}
      >
        {activeModal === "view" && selectedPayout && (
          <ViewPayout payout={selectedPayout} />
        )}

        {activeModal === "edit" && selectedPayout && (
          <ProcessPayout payout={selectedPayout} onSuccess={closeModal} />
        )}
      </CommonModal>
    </>
  );
};

export default PayoutTable;
