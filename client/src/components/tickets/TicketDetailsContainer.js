import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { createComment, deleteComment } from "../../actions/comments"
import {
  editTicket,
  getTicketDetails,
  getTicketsForCurrentEvent
} from "../../actions/tickets"
import { getSingleCustomer } from "../../actions/users"
import { userId } from "../../jwt"
import { styles } from "../../lib/inlineStyles"
import CommentListContainer from "../comments/CommentListContainer"
import EditTicketForm from "./EditTicketForm"
import TicketDetails from "./TicketDetails"

class TicketDetailsContainer extends PureComponent {
  state = {
    showEditTicket: false
  }

  averageTicketPrice = tickets => {
    return (
      tickets.reduce((acc, ticket) => {
        return acc + Number(ticket.price)
      }, 0) / tickets.length
    )
  }

  toggleEditTicketDisplay = () => {
    this.setState({
      showEditTicket: !this.state.showEditTicket
    })
  }

  handleSubmit = data => {
    this.props.editTicket(
      this.props.currentTicket.payload.event.id,
      this.props.currentTicket.payload.id,
      data
    )
    this.setState({
      showEditTicket: !this.state.showEditTicket
    })
  }

  componentDidMount() {
    this.props.getTicketsForCurrentEvent(this.props.match.params.id)
    this.props.getTicketDetails(
      this.props.match.params.id,
      this.props.match.params.ticketId
    )

    if (this.props.singleCustomer !== null) {
      this.props.getSingleCustomer(
        Number(this.props.currentTicket.payload.user.id)
      )
    }
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.userID !== prevProps.userID) {
  //     this.fetchData(this.props.userID);
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (this.props.currentTicket !== null) {
      if (this.props.singleCustomer === null) {
        this.props.getSingleCustomer(
          Number(this.props.currentTicket.payload.user.id)
        )
      }
    }
    console.log(this.props.currentTicket)
    console.log(prevProps)
    // if (this.props.currentTicket.payload.numOfComments !== null) {
    //   if (this.props.currentTicket !== prevProps.currentTicket) {
    //     this.props.getTicketDetails(
    //       this.props.match.params.id,
    //       this.props.match.params.ticketId
    //     )
    //   }
    // }
  }

  handleCommentCreate = data => {
    this.props.createComment(
      this.props.match.params.id,
      this.props.match.params.ticketId,
      data.comment
    )
    this.props.getTicketDetails(
      this.props.match.params.id,
      this.props.match.params.ticketId
    )
  }

  handleCommentDelete = data => {
    this.props.deleteComment(this.props.match.params.ticketId, data)

    this.props.getTicketDetails(
      this.props.match.params.id,
      this.props.match.params.ticketId
    )
  }

  currentRiskLevel

  render() {
    const { user, tickets, currentTicket, users, classes } = this.props

    if (!user || !tickets || !currentTicket) return "Loading"

    {
      !user && <Redirect to="/" />
    }

    return (
      <div>
        {console.log(users)}
        {this.props.currentTicket !== null && (
          <div>
            <TicketDetails
              user={user}
              tickets={tickets}
              currentTicket={currentTicket}
              users={users}
            />

            <Grid container spacing={24} className={classes.container}>
              <Grid item xs={12} className={this.props.classes.item}>
                {(this.props.currentTicket.payload.user.id ===
                  this.props.user.id ||
                  user.admin) && (
                  <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    disabled={this.state.addTicketDisabled}
                    onClick={this.toggleEditTicketDisplay}
                  >
                    {!this.state.showEditTicket
                      ? "Edit current ticket"
                      : "Close edit form"}
                  </Button>
                )}
              </Grid>
            </Grid>

            {this.state.showEditTicket && (
              <EditTicketForm
                currentTicket={currentTicket}
                onSubmit={this.handleSubmit}
              />
            )}

            <CommentListContainer
              eventId={this.props.match.params.id}
              ticketId={this.props.match.params.ticketId}
              handleCommentDelete={this.handleCommentDelete}
              handleCommentCreate={this.handleCommentCreate}
            />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)],
  tickets: state.tickets === null ? null : Object.values(state.tickets),
  currentTicket: state.currentTicket === null ? null : state.currentTicket,
  comments: state.comments === null ? null : Object.values(state.comments),
  singleCustomer: state.singleCustomer === null ? null : state.singleCustomer,
  users: state.users === null ? null : state.users
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {
      getTicketDetails,
      getTicketsForCurrentEvent,
      getSingleCustomer,
      editTicket,
      deleteComment,
      createComment
    }
  )(TicketDetailsContainer)
)
