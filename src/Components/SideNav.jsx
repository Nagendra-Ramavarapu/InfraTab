import React from "react";
//import BankIcon from "../Icons/BankIcon";
import BankIcon from "@material-ui/icons/AccountBalance";
import {
  ListItemIcon,
  ListItem,
  ListItemText,
  List,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  SideNavDiv: {
    maxWidth: "13vw",
    minWidth: "13vw",
    minHeight: "100VH",
    background: "#02151fde",
  },
  ListItems: {
    display: "flex",
    width: "13vw",
    color: "#c7c7c7",
  },
  ListItemIcon: {
    minWidth: 0,
    marginRight: 5,
  },
  ListItemText: {
    fontSize: 10,
    marginBottom: 0,
  },
  bankIcon: {
    color: "#c7c7c7",
    width: 20,
    height: 20,
    marginTop: 3,
  },
}));

const SideNav = () => {
  const classes = styles();
  const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 1024px)");
  const SideNavItems = [
    {
      name: "BANKS",
      icon: <BankIcon className={classes.bankIcon} />,
    },
  ];
  return (
    <div className={classes.SideNavDiv}>
      <List>
        {SideNavItems.map((items) => (
          <ListItem button key={items.name} className={classes.ListItems}>
            <ListItemIcon className={classes.ListItemIcon}>
              {items.icon}
            </ListItemIcon>
            {!isMobile && (
              <ListItemText className={classes.ListItemText}>
                {items.name}
              </ListItemText>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SideNav;
