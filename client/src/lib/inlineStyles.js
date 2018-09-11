export const styles = theme => ({
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
    minWidth: 300
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
  },
  ticket: {
    minWidth: 300,
    height: 450,
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: 30
  },
  ticketRoot: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2,
    margin: 30
  },
  ticketImage: {
    width: 128,
    height: 128
  },
  ticketImg: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  divider: {
    margin: 20
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})
