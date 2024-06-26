"use client";

import Layout from "@/layouts/MerchantLayout/Layout";
import DataTable from "@/core/datatable/DataTable";
import * as React from "react";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { amountFormatter } from "@/helpers/functions";
import AddButton from "@/core/buttons/AddButton";
import { IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import AddStationPopUp from "@/components/merchants/AddStationPopUp";
import EditStationPopUp from "@/components/merchants/EditStationPopUp";
import DeleteStationPopUp from "@/components/merchants/DeleteStationPopUp";

const MerchantOrdersView = () => {
  const [orders, setOrders] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [addPopUp, setAddPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [updated, setUpdated] = useState(0);
  const [selectedRow, setSelectedRow] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const columns = [
    {
      field: "station",
      headerName: "Station",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "time",
      headerName: "Time (minutes)",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      field: "payment",
      headerName: "Amount",
      minWidth: 100,
      maxWidth: 150,
      valueGetter: (params) => amountFormatter(params.row.price, "USD"),
    },
    {
      field: "chargePoint",
      headerName: "Charge point",
      minWidth: 100,
      maxWidth: 150,
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   minWidth: 150,
    //   maxWidth: 250,
    //   sortable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params) => (
    //     <div className="flex justify-end items-end">
    //       <Tooltip title="View details" arrow>
    //         <IconButton onClick={() => viewStationDetails(params.row)}>
    //           <Visibility className="text-blue-800" />
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title="Edit" arrow>
    //         <IconButton onClick={() => handleEdit(params.row)}>
    //           <Edit className="text-green-800" />
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title="Delete" arrow>
    //         <IconButton onClick={() => handleDelete(params.row)}>
    //           <Delete className="text-red-700" />
    //         </IconButton>
    //       </Tooltip>
    //     </div>
    //   ),
    // },
  ];

  // const updateData = () => {
  //   setUpdated((prevState) => prevState + 1);
  //   setSelectedRow("");
  // };

  // const handleEdit = (selectedRow) => {
  //   setSelectedRow(selectedRow);
  //   setEditPopUp(true);
  // };

  // const handleDelete = (selectedRow) => {
  //   setSelectedRow(selectedRow);
  //   setDeletePopUp(true);
  // };

  // const viewStationDetails = (selectedRow) => {
  //   router.push(`/merchant/stations/${selectedRow.id}`);
  // };

  const getOrders = () => {
    // dispatch(showLoader("Please wait..."));
    // API.get(`/api/user/orders/${orderId}`)
    //   .then((response) => {
    //     const { order } = response.data;
    //     setOrder(order);
    setOrders([{ id: 12, station: "test", chargePoint: "testtttt" }]);
    // })
    // .catch((e) => dispatch(showErrorToast(e.response.data.message)))
    // .finally(() => dispatch(hideLoader()));
  };

  return (
    <Layout>
      <div className="flex flex-col pt-24 pb-8 px-4 sm:mx-2">
        <div className="flex flex-col mt-8 w-full">
          <div className="text-white text-center text-xl font-semibold ml-4 pb-2">
            Stations
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
                // buttons={[
                //   <AddButton
                //     key="addButton"
                //     text="Add station"
                //     handleClick={() => setAddPopUp(true)}
                //   />,
                // ]}
                totalCount={orders.length}
              />
            </div>
          </div>
        </div>
      </div>
      {/*{addPopUp && (*/}
      {/*  <AddStationPopUp*/}
      {/*    addPopUp={addPopUp}*/}
      {/*    setAddPopUp={setAddPopUp}*/}
      {/*    onSuccess={updateData}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{editPopUp && selectedRow && (*/}
      {/*  <EditStationPopUp*/}
      {/*    station={selectedRow}*/}
      {/*    editPopUp={editPopUp}*/}
      {/*    setEditPopUp={setEditPopUp}*/}
      {/*    onSuccess={updateData}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{deletePopUp && selectedRow && (*/}
      {/*  <DeleteStationPopUp*/}
      {/*    deletePopUp={deletePopUp}*/}
      {/*    setDeletePopUp={setDeletePopUp}*/}
      {/*    selectedRow={selectedRow}*/}
      {/*    onSuccess={updateData}*/}
      {/*  />*/}
      {/*)}*/}
    </Layout>
  );
};

export default MerchantOrdersView;
