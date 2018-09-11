import { GET_SINGLE_TICKET } from "../actions/tickets"

export default (state = null, { type, payload }) => {
  switch (type) {
    case GET_SINGLE_TICKET:
      return {
        payload
      }
    default:
      return state
  }
}
