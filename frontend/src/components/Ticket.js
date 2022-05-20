import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Ticket = ({ ticket }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/ticket/${ticket._id}`}>
        <Card.Img src={ticket.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/ticket/${ticket._id}`}>
          <Card.Title as="div">
            <strong>{ticket.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={ticket.rating} text={`${ticket.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">${ticket.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Ticket;
