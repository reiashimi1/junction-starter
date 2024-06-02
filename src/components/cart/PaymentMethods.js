import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";

const PaymentMethods = ({ selectedMethod, setSelectedMethod }) => {
  const handleClick = (method) => {
    setSelectedMethod(method);
  };

  return (
    <Stack direction="row" spacing={3}>
      <Chip
        color="primary"
        sx={{ fontSize: "1.2rem", height: 40 }}
        label="Credit Card"
        avatar={<Avatar alt="Credit Card" src="Credit Card" />}
        variant={selectedMethod !== "credit" ? "outlined" : "contained"}
        onClick={() => handleClick("credit")}
      />
      <Chip
        color="primary"
        sx={{ fontSize: "1.2rem", height: 40 }}
        avatar={<Avatar alt="PayPal" src="PayPal" />}
        label="PayPal"
        variant={selectedMethod !== "PayPal" ? "outlined" : "contained"}
        onClick={() => handleClick("PayPal")}
      />
      <Chip
        color="primary"
        sx={{ fontSize: "1.2rem", height: 40 }}
        avatar={<Avatar alt="POK" src="POK" />}
        label="POK"
        variant={selectedMethod !== "POK" ? "outlined" : "contained"}
        onClick={() => handleClick("POK")}
      />
    </Stack>
  );
};

export default PaymentMethods;
