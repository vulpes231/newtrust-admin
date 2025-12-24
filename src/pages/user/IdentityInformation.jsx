import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Label, Row } from "reactstrap";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  approveAccount,
  getVerificationData,
} from "../../services/verifyService";
import { devServer, getAccessToken } from "../../constants/constants";
import { back } from "../../assets";
import { Errormodal, Successmodal } from "../../components";

const IdentityInformation = ({ user, formattedDob }) => {
  const [showDoc, setShowDoc] = useState(false);
  const [error, setError] = useState("");
  const [action, setAction] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  function handleDoc() {
    setShowDoc(!showDoc);
  }

  const tk = getAccessToken();

  const { data: verifyInfo } = useQuery({
    queryKey: ["verifyData"],
    queryFn: () => getVerificationData(user._id),
    enabled: !!tk,
  });

  useEffect(() => {
    if (verifyInfo) console.log(verifyInfo);
  }, [verifyInfo]);

  const mutation = useMutation({
    mutationFn: approveAccount,
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verifyInfo || !action || !user) {
      setError("Missing Field!");
      return;
    }
    const data = { action, verifyId: verifyInfo._id, userId: user._id };

    mutation.mutate(data);
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        mutation.reset();
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const timeout = setTimeout(() => {
        mutation.reset();
        window.location.reload();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [mutation.isSuccess]);

  return (
    <React.Fragment>
      <Row className="p-6 space-y-4">
        <Col lg={6}>
          <div>
            <Label>Account Status</Label>
            <Input
              type="text"
              value={user?.identityVerification?.kycStatus}
              readOnly={true}
            />
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label>Date of Birth</Label>
            <Input type="text" value={formattedDob} readOnly={true} />
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label>Experience</Label>
            <Input
              type="text"
              value={user?.professionalInfo?.experience}
              readOnly={true}
            />
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label>Employment</Label>
            <Input
              type="text"
              value={user?.professionalInfo?.employment}
              readOnly={true}
            />
          </div>
        </Col>
        <hr />
        <Col lg={12}>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#495057]">
                Verification Documents
              </span>
              <span onClick={handleDoc}>
                {showDoc ? (
                  <MdKeyboardArrowUp size={24} />
                ) : (
                  <MdKeyboardArrowDown size={24} />
                )}
              </span>
            </div>
            {showDoc && (
              <div>
                {verifyInfo ? (
                  <div className="flex flex-col gap-3 leading-5">
                    <div className="flex flex-col gap-2">
                      <span className="flex gap-2">
                        <span className="font-semibold text-[13px]">
                          ID Type:
                        </span>
                        <span>{verifyInfo?.idType || "passport"}</span>
                      </span>
                      <span className="flex gap-2">
                        <span className="font-semibold text-[13px]">
                          ID Number:
                        </span>
                        <span>{verifyInfo?.idNumber || 1243536}</span>
                      </span>
                      <span className="flex gap-2">
                        <span className="font-semibold text-[13px]">
                          Status:
                        </span>
                        <span>{verifyInfo?.status || "Pending"}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-6 p-2">
                      <span className="flex flex-col gap-1">
                        <span className="font-semibold text-[13px]">
                          Front ID
                        </span>
                        <img
                          src={`${API_URL}${verifyInfo?.frontId}` || back}
                          alt=""
                          className="w-[40px] h-[40px]"
                        />
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="font-semibold text-[13px]">
                          Back ID
                        </span>
                        <img
                          src={`${API_URL}${verifyInfo?.backId}` || back}
                          alt=""
                          className="w-[40px] h-[40px]"
                        />
                      </span>
                    </div>

                    <Col lg={6}>
                      <div className="flex flex-col gap-3">
                        {" "}
                        <Input
                          type="select"
                          onChange={(e) => setAction(e.target.value)}
                          value={action}
                          name="action"
                        >
                          <option value="">Choose Action</option>
                          <option value="approve">Approve</option>
                          <option value="reject">Decline</option>
                        </Input>
                        <Button
                          onClick={handleSubmit}
                          className="w-[130px]"
                          color="success"
                          disabled={mutation.isPending}
                        >
                          {!mutation.isPending ? "Update" : "Updating..."}
                        </Button>
                      </div>
                    </Col>
                  </div>
                ) : (
                  <div className="p-6 lg:p-10 text-center">
                    No submission yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>
      {error && (
        <Errormodal
          error={error}
          onClose={() => {
            setError("");
            mutation.reset();
          }}
        />
      )}
      {mutation.isSuccess && (
        <Successmodal
          successText={"Account status updated."}
          onClose={() => {
            setError("");
            mutation.reset();
          }}
        />
      )}
    </React.Fragment>
  );
};

export default IdentityInformation;
