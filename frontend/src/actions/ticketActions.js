import axios from "axios";
import {
  TICKET_LIST_REQUEST,
  TICKET_LIST_SUCCESS,
  TICKET_LIST_FAIL,
  TICKET_DETAILS_REQUEST,
  TICKET_DETAILS_SUCCESS,
  TICKET_DETAILS_FAIL,
  TICKET_DELETE_SUCCESS,
  TICKET_DELETE_REQUEST,
  TICKET_DELETE_FAIL,
  TICKET_CREATE_REQUEST,
  TICKET_CREATE_SUCCESS,
  TICKET_CREATE_FAIL,
  TICKET_UPDATE_REQUEST,
  TICKET_UPDATE_SUCCESS,
  TICKET_UPDATE_FAIL,
  TICKET_CREATE_REVIEW_REQUEST,
  TICKET_CREATE_REVIEW_SUCCESS,
  TICKET_CREATE_REVIEW_FAIL,
  TICKET_TOP_REQUEST,
  TICKET_TOP_SUCCESS,
  TICKET_TOP_FAIL,
} from "../constants/ticketConstants";
import { logout } from "./userActions";

export const listTickets =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: TICKET_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/tickets?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: TICKET_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TICKET_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTicketDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TICKET_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/tickets/${id}`);

    dispatch({
      type: TICKET_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TICKET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTicket = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TICKET_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tickets/${id}`, config);

    dispatch({
      type: TICKET_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TICKET_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createTicket = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TICKET_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/tickets`, {}, config);

    dispatch({
      type: TICKET_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TICKET_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateTicket = (ticket) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TICKET_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/tickets/${ticket._id}`,
      ticket,
      config
    );

    dispatch({
      type: TICKET_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: TICKET_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TICKET_UPDATE_FAIL,
      payload: message,
    });
  }
};
//tickets review function
//add review for the tickets
export const createTicketReview =
  (ticketId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TICKET_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/tickets/${ticketId}/reviews`, review, config);

      dispatch({
        type: TICKET_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: TICKET_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

export const listTopTickets = () => async (dispatch) => {
  try {
    dispatch({ type: TICKET_TOP_REQUEST });

    const { data } = await axios.get(`/api/tickets/top`);

    dispatch({
      type: TICKET_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TICKET_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
