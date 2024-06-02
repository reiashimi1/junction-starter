"use client";

import OrderDetails from "@/components/cart/OrderDetails";
import * as React from "react";
import SimplePopUp from "@/core/modals/SimplePopUp";

const UserCartView = ({ open, setOpen }) => {
  return (
    <SimplePopUp open={open} setOpen={setOpen}>
      <OrderDetails />
    </SimplePopUp>
  );
};

export default UserCartView;
