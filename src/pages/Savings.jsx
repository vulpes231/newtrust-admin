import { useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getSavingsAccounts } from "../services/savingService";
import CreateSavingModal from "./savingsmodals/CreateSavingModal";

const headers = [
  { id: "name", title: "name" },
  { id: "title", title: "title" },
  { id: "interestRate", title: "interest rate" },
  { id: "createdAt", title: "date" },
  { id: "status", title: "status" },
];

const buttons = [
  { id: "edit savings", title: "edit" },
  { id: "delete savings", title: "delete" },
];

const Savings = () => {
  document.title = "Itrust Investment | Manage Savings";
  const { darkMode } = useSelector(selectNavSlice);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: getSavingsAccounts,
    queryKey: ["savingsAccount"],
    enabled: true,
  });

  return (
    <div className="col-span-4 lg:col-span-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 h-screen overflow-auto">
      <Authnav darkMode={darkMode} />
      <div className={`flex justify-end px-6`}>
        <button
          onClick={handleShowModal}
          className={`bg-[#5156be]/95 text-white h-[40px] px-4 !rounded-md !capitalize hover:bg-[#5156be] font-semibold text-[14px]`}
        >
          Add Account
        </button>
      </div>
      <div className="p-6">
        <Table
          headers={headers}
          nullText={"You have no savings account."}
          buttons={buttons}
          data={data?.data}
          pagination={data?.trnxPagination}
        />
      </div>
      <CreateSavingModal isOpen={showModal} toggle={handleShowModal} />
    </div>
  );
};

export default Savings;
