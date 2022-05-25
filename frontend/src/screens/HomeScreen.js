import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Ticket from "../components/Ticket";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import TicketCarousel from "../components/TicketCarousel";
import Meta from "../components/Meta";
import { listTickets } from "../actions/ticketActions";
import "./main.css";

const HomeScreen = ({ match, search }) => {
  console.log('search', search)
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const ticketList = useSelector((state) => state.ticketList);
  const { loading, error, tickets, page, pages } = ticketList;

  useEffect(() => {
    dispatch(listTickets(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <TicketCarousel />
      ) : (
        <Link to="/" className="btn btn-black" style={{ color: "white" }}>
          Go Back
        </Link>
      )}
      <br /> <br /> <br />
      <h1 style={{ color: "#00cc00" }}>Latest Tickets</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
                {
                   (!search ? tickets : tickets.filter(t => t.theater.toLowerCase().includes(search.toLowerCase())))
                   //tickets
                    .map((ticket) => (
              <Col key={ticket._id} sm={12} md={6} lg={4} xl={3}>
                <Ticket ticket={ticket} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
