"use client";

import Layout from "@/layouts/AdminLayout/Layout";
import DataTable from "@/core/DataTable";
import { useState } from "react";
import API from "@/helpers/APIServices/API";
import { ChangeCircle, Visibility } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { useDispatch } from "react-redux";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import withAuth from "@/helpers/auth/adminWrapper";
import { useRouter } from "next/navigation";
import ChangeUserStatusPopUp from "@/components/users/ChangeUserStatusPopUp";
import { ActiveStatusBadge } from "@/helpers/functions";
import UserStatusFilter from "@/components/users/UserStatusFilter";
import { userStatusesAdmin } from "@/helpers/constants";

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [changeStatusPopUp, setChangeStatusPopUp] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [updated, setUpdated] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [status, setStatus] = useState(userStatusesAdmin[0]?.value);

  const dispatch = useDispatch();
  const router = useRouter();

  const updateData = () => {
    setUpdated((prevState) => prevState + 1);
  };

  const changeStatus = (selectedRow) => {
    setSelectedRow(selectedRow);
    setChangeStatusPopUp(true);
  };

  const viewDetails = (selectedRow) => {
    dispatch(showLoader("Please wait..."));
    router.push(`/admin/users/${selectedRow.id}`);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 160,
      maxWidth: 210,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      sortable: false,
      disableColumnMenu: true,
      minWidth: 100,
      maxWidth: 150,
      valueGetter: (params) => params.row.phone_number || "N/A",
    },
    // {
    //   field: "birth_date",
    //   headerName: "Birth Date",
    //   sortable: false,
    //   disableColumnMenu: true,
    //   minWidth: 100,
    //   maxWidth: 130,
    //   valueGetter: (params) =>
    //     dateFormatter(params.row.birth_date, "YYYY-MM-DD", "DD-MMM-YYYY"),
    // },
    {
      field: "city",
      headerName: "City",
      minWidth: 80,
      maxWidth: 120,
    },
    {
      field: "is_active",
      headerName: "Status",
      sortable: false,
      disableColumnMenu: true,
      minWidth: 80,
      maxWidth: 120,
      renderCell: (params) => <ActiveStatusBadge status={params.row.is_active} />,
    },
    {
      field: "last_login",
      headerName: "Last Login",
      sortable: false,
      disableColumnMenu: true,
      minWidth: 120,
      maxWidth: 180,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 80,
      maxWidth: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <Tooltip title="View details" arrow>
            <IconButton onClick={() => viewDetails(params.row)}>
              <Visibility className="text-blue-800" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Change status" arrow>
            <IconButton onClick={() => changeStatus(params.row)}>
              <ChangeCircle className="text-green-800" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const getUsers = (params = {}) => {
    dispatch(showLoader("Please wait..."));
    const updatedParams = {
      ...params,
      status: status !== "all" ? status : null,
    };
    API.get("/api/admin/users", { params: updatedParams })
      .then((response) => {
        const users = response.data.data;
        setUsers(users);
        setTotalCount(response.data.total);
      })
      .catch(() => dispatch(showErrorToast("Could not get users")))
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <Layout>
      <div className="flex flex-col pt-24">
        <div className="text-white text-2xl font-semibold ml-8 pb-2">
          All users
        </div>
        <div className="bg-slate-200 p-4 mx-4 rounded-xl p-3 mt-2">
          <DataTable
            allowCheckboxSelection={false}
            rows={users}
            columns={columns}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getData={getUsers}
            totalCount={totalCount}
            dependencies={[updated, status]}
            buttons={[
              <UserStatusFilter
                key="filter"
                selectedValue={status}
                onSelect={setStatus}
              />,
            ]}
          />
        </div>
      </div>
      {changeStatusPopUp && selectedRow && (
        <ChangeUserStatusPopUp
          selectedUser={selectedRow}
          changeStatusPopUp={changeStatusPopUp}
          setChangeStatusPopUp={setChangeStatusPopUp}
          onSuccess={updateData}
        />
      )}
    </Layout>
  );
};

export default withAuth(UsersView);
