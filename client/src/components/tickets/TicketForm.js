import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import InputAdornment from "@material-ui/core/InputAdornment"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { getEvents } from "../../actions/events"
import { createTicket } from "../../actions/tickets"
import { styles } from "../../lib/inlineStyles"
import "./TicketForm.css"

class TicketForm extends PureComponent {
  componentDidMount() {
    this.props.getEvents()
  }

  state = {
    addTicketDisabled: true,
    price: "",
    description: "",
    picture: ""
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createTicket(
      this.props.event.id,
      this.state.picture,
      this.state.price,
      this.state.description
    )

    this.setState({
      price: "",
      description: "",
      picture: ""
    })
    this.props.toggleTicketDisplay()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
    if (this.state.price !== "" && this.state.description !== "") {
      this.setState({
        addTicketDisabled: false
      })
    }
  }

  render() {
    const { event, classes } = this.props
    return (
      <Grid item xs={12} className={classes.item}>
        <Paper className={classes.paper}>
          <form
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <Grid item xs={12} className={classes.item}>
              <Typography variant="headline" gutterBottom>
                Adding ticket for {event.name}
              </Typography>
              <TextField
                id="picture"
                label="Picture URL"
                placeholder="Enter a URL for the picture of the event"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange("picture")}
                fullWidth
                helperText="Adding a picture is optional"
                value={this.state.picture}
              />
            </Grid>

            <Grid item xs={12} className={classes.item}>
              <TextField
                required
                id="price"
                label="Ticket price"
                placeholder="Enter a price"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange("price")}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  )
                }}
                value={this.state.price}
              />
            </Grid>

            <Grid item xs={12} className={classes.item}>
              <TextField
                required
                id="description"
                label="Ticket description"
                placeholder="Enter a description for the ticket"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange("description")}
                fullWidth
                value={this.state.description}
              />
            </Grid>

            <Grid item xs={12} className={classes.item}>
              <Button
                type="submit"
                className={classes.button}
                variant="contained"
                disabled={this.state.addTicketDisabled}
              >
                Add your ticket!
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    )
  }
}

export default withStyles(styles)(
  connect(
    null,
    { getEvents, createTicket }
  )(TicketForm)
)
