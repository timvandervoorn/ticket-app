import * as request from "superagent"
import { baseUrl } from "../constants"
import { isExpired } from "../jwt"
import { logout } from "./users"

export const CREATE_COMMENT = "CREATE_COMMENT"
export const UPDATE_COMMENTS = "UPDATE_COMMENTS"
export const DELETE_COMMENT = "DELETE_COMMENT"

const updateComment = comments => ({
  type: CREATE_COMMENT,
  payload: comments
})

const updateComments = comments => ({
  type: UPDATE_COMMENTS,
  payload: comments
})

const removeComment = commentId => ({
  type: DELETE_COMMENT,
  payload: commentId
})

export const createComment = (eventId, ticketId, comment) => (
  dispatch,
  getState
) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events/${eventId}/tickets/${ticketId}/comments`)
    .set("Authorization", `Bearer ${jwt}`)
    .send({ eventId, ticketId, comment })
    .then(result => dispatch(updateComment(result.body)))
    .catch(err => console.error(err))
}

export const getCommentsForCurrentTicket = (eventId, ticketId) => (
  dispatch,
  getState
) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .get(`${baseUrl}/events/${eventId}/tickets/${ticketId}/comments`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(result => dispatch(updateComments(result.body)))
    .catch(err => console.error(err))
}

export const deleteComment = (ticketId, commentId) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .delete(`${baseUrl}/tickets/${ticketId}/comments/${commentId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(() => dispatch(removeComment(commentId)))
    .catch(err => console.error(err))
}
