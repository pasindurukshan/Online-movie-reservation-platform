import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer style={{ color: "#8c8c8c" }} to="/login">
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={{ color: "white" }} disabled>
            Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer style={{ color: "#8c8c8c" }} to="/booking">
            <Nav.Link>Booking</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={{ color: "white" }} disabled>
            Booking
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer style={{ color: "#8c8c8c" }} to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={{ color: "white" }} disabled>
            Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer style={{ color: "#8c8c8c" }} to="/placeorder">
            <Nav.Link>Place Order </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={{ color: "white" }} disabled>
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
