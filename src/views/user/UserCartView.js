"use client";

import Layout from "@/layouts/UserLayout/Layout";
import OrderDetails from "@/components/cart/OrderDetails";
import OrderProducts from "@/components/cart/OrderProducts";
import { useSelector } from "react-redux";
import { calculateTotal, getCartProducts } from "@/app/GlobalRedux/actions";
import withAuth from "@/helpers/auth/userWrapper";
import { Delete } from "@mui/icons-material";
import * as React from "react";
import FormPopUp from "@/core/modals/FormPopUp";

const UserCartView = () => {
  const products = useSelector(getCartProducts());
  const totalAmount = useSelector(calculateTotal());

  return (
    // <Layout>
    //   <div className="flex md:flex-row flex-col-reverse h-full md:space-x-5 py-28 px-4">
        <FormPopUp
          title="Delete product"
          open
          setOpen={() => {}}
          // handleSubmit={deleteProduct}
          submitButtonText="Delete"
          submitButtonColor="error"
          icon={<Delete />}
        >
          <OrderDetails products={products} total={totalAmount} />
        </FormPopUp>
    //   </div>
    // </Layout>
  );
};

export default UserCartView;
