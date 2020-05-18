import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  HeaderDiv: {
    display: "flex",
    height: "7vh",
  },
  Logo: {
    maxWidth: "13vw",
    minWidth: "13vw",
    background: "#59b99afc",
  },
  AppToolbar: {
    width: "87vw",
    background: "#02151fde",
  },
}));
const Header = () => {
  const classes = styles();
  return (
    <div className={classes.HeaderDiv}>
      <div className={classes.Logo}></div>
      <div className={classes.AppToolbar}></div>
    </div>
  );
};

export default Header;
