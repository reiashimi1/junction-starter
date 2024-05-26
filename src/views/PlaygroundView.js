"use client";

import Roulette from "@/core/Roulette";
import ProgressBar from "@/core/ProgressBar";

const PlaygroundView = () => {
  return (
    <div className="text-5xl flex flex-col items-center justify-center text-white">
      <div>PLAYGROUND</div>
      <div className="flex flex-col items-center w-auto">
        <Roulette airlineId="123" />
        <ProgressBar airlineId="1" />
      </div>
    </div>
  );
};

export default PlaygroundView;
