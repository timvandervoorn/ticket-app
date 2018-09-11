import { GET_SINGLE_CUSTOMER } from "../actions/users"

export default (state = null, { type, payload }) => {
  switch (type) {
    case GET_SINGLE_CUSTOMER:
      return {
        payload
      }
    default:
      return state
  }
}
