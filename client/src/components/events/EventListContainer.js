import React, { PureComponent } from "react"
import { connect } from "react-redux"
import EventList from "./EventList"
import { getEvents } from "../../actions/events"

class EventListContainer extends PureComponent {
  state = {
    dividedEventsArr: [],
    testArray: []
  }

  componentDidMount() {
    this.props.getEvents()
  }

  componentWillReceiveProps() {
    this.setState({
      dividedEventsArr: [],
      testArray: []
    })
  }

  paginationMaker = events => {
    if (events.length > 4) {
      this.state.dividedEventsArr.push(events.slice(0, 4))
      this.paginationMaker(events.slice(4))
    } else {
      this.state.dividedEventsArr.push(events)
    }
  }

  filterOldEvents = events =>
    events.filter(event => {
      const endDate = new Date(event.endTime)
      const now = new Date()
      if (now < endDate) return event
    })

  render() {
    if (!this.props.events) return "Loading event list"
    const { events } = this.props

    {
      this.state.dividedEventsArr.length === 0 &&
        this.paginationMaker(this.filterOldEvents(events))
    }

    return (
      <div>
        {this.props.events && (
          <EventList
            events={this.props.events}
            dividedEvents={this.state.dividedEventsArr}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  events: state.events === null ? null : Object.values(state.events)
})

export default connect(
  mapStateToProps,
  { getEvents }
)(EventListContainer)
