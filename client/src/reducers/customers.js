import { UPDATE_CUSTOMERS } from "../actions/users"

export default (state = null, { type, payload }) => {
  switch (type) {
    case UPDATE_CUSTOMERS:
      return payload.reduce((customers, customer) => {
        customers[customer.id] = customer
        return customers
      }, {})

    default:
      return state
  }
}
