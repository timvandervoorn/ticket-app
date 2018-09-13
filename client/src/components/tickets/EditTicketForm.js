import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import InputAdornment from "@material-ui/core/InputAdornment"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { styles } from "../../lib/inlineStyles"
import "./EditTicketForm.css"

class EditTicketForm extends PureComponent {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({})
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { currentTicket, classes } = this.props
    return (
      <div>
        {!currentTicket && "Loading edit ticket form"}
        {currentTicket && (
          <Grid container spacing={24} className={classes.container}>
            <Grid item xs={12} className={classes.item}>
              <Paper className={classes.paper}>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <Grid item xs={12} className={classes.item}>
                    <TextField
                      required
                      id="picture"
                      label="Picture URL"
                      placeholder="Enter a URL for the picture of the event"
                      className={classes.textField}
                      margin="normal"
                      onChange={this.handleChange("picture")}
                      fullWidth
                      helperText="Make sure it is a URL to the image!"
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
                      label="Event description"
                      placeholder="Enter a description for the event"
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
                    >
                      Save changes!
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {}
  )(EditTicketForm)
)
