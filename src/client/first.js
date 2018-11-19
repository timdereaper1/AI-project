import React from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import backgroundImg from "./assets/firs.jpg";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button";
const styles = theme => ({
  body: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  titlecontent: {
    display: "flex",
    fontFamily: "Lucida Calligraphy",
    color: "white",
    flexDirection: "column"
  },
  content: {
    color: "white",
    textAlign: "center"
  },

  button: {
    margin: theme.spacing.unit,
    color: "#021B5E",
    borderColor: "#021B5E",
    fontWeight: 510
  },
  buttonContainer: {}
});

const Body = ({ classes }) => {
  return (
    <div className={classes.body}>
      <Typography className={classes.titlecontent} variant={"h3"}>
        Welcome
      </Typography>
      <Typography className={classes.content} variant={"p"}>
        Welcome to the new and improved Essay Grading System. An innovative
        solution to grading essays
      </Typography>

      <div className={classes.buttonContainer}>
        <Button variant="outlined" className={classes.button}>
          CLICK TO PROCEED
        </Button>
      </div>
    </div>
  );
};
export default withStyles(styles)(Body);

/*
<div className={classes.content}>
  <Typography className={classes.landingHeaderText} variant={"h3"} color={"inherit"}>
    Natural language to code in Real-time
                </Typography>*/
