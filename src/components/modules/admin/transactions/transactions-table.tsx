"use client";

import { getAllTransactionsAction } from "@/actions/payout-action";
import CommonModal from "@/components/shared/modal/common-modal";
import DataTable from "@/components/shared/table/data-table";
import { PaginationMeta } from "@/types/api-type";
import { ModalType } from "@/types/enum-type";
import { IPayout } from "@/types/payout-type";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getTransactionColumns } from "./transaction-columns";
import ViewTransaction from "./view-transaction";

interface TransactionsTableProps {
  initialQueryString: string;
}

const TransactionsTable = ({ initialQueryString }: TransactionsTableProps) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<IPayout | null>(null);

  const {
    data: transactionsResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["transactions", initialQueryString],
    queryFn: () => getAllTransactionsAction(initialQueryString),
  });

  const transactions = transactionsResponse?.data || [];
  const meta: PaginationMeta | undefined = transactionsResponse?.meta;

  const openModal = (type: ModalType, transaction: IPayout) => {
    setActiveModal(type);
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedTransaction(null);
  };

  const columns = useMemo(
    () =>
      getTransactionColumns((transaction) => openModal("view", transaction)),
    [],
  );

  return (
    <>
      <DataTable<IPayout>
        data={transactions}
        columns={columns}
        actions={{
          onView: (transaction) => openModal("view", transaction),
          viewLabel: "View",
        }}
        isLoading={isLoading || isFetching}
        emptyMessage="No transactions found."
        meta={meta}
      />

      <CommonModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title="Transaction Details"
      >
        {selectedTransaction && (
          <ViewTransaction transaction={selectedTransaction} />
        )}
      </CommonModal>
    </>
  );
};

export default TransactionsTable;
