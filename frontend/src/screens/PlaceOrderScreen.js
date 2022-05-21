import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  if (!cart.bookingAddress.address) {
    history.push("/booking");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.bookingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.bookingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        bookingAddress: cart.bookingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        bookingPrice: cart.bookingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item
              style={{ backgroundColor: "black", color: "white" }}
            >
              <h2>Booking</h2>
              <p>
                <strong>Address: </strong>
                {cart.bookingAddress.address}, {cart.bookingAddress.city}{" "}
                {cart.bookingAddress.postalCode}, {cart.bookingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item
              style={{ backgroundColor: "black", color: "white" }}
            >
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item
              style={{ backgroundColor: "black", color: "white" }}
            >
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item
                      style={{ backgroundColor: "black", color: "white" }}
                      key={index}
                    >
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            style={{ color: "white" }}
                            to={`/ticket/${item.ticket}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} Rs = {item.qty * item.price}{" "}
                          Rs/=
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card style={{ borderColor: "#00cc00" }}>
            <ListGroup variant="flush">
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <h2>Order Summary</h2>
                <hr style={{ backgroundColor: "#00cc00" }} />
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <Row>
                  <Col>Items</Col>
                  <Col>{cart.itemsPrice} Rs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <Row>
                  <Col>Booking</Col>
                  <Col>{cart.bookingPrice} Rs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <Row>
                  <Col>Tax</Col>
                  <Col>{cart.taxPrice} Rs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <Row>
                  <Col>Total</Col>
                  <Col>{cart.totalPrice} Rs/=</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
