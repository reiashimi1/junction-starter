"use client";

import Layout from "@/layouts/MerchantLayout/Layout";
import DataTable from "@/core/datatable/DataTable";
import * as React from "react";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AddButton from "@/core/buttons/AddButton";
import { IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import AddStationPopUp from "@/components/merchants/AddStationPopUp";
import EditStationPopUp from "@/components/merchants/EditStationPopUp";
import DeleteStationPopUp from "@/components/merchants/DeleteStationPopUp";
import withAuth from "@/helpers/auth/merchantWrapper";

const MerchantStationsView = () => {
  const [stations, setStations] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [addPopUp, setAddPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [updated, setUpdated] = useState(0);
  const [selectedRow, setSelectedRow] = useState("");

  const merchant = useSelector((state) => state?.authSlice?.user?.merchant);

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
      field: "latitude",
      headerName: "Latitude",
      minWidth: 80,
      maxWidth: 120,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      minWidth: 80,
      maxWidth: 120,
    },
    {
      field: "chargePoints",
      headerName: "Charge points",
      minWidth: 80,
      maxWidth: 120,
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
          <Tooltip title="View details" arrow>
            <IconButton onClick={() => viewStationDetails(params.row)}>
              <Visibility className="text-blue-800" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <Edit className="text-green-800" />
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

  const viewStationDetails = (selectedRow) => {
    dispatch(showLoader("Please wait..."));
    router.push(`/merchant/stations/${selectedRow.id}`);
  };

  const getStations = () => {
    dispatch(showLoader("Please wait"));
    API.get(`/merchants/${merchant?.id}/stations`)
      .then((response) => {
        const { stations } = response.data.data;
        setStations(stations);
      })
      .catch(() => dispatch(showErrorToast("Could not get stations...")))
      .finally(() => dispatch(hideLoader()));
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
                dependencies={[updated]}
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
          merchantId={merchant?.id}
          onSuccess={updateData}
        />
      )}
      {editPopUp && selectedRow && (
        <EditStationPopUp
          station={selectedRow}
          editPopUp={editPopUp}
          setEditPopUp={setEditPopUp}
          merchantId={merchant?.id}
          onSuccess={updateData}
        />
      )}
      {deletePopUp && selectedRow && (
        <DeleteStationPopUp
          deletePopUp={deletePopUp}
          setDeletePopUp={setDeletePopUp}
          selectedRow={selectedRow}
          merchantId={merchant?.id}
          onSuccess={updateData}
        />
      )}
    </Layout>
  );
};

export default withAuth(MerchantStationsView);
