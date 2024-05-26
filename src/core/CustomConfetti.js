import Confetti from "react-confetti";
import React from "react";
import useScreenSize from "@/hooks/useScreenSize";

const CustomConfetti = ({ duration = 5000, load, render = true }) => {
  const screenSize = useScreenSize();

  return (
    render && (
      <Confetti
        width={screenSize.offsetWidth}
        height={screenSize.offsetHeight}
        tweenDuration={duration}
        run={load}
        style={{ zIndex: "10" }}
      />
    )
  );
};

export default CustomConfetti;