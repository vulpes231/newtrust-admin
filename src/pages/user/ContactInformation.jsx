import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

const ContactInformation = ({ user }) => {
  return (
    <React.Fragment>
      <Row className="p-6 space-y-4">
        <Col lg={6}>
          <div>
            <Label>Street</Label>
            <Input
              type="text"
              readOnly
              value={user?.contactInfo?.address?.street}
            />
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label>Phone</Label>
            <Input type="text" readOnly value={user?.contactInfo?.phone} />
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label>City</Label>
            <Input
              type="text"
              readOnly
              value={user?.contactInfo?.address?.city}
            />
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label>Zip</Label>
            <Input
              type="text"
              readOnly
              value={user?.contactInfo?.address?.zipCode}
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ContactInformation;
