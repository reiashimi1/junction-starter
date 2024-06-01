import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";

export default function PaymentMethods() {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <Stack direction="row" spacing={3}>
      <Chip
        color="primary"
        sx={{ fontSize: '1.2rem', height: 40 }}
        label="Credit Card"
        avatar={<Avatar alt="Credit Card" src="Credit Card" />}
        variant="outlined"
        onClick={handleClick}
      />
      <Chip
        color="primary"
        sx={{ fontSize: '1.2rem', height: 40 }}
        avatar={<Avatar alt="PayPal" src="PayPal" />}
        label="PayPal"
        variant="outlined"
        onClick={handleClick}
      />
      <Chip
        color="primary"
        sx={{ fontSize: '1.2rem', height: 40 }}
        avatar={<Avatar alt="POK" src="POK" />}
        label="POK"
        variant="outlined"
        onClick={handleClick}
      />
    </Stack>
  );
}
