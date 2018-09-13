import {
  ADD_TICKET_SUCCESS,
  CREATE_TICKET,
  DELETE_TICKET,
  UPDATE_TICKET,
  UPDATE_TICKETS
} from "../actions/tickets"

export default (state = null, { type, payload }) => {
  switch (type) {
    case CREATE_TICKET:
      return payload.reduce((tickets, ticket) => {
        tickets[ticket.id] = ticket
        return tickets
      }, {})

    case UPDATE_TICKETS:
      return payload.reduce((tickets, ticket) => {
        tickets[ticket.id] = ticket
        return tickets
      }, {})

    case ADD_TICKET_SUCCESS: {
      return {
        ...state,
        success: true
      }
    }

    case UPDATE_TICKET:
      const newState = { ...state }
      newState[payload.id] = payload
      return newState

    case DELETE_TICKET:
      return Object.values(state).filter(ticket => {
        if (ticket.id !== Number(payload)) {
          return ticket
        }
      })

    default:
      return state
  }
}
