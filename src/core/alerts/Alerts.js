import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const SuccessAlert = ({ message }) => (
  <Stack sx={{ width: "100%" }} spacing={2}>
    <Alert severity="success">This is a success Alert.</Alert>
  </Stack>
);

export const InfoAlert = ({ message }) => (
  <Stack sx={{ width: "100%" }} spacing={2}>
    <Alert severity="info">This is an info Alert.</Alert>
  </Stack>
);

export const WarningAlert = ({ message }) => (
  <Stack sx={{ width: "100%" }} spacing={2}>
    <Alert severity="warning">This is a warning Alert.</Alert>
  </Stack>
);

export const ErrorAlert = ({ message }) => (
  <Stack sx={{ width: "100%" }} spacing={2}>
    <Alert severity="error">This is an error Alert.</Alert>
  </Stack>
);
