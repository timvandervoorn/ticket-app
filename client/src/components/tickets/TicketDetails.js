import ButtonBase from "@material-ui/core/ButtonBase"
import Card from "@material-ui/core/Card"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Brightness1 } from "@material-ui/icons"
import React, { PureComponent } from "react"
import { styles } from "../../lib/inlineStyles"

class TicketDetails extends PureComponent {
  renderTicketDetails = currentTicket => {
    const startDate = new Date(
      currentTicket.payload.event.startTime
    ).toLocaleDateString()
    const endDate = new Date(
      currentTicket.payload.event.endTime
    ).toLocaleDateString()

    const riskLevel = currentTicket.risk

    let currentColor

    if (riskLevel >= 75) {
      currentColor = "red"
    } else if (riskLevel >= 25) {
      currentColor = "yellow"
    } else {
      currentColor = "green"
    }

    return (
      <Grid container spacing={24} className={this.props.classes.container}>
        <Grid item xs={12} className={this.props.classes.item}>
          <Card
            className={this.props.classes.paper}
            style={{ backgroundColor: "rgba(125, 125, 125, 0.8)" }}
          >
            <Typography
              gutterBottom
              variant="display3"
              component="h2"
              style={{ color: "rgb(255,255,255)" }}
            >
              Ticket for {currentTicket.payload.event.name}
            </Typography>
            <Typography
              component="p"
              variant="display1"
              style={{ color: "rgb(255,255,255)", marginBottom: 25 }}
            >
              {currentTicket.payload.event.description}
            </Typography>
            <Typography
              variant="headline"
              gutterBottom
              style={{ color: "rgb(255,255,255)" }}
            >
              Event start date: <strong>{startDate}</strong>
            </Typography>
            <Typography
              variant="headline"
              gutterBottom
              style={{ color: "rgb(255,255,255)" }}
            >
              Event end date: <strong>{endDate}</strong>
              <Divider className={this.props.classes.divider} />
            </Typography>
            <Typography
              variant="headline"
              gutterBottom
              style={{ color: "rgb(255,255,255)" }}
            >
              Ticket seller:{" "}
              <strong>{currentTicket.payload.user.firstName}</strong>{" "}
              <strong>{currentTicket.payload.user.lastName}</strong>
            </Typography>
            <Typography
              variant="headline"
              gutterBottom
              style={{ color: "rgb(255,255,255)" }}
            >
              Ticket price: <strong>€ {currentTicket.payload.price} </strong>
            </Typography>
            <Typography
              variant="headline"
              gutterBottom
              style={{ color: "rgb(255,255,255)" }}
            >
              Description by seller: {currentTicket.payload.description}
            </Typography>

            <Divider className={this.props.classes.divider} />
            <Grid item>
              <ButtonBase className={this.props.classes.ticketImage}>
                <img
                  className={this.props.classes.ticketImg}
                  alt={this.props.classes.description}
                  src={currentTicket.payload.picture}
                />
              </ButtonBase>
            </Grid>
            <Divider className={this.props.classes.divider} />
            <Typography
              variant="headline"
              gutterBottom
              style={{ color: "rgb(255,255,255)" }}
            >
              Current risk level: {currentTicket.payload.risk}
              {"% "}
              <Brightness1 style={{ color: currentColor }} />
            </Typography>
          </Card>
        </Grid>
      </Grid>
    )
  }

  render() {
    const { currentTicket } = this.props

    return this.renderTicketDetails(currentTicket)
  }
}

export default withStyles(styles)(TicketDetails)
