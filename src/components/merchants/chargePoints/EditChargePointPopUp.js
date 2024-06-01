import FormPopUp from "@/core/modals/FormPopUp";
import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useValidate from "@/hooks/useValidate";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { Edit } from "@mui/icons-material";
import stationValidator from "@/helpers/validators/stationValidator";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import { isObjectEmpty } from "@/helpers/functions";
import API from "@/helpers/APIServices/API";
import SelectInput from "@/core/inputs/SelectInput";
import { socketOptions, speedOptions } from "@/helpers/constants";
import chargePointValidator from "@/helpers/validators/chargePointValidator";

const EditChargePointPopUp = ({
  chargePoint,
  editPopUp,
  setEditPopUp,
  onSuccess,
}) => {
  const [type, setType] = useState("");
  // const [speed, setSpeed] = useState("");
  const [price, setPrice] = useState("");
  const [dynamicPrice, setDynamicPrice] = useState("");
  const [requests, setRequests] = useState("");

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const editChargePoint = () => {
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
      // speed,
      price,
      dynamicPrice,
      requests,
    };
    dispatch(showLoader("Please wait"));
    API.put(`/merchants/${merchantId}/stations/${id}`, payload)
      .then(() => {
        dispatch(showSuccessToast("chargePoint edited successfully"));
        onSuccess();
        setEditPopUp(false);
      })
      .catch(() => {
        dispatch(showErrorToast("Something went wrong"));
      })
      .finally(() => dispatch(hideLoader()));
  };

  useEffect(() => {
    if (!isObjectEmpty(chargePoint)) {
      // setSpeed(chargePoint?.speed);

      setPrice(chargePoint?.price);
      setDynamicPrice(chargePoint?.dynamicPrice);
      setRequests(chargePoint?.requests);
    }
  }, [chargePoint]);

  return (
    <FormPopUp
      title="Edit chargePoint"
      open={editPopUp}
      setOpen={setEditPopUp}
      handleSubmit={editChargePoint}
      submitButtonText="Edit"
      submitButtonColor="primary"
      maxWidth="xl"
      icon={<Edit />}
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

export default EditChargePointPopUp;
