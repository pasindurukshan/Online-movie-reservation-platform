import express from "express";
const router = express.Router();
import {
  getTickets,
  getTicketById,
  deleteTicket,
  createTicket,
  updateTicket,
  createTicketReview,
  getTopTickets,
} from "../controllers/ticketController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getTickets).post(protect, admin, createTicket);
router.route("/:id/reviews").post(protect, createTicketReview);
router.get("/top", getTopTickets);
router
  .route("/:id")
  .get(getTicketById)
  .delete(protect, admin, deleteTicket)
  .put(protect, admin, updateTicket);

export default router;
