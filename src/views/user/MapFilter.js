import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import SimplePopUp from "@/core/modals/SimplePopUp";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";

import {
  Dock,
  DockOutlined,
  ElectricalServices,
  EvStation,
  Power,
} from "@mui/icons-material";
import { useState } from "react";

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 14,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 16,
  },
});

const CustomizedList = () => {
  const [open, setOpen] = useState(false);
  const connectors = [
    { name: "CCS", icon: <Power /> },
    { name: "CHAdeMO", icon: <EvStation /> },
    { name: "Tesla", icon: <Dock /> },
    { name: "NEMA 14-50", icon: <DockOutlined /> },
    { name: "NEMA 5-20", icon: <ElectricalServices /> },
  ];
  return (
    <Box>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(31,73,166)" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 260 }}>
          <FireNav component="nav" disablePadding>
            <Box
              sx={{
                bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
                pb: open ? 1 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 2,
                  pt: 1.5,
                  pb: open ? 0 : 1.5,
                  "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary="Filter"
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                  }}
                  secondary="Location, price, charger type ..."
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? "rotate(-180deg)" : "rotate(0)",
                    transition: "0.2s",
                  }}
                />
              </ListItemButton>
              {open && (
                <SimplePopUp open={open} setOpen={setOpen}>
                  <div>
                    <div>
                      <FormControl className="ml-2">
                        <FormLabel
                          id="demo-row-radio-buttons-group-label "
                          sx={{ marginLeft: 2 }}
                        >
                          Charger type
                        </FormLabel>
                        <RadioGroup
                          sx={{ marginLeft: 1 }}
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="all"
                            control={<Radio />}
                            label="All"
                          />
                          <FormControlLabel
                            value="normal"
                            control={<Radio />}
                            label="Normal Charger"
                          />
                          <FormControlLabel
                            value="Fast"
                            control={<Radio />}
                            label="Fast Charger"
                          />
                        </RadioGroup>
                        <Divider className="mt-4 mb-4" />
                        <FormLabel
                          id="demo-row-radio-buttons-group-label "
                          sx={{ marginLeft: 2 }}
                        >
                          Availability
                        </FormLabel>
                        <RadioGroup sx={{ marginLeft: 1 }}>
                          <FormControlLabel
                            value="all"
                            control={<Radio />}
                            label="All"
                          />
                          <FormControlLabel
                            value="available"
                            control={<Radio />}
                            label="Available"
                          />
                          <FormControlLabel
                            value="busy"
                            control={<Radio />}
                            label="Busy"
                          />
                        </RadioGroup>
                        <Divider className="mt-4 mb-4" />
                        <Box component="section" sx={{ p: 2, border: "grey" }}>
                          <FormLabel id="demo-row-radio-buttons-group-label ">
                            Power (kW)
                            <Slider
                              aria-label="Energy"
                              defaultValue={0}
                              shiftStep={10}
                              step={5}
                              marks
                              min={0}
                              valueLabelDisplay="auto"
                              max={50}
                            />
                          </FormLabel>
                        </Box>
                        <Divider className="mt-4 mb-4" />
                        <FormLabel
                          id="demo-row-radio-buttons-group-label "
                          sx={{ marginLeft: 2 }}
                        >
                          Connector Type{" "}
                        </FormLabel>
                        <Box sx={{ padding: 1, marginTop: "10px" }}>
                          <Grid container spacing={1}>
                            {connectors.map((connector, index) => (
                              <Grid item key={index}>
                                <Paper
                                  sx={{
                                    backgroundColor: "blue",
                                    paddingLeft: 1,
                                    paddingRight: 1,
                                    textAlign: "center",
                                  }}
                                >
                                  {connector.icon}
                                  <div>{connector.name}</div>
                                </Paper>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </FormControl>
                    </div>
                  </div>
                </SimplePopUp>
              )}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default CustomizedList;
