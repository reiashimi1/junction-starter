"use client";

import * as React from "react";
import { LineChart } from "@mui/x-charts";
import PieChartDashboard from "@/views/merchant/PieChartDashboard";
import LineChartDashboard from "@/views/merchant/LineChartDashboard";
import Stack from "@mui/material/Stack";
import Layout from "@/layouts/MerchantLayout/Layout";
import { StackedLineChart } from "@mui/icons-material";
import Statistic from "@/components/dashboard/Statistic";
import { amountFormatter } from "@/helpers/functions";
import withAuth from "@/helpers/auth/merchantWrapper";

const series = [
  {
    type: "bar",
    stack: "",
    yAxisKey: "eco",
    data: [2, 5, 3, 4, 1],
  },
  {
    type: "bar",
    stack: "",
    yAxisKey: "eco",
    data: [5, 6, 2, 8, 9],
  },
  {
    type: "line",
    yAxisKey: "pib",
    color: "red",
    data: [1000, 1500, 3000, 5000, 10000],
  },
];

const DashboardView = () => {
  return (
    <Layout>
      <div className="flex flex-col pt-24 pb-8 px-4 sm:mx-2">
        <div className="flex mb-2 ml-8">
          <div className="text-3xl font-bold text-white">Admin Dashboard</div>
        </div>
        <div className="bg-gradient-to-b from-slateBlue-500 to-darkSlateBlue-500 p-4 rounded-xl">
          <div className="mb-2 flex items-center justify-center text-xl text-slate-800 font-semibold space-x-2">
            <StackedLineChart />
            <div>Orders and sales</div>
          </div>
          <div className="flex sm:flex-row flex-col items-center justify-center sm:space-x-4 sm:space-y-0 space-y-2 py-4">
            <Statistic label="Total stations" value={10} greenBgColor />
            <Statistic label="Total sales" value={12} greenBgColor />
            <Statistic
              label="Total revenue"
              value={amountFormatter(200)}
              greenBgColor
            />
          </div>
        </div>
        <div className="my-4 bg-gradient-to-b from-slateBlue-500 to-darkSlateBlue-500 p-4 rounded-xl shadow-xl">
          <LineChartDashboard />
        </div>
        <div className="bg-gradient-to-b from-slateBlue-500 to-darkSlateBlue-500 py-2 flex items-center justify-center mb-2">
          <PieChartDashboard />
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(DashboardView);
