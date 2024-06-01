"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { id: 0, value: 10, label: "series A", color: "aliceblue" },
  { id: 1, value: 50, label: "series B", color: "orange" },
  { id: 2, value: 20, label: "series C", color: "blue" },
];

const PieChartDashboard = () => {
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          cornerRadius: 10,
        },
      ]}
      height={300}
    />
  );
};

export default PieChartDashboard;
