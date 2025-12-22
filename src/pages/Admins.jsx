import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";
import { useEffect, useState } from "react";

import {
  getAdminInfo,
  getAllAdmins,
  selectAdminSlice,
} from "../features/adminSlice";
import Createadmin from "./adminmodals/Createadmin";
import { styles } from "../style";

const headers = [
  { id: "username", title: "username" },
  { id: "email", title: "email" },
  { id: "role", title: "role" },
];

const buttons = [
  { id: "addsu", title: "make SU" },
  { id: "removesu", title: "unmake SU" },
  { id: "delete admin", title: "delete" },
];

const Admins = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(selectNavSlice);
  const { admins, adminInfo } = useSelector(selectAdminSlice);

  const [createAdminModal, setCreateAdminModal] = useState(false);

  useEffect(() => {
    dispatch(getAllAdmins());
    dispatch(getAdminInfo());
  }, []);

  // useEffect(() => {
  // 	if (adminInfo) {
  // 		console.log(adminInfo.role);
  // 	}
  // }, [adminInfo]);

  useEffect(() => {
    document.title = "Itrust Investment | Manage Admins";
  }, []);
  return (
    <div className="col-span-4 lg:col-span-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
      <Authnav darkMode={darkMode} />
      <div
        className={
          adminInfo && adminInfo.role.includes("0001")
            ? "flex justify-end p-6"
            : "hidden"
        }
      >
        <button
          onClick={() => setCreateAdminModal(true)}
          className={`bg-[#5156be]/95 text-white h-[40px] px-4 !rounded-md !capitalize hover:bg-[#5156be] font-semibold text-[14px]`}
        >
          create admin
        </button>
      </div>
      <div className="p-6">
        <Table
          headers={headers}
          nullText={"You have no admins."}
          buttons={buttons}
          data={admins}
        />
      </div>
      {createAdminModal && (
        <Createadmin onClose={() => setCreateAdminModal(false)} />
      )}
    </div>
  );
};

export default Admins;
