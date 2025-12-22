import React, { useEffect } from "react";
// import Authnav from "./Authnav";
Authnav;
import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import Authnav from "./Authnav";
import Chart from "./Chart";
import Table from "./Table";
import { styles } from "../style";
import { getTrnxs, selectManageTrnxSlice } from "../features/manageTrnxSlice";

const headers = [
  { id: "email", title: "user" },
  { id: "type", title: "type" },
  { id: "amount", title: "amount" },
  { id: "method.mode", title: "method" },
  { id: "createdAt", title: "date" },
  { id: "status", title: "status" },
];

const buttons = [
  { id: "approve", title: "approve" },
  { id: "reject", title: "reject" },
];

const Dashcontent = () => {
  const { darkMode } = useSelector(selectNavSlice);
  const dispatch = useDispatch();

  const { trnxs, trnxPagination } = useSelector(selectManageTrnxSlice);

  const customTransaction = trnxs && trnxs.length > 0 && trnxs.slice(0, 5);

  useEffect(() => {
    dispatch(getTrnxs());
  }, []);
  return (
    <div className="col-span-4 lg:col-span-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 h-screen overflow-auto">
      <Authnav darkMode={darkMode} />
      <div className="p-4 flex flex-col gap-8">
        <Chart />
        <div>
          <h3 className={`!text-[16px] py-4 !font-semibold`}>
            Recent Transactions
          </h3>
          <Table
            headers={headers}
            data={customTransaction}
            buttons={buttons}
            nullText={"You have no transactions."}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashcontent;
