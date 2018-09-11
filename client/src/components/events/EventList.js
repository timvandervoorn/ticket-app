import React, { PureComponent } from "react"
import { Link } from "react-router-dom"

import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import "./EventList.css"
import Divider from "@material-ui/core/Divider"
// import { styles } from "../../lib/inlineStyles"

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    maxWidth: 300,
    minWidth: 250,
    minHeight: 350,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  media: {
    height: 140
  },
  item: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  button: {
    margin: 20,
    maxWidth: 300,
    minWidth: 250
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  cardButton: {
    margin: 20,
    textAlign: "center"
  },
  divider: {
    margin: 20
  }
})

class EventList extends PureComponent {
  componentDidUpdate() {
    this.setState({
      events:
        this.props.dividedEvents === null ? null : this.props.dividedEvents
    })
  }

  state = {
    paginationIndex: 0,
    events: this.props.dividedEvents === null ? null : this.props.dividedEvents
  }

  handleForwards = () => {
    if (!this.state.events[this.state.paginationIndex + 1]) {
      this.setState({
        paginationIndex: this.state.paginationIndex
      })
    }

    this.setState({
      paginationIndex: this.state.paginationIndex + 1
    })
  }

  handleBackwards = () => {
    this.setState({
      paginationIndex: this.state.paginationIndex - 1
    })
    if (this.state.paginationIndex < 0) {
      this.setState({
        paginationIndex: 0
      })
    }
  }

  renderEvents = events => {
    const { classes } = this.props
    return events.map(event => {
      const startDate = new Date(event.startTime).toLocaleDateString()
      const endDate = new Date(event.endTime).toLocaleDateString()

      return (
        <Grid item xs key={event.id}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={event.picture}
              title={event.name}
            />
            <CardContent>
              <Typography gutterBottom variant="display1">
                {event.name}
              </Typography>
              <Divider className={classes.divider} />
              <Typography gutterBottom variant="subheading" component="h2">
                This event starts at:
              </Typography>
              <Typography gutterBottom variant="title" component="h2">
                {startDate}
              </Typography>
              <Typography gutterBottom variant="subheading" component="h2">
                and ends at:
              </Typography>
              <Typography gutterBottom variant="title" component="h2">
                {endDate}
              </Typography>
              <Divider className={classes.divider} />
            </CardContent>

            <Link to={`/events/${event.id}`} className="link">
              <Button
                size="small"
                variant="contained"
                className={classes.cardButton}
              >
                See event details
              </Button>
            </Link>
          </Card>
        </Grid>
      )
    })
  }

  render() {
    const { dividedEvents, classes } = this.props
    return (
      <div>
        <Grid container spacing={24} className={classes.container}>
          <Grid item xs={12} className={classes.item}>
            <Paper className={classes.paper}>
              <Grid container spacing={24} className={classes.container}>
                {this.renderEvents(dividedEvents[this.state.paginationIndex])}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography>
              Page {this.state.paginationIndex + 1} of{" "}
              {this.state.events.length}
            </Typography>
            {dividedEvents.length > 0 && (
              <div>
                {this.state.paginationIndex > 0 && (
                  <Button
                    variant="contained"
                    onClick={this.handleBackwards}
                    className={classes.button}
                  >
                    Previous events
                  </Button>
                )}
                {dividedEvents[this.state.paginationIndex + 1] !==
                  undefined && (
                  <Button
                    variant="contained"
                    onClick={this.handleForwards}
                    className={classes.button}
                  >
                    Next events
                  </Button>
                )}
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(EventList)
