import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Col, Input, Label } from "reactstrap";
import { approveWallet, getUserSettings } from "../../services/userService";
import Successmodal from "../../components/Successmodal";
import { Errormodal } from "../../components";

const ConnectWallet = ({ user }) => {
  const [error, setError] = useState("");

  const { data: userSettingsResponse } = useQuery({
    queryFn: () => getUserSettings(user._id),
    queryKey: ["userSettings", user?._id],
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: () => approveWallet(user._id),
    onError: (err) => setError(err.message),
  });

  const userSettings = userSettingsResponse?.data;

  useEffect(() => {
    if (mutation.isSuccess) {
      const timeout = setTimeout(() => {
        mutation.reset();
        window.location.reload();
      }, 1000);
      return () => clearTimeout();
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        mutation.reset();
        setError("");
      }, 3000);
      return () => clearTimeout();
    }
  }, [error]);

  return (
    <React.Fragment>
      <Col>
        {userSettings?.wallet?.walletInfo ? (
          <div className="p-6 flex flex-col gap-2">
            <div>
              <Label>Wallet Name</Label>
              <Input
                type="text"
                value={userSettings?.wallet?.walletName || ""}
                readOnly
              />
            </div>
            <div className="mt-2">
              <Label>Wallet Info</Label>
              <Input
                type="text"
                value={userSettings?.wallet?.walletInfo || ""}
                readOnly
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                mutation.mutate();
              }}
              className="bg-[#5156be] text-white p-2 !rounded-sm w-[180px] mt-3"
            >
              {!mutation.isPending ? "Approve Connection" : "Wait..."}
            </button>
          </div>
        ) : (
          <div>
            <span>You have no connection request</span>
          </div>
        )}
      </Col>
      {mutation.isSuccess && (
        <Successmodal
          successText={"Wallet updated"}
          onClose={() => {
            mutation.reset();
          }}
        />
      )}
      {error && (
        <Errormodal
          error={error}
          onClose={() => {
            mutation.reset();
            setError("");
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ConnectWallet;
