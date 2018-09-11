import React, { PureComponent } from "react"
import { connect } from "react-redux"
import CommentForm from "./CommentForm"
import CommentList from "./CommentList"
import {
  createComment,
  getCommentsForCurrentTicket,
  deleteComment
} from "../../actions/comments"
import { userId } from "../../jwt"

class CommentListContainer extends PureComponent {
  componentDidMount() {
    this.props.getCommentsForCurrentTicket(
      this.props.eventId,
      this.props.ticketId
    )
  }

  componentWillMount() {
    this.props.getCommentsForCurrentTicket(
      this.props.eventId,
      this.props.ticketId
    )
  }

  handleSubmit = data => {
    this.props.createComment(
      this.props.eventId,
      this.props.ticketId,
      data.comment
    )
  }

  handleDelete = data => {
    console.log(data)
    this.props.deleteComment(this.props.ticketId, data)
  }

  render() {
    const { comments, users, user } = this.props

    return (
      <div>
        <CommentForm onSubmit={this.handleSubmit} />
        <CommentList
          comments={comments}
          users={users}
          user={user}
          handleDelete={this.handleDelete}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  comments: state.comments === null ? null : Object.values(state.comments),
  users: state.users === null ? null : state.users,
  user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default connect(
  mapStateToProps,
  { createComment, getCommentsForCurrentTicket, deleteComment }
)(CommentListContainer)
