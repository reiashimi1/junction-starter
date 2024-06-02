import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, AccountCircle, KeyboardVoiceSharp } from "@mui/icons-material";

const BottomMenu = ({ changeScreen }) => {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        changeScreen(newValue);
      }}
      showLabels
      className="fixed bottom-0 left-0 right-0"
      sx={{ backgroundColor: "white" }}
    >
      <BottomNavigationAction label="Charge" icon={<Home />} />
      <BottomNavigationAction label="Voice" icon={<KeyboardVoiceSharp />} />
      <BottomNavigationAction label="Account" icon={<AccountCircle />} />
    </BottomNavigation>
  );
};

export default BottomMenu;
