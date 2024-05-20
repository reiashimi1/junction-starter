"use client";

import withAuth from "@/helpers/auth/adminWrapper";
import Layout from "@/layouts/AdminLayout/Layout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import {
  amountFormatter,
  dateFormatter,
  isObjectEmpty,
  OrderStatusBadge,
  ActiveStatusBadge,
} from "@/helpers/functions";
import { IconButton, Tooltip } from "@mui/material";
import { ChangeCircle, Visibility } from "@mui/icons-material";
import API from "@/helpers/APIServices/API";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import DataTable from "@/core/DataTable";
import RowData from "@/components/admin/RowData";
import BackButton from "@/core/buttons/BackButton";
import ChangeUserStatusPopUp from "@/components/users/ChangeUserStatusPopUp";
import ChangeOrderStatusPopUp from "@/components/orders/ChangeOrderStatusPopUp";
import SubmitButton from "@/core/buttons/SubmitButton";
import * as React from "react";

const UserDetailView = ({ userId }) => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [updated, setUpdated] = useState(0);
  const [openChangeOrderStatusPopUp, setOpenChangeOrderStatusPopUp] =
    useState(false);
  const [openChangeUserStatusPopUp, setOpenChangeUserStatusPopUp] =
    useState(false);
  // const [totalCount, setTotalCount] = useState(0);

  const dispatch = useDispatch();
  const router = useRouter();

  const columns = [
    {
      field: "address",
      headerName: "Address",
      width: 150,
      sortable: true,
      disableColumnMenu: false,
    },
    {
      field: "zip_code",
      headerName: "ZIP code",
      width: 120,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "total_amount",
      headerName: "Total amount",
      width: 150,
      sortable: true,
      disableColumnMenu: false,
      valueGetter: (params) => amountFormatter(params.row.total_amount, "CAD"),
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      width: 150,
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
      width: 120,
      sortable: true,
      disableColumnMenu: true,
      renderCell: (params) => <OrderStatusBadge status={params.row.status} />,
    },
    {
      field: "created_at",
      headerName: "Created",
      width: 120,
      sortable: true,
      disableColumnMenu: true,
      valueGetter: (params) => dateFormatter(params.row.created_at),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex justify-end items-end">
          <Tooltip title="View details" arrow>
            <IconButton onClick={() => viewOrderDetails(params.row)}>
              <Visibility className="text-blue-800" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Change status" arrow>
            <IconButton onClick={() => changeOrderStatus(params.row)}>
              <ChangeCircle className="text-green-800" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const changeOrderStatus = (row) => {
    setSelectedRow(row);
    setOpenChangeOrderStatusPopUp(true);
  };

  const viewOrderDetails = (row) => {
    dispatch(showLoader("Please wait"));
    router.push(`/admin/orders/${row.id}`);
  };

  const changeUserStatus = () => {
    setOpenChangeUserStatusPopUp(true);
  };

  const updateData = () => {
    setUpdated((prevState) => prevState + 1);
  };

  const getOrders = (params = {}) => {
    // if (!!userId) {
    //   dispatch(showLoader("Please wait..."));
    //   API.get(`/api/admin/orders/user/${userId}`, { params })
    //     .then((response) => {
    //       const orders = response.data.data;
    //       setOrders(orders);
    //       setTotalCount(response.data.meta.total);
    //     })
    //     .catch(() => dispatch(showErrorToast("Could not get orders")))
    //     .finally(() => dispatch(hideLoader()));
    // }
  };

  const getUser = () => {
    if (!!userId) {
      dispatch(showLoader("Please wait..."));
      API.get(`/api/admin/users/${userId}`)
        .then((response) => {
          const user = response.data.data;
          setUser(user);
          setOrders(user.orders);
        })
        .catch(() => dispatch(showErrorToast("Could not get user data")))
        .finally(() => dispatch(hideLoader()));
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <Layout>
      <div className="flex flex-col py-28 px-4 sm:mx-2">
        <BackButton className="ml-4" />
        {!isObjectEmpty(user) && (
          <>
            <div className="text-white text-xl font-semibold ml-4 pb-2 text-center mt-4">
              User details
            </div>
            <div className="flex flex-col bg-slate-200 p-4 rounded-xl shadow-md sm:space-y-8">
              <div className="flex lg:flex-row flex-col lg:justify-around lg:space-y-0 sm:space-y-4">
                <div className="flex flex-1 sm:flex-row flex-col">
                  <RowData label="Name" value={user.name} />
                  <RowData label="Email" value={user.email} />
                </div>
                <div className="flex flex-1 sm:flex-row flex-col">
                  <RowData label="Phone number" value={user.phone_number} />
                  <RowData
                    label="Birthday"
                    value={dateFormatter(
                      user.birth_date,
                      "YYYY-MM-DD",
                      "DD-MMM-YYYY",
                    )}
                  />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col lg:justify-around lg:space-y-0 sm:space-y-4">
                <div className="flex flex-1 sm:flex-row flex-col">
                  <RowData label="City" value={user.city} />
                  <RowData label="Last login" value={user.last_login} />
                </div>
                <div className="flex flex-1 sm:flex-row flex-col">
                  <RowData
                    label="Status"
                    value={<ActiveStatusBadge status={user.is_active} />}
                  />
                  <RowData
                    label="Email verified"
                    value={dateFormatter(
                      user.email_verified_at,
                      "YYYY-MM-DD HH:mm:ss",
                      "YYYY-MM-DD HH:mm:ss",
                    )}
                    showBorder={false}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <SubmitButton
                  variant="contained"
                  text="Change user status"
                  handleClick={changeUserStatus}
                  icon={<ChangeCircle className="mr-2" />}
                  className="flex justify-end"
                />
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col mt-12 w-full">
          <div className="text-white text-center text-xl font-semibold ml-4 pb-2">
            Orders
          </div>
          <div className="bg-slate-200 p-4 rounded-xl">
            <div className="p-3 mt-2">
              <DataTable
                allowCheckboxSelection={false}
                allowSearch={false}
                rows={orders}
                columns={columns}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                getData={getOrders}
                dependencies={[updated]}
                totalCount={orders.length}
              />
            </div>
          </div>
        </div>
      </div>
      {openChangeUserStatusPopUp && (
        <ChangeUserStatusPopUp
          selectedUser={user}
          changeStatusPopUp={openChangeUserStatusPopUp}
          setChangeStatusPopUp={setOpenChangeUserStatusPopUp}
          onSuccess={getUser}
        />
      )}
      {openChangeOrderStatusPopUp && selectedRow && (
        <ChangeOrderStatusPopUp
          changeStatusPopUp={openChangeOrderStatusPopUp}
          setChangeStatusPopUp={setOpenChangeOrderStatusPopUp}
          selectedOrder={selectedRow}
          onSuccess={updateData}
        />
      )}
    </Layout>
  );
};

export default withAuth(UserDetailView);
