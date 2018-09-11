import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { getUsers } from "../../actions/users"
import { Link } from "react-router-dom"
import { userId } from "../../jwt"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import { styles } from "../../lib/inlineStyles"
import Button from "@material-ui/core/Button"
import "./HomePage.css"

class Homepage extends PureComponent {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    const { currentUser, user, classes } = this.props
    return (
      <Grid container spacing={24} className={classes.container}>
        <Grid
          item
          xs={12}
          className={this.props.classes.item}
          style={{
            backgroundImage:
              "url('https://wallpapercave.com/wp/wp1889479.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "100vh"
          }}
        >
          <Link to="/login" className="link">
            <Button size="small" variant="contained" className={classes.button}>
              Login!
            </Button>
          </Link>
          <Link to="/signup" className="link">
            <Button size="small" variant="contained" className={classes.button}>
              Signup!
            </Button>
          </Link>
          <br />
          {user && (
            <Link to="/events" className="link">
              <Button
                size="small"
                variant="contained"
                className={classes.button}
              >
                {`Welcome ${user.firstName}, go check
          all the current events`}
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)],
  currentUser: state.currentUser
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getUsers }
  )(Homepage)
)
