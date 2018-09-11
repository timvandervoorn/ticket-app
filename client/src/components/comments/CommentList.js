import React, { PureComponent } from "react"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { styles } from "../../lib/inlineStyles"

import Divider from "@material-ui/core/Divider"

class CommentList extends PureComponent {
  renderComments = (comments, users, user, classes) => {
    return comments.map(comment => {
      if (comment.id !== undefined && comment.user_id !== undefined) {
        return (
          <Grid container spacing={24} direction="column" alignItems="center">
            <Paper className={classes.ticketRoot} key={comment.id}>
              <Grid container spacing={24}>
                <Grid item xs={16} sm container>
                  <Grid item xs container direction="column" spacing={16}>
                    <Grid item xs>
                      {comment.user_id && (
                        <Typography gutterBottom variant="display1">
                          Comment by {users[comment.user_id].firstName}
                        </Typography>
                      )}
                      <Divider className={classes.divider} />
                      {comment.user && (
                        <Typography gutterBottom variant="display1">
                          Comment by: {comment.user.firstName}
                        </Typography>
                      )}

                      <Typography gutterBottom variant="display1">
                        {comment.comment}
                      </Typography>

                      {(comment.user_id === user.id || user.admin) && (
                        <Grid item>
                          <Button
                            size="small"
                            variant="contained"
                            className={classes.button}
                            id="link-btn"
                            onClick={() => this.props.handleDelete(comment.id)}
                          >
                            Delete this comment
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )
      }
    })
  }

  render() {
    const { comments, users, user, classes } = this.props

    return (
      <Grid container spacing={24} className={classes.container}>
        {comments &&
          users &&
          user &&
          this.renderComments(comments, users, user, classes)}
      </Grid>
    )
  }
}

export default withStyles(styles)(CommentList)
