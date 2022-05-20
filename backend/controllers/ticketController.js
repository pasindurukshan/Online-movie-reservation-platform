import asyncHandler from "express-async-handler";
import Ticket from "../models/ticketModel.js";

// @desc    Fetch all tickets
// @route   GET /api/tickets
// @access  Public
const getTickets = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Ticket.countDocuments({ ...keyword });
  const tickets = await Ticket.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ tickets, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single ticket
// @route   GET /api/tickets/:id
// @access  Public
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

// @desc    Delete a ticket
// @route   DELETE /api/tickets/:id
// @access  Private/Admin
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    await ticket.remove();
    res.json({ message: "Ticket removed" });
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

// @desc    Create a ticket
// @route   POST /api/tickets
// @access  Private/Admin
const createTicket = asyncHandler(async (req, res) => {
  const ticket = new Ticket({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    date: "Sample date",
    theater: "Sample theater",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdTicket = await ticket.save();
  res.status(201).json(createdTicket);
});

// @desc    Update a ticket
// @route   PUT /api/tickets/:id
// @access  Private/Admin
const updateTicket = asyncHandler(async (req, res) => {
  const { name, price, description, image, date, theater, countInStock } =
    req.body;

  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    ticket.name = name;
    ticket.price = price;
    ticket.description = description;
    ticket.image = image;
    ticket.date = date;
    ticket.theater = theater;
    ticket.countInStock = countInStock;

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

// @desc    Create new review
// @route   POST /api/tickets/:id/reviews
// @access  Private
const createTicketReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    const alreadyReviewed = ticket.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Ticket already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    ticket.reviews.push(review);

    ticket.numReviews = ticket.reviews.length;

    ticket.rating =
      ticket.reviews.reduce((acc, item) => item.rating + acc, 0) /
      ticket.reviews.length;

    await ticket.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

// @desc    Get top rated tickets
// @route   GET /api/tickets/top
// @access  Public
const getTopTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({}).sort({ rating: -1 }).limit(3);

  res.json(tickets);
});

export {
  getTickets,
  getTicketById,
  deleteTicket,
  createTicket,
  updateTicket,
  createTicketReview,
  getTopTickets,
};
