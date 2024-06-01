"use client";

import Layout from "@/layouts/MerchantLayout/Layout";
import { useEffect, useState } from "react";
import API from "@/helpers/APIServices/API";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import { useDispatch } from "react-redux";
import { amountFormatter, isObjectEmpty } from "@/helpers/functions";
import { IconButton, Tooltip } from "@mui/material";
import { ChangeCircle, Delete, Edit } from "@mui/icons-material";
import * as React from "react";
import DataTable from "@/core/datatable/DataTable";
import SubmitButton from "@/core/buttons/SubmitButton";
import RowData from "@/components/admin/RowData";
import BackButton from "@/core/buttons/BackButton";
import AddButton from "@/core/buttons/AddButton";
import AddStationPopUp from "@/components/merchants/AddStationPopUp";
import EditStationPopUp from "@/components/merchants/EditStationPopUp";
import DeleteStationPopUp from "@/components/merchants/DeleteStationPopUp";
import DeleteChargePointPopUp from "@/components/merchants/chargePoints/DeleteChargePointPopUp";
import EditChargePointPopUp from "@/components/merchants/chargePoints/EditChargePointPopUp";
import AddChargePointPopUp from "@/components/merchants/chargePoints/AddChargePointPopUp";

const StationDetailsView = ({ id }) => {
  const [station, setStation] = useState("");
  const [chargePoints, setChargePoints] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [addPopUp, setAddPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [openChangeStatusPopUp, setOpenChangeStatusPopUp] = useState(false);
  const [updated, setUpdated] = useState(0);

  const dispatch = useDispatch();

  const handleEdit = (selectedRow) => {
    setSelectedRow(selectedRow);
    setEditPopUp(true);
  };

  const handleDelete = (selectedRow) => {
    setSelectedRow(selectedRow);
    setDeletePopUp(true);
  };

  const changeStationStatus = (selectedRow) => {
    setSelectedRow(selectedRow);
    setOpenChangeStatusPopUp(true);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      maxWidth: 350,
    },
    {
      field: "speed",
      headerName: "Speed",
      minWidth: 80,
      maxWidth: 120,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 80,
      maxWidth: 120,
      valueGetter: (params) => amountFormatter(params.row.price, "USD"),
    },
    {
      field: "dynamicPrice",
      headerName: "Dynamic price",
      minWidth: 100,
      maxWidth: 150,
      valueGetter: (params) => amountFormatter(params.row.dynamicPrice, "USD"),
    },
    {
      field: "requests",
      headerName: "Requests",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "socket",
      headerName: "Socket",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      field: "viewers",
      headerName: "Viewers",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      maxWidth: 250,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex justify-end items-end">
          <Tooltip title="Edit" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <Edit className="text-green-800" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Change status" arrow>
            <IconButton onClick={() => changeStationStatus(params.row)}>
              <ChangeCircle className="text-blue-700" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton onClick={() => handleDelete(params.row)}>
              <Delete className="text-red-700" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const getStationDetails = () => {
    // dispatch(showLoader("Please wait..."));
    // API.get(`/api/station/${id}`)
    //   .then((response) => {
    setChargePoints([
      { id: 11113, speed: 12, price: 333, dynamicPrice: 51, request: 10 },
    ]);
    // })
    // .catch(() => dispatch(showErrorToast("Something went wrong")))
    // .finally(() => dispatch(hideLoader()));
  };

  // useEffect(() => {
  //
  // }, [id]);

  const updateData = () => {
    setUpdated((prevState) => prevState + 1);
    setSelectedRow("");
  };

  return (
    <Layout>
      <div className="flex flex-col pt-24 pb-8 px-4 sm:mx-2">
        <BackButton className="ml-4" />
        {/*{!isObjectEmpty(order) && (*/}
        <>
          <div className="text-white text-xl font-semibold ml-4 pb-2 text-center mt-4">
            Station details
          </div>
          <div className="flex flex-col bg-slate-200 p-4 rounded-xl shadow-md sm:space-y-8">
            <div className="flex lg:flex-row flex-col lg:justify-around lg:space-y-0 sm:space-y-4">
              <div className="flex flex-1 sm:flex-row flex-col">
                {/*<RowData label="Address" value={order.address} />*/}
                {/*<RowData label="City" value={order.city} />*/}
              </div>
              <div className="flex flex-1 sm:flex-row flex-col">
                {/*<RowData label="ZIP code" value={order.zip_code} />*/}
                {/*<RowData label="Delivery time" value={order.delivery_time} />*/}
              </div>
            </div>
            <div className="flex lg:flex-row flex-col lg:justify-around lg:space-y-0 sm:space-y-4">
              <div className="flex flex-1 sm:flex-row flex-col">
                {/*<RowData*/}
                {/*    label="Payment method"*/}
                {/*    value={order.payment_method}*/}
                {/*/>*/}
                {/*<RowData*/}
                {/*  label="Total amount"*/}
                {/*  value={amountFormatter(order.total_amount)}*/}
                {/*/>*/}
              </div>
              <div className="flex flex-1 sm:flex-row flex-col">
                {/*<RowData*/}
                {/*    label="Status"*/}
                {/*    value={<OrderStatusBadge status={order.status} />}*/}
                {/*/>*/}
                {/*{order.status === "cancelled" ? (*/}
                {/*    <RowData*/}
                {/*        label="Description"*/}
                {/*        value={order.reason}*/}
                {/*        showBorder={false}*/}
                {/*    />*/}
                {/*) : (*/}
                {/*    <RowData showBorder={false} />*/}
                {/*)}*/}
              </div>
            </div>
            <div className="flex lg:flex-row flex-col lg:justify-around lg:space-y-0 sm:space-y-4">
              <div className="flex flex-1 sm:flex-row flex-col">
                <RowData label="Email" value={123} />
                <RowData label="Full name" value={123} />
              </div>
              <div className="flex flex-1 sm:flex-row flex-col">
                <RowData label="Phone number" value={123123} />
                <RowData showBorder={false} />
              </div>
            </div>
          </div>
        </>
        {/*)}*/}
        <div className="flex flex-col mt-8 w-full">
          <div className="text-white text-center text-xl font-semibold ml-4 pb-2">
            Charge points
          </div>
          <div className="bg-slate-200 p-4 rounded-xl">
            <div className="p-3 mt-2">
              <DataTable
                allowCheckboxSelection={false}
                allowSearch={false}
                rows={chargePoints}
                columns={columns}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                getData={getStationDetails}
                dependencies={[id]}
                buttons={[
                  <AddButton
                    key="addButton"
                    text="New charge point"
                    handleClick={() => setAddPopUp(true)}
                  />,
                ]}
                totalCount={chargePoints.length}
              />
            </div>
          </div>
        </div>
      </div>
      {addPopUp && (
        <AddChargePointPopUp
          addPopUp={addPopUp}
          setAddPopUp={setAddPopUp}
          onSuccess={updateData}
        />
      )}
      {editPopUp && selectedRow && (
        <EditChargePointPopUp
          station={selectedRow}
          editPopUp={editPopUp}
          setEditPopUp={setEditPopUp}
          onSuccess={updateData}
        />
      )}
      {deletePopUp && selectedRow && (
        <DeleteChargePointPopUp
          deletePopUp={deletePopUp}
          setDeletePopUp={setDeletePopUp}
          selectedRow={selectedRow}
          onSuccess={updateData}
        />
      )}
    </Layout>
  );
};

export default StationDetailsView;
