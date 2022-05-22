import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveBookingAddress } from "../actions/cartActions";

const BookingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { bookingAddress } = cart;

  const [address, setAddress] = useState(bookingAddress.address);
  const [city, setCity] = useState(bookingAddress.city);
  const [postalCode, setPostalCode] = useState(bookingAddress.postalCode);
  const [country, setCountry] = useState(bookingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveBookingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Booking</h1>
      <Form style={{ color: "white" }} onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Payer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Payer"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Phone Number1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number1"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Phone Number2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number2"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          style={{ backgroundColor: "#00cc00", color: "white" }}
          type="submit"
          variant="primary"
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default BookingScreen;
