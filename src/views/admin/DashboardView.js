"use client";

import Layout from "@/layouts/AdminLayout/Layout";
import * as React from "react";
import Statistic from "@/components/dashboard/Statistic";
import withAuth from "@/helpers/auth/adminWrapper";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import { amountFormatter } from "@/helpers/functions";
import { BarChart, TableChart, StackedLineChart } from "@mui/icons-material";

const DashboardView = () => {
  const [statistics, setStatistics] = useState("");
  const dispatch = useDispatch();

  const getStatistics = () => {
    dispatch(showLoader("Please wait..."));
    API.get("/api/admin/dashboard")
      .then((response) => {
        setStatistics(response.data);
      })
      .catch(() => dispatch(showErrorToast("Could not get dashboard data")))
      .finally(() => dispatch(hideLoader()));
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col pt-28 pb-8">
        <div className="flex mb-2 ml-8">
          <div className="text-3xl font-bold text-white">Admin Dashboard</div>
        </div>
        <div className="bg-gradient-to-b from-slateBlue-500 to-darkSlateBlue-500 mx-5 p-3 rounded-xl">
          <div className="mb-2 flex items-center justify-center text-xl text-slate-800 font-semibold space-x-2">
            <StackedLineChart />
            <div>Orders and sales</div>
          </div>
          <div className="flex sm:flex-row flex-col items-center justify-center sm:space-x-4 sm:space-y-0 space-y-2 py-4">
            <Statistic
              label="Total orders"
              value={statistics?.totalOrders}
              greenBgColor={statistics?.totalOrders > 0}
            />
            <Statistic
              label="Total sales"
              value={statistics?.totalSales}
              greenBgColor={
                statistics?.totalSales >= statistics?.totalOrders / 2
              }
            />
            <Statistic
              label="Total revenue"
              value={amountFormatter(statistics?.totalRevenue)}
              greenBgColor={statistics?.totalRevenue > 0}
            />
          </div>
        </div>
        <div className="bg-gradient-to-b from-slateBlue-500 to-darkSlateBlue-500 mx-5 p-3 rounded-xl my-12">
          <div className="mb-2 flex items-center justify-center text-xl text-slate-800 font-semibold space-x-2">
            <BarChart />
            <div>Users</div>
          </div>
          <div className="flex sm:flex-row flex-col items-center justify-center sm:space-x-4 sm:space-y-0 space-y-2 py-4">
            <Statistic
              label="Total users"
              value={statistics?.totalUsers}
              greenBgColor={statistics?.totalUsers > 0}
            />
            <Statistic
              label="Users logged in today"
              value={statistics?.usersLoggedInToday}
              greenBgColor={
                statistics?.usersLoggedInToday >= statistics?.totalUsers
              }
            />
          </div>
        </div>
        <div className="bg-gradient-to-b from-slateBlue-500 to-darkSlateBlue-500 mx-5 p-3 rounded-xl">
          <div className="mb-2 flex items-center justify-center text-xl text-slate-800 font-semibold space-x-2">
            <TableChart />
            <div>Our statistics</div>
          </div>
          <div className="flex sm:flex-row flex-col items-center justify-center sm:space-x-4 sm:space-y-0 space-y-2 py-4">
            <Statistic
              label="Total categories"
              value={statistics?.totalCategories}
              greenBgColor={statistics?.totalCategories > 0}
            />
            <Statistic
              label="Total products"
              value={statistics?.totalProducts}
              greenBgColor={statistics?.totalProducts > 0}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardView;
