"use client";

import withAuth from "@/helpers/auth/userWrapper";
import Layout from "@/layouts/UserLayout/Layout";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/navigation";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import {
  amountFormatter,
  isObjectEmpty,
  ActiveStatusBadge,
} from "@/helpers/functions";
import { ChangeCircle, Visibility } from "@mui/icons-material";
import API from "@/helpers/APIServices/API";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import DataTable from "@/core/datatable/DataTable";
import RowData from "@/components/admin/RowData";
import BackButton from "@/core/buttons/BackButton";
import ChangeOrderStatusPopUp from "@/components/orders/ChangeOrderStatusPopUp";
import SubmitButton from "@/core/buttons/SubmitButton";
import * as React from "react";

const MyOrderView = ({ orderId }) => {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openChangeStatusPopUp, setOpenChangeStatusPopUp] = useState(false);
  // const [totalCount, setTotalCount] = useState(0);

  const user = useSelector((state) => state?.authSlice?.user);

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
      valueGetter: (params) => amountFormatter(params.row.price, "USD"),
    },
    {
      field: "discount_price",
      headerName: "Discount",
      minWidth: 100,
      maxWidth: 150,
      valueGetter: (params) =>
        amountFormatter(params.row.discount_price, "USD"),
    },
    {
      field: "Image 1",
      headerName: "Image 1",
      minWidth: 150,
      maxWidth: 200,
      renderCell: (params) => (
        <div className="flex justify-end">
          {/*<img*/}
          {/*  src={prepareImagePath(params.row.image_1)}*/}
          {/*  className="w-12 object-contain"*/}
          {/*  alt={params.row.name}*/}
          {/*/>*/}
          img
        </div>
      ),
      sortable: false,
      disableColumnMenu: true,
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 200,
    //   sortable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params) => (
    //     <div className="flex justify-end items-end">
    //       <Tooltip title="View details" arrow>
    //         <IconButton onClick={() => viewProductDetails(params.row)}>
    //           <Visibility className="text-blue-800" />
    //         </IconButton>
    //       </Tooltip>
    //     </div>
    //   ),
    // },
  ];

  const changeOrderStatus = () => {
    setOpenChangeStatusPopUp(true);
  };

  // const viewProductDetails = (row) => {
  //   dispatch(showLoader("Please wait"));
  //   router.push(`/admin/products/${row.id}`);
  // };

  // const getProducts = (params = {}) => {
  //   if (!!orderId) {
  //     dispatch(showLoader("Please wait..."));
  //     API.get(`/api/admin/products/order/${orderId}`, { params })
  //       .then((response) => {
  //         const products = response.data.data;
  //         setProducts(products);
  //         setTotalCount(response.data.total);
  //       })
  //       .catch(() => dispatch(showErrorToast("Could not get products")))
  //       .finally(() => dispatch(hideLoader()));
  //   }
  // };

  const getOrder = () => {
    if (!!orderId) {
      dispatch(showLoader("Please wait..."));
      API.get(`/api/user/orders/${orderId}`)
        .then((response) => {
          const { order } = response.data;
          setOrder(order);
          setProducts(order.products);
        })
        .catch((e) => dispatch(showErrorToast(e.response.data.message)))
        .finally(() => dispatch(hideLoader()));
    }
  };

  return (
    <Layout>
      <div className="flex flex-col pt-24 pb-8 px-4 sm:mx-2">
        <BackButton className="ml-4" />
        {!isObjectEmpty(order) && (
          <>
            <div className="text-white text-xl font-semibold ml-4 pb-2 text-center mt-4">
              Order details
            </div>
            <div className="flex flex-col bg-slate-200 p-4 rounded-xl shadow-md sm:space-y-8">
              <div className="flex lg:flex-row flex-col lg:justify-around lg:space-y-0 sm:space-y-4">
                <div className="flex flex-1 sm:flex-row flex-col">
                  <RowData label="Address" value={order.address} />
                  <RowData label="City" value={order.city} />
                </div>
                <div className="flex flex-1 sm:flex-row flex-col">
                  <RowData label="ZIP code" value={order.zip_code} />
                  <RowData label="Delivery time" value={order.delivery_time} />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col lg:justify-around lg:space-y-0 sm:space-y-4">
                <div className="flex flex-1 sm:flex-row flex-col">
                  <RowData
                    label="Payment method"
                    value={order?.payment_method}
                  />
                  <RowData
                    label="Total amount"
                    value={amountFormatter(order?.total_amount)}
                  />
                </div>
                <div className="flex flex-1 sm:flex-row flex-col">
                  <RowData
                    label="Status"
                    value={<ActiveStatusBadge status={order?.status} />}
                  />
                  {order.status === "cancelled" ? (
                    <RowData
                      label="Description"
                      value={order.reason}
                      showBorder={false}
                    />
                  ) : (
                    <RowData showBorder={false} />
                  )}
                </div>
              </div>
              <div className="flex lg:flex-row flex-col lg:justify-around lg:space-y-0 sm:space-y-4">
                <div className="flex flex-1 sm:flex-row flex-col">
                  <RowData label="Email" value={user.email} />
                  <RowData label="Full name" value={user.name} />
                </div>
                <div className="flex flex-1 sm:flex-row flex-col">
                  <RowData
                    label="Phone number"
                    value={user.phone_number}
                  />
                  <RowData showBorder={false} />
                </div>
              </div>
              <div className="flex justify-end">
                <SubmitButton
                  variant="inherit"
                  text="Change order status"
                  disabled={order.status.toLowerCase() !== "pending"}
                  handleClick={changeOrderStatus}
                  icon={<ChangeCircle className="mr-2" />}
                  className="flex justify-end bg-red-700 text-white"
                />
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col mt-8 w-full">
          <div className="text-white text-center text-xl font-semibold ml-4 pb-2">
            Products
          </div>
          <div className="bg-slate-200 p-4 rounded-xl">
            <div className="p-3 mt-2">
              <DataTable
                allowCheckboxSelection={false}
                allowSearch={false}
                rows={products}
                columns={columns}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                getData={getOrder}
                dependencies={[orderId]}
                totalCount={products.length}
              />
            </div>
          </div>
        </div>
      </div>
      {openChangeStatusPopUp && order && (
        <ChangeOrderStatusPopUp
          changeStatusPopUp={openChangeStatusPopUp}
          setChangeStatusPopUp={setOpenChangeStatusPopUp}
          selectedOrder={order}
          onSuccess={getOrder}
        />
      )}
    </Layout>
  );
};

export default withAuth(MyOrderView);
