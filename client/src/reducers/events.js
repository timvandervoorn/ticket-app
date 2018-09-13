import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENTS,
  UPDATE_SINGLE_EVENT
} from "../actions/events"

export default (state = null, { type, payload }) => {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_EVENTS:
      return payload.reduce((events, event) => {
        events[event.id] = event
        return events
      }, {})

    case DELETE_EVENT:
      return Object.values(state).filter(event => {
        if (event.id !== Number(payload)) {
          return event
        }
      })

    case UPDATE_SINGLE_EVENT:
      const newState = { ...state }
      newState[payload.id] = payload
      return newState

    default:
      return state
  }
}
