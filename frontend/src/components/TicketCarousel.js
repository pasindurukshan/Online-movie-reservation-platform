import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopTickets } from "../actions/ticketActions";

const TicketCarousel = () => {
  const dispatch = useDispatch();

  const ticketTopRated = useSelector((state) => state.ticketTopRated);
  const { loading, error, tickets } = ticketTopRated;

  useEffect(() => {
    dispatch(listTopTickets());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {tickets.map((ticket) => (
        <Carousel.Item key={ticket._id}>
          <Link to={`/ticket/${ticket._id}`}>
            <Image src={ticket.image} alt={ticket.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {ticket.name} (${ticket.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TicketCarousel;
