import {
  CREATE_COMMENT,
  UPDATE_COMMENTS,
  DELETE_COMMENT
} from "../actions/comments"

export default (state = null, { type, payload }) => {
  switch (type) {
    case CREATE_COMMENT:
      return payload.reduce((comments, comment) => {
        comments[comment.id] = comment
        return comments
      }, {})

    case UPDATE_COMMENTS:
      return payload.reduce((comments, comment) => {
        comments[comment.id] = comment
        return comments
      }, {})

    case DELETE_COMMENT:
      return Object.values(state).filter(comment => {
        if (comment.id !== Number(payload)) {
          return comment
        }
      })

    default:
      return state
  }
}
