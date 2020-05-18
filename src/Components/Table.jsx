import React from "react";
//import FavoriteIcon from "../Icons/FavoriteIcon";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const classes = {
  table: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#80808069",
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
    padding: 8,
    fontSize: 12,
  },
  tableHeader: {
    color: "#b9aeae",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#80808069",
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
    padding: 8,
    fontSize: 12,
  },
  BankIdColumn: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#80808069",
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
    padding: 8,
    fontSize: 12,
    minWidth: "4vw",
    maxWidth: "4vw",
  },
};
const Table = (startIndex, endIndex, BanksData) => {
  const TableHeaders = [" ", "Bank", "IFSC", "Branch", "Bank ID", "Address"];
  let TableData = [];
  let HeaderData = [];
  for (let header = 0; header < TableHeaders.length; header++) {
    HeaderData.push(
      <td key={header} style={classes.tableHeader}>
        {TableHeaders[header]}
      </td>
    );
  }
  TableData.push(<tr>{HeaderData}</tr>);
  for (let row = startIndex - 1; row < endIndex + 1; row++) {
    let ColumnData = [];
    if (BanksData.length < row) break;
    for (let col = 0; col < 6; col++) {
      switch (col) {
        case 0:
          ColumnData.push(
            <td key={(row, "+", col)} style={classes.table}>
              {<StarBorderIcon style={{fill: "#e6ba06"}} />}
            </td>
          );
          break;
        case 1:
          ColumnData.push(
            <td key={(row, "+", col)} style={classes.table}>
              {BanksData[row].bank_name}
            </td>
          );
          break;
        case 2:
          ColumnData.push(
            <td key={(row, "+", col)} style={classes.table}>
              {BanksData[row].ifsc}
            </td>
          );
          break;
        case 3:
          ColumnData.push(
            <td key={(row, "+", col)} style={classes.table}>
              {BanksData[row].branch}
            </td>
          );
          break;
        case 4:
          ColumnData.push(
            <td key={(row, "+", col)} style={classes.BankIdColumn}>
              {BanksData[row].bank_id}
            </td>
          );
          break;
        case 5:
          ColumnData.push(
            <td key={(row, "+", col)} style={classes.table}>
              {BanksData[row].address}
            </td>
          );
          break;
        default:
          console.log("Error Occured in Table");
      }
    }
    TableData.push(<tr key={row}>{ColumnData}</tr>);
  }

  return TableData;
};

export default Table;
