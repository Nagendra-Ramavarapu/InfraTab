import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Table from "./Table";
import DropDown from "./CustomComponents/DropDown";
import Snackbar from "./CustomComponents/Snackbar";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SearchIcon from "@material-ui/icons/Search";
import Finder from "./Finder";
import {
  IconButton,
  Input,
  InputAdornment,
  useMediaQuery,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  HomeDiv: {
    width: "84vw",
    minHeight: "85vh",
    background: "white",
    margin: 15,
    boxShadow: "1px 2px 3px grey",
  },
  HomeDivMobile: {
    maxWidth: "79vw",
    minHeight: "85vh",
    overflowY: "scroll",
    background: "white",
    margin: 15,
    boxShadow: "1px 2px 3px grey",
  },
  table: {
    borderSpacing: 0,
    width: "83vw",
    marginTop: 20,
    padding: 2,
  },
  header: {
    margin: 0,
    padding: 12,
    fontSize: 18,
    width: "33vw",
    fontWeight: 500,
  },
  TableToolbar: {
    display: "flex",
    float: "right",
    marginTop: 5,
  },
  TableToolbarMobile: {
    marginTop: 5,
    //display: "",
    // float: "left",
  },
  searchBar: {
    marginRight: 5,
    height: 24,
  },
  searchBarMobile: {
    // marginTop: 20,
    // marginLeft: 10,
    height: 24,
  },
  ProgressBar: {
    marginLeft: "45%",
    marginTop: "10%",
  },
  Pagination: {
    marginRight: 20,
    marginBottom: 20,
  },
}));
const Home = () => {
  const classes = styles();
  const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 1024px)");
  const [TableData, setTableData] = useState();
  const [CurrentBankData, setCurrentBankData] = useState();
  const [startIndex, setstartIndex] = useState(1);
  const [endIndex, setendIndex] = useState(10);
  const [DataLenth, setDataLength] = useState();
  const [SearchValue, setSearchValue] = useState("");
  const [DataReceived, setDataReceived] = useState(false);
  const [PageSize, setPageSize] = useState(10);
  const [category, setcategory] = useState("Select category");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [ActionType, setActionType] = useState("");

  const Cities = [
    "Select city",
    "Hyderabad",
    "Bangalore",
    "Delhi",
    "Mumbai",
    "Pune",
  ];
  const BankOptions = [
    "Select category",
    "bank_name",
    "ifsc",
    "branch",
    "bank_id",
  ];
  const PageSizes = [10, 20, 30];

  useEffect(() => {
    axios
      .get("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then((res) => {
        setTableData(res.data);
        setCurrentBankData(res.data);
        setDataLength(res.data.length);
        setDataReceived(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const onLeftNav = () => {
    if (startIndex !== 1) {
      setstartIndex((prev) => prev - PageSize);
      setendIndex((prev) => prev - PageSize);
    }
  };
  const onRightNav = () => {
    if (endIndex !== DataLenth) {
      setstartIndex((prev) =>
        prev + PageSize >= DataLenth ? DataLenth : prev + PageSize
      );
      setendIndex((prev) =>
        prev + PageSize >= DataLenth ? DataLenth : prev + PageSize
      );
    }
  };

  const setSearchResults = useRef(
    debounce((value, CurrentBankData, category) => {
      setTableData(Finder(CurrentBankData, category, value));
    }, 1000)
  ).current;

  const onChangeSearchValue = (value) => {
    setSearchValue(value);
    if (category !== "Select category") {
      setSearchResults(value, CurrentBankData, category);
    } else {
      setSnackbarMessage("select category");
      setAlertType("error");
      setActionType("error");
      setOpenSnackbar(true);
    }
  };

  const handlerToUpdateDropDownParent = (DropdownType, value) => {
    DropdownType === "category" && setcategory(value);
    if (DropdownType === "PageSize") {
      setendIndex(value);
      setPageSize(value);
    }
  };
  const snackbarHadlerToUpdateParent = (type) => {
    setOpenSnackbar(type);
  };

  return (
    <div className={isMobile ? classes.HomeDivMobile : classes.HomeDiv}>
      <div>
        <span className={classes.header}>Banks</span>
        <div className={classes.TableToolbar}>
          <DropDown
            DefaultValue="Select city"
            DropdownOptions={Cities}
            DropdownType="city"
          />
          <DropDown
            DefaultValue="Select category"
            DropdownOptions={BankOptions}
            DropdownType="category"
            handlerToUpdateDropDownParent={handlerToUpdateDropDownParent}
          />
          <Input
            className={classes.searchBar}
            value={SearchValue}
            onChange={(e) => onChangeSearchValue(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon style={{ color: "#b9aeae" }} />
              </InputAdornment>
            }
          />
        </div>
      </div>
      {DataReceived && TableData ? (
        <Fragment>
          <table className={classes.table}>
            <tbody>{Table(startIndex, endIndex, TableData)}</tbody>
          </table>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              marginTop: 20,
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 12 }}>
                {startIndex}-{endIndex} of {DataLenth}
              </span>
              <IconButton style={{ padding: 3 }} onClick={onLeftNav}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton style={{ padding: 3 }} onClick={onRightNav}>
                <ChevronRightIcon />
              </IconButton>
            </div>
            <div className={classes.Pagination}>
              <span style={{ fontSize: 12 }}>Row per pages:</span>
              <DropDown
                DefaultValue={10}
                DropdownOptions={PageSizes}
                DropdownType="PageSize"
                handlerToUpdateDropDownParent={handlerToUpdateDropDownParent}
                NativeDropDown={true}
              />
            </div>
          </div>
          {openSnackbar && (
            <Snackbar
              Message={snackbarMessage}
              AlertType={alertType}
              verticalPosition="top"
              horizontalPosition="right"
              autoHideDuration={3000}
              snackbarHadlerToUpdateParent={snackbarHadlerToUpdateParent}
            />
          )}
        </Fragment>
      ) : (
        <div className={classes.ProgressBar}>
          <CircularProgress size={30} />
        </div>
      )}
    </div>
  );
};

export default Home;
