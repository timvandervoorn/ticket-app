import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { deleteTicket, getTicketsForCurrentEvent } from "../../actions/tickets"
import { userId } from "../../jwt"
import TicketList from "./TicketList"

class TicketListContainer extends PureComponent {
  componentDidMount() {
    this.props.getTicketsForCurrentEvent(this.props.currentEventId)
  }

  componentWillMount() {
    this.props.getTicketsForCurrentEvent(this.props.currentEventId)
  }

  handleClick = data => {
    this.props.deleteTicket(this.props.currentEventId, data)
  }

  averageTicketPrice = tickets => {
    return (
      tickets.reduce((acc, ticket) => {
        return acc + Number(ticket.price)
      }, 0) / tickets.length
    )
  }

  render() {
    const { tickets, user, customers } = this.props
    {
      !tickets && "Loading tickets"
    }

    return (
      <div>
        {tickets && (
          <TicketList
            user={user}
            tickets={tickets}
            currentEventId={this.props.currentEventId}
            handleClick={this.handleClick}
            event={this.props.event}
            customers={customers}
            averageTicketPrice={this.averageTicketPrice(tickets)}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  tickets: state.tickets === null ? null : Object.values(state.tickets),
  user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default connect(
  mapStateToProps,
  { getTicketsForCurrentEvent, deleteTicket }
)(TicketListContainer)
