import React, { PureComponent } from "react"
import { connect } from "react-redux"
import {
  createComment,
  deleteComment,
  getCommentsForCurrentTicket
} from "../../actions/comments"
import { userId } from "../../jwt"
import CommentForm from "./CommentForm"
import CommentList from "./CommentList"

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

  render() {
    const { comments, users, user } = this.props

    return (
      <div>
        <CommentForm
          onSubmit={this.handleSubmit}
          handleCommentCreate={this.props.handleCommentCreate}
        />
        <CommentList
          comments={comments}
          users={users}
          user={user}
          handleDelete={this.props.handleCommentDelete}
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
