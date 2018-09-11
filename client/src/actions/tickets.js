import * as request from "superagent"
import { baseUrl } from "../constants"
import { isExpired } from "../jwt"
import { logout } from "./users"

export const CREATE_TICKET = "CREATE_TICKET"
export const UPDATE_TICKETS = "UPDATE_TICKETS"
export const ADD_TICKET_SUCCESS = "ADD_TICKET_SUCCESS"
export const GET_SINGLE_TICKET = "GET_SINGLE_TICKET"
export const UPDATE_TICKET = "UPDATE_TICKET"
export const DELETE_TICKET = "DELETE_TICKET"

const createNewTicket = ticket => ({
  type: CREATE_TICKET,
  payload: ticket
})

const updateTickets = tickets => ({
  type: UPDATE_TICKETS,
  payload: tickets
})

const getSingleTicket = ticket => ({
  type: GET_SINGLE_TICKET,
  payload: ticket
})

const addTicketSuccess = () => ({
  type: ADD_TICKET_SUCCESS
})

const updateTicket = ticket => ({
  type: UPDATE_TICKET,
  payload: ticket
})

const removeTicket = ticketId => ({
  type: DELETE_TICKET,
  payload: ticketId
})

export const getTicketsForCurrentEvent = eventId => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .get(`${baseUrl}/events/${eventId}/tickets`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(result => dispatch(updateTickets(result.body)))
    .catch(err => console.error(err))
}

export const getTicketDetails = (eventId, ticketId) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .get(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(result => dispatch(getSingleTicket(result.body)))
    .catch(err => console.error(err))
}

export const editTicket = (eventId, ticketId, ticketUpdate) => (
  dispatch,
  getState
) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  console.log("LOGGIN TICKET ID", ticketId)

  request
    .patch(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(ticketUpdate)
    .then(result => {
      dispatch(updateTicket(result.body))
      console.log(result.body)
      dispatch(getSingleTicket(result.body))
    })
    .catch(err => console.error(err))
}

export const createTicket = (eventId, picture, price, description) => (
  dispatch,
  getState
) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  if (!picture || picture === undefined) {
    picture = "https://static.thenounproject.com/png/79622-200.png"
  }

  request
    .post(`${baseUrl}/events/${eventId}/tickets`)
    .set("Authorization", `Bearer ${jwt}`)
    .send({ picture, price, description })
    .then(result => {
      dispatch(createNewTicket(result.body))
    })
    .catch(err => console.error(err))
}

export const deleteTicket = (eventId, ticketId) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .delete(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(() => dispatch(removeTicket(ticketId)))
    .catch(err => console.error(err))

  // FIX REDUCER
}
