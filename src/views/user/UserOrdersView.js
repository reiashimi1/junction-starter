"use client";

import Layout from "@/layouts/UserLayout/Layout";
import DataTable from "@/core/DataTable";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import withAuth from "@/helpers/auth/userWrapper";
import { IconButton, Tooltip } from "@mui/material";
import { ChangeCircle, Visibility } from "@mui/icons-material";
import {
  amountFormatter,
  dateFormatter,
  OrderStatusBadge,
} from "@/helpers/functions";
import { useRouter } from "next/navigation";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import CancelOrderPopUp from "@/components/orders/CancelOrderPopUp";

const UserOrdersView = () => {
  const [orders, setOrders] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [updated, setUpdated] = useState(0);
  const [openChangeStatusPopUp, setOpenChangeStatusPopUp] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const dispatch = useDispatch();
  const router = useRouter();

  const changeStatus = (row) => {
    setSelectedRow(row);
    setOpenChangeStatusPopUp(true);
  };

  const viewDetails = (row) => {
    dispatch(showLoader("Please wait"));
    router.push(`/user/orders/${row.id}`);
  };

  const columns = [
    {
      field: "address",
      headerName: "Address",
      minWidth: 100,
      maxWidth: 200,
      sortable: true,
      disableColumnMenu: false,
    },
    {
      field: "zip_code",
      headerName: "ZIP code",
      minWidth: 80,
      maxWidth: 120,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "total_amount",
      headerName: "Total amount",
      minWidth: 100,
      maxWidth: 150,
      sortable: true,
      disableColumnMenu: false,
      valueGetter: (params) => amountFormatter(params.row.total_amount, "CAD"),
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      minWidth: 120,
      maxWidth: 180,
      sortable: true,
      disableColumnMenu: true,
      renderCell: (params) =>
        params.row.payment_method === "cash" ? (
          <div>Cash on delivery</div>
        ) : (
          <div>Payment on card</div>
        ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      maxWidth: 180,
      sortable: true,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex justify-end">
          <OrderStatusBadge status={params.row.status} />
        </div>
      ),
    },
    {
      field: "created_at",
      headerName: "Created",
      minWidth: 80,
      maxWidth: 150,
      sortable: true,
      disableColumnMenu: true,
      valueGetter: (params) => dateFormatter(params.row.created_at),
    },
    {
      field: "delivery_time",
      headerName: "Delivery Time",
      minWidth: 100,
      maxWidth: 150,
      sortable: true,
      disableColumnMenu: true,
      valueGetter: (params) => dateFormatter(params.row.delivery_time),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      maxWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex justify-end items-end">
          <Tooltip title="View details" arrow>
            <IconButton onClick={() => viewDetails(params.row)}>
              <Visibility className="text-blue-800" />
            </IconButton>
          </Tooltip>
          {params.row.status.toLowerCase() === "pending" && (
            <Tooltip title="Cancel order" arrow>
              <IconButton onClick={() => changeStatus(params.row)}>
                <ChangeCircle className="text-red-800" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  const updateData = () => {
    setUpdated((prevState) => prevState + 1);
  };

  const getOrders = (params) => {
    dispatch(showLoader("Please wait..."));
    API.get("/api/user/my-orders", { params })
      .then((response) => {
        const orders = response.data.data;
        setOrders(orders);
        setTotalCount(response.data.meta.total);
      })
      .catch(() => dispatch(showErrorToast("Could not get orders")))
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center pt-28">
        <div className="text-white text-xl font-semibold ml-8">My Orders</div>
        <div className="bg-slate-100 p-4 mx-4 my-2 rounded-xl">
          <div className="p-3 mt-2">
            <DataTable
              allowCheckboxSelection={false}
              rows={orders}
              columns={columns}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              getData={getOrders}
              dependencies={[updated]}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
      <CancelOrderPopUp
        changeStatusPopUp={openChangeStatusPopUp}
        setChangeStatusPopUp={setOpenChangeStatusPopUp}
        selectedOrder={selectedRow}
        onSuccess={updateData}
      />
    </Layout>
  );
};

export default withAuth(UserOrdersView);
