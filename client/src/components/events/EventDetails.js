import React, { PureComponent } from "react"
import { Link } from "react-router-dom"
import TicketForm from "../tickets/TicketForm"
import EditEventForm from "./EditEventForm"
import "./EventDetails.css"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { styles } from "../../lib/inlineStyles"

class EventDetails extends PureComponent {
  state = {
    showAddTicket: false
  }

  toggleTicketDisplay = () => {
    this.setState({
      showAddTicket: !this.state.showAddTicket
    })
  }

  renderEventDetails = (event, classes) => {
    const startDate = new Date(event.startTime).toLocaleDateString()

    const endDate = new Date(event.endTime).toLocaleDateString()

    return (
      <Grid item xs={12} className={classes.item}>
        <Card
          className={classes.paper}
          style={{ backgroundColor: "rgba(30, 30, 30, 0.8)" }}
        >
          <Typography
            gutterBottom
            variant="display3"
            component="h2"
            style={{ color: "rgb(255,255,255)" }}
          >
            {event.name}
          </Typography>
          <Typography
            component="p"
            variant="display1"
            style={{ color: "rgb(255,255,255)", marginBottom: 25 }}
          >
            {event.description}
          </Typography>
          <Typography
            variant="headline"
            gutterBottom
            style={{ color: "rgb(255,255,255)" }}
          >
            Event start date: {startDate}
          </Typography>
          <Typography
            variant="headline"
            gutterBottom
            style={{ color: "rgb(255,255,255)" }}
          >
            Event end date: {endDate}
          </Typography>
        </Card>
      </Grid>
    )
  }

  render() {
    const { event, user, showEditEvent, classes } = this.props
    return (
      <Grid container spacing={24} className={classes.container}>
        <Grid
          item
          xs={12}
          className={classes.item}
          style={{
            backgroundImage: `url(${event.picture})`,
            backgroundSize: "cover",
            overflow: "hidden"
          }}
        >
          {user &&
            event && <div>{this.renderEventDetails(event, classes)}</div>}
        </Grid>

        {user &&
          event && (
            <Grid item xs={12} className={classes.item}>
              <h1>Event details are rendered</h1>
              <Link to={"/events"} className="link">
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.props.toggleDisplayEditEvent}
                >
                  Back to all events
                </Button>
              </Link>
              {user && (
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.props.toggleDisplayEditEvent}
                  onClick={this.toggleTicketDisplay}
                >
                  {!this.state.showAddTicket
                    ? "Add ticket for this event"
                    : "Close this form"}
                </Button>
              )}
              {user.admin && (
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.props.toggleDisplayEditEvent}
                >
                  Edit this event
                </Button>
              )}
              {user.admin && (
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => this.props.handleClick()}
                >
                  Delete this event
                </Button>
              )}

              {showEditEvent && (
                <EditEventForm
                  event={event}
                  onSubmit={this.props.handleUpdateEvent}
                />
              )}

              {this.state.showAddTicket && (
                <TicketForm
                  event={event}
                  user={user}
                  toggleTicketDisplay={this.toggleTicketDisplay}
                />
              )}
            </Grid>
          )}
      </Grid>
    )
  }
}

export default withStyles(styles)(EventDetails)
