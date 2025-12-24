import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

const PersonalInformation = ({ user }) => {
  return (
    <React.Fragment>
      <Row className="p-6 space-y-4">
        <Col lg={6}>
          <div>
            <Label>First Name</Label>
            <Input type="text" readOnly value={user?.name?.firstName} />
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label>Last Name</Label>
            <Input type="text" readOnly value={user?.name?.lastname} />
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label>Email Address</Label>
            <Input type="text" readOnly value={user?.credentials?.email} />
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label>Username</Label>
            <Input type="text" readOnly value={user?.credentials?.username} />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PersonalInformation;
