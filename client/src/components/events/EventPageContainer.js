import React, { PureComponent } from "react"
import { connect } from "react-redux"
import EventPage from "./EventPage"
import { createEvent } from "../../actions/events"
import EventListContainer from "./EventListContainer"
import { userId } from "../../jwt"

class EventPageContainer extends PureComponent {
  handleSubmit = data => {
    this.props.createEvent(
      data.name,
      data.description,
      data.picture,
      data.startTime,
      data.endTime
    )
  }
  render() {
    return (
      <div>
        <EventPage handleSubmit={this.handleSubmit} user={this.props.user} />
        <EventListContainer />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default connect(
  mapStateToProps,
  { createEvent }
)(EventPageContainer)
