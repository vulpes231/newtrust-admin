import { LucideXCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  selectManageUserSlice,
} from "../../features/manageUserSlice";
import { Authnav, Custominput } from "../../components";
import Deleteaccount from "./Deleteaccount";
import { format } from "date-fns";
import Settingrow from "./Settingrow";
import { Card, CardHeader, Col } from "reactstrap";
import PersonalInformation from "../user/PersonalInformation";
import ContactInformation from "../user/ContactInformation";
import IdentityInformation from "../user/IdentityInformation";
import ConnectWallet from "../user/ConnectWallet";

const Edituser = ({ onClose }) => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(selectManageUserSlice);
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      // console.log(userId);
      dispatch(getUserInfo(userId));
    }
  }, [userId]);

  const formattedDob =
    currentUser && format(currentUser.personalDetails?.dob, "dd/MM/yyyy");

  return (
    <div className="col-span-4 lg:col-span-3 bg-slate-100 dark:bg-slate-900 !text-[#495057] dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
      <Authnav />
      <div className="w-full px-6">
        <Col className="space-y-6">
          <Card>
            <CardHeader className="font-semibold text-[#495057]">
              Personal Information
            </CardHeader>
            <PersonalInformation user={currentUser} />
          </Card>
          <Card>
            <CardHeader className="font-semibold text-[#495057]">
              Contact Information
            </CardHeader>
            <ContactInformation user={currentUser} />
          </Card>

          <Card>
            <CardHeader className="font-semibold text-[#495057]">
              Contact Information
            </CardHeader>
            <IdentityInformation
              user={currentUser}
              formattedDob={formattedDob}
            />
          </Card>
          <Card>
            <CardHeader className="font-semibold text-[#495057]">
              External Wallet
            </CardHeader>
            <ConnectWallet user={currentUser} />
          </Card>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Account Settings
            </h4>
            <div className="space-y-4">
              {/* Deposit Settings */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                  Deposit Settings
                </h5>
                <Settingrow
                  label="Bank Deposits"
                  enabled={!currentUser?.settings?.locks?.bankDeposit?.isLocked}
                />
                <Settingrow
                  label="Crypto Deposits"
                  enabled={!currentUser?.settings?.locks?.cash?.isLocked}
                />
              </div>

              {/* Trading Settings */}
              <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                  Trading Features
                </h5>
                <Settingrow
                  label="Options Trading"
                  enabled={currentUser?.settings?.trading?.isOptionsEnabled}
                />
                <Settingrow
                  label="DRIP Feature"
                  enabled={currentUser?.settings?.trading?.isDripEnabled}
                />
              </div>

              {/* Account Status */}
              <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                  Account Status
                </h5>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    Account Status
                  </span>
                  <StatusBadge
                    status={
                      currentUser?.accountStatus?.banned
                        ? "suspended"
                        : "active"
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    Wallet Connected
                  </span>
                  <StatusBadge
                    status={
                      currentUser?.settings?.wallet?.isConnected
                        ? "connected"
                        : "disconnected"
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h4 className="text-lg font-medium text-red-900 dark:text-red-100 mb-4">
              Account Management
            </h4>
            <Deleteaccount userId={currentUser?._id} user={currentUser} />
          </div>
        </Col>
      </div>
    </div>
  );
};

export default Edituser;

const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: {
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      text: "Active",
    },
    suspended: {
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      text: "Suspended",
    },
    connected: {
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      text: "Connected",
    },
    disconnected: {
      color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      text: "Disconnected",
    },
  };

  const config = statusConfig[status] || statusConfig.disconnected;

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.text}
    </span>
  );
};
