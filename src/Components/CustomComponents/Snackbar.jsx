import React from "react";
import MaterialUISnackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const CustomAlert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
const AppSnackbar = (props) => {
  const [openSnackbar, setopenSnackbar] = React.useState(true);

  const handleCloseSnackbar = () => {
    setopenSnackbar(false);
    props.snackbarHadlerToUpdateParent(false);
  };
  return (
    <MaterialUISnackbar
      open={openSnackbar}
      autoHideDuration={props.autoHideDuration}
      anchorOrigin={{
        vertical: props.verticalPosition,
        horizontal: props.horizontalPosition,
      }}
      onClose={handleCloseSnackbar}
    >
      <CustomAlert onClose={handleCloseSnackbar} severity={props.AlertType}>
        {props.Message}
      </CustomAlert>
    </MaterialUISnackbar>
  );
};

export default AppSnackbar;
