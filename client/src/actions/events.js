import * as request from "superagent"
import { baseUrl } from "../constants"
import { isExpired } from "../jwt"
import { logout } from "./users"

export const CREATE_EVENT = "CREATE_EVENT"
export const UPDATE_EVENTS = "UPDATE_EVENTS"
export const DELETE_EVENT = "DELETE_EVENT"
export const UPDATE_SINGLE_EVENT = "UPDATE_SINGLE_EVENT"

const updateEvent = event => ({
  type: CREATE_EVENT,
  payload: event
})

const updateEvents = events => ({
  type: UPDATE_EVENTS,
  payload: events
})

const updateSingleEvent = event => ({
  type: UPDATE_SINGLE_EVENT,
  payload: event
})

const removeEvent = eventId => ({
  type: DELETE_EVENT,
  payload: eventId
})

export const getEvents = () => dispatch => {
  request
    .get(`${baseUrl}/events`)
    .then(result => dispatch(updateEvents(result.body)))
    .catch(err => console.error(err))
}

export const createEvent = (name, description, picture, startTime, endTime) => (
  dispatch,
  getState
) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events`)
    .set("Authorization", `Bearer ${jwt}`)
    .send({ name, description, picture, startTime, endTime })
    .then(result => dispatch(updateEvent(result.body)))
    .catch(err => console.error(err))
}

export const deleteEvent = eventId => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .delete(`${baseUrl}/events/${eventId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(() =>
      dispatch({
        type: DELETE_EVENT,
        payload: eventId
      })
    )
    .catch(err => console.error(err))
}

export const editEvent = (eventId, eventUpdate) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  console.log("LOGGIN EVENT ID", eventId)

  request
    .patch(`${baseUrl}/events/${eventId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(eventUpdate)
    .then(result => {
      dispatch(updateSingleEvent(result.body))
      // dispatch(getSingleTicket(result.body))
    })
    .catch(err => console.error(err))
}
