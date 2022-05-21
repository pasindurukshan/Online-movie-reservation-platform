import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  listTicketDetails,
  createTicketReview,
} from "../actions/ticketActions";
import { TICKET_CREATE_REVIEW_RESET } from "../constants/ticketConstants";
import "./main.css";

const TicketScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const ticketDetails = useSelector((state) => state.ticketDetails);
  const { loading, error, ticket } = ticketDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ticketReviewCreate = useSelector((state) => state.ticketReviewCreate);
  const {
    success: successTicketReview,
    loading: loadingTicketReview,
    error: errorTicketReview,
  } = ticketReviewCreate;

  useEffect(() => {
    if (successTicketReview) {
      setRating(0);
      setComment("");
    }
    if (!ticket._id || ticket._id !== match.params.id) {
      dispatch(listTicketDetails(match.params.id));
      dispatch({ type: TICKET_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successTicketReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTicketReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-black my-3" to="/" style={{ color: "white" }}>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={ticket.name} />
          <Row>
            <Col md={6}>
              <Image src={ticket.image} alt={ticket.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ backgroundColor: "black" }}>
                  <h3 style={{ color: "white" }}>{ticket.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <Rating
                    value={ticket.rating}
                    text={`${ticket.numReviews} reviews`}
                  />{" "}
                  <br />
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Price: {ticket.price} Rs/=
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Release Date: {ticket.date}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Theaters: {ticket.theater}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Description: <hr style={{ backgroundColor: "#00cc00" }} />
                  {ticket.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card style={{ borderColor: "#00cc00" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{ticket.price} Rs /=</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {ticket.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {ticket.countInStock > 0 && (
                    <ListGroup.Item
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            style={{ backgroundColor: "black", color: "white" }}
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(ticket.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item style={{ backgroundColor: "black" }}>
                    <Button
                      style={{ backgroundColor: "#00cc00", color: "white" }}
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={ticket.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {ticket.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {ticket.reviews.map((review) => (
                  <ListGroup.Item
                    style={{ backgroundColor: "black", color: "white" }}
                    key={review._id}
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <br />
                <ListGroup.Item
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <h2>Write a Customer Review</h2>
                  {successTicketReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingTicketReview && <Loader />}
                  {errorTicketReview && (
                    <Message variant="danger">{errorTicketReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          style={{ backgroundColor: "black", color: "white" }}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <br />
                      <Button
                        style={{ backgroundColor: "#00cc00", color: "white" }}
                        disabled={loadingTicketReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default TicketScreen;
