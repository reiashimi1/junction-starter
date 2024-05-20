import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ErrorOutline } from "@mui/icons-material";

const ErrorPopUp = ({ title, buttonText, message, isOpen, onClose }) => {
  const handleSuccess = () => {
    onClose(false);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <ErrorOutline color="error" />
          <span className="ml-2 text-red-700">{title}</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccess} autoFocus>
              {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ErrorPopUp;
