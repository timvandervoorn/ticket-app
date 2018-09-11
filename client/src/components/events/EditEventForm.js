import React, { PureComponent } from "react"
import "./EditEventForm.css"
import { connect } from "react-redux"
import { styles } from "../../lib/inlineStyles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

class EditEventForm extends PureComponent {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({
      name: "",
      description: "",
      picture: "",
      startTime: "",
      endTime: ""
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }
  render() {
    const { event, classes } = this.props
    return (
      <div>
        {!event && "Loading edit event form"}
        {event && (
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
                    id="name"
                    label="Event name"
                    placeholder="Enter new event name"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange("name")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className={classes.item}>
                  <TextField
                    id="description"
                    label="Event description"
                    placeholder="Enter new event description"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange("description")}
                    fullWidth
                    helperText="Make it is at least 10 characters long!"
                  />
                </Grid>
                <Grid item xs={12} className={classes.item}>
                  <TextField
                    id="picture"
                    label="Picture URL"
                    placeholder="Enter a new URL for the picture of the event"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange("picture")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className={classes.item}>
                  <TextField
                    id="startTime"
                    label="Event start time"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.handleChange("startTime")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className={classes.item}>
                  <TextField
                    id="endTime"
                    label="Event end time"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.handleChange("endTime")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className={classes.item}>
                  <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                  >
                    Save your updates!
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(
  connect(
    null,
    {}
  )(EditEventForm)
)
