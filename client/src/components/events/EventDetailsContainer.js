import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { deleteEvent, editEvent, getEvents } from "../../actions/events"
import { getTicketsForCurrentEvent } from "../../actions/tickets"
import { getCustomers } from "../../actions/users"
import { userId } from "../../jwt"
import TicketListContainer from "../tickets/TicketListContainer"
import EventDetails from "./EventDetails"

class EventDetailsContainer extends PureComponent {
  componentDidMount() {
    this.props.getEvents()
    this.props.getCustomers()
  }

  handleClick = () => {
    this.props.deleteEvent(this.props.match.params.id)
    this.props.history.push("/events")
  }

  state = {
    showEditEvent: false
  }

  toggleDisplayEditEvent = () => {
    this.setState({
      showEditEvent: !this.state.showEditEvent
    })
  }

  handleUpdateEvent = data => {
    this.props.editEvent(this.props.match.params.id, data)
    this.setState({
      showEditEvent: !this.state.showEditEvent
    })
  }

  render() {
    const { event, user, customers } = this.props
    {
      !event && "Loading this"
    }
    return (
      <div>
        {event && (
          <div>
            <EventDetails
              event={event}
              user={user}
              handleClick={this.handleClick}
              handleUpdateEvent={this.handleUpdateEvent}
              showEditEvent={this.state.showEditEvent}
              toggleDisplayEditEvent={this.toggleDisplayEditEvent}
            />

            <TicketListContainer
              currentEventId={this.props.match.params.id}
              event={event}
              customers={customers}
            />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  event:
    state.events === null
      ? null
      : state.events && state.events[props.match.params.id],
  user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)],
  customers: state.customers
})

export default connect(
  mapStateToProps,
  { getEvents, getTicketsForCurrentEvent, deleteEvent, editEvent, getCustomers }
)(EventDetailsContainer)
