import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import Qrcode from "../components/Qrcode";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    console.log('payment success')
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1 style={{ color: "#00cc00" }}>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item
              style={{ backgroundColor: "black", color: "white" }}
            >
              <h2>Booking</h2>
              <hr style={{ backgroundColor: "#00cc00" }} />
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a
                  style={{ color: "white" }}
                  href={`mailto:${order.user.email}`}
                >
                  {order.user.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.bookingAddress.address}, {order.bookingAddress.city}{" "}
                {order.bookingAddress.postalCode},{" "}
                {order.bookingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item
              style={{ backgroundColor: "black", color: "white" }}
            >
              <h2>Payment Method</h2>
              <hr style={{ backgroundColor: "#00cc00" }} />
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item
              style={{ backgroundColor: "black", color: "white" }}
            >
              <h2>Order Items</h2>
              <hr style={{ backgroundColor: "#00cc00" }} />
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                          Rs
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
                  <Col>{order.itemsPrice} Rs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <Row>
                  <Col>Booking</Col>
                  <Col>{order.bookingPrice} Rs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <Row>
                  <Col>Tax</Col>
                  <Col>{order.taxPrice} Rs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice} Rs/=</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>

          <br/>          
          <Card style={{ borderColor: "#00cc00" }}>
            <ListGroup variant="flush">
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <div style={{ textAlign:'center'}}>
                  <h3>PayHere</h3>
                  <hr style={{ backgroundColor: "#00cc00" }} />
                  {/* <Qrcode text={`http://localhost:3000/order/${orderId}`} /> */}
                  <Qrcode text={`http://ticketmart.herokuapp.com/order/${orderId}`} />
                </div>
                 
              </ListGroup.Item>
              
            </ListGroup>
          </Card>          

        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
