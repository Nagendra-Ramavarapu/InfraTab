import React, { useState } from "react";
import { MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  DesktopDropdown: {
    width: "10vw",
    minHeight: 24,
    maxHeight: 24,
    fontSize: 12,
    color: "#b9aeae",
    fontWeight: 600,
    marginRight: 10,
  },
  MobileDropdown: {
    width: "30vw",
    minHeight: 24,
    maxHeight: 24,
    fontSize: 12,
    color: "#b9aeae",
    fontWeight: 600,
    marginLeft: 5,
    marginRight: 10,
  },
  NativeDropDown: {
    fontSize: 12,
    color: "#b9aeae",
  },
}));
const DropDown = (props) => {
  const classes = styles();
  let isMobile = useMediaQuery("(min-width: 320px) and (max-width: 600px)");
  const [Options, setOptions] = useState(false);
  const [CurrentItem, setCurrentItem] = useState(props.DefaultValue);
  const [DropdownOptions, setDropdownOptions] = useState(props.DropdownOptions);
  const [DropdownType, setDropdowntype] = useState(props.DropdownType);

  const OnItemSelect = (item) => {
    setCurrentItem(item);
    setOptions(false);
    props.handlerToUpdateDropDownParent(DropdownType, item);
  };
  return (
    <Select
      open={Options}
      onClose={() => setOptions(false)}
      onOpen={() => setOptions(true)}
      value={CurrentItem && CurrentItem}
      className={
        isMobile
          ? props.NativeDropDown
            ? classes.NativeDropDown
            : classes.MobileDropdown
          : props.NativeDropDown
          ? classes.NativeDropDown
          : classes.DesktopDropdown
      }
      onChange={(e) => setCurrentItem(e.target.value)}
    >
      {DropdownOptions &&
        DropdownOptions.map((option, index) => (
          <MenuItem
            value={option}
            key={index}
            onClick={(e) => OnItemSelect(option)}
          >
            {option}
          </MenuItem>
        ))}
    </Select>
  );
};

export default DropDown;
