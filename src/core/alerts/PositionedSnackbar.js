import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { useState, useEffect } from "react";

const PositionedSnackbar = ({
  message = null,
  initialPosition = { open: false, vertical: "top", horizontal: "right" },
  onClear,
  success,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const { vertical, horizontal, open } = position;

  const handleClick = () => {
    setPosition({ ...initialPosition, open: true });
  };

  const handleClose = () => {
    setPosition({ ...initialPosition, open: false });
    onClear("");
  };

  useEffect(() => {
    message && handleClick();
  }, [message]);

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{
          vertical: initialPosition.vertical,
          horizontal: initialPosition.horizontal,
        }}
        open={open}
        onClose={handleClose}
        message={message}
        autoHideDuration={4000}
        key={vertical + horizontal}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: success ? "#03bb39" : "#e01111",
            textAlign: "center",
            display: "flex",
            rounded: "10px",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />
    </Box>
  );
};

export default PositionedSnackbar;
