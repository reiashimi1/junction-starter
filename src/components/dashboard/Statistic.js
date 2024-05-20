import * as React from "react";

const Statistic = ({ label, value, greenBgColor = false, textColor }) => {
  return (
    <div
      className={`${greenBgColor ? "bg-green-400" : "bg-yellow-400"} ${textColor} p-4 rounded-md flex flex-1 flex-col items-center w-full max-w-xs`}
    >
      <p className="text-xl font-semibold mb-2 text-darkSlateBlue-900">{label}</p>
      <p className="text-4xl font-bold text-darkSlateBlue-800">{value}</p>
    </div>
  );
};

export default Statistic;
