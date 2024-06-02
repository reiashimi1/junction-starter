"use client";

import OrderDetails from "@/components/cart/OrderDetails";
import { Delete } from "@mui/icons-material";
import * as React from "react";
import FormPopUp from "@/core/modals/FormPopUp";

const UserCartView = ({ open, setOpen }) => {
  return (
    <FormPopUp
      title=""
      open={open}
      setOpen={setOpen}
      submitButtonText="Delete"
      submitButtonColor="error"
      icon={<Delete />}
    >
      <OrderDetails />
    </FormPopUp>
  );
};

export default UserCartView;
