"use client";

import Layout from "@/layouts/AdminLayout/Layout";
import DataTable from "@/core/DataTable";
import { useState } from "react";
import AddButton from "@/core/buttons/AddButton";
import API from "@/helpers/APIServices/API";
import { Edit, Delete, ChangeCircle } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { useDispatch } from "react-redux";
import {
  amountFormatter,
  prepareImagePath,
  ActiveStatusBadge,
} from "@/helpers/functions";
import AddProductPopUp from "@/components/products/AddProductPopUp";
import EditProductPopUp from "@/components/products/EditProductPopUp";
import DeleteProductPopUp from "@/components/products/DeleteProductPopUp";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import withAuth from "@/helpers/auth/adminWrapper";
import ChangeProductStatusPopUp from "@/components/products/ChangeProductStatusPopUp";

const ProductsAdminView = () => {
  const [products, setProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [addPopUp, setAddPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [openChangeProductStatusPopUp, setOpenChangeProductStatusPopUp] =
    useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [updated, setUpdated] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();

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
      field: "stock",
      headerName: "Stock",
      minWidth: 80,
      maxWidth: 120,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      maxWidth: 150,
      valueGetter: (params) => amountFormatter(params.row.price, "CAD"),
    },
    {
      field: "discount_price",
      headerName: "Discount",
      minWidth: 100,
      maxWidth: 150,
      valueGetter: (params) =>
        amountFormatter(params.row.discount_price, "CAD"),
    },
    {
      field: "Image 1",
      headerName: "Image 1",
      minWidth: 100,
      maxWidth: 150,
      renderCell: (params) => (
        <div className="flex justify-end">
          <img
            src={prepareImagePath(params.row.image_1)}
            className="w-12 object-contain"
            alt={params.row.name}
          />
        </div>
      ),
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      disableColumnMenu: true,
      minWidth: 80,
      maxWidth: 120,
      renderCell: (params) => <ActiveStatusBadge status={params.row.status} />,
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
            <IconButton onClick={() => changeProductStatus(params.row)}>
              <ChangeCircle className="text-blue-700" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton onClick={() => handleDelete(params.row)} disabled>
              <Delete className="text-slate-800" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const changeProductStatus = (row) => {
    setSelectedRow(row);
    setOpenChangeProductStatusPopUp(true);
  };

  const getProducts = (params = {}) => {
    dispatch(showLoader("Please wait..."));
    API.get("/api/admin/products", { params })
      .then((response) => {
        const products = response.data.data;
        setProducts(products);
        setTotalCount(response.data.total);
      })
      .catch(() => dispatch(showErrorToast("Could not get products")))
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <Layout>
      <div className="flex flex-col pt-28 pb-8">
        <div className="text-white text-2xl font-semibold ml-8 pb-2">
          All products
        </div>
        <div className="bg-slate-200 p-4 mx-4 rounded-xl">
          <div className="p-3 mt-2">
            <DataTable
              allowCheckboxSelection={false}
              rows={products}
              columns={columns}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              getData={getProducts}
              dependencies={[updated]}
              buttons={[
                <AddButton
                  key="addButton"
                  text="Add product"
                  handleClick={() => setAddPopUp(true)}
                />,
              ]}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
      {addPopUp && (
        <AddProductPopUp
          addPopUp={addPopUp}
          setAddPopUp={setAddPopUp}
          onSuccess={updateData}
        />
      )}
      {editPopUp && selectedRow && (
        <EditProductPopUp
          product={selectedRow}
          editPopUp={editPopUp}
          setEditPopUp={setEditPopUp}
          onSuccess={updateData}
        />
      )}
      {deletePopUp && selectedRow && (
        <DeleteProductPopUp
          deletePopUp={deletePopUp}
          setDeletePopUp={setDeletePopUp}
          selectedRow={selectedRow}
          onSuccess={updateData}
        />
      )}
      {openChangeProductStatusPopUp && selectedRow && (
        <ChangeProductStatusPopUp
          selectedProduct={selectedRow}
          changeStatusPopUp={openChangeProductStatusPopUp}
          setChangeStatusPopUp={setOpenChangeProductStatusPopUp}
          onSuccess={updateData}
        />
      )}
    </Layout>
  );
};

export default withAuth(ProductsAdminView);
