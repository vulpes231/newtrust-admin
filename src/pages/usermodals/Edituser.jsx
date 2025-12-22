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

const Edituser = ({ userId, onClose }) => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(selectManageUserSlice);

  useEffect(() => {
    if (userId) {
      dispatch(getUserInfo(userId));
    }
  }, [userId]);

  const formattedDob =
    currentUser && format(currentUser.personalDetails?.dob, "dd/MM/yyyy");

  return (
    <div className="col-span-4 lg:col-span-3 bg-slate-100 dark:bg-slate-900 !text-[#495057] dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
      <Authnav />
      <div className="w-full">
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Personal Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Custominput
                label="First Name"
                value={currentUser?.name?.firstName}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
              <Custominput
                label="Last Name"
                value={currentUser?.name?.lastName}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
              <Custominput
                label="Email Address"
                value={currentUser?.credentials?.email}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
              <Custominput
                label="Username"
                value={currentUser?.credentials?.username}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Custominput
                label="Street Address"
                value={currentUser?.contactInfo?.address?.street}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
              <Custominput
                label="Phone Number"
                value={currentUser?.contactInfo?.phone}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
              <Custominput
                label="City"
                value={currentUser?.contactInfo?.address?.city}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
              <Custominput
                label="Zip Code"
                value={currentUser?.contactInfo?.address?.zipCode}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Identity Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Identity Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Custominput
                label="KYC Status"
                value={currentUser?.identityVerification?.kycStatus}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
              <Custominput
                label="Date of Birth"
                value={formattedDob}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
              <Custominput
                label="Experience Level"
                value={currentUser?.professionalInfo?.experience}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
              <Custominput
                label="Employment Status"
                value={currentUser?.professionalInfo?.employment}
                readOnly={true}
                className="bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          {/* User Settings */}
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
        </div>
      </div>
    </div>
  );
};

export default Edituser;

// Helper Components

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
