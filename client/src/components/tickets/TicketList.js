import Button from "@material-ui/core/Button"
import ButtonBase from "@material-ui/core/ButtonBase"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Brightness1 } from "@material-ui/icons"
import React, { PureComponent } from "react"
import { Link } from "react-router-dom"
import { styles } from "../../lib/inlineStyles"
import "./TicketList.css"

const addedStyles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
})

class TicketList extends PureComponent {
  state = {
    sort: "newest-first",
    sortHighestToLow: false,
    tickets: this.props.tickets
  }

  sortTickets = tickets => {
    if (this.state.sort === "newest-first") {
      return tickets.sort((a, b) => b.id - a.id)
    } else if (this.state.sort === "oldest-first") {
      return tickets.sort((a, b) => a.id - b.id)
    } else if (this.state.sort === "high-to-low") {
      return tickets.sort((a, b) => b.price - a.price)
    } else if (this.state.sort === "low-to-high") {
      return tickets.sort((a, b) => a.price - b.price)
    }
  }

  handleChange = async event => {
    const { name, value } = event.target

    if (value === "select") return

    await this.setState({
      [name]: value
    })
  }

  renderTickets = (tickets, currentEventId, user, classes) => {
    const sortedTickets = this.sortTickets(tickets)

    return (
      <Grid container spacing={24} direction="column" alignItems="center">
        {sortedTickets.map(ticket => {
          const riskLevel = ticket.risk

          let currentColor

          if (riskLevel >= 75) {
            currentColor = "red"
          } else if (riskLevel >= 25) {
            currentColor = "yellow"
          } else {
            currentColor = "green"
          }

          if (ticket.id !== undefined) {
            return (
              <Paper className={classes.ticketRoot} key={ticket.id}>
                <Grid container spacing={24}>
                  <Grid item>
                    <ButtonBase className={classes.ticketImage}>
                      <img
                        className={classes.ticketImg}
                        alt={ticket.description}
                        src={ticket.picture}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={16} sm container>
                    <Grid item xs container direction="column" spacing={16}>
                      <Grid item xs>
                        <Typography gutterBottom variant="display1">
                          Ticket for {this.props.event.name}
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography gutterBottom variant="display1">
                          Offered for: <strong>€{ticket.price}</strong>
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography gutterBottom variant="display1">
                          Risk level: <strong>{riskLevel}%</strong>{" "}
                          <Brightness1 style={{ color: currentColor }} />
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Link
                          className="link"
                          to={`/events/${currentEventId}/tickets/${ticket.id}`}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            className={classes.button}
                            id="link-btn"
                          >
                            See ticket details
                          </Button>
                        </Link>

                        {user.admin && (
                          <Button
                            size="small"
                            variant="contained"
                            className={classes.button}
                            onClick={() => this.props.handleClick(ticket.id)}
                          >
                            Delete ticket
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subheading" />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            )
          }
        })}
      </Grid>
    )
  }

  render() {
    const { currentEventId, user, classes, tickets, customers } = this.props

    return (
      <Grid container spacing={24} className={classes.container}>
        <Grid item xs={12} className={classes.item}>
          <select
            id="sort"
            onChange={this.handleChange}
            name="sort"
            value={this.state.value}
          >
            <option value="select">Select sorting option</option>
            <option value="newest-first">Newest first</option>
            <option value="oldest-first">Oldest first</option>
            <option value="high-to-low">High to low</option>
            <option value="low-to-high">Low to high</option>
          </select>
          <p />
          <p>{this.state.value}</p>
        </Grid>

        {tickets &&
          currentEventId &&
          user &&
          customers &&
          this.renderTickets(
            tickets,
            currentEventId,
            user,
            classes,
            Object.values(customers)
          )}
      </Grid>
    )
  }
}

export default withStyles(styles, addedStyles)(TicketList)
