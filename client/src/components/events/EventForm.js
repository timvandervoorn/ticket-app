import React, { PureComponent } from "react"
import "./EventForm.css"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"

import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"

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
    maxWidth: 300
  },
  menu: {
    width: 200
  }
})

class EventForm extends PureComponent {
  state = {
    buttonDisabled: true
  }

  checkInputs = () => {
    if (
      this.state.description ||
      this.state.confirmPassword ||
      this.state.startTime ||
      this.state.endTime ||
      this.state.name
    ) {
      this.setState({
        buttonDisabled: false
      })
    }
  }

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

  handleChange = event => {
    this.checkInputs()
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props

    return (
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
                <Typography gutterBottom variant="display1">
                  Welcome Admin: Keep Adding Events!
                </Typography>

                <TextField
                  required
                  id="name"
                  label="Event name"
                  placeholder="Enter the of the event"
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange("name")}
                  fullWidth
                  value={this.state.name}
                />
              </Grid>
              <Grid item xs={12} className={classes.item} />
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
                  id="startTime"
                  label="Event start time"
                  type="datetime-local"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("startTime")}
                  fullWidth
                  value={this.state.startTime}
                />
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <TextField
                  required
                  id="endTime"
                  label="Event end time"
                  type="datetime-local"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("endTime")}
                  fullWidth
                  value={this.state.endTime}
                />
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Button
                  type="submit"
                  className={classes.button}
                  variant="contained"
                >
                  Create this event!
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(EventForm)
