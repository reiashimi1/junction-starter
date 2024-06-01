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
import { amountFormatter, prepareImagePath } from "@/helpers/functions";
import AddButton from "@/core/buttons/AddButton";
import { IconButton, Tooltip } from "@mui/material";
import { ChangeCircle, Delete, Edit } from "@mui/icons-material";
import AddStationPopUp from "@/components/merchants/AddStationPopUp";
import EditStationPopUp from "@/components/merchants/EditStationPopUp";
import DeleteStationPopUp from "@/components/merchants/DeleteStationPopUp";
import ChangeStationStatusPopUp from "@/components/merchants/ChangeStationStatusPopUp";
import changeStationStatusPopUp from "@/components/merchants/ChangeStationStatusPopUp";

const MerchantStationsView = () => {
  const [stations, setStations] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [addPopUp, setAddPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [openChangeStatusPopUp, setOpenChangeStatusPopUp] = useState(false);
  const [updated, setUpdated] = useState(0);
  const [selectedRow, setSelectedRow] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

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
      minWidth: 150,
      maxWidth: 250,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 80,
      maxWidth: 120,
      valueGetter: (params) => amountFormatter(params.row.price, "USD"),
    },
    {
      field: "discountPrice",
      headerName: "Discount / request",
      minWidth: 100,
      maxWidth: 150,
      valueGetter: (params) =>
          amountFormatter(params.row.discount_price, "USD"),
    },
    {
      field: "requests",
      headerName: "Requests for discount",
      minWidth: 100,
      maxWidth: 200,
    },
    // {
    //     field: "stock",
    //     headerName: "Stock",
    //     minWidth: 80,
    //     maxWidth: 120,
    // },
    // {
    //     field: "price",
    //     headerName: "Price",
    //     minWidth: 100,
    //     maxWidth: 150,
    //     valueGetter: (params) => amountFormatter(params.row.price, "CAD"),
    // },
    // {
    //     field: "discount_price",
    //     headerName: "Discount",
    //     minWidth: 100,
    //     maxWidth: 150,
    //     valueGetter: (params) =>
    //         amountFormatter(params.row.discount_price, "CAD"),
    // },
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

  const updateData = () => {
    setUpdated((prevState) => prevState + 1);
    setSelectedRow("");
  };

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

  const getStations = () => {
    // dispatch(showLoader("Please wait..."));
    // API.get(`/api/user/orders/${orderId}`)
    //   .then((response) => {
    //     const { order } = response.data;
    //     setOrder(order);
    setStations([{ id: 12, name: "test", description: "testtttt" }]);
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
                rows={stations}
                columns={columns}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                getData={getStations}
                buttons={[
                  <AddButton
                    key="addButton"
                    text="Add station"
                    handleClick={() => setAddPopUp(true)}
                  />,
                ]}
                totalCount={stations.length}
              />
            </div>
          </div>
        </div>
      </div>
      {addPopUp && (
        <AddStationPopUp
          addPopUp={addPopUp}
          setAddPopUp={setAddPopUp}
          onSuccess={updateData}
        />
      )}
      {editPopUp && selectedRow && (
        <EditStationPopUp
          station={selectedRow}
          editPopUp={editPopUp}
          setEditPopUp={setEditPopUp}
          onSuccess={updateData}
        />
      )}
      {deletePopUp && selectedRow && (
        <DeleteStationPopUp
          deletePopUp={deletePopUp}
          setDeletePopUp={setDeletePopUp}
          selectedRow={selectedRow}
          onSuccess={updateData}
        />
      )}
      {openChangeStatusPopUp && selectedRow && (
        <ChangeStationStatusPopUp
          selectedStation={selectedRow}
          changeStatusPopUp={openChangeStatusPopUp}
          setChangeStatusPopUp={setOpenChangeStatusPopUp}
          onSuccess={updateData}
        />
      )}
    </Layout>
  );
};

export default MerchantStationsView;
