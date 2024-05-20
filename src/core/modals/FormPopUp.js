import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Close } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormPopUp = ({
  children,
  title,
  open,
  setOpen,
  submitButtonText,
  handleSubmit,
  submitButtonColor = "secondary",
  icon,
  isButtonDisabled = false,
  maxWidth = "sm",
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth={maxWidth}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <div className="flex items-center justify-between space-x-4">
            <Button
              variant="outlined"
              color="warning"
              onClick={handleClose}
              className="flex-1"
            >
              <Close className="mr-2" />
              Close
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              color={submitButtonColor}
              disabled={isButtonDisabled}
              className="flex-1"
            >
              <span className="mr-3">{!!icon && icon}</span>
              {submitButtonText}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormPopUp;
