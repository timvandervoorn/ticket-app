import React, { PureComponent } from "react"
import "./CommentForm.css"
import { connect } from "react-redux"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"

import InputAdornment from "@material-ui/core/InputAdornment"

import { styles } from "../../lib/inlineStyles"

class CommentForm extends PureComponent {
  componentDidMount() {}

  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({
      comment: ""
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
                <TextField
                  id="textarea"
                  label="Add a comment to this ticket!"
                  placeholder="Placeholder"
                  multiline
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  onChange={this.handleChange("comment")}
                  value={this.state.comment || ""}
                />
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Button
                  type="submit"
                  className={classes.button}
                  variant="contained"
                >
                  Add comment !
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state, props) => ({})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {}
  )(CommentForm)
)
