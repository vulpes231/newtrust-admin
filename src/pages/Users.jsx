import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";
import { useEffect, useState } from "react";
import { getUsers, selectManageUserSlice } from "../features/manageUserSlice";
import { styles } from "../style";
import Createuser from "./usermodals/Createuser";

const headers = [
  { id: "name.firstName", title: "First Name" },
  { id: "name.lastName", title: "Last Name" },
  { id: "credentials.username", title: "Username" },
  { id: "credentials.email", title: "Email" },
  { id: "identityVerification.kycStatus", title: "Verification" },
];

const buttons = [{ id: "edit user", title: "edit" }];

const Users = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(selectNavSlice);
  const { users, userPagination } = useSelector(selectManageUserSlice);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  document.title = "Itrust Investment | Manage Users";
  return (
    <div className="col-span-4 lg:col-span-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
      <Authnav darkMode={darkMode} />

      <div className="p-6">
        <Table
          headers={headers}
          nullText={"You have no users."}
          buttons={buttons}
          data={users}
          pagination={userPagination}
        />
      </div>
    </div>
  );
};

export default Users;
