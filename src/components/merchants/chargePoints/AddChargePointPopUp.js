import FormPopUp from "@/core/modals/FormPopUp";
import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useValidate from "@/hooks/useValidate";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { Add } from "@mui/icons-material";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import API from "@/helpers/APIServices/API";
import { socketOptions } from "@/helpers/constants";
import SelectInput from "@/core/inputs/SelectInput";
import chargePointValidator from "@/helpers/validators/chargePointValidator";

const AddChargePointPopUp = ({
  addPopUp,
  setAddPopUp,
  merchantId,
  stationId,
  onSuccess,
}) => {
  const [type, setType] = useState("");
  const [speed, setSpeed] = useState("");
  const [price, setPrice] = useState("");
  const [dynamicPrice, setDynamicPrice] = useState("");
  const [requests, setRequests] = useState("");

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const addProduct = () => {
    const errors = validateErrors(
      {
        type,
        // speed,
        price,
        // dynamicPrice,
        // requests,
      },
      chargePointValidator,
    );
    if (errors) {
      return;
    }
    const payload = {
      type,
      price: Number(price),
      dynamicPrice: Number(dynamicPrice),
      requests: Number(dynamicPrice),
    };
    dispatch(showLoader("Please wait"));
    API.post(`/merchants/${merchantId}/stations/${stationId}/ports`, payload)
      .then(() => {
        dispatch(showSuccessToast("Charge point added successfully"));
        onSuccess();
        setAddPopUp(false);
      })
      .catch(() => {
        dispatch(showErrorToast("Something went wrong"));
      })
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <FormPopUp
      title="Create new charge point"
      open={addPopUp}
      setOpen={setAddPopUp}
      handleSubmit={addProduct}
      submitButtonText="Add"
      submitButtonColor="primary"
      maxWidth="xl"
      icon={<Add />}
    >
      <div className="flex flex-col space-y-8">
        <div className="flex sm:flex-row flex-col justify-between sm:space-x-4 sm:space-y-0 space-y-4">
          <SelectInput
            label="Type"
            value={type}
            onChange={setType}
            id="type"
            items={socketOptions}
            minWidth="300"
            className="flex flex-1"
          />
          <CustomInput
            label="Price"
            type="number"
            placeholder="Enter starting price"
            handleChange={(value) => clearError("price", value, setPrice)}
            value={price}
            error={getError("price")}
            className="flex-1"
            required
          />
        </div>
        <div className="flex sm:flex-row flex-col w-full justify-between sm:space-x-2 pb-4 sm:space-y-0 space-y-4 sm:pt-0 -pt-2">
          <CustomInput
            label="Dynamic price"
            type="number"
            placeholder="Enter dynamic price"
            handleChange={(value) =>
              clearError("dynamicPrice", value, setDynamicPrice)
            }
            value={dynamicPrice}
            error={getError("dynamicPrice")}
            // required
            className="flex-1"
          />
          <CustomInput
            label="Requests for discount"
            placeholder="Enter requests number"
            type="number"
            handleChange={(value) => clearError("requests", value, setRequests)}
            value={requests}
            error={getError("requests")}
            className="flex-1"
            // required
          />
        </div>
        {/*<SelectInput*/}
        {/*  label="Socket"*/}
        {/*  value={socket}*/}
        {/*  onChange={setSocket}*/}
        {/*  id="socket"*/}
        {/*  items={socketOptions}*/}
        {/*  minWidth="300"*/}
        {/*  required*/}
        {/*  className="flex flex-1"*/}
        {/*/>*/}
      </div>
    </FormPopUp>
  );
};

export default AddChargePointPopUp;
