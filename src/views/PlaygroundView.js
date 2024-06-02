"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const PlaygroundView = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        borderRadius: "15px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div className="text-2xl flex flex-col items-center justify-center">
        <span className="mb-2">Spin to Win </span>
        <Divider />
        <div className="flex flex-col items-center justify-center">
          {/*<Roulette airlineId="123" />*/}
          test
        </div>
        <NotificationsActiveIcon />
        <span className="mb-2" style={{ fontSize: "14px" }}>
          Participate in our Spin to win challenge and win up to 20% discount in
          your next charging session. Spin every day to win points and
          discounts. <span style={{ fontWeight: "bold" }}>Try your luck!</span>
        </span>
      </div>
    </Box>
  );
};

export default PlaygroundView;
