import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { styles } from "../../lib/inlineStyles"
import "./CommentForm.css"

class CommentForm extends PureComponent {
  componentDidMount() {}

  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleCommentCreate(this.state)
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
