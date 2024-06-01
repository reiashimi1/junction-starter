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
import stationValidator from "@/helpers/validators/stationValidator";
import API from "@/helpers/APIServices/API";
import { speedOptions } from "@/helpers/constants";
import SelectInput from "@/core/inputs/SelectInput";

const AddChargePointPopUp = ({ addPopUp, setAddPopUp, onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [speed, setSpeed] = useState("");
  const [price, setPrice] = useState("");
  const [dynamicPrice, setDynamicPrice] = useState("");
  const [requests, setRequests] = useState("");

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const addProduct = () => {
    const errors = validateErrors(
      {
        name,
        description,
        speed,
        price,
        dynamicPrice,
        requests,
      },
      stationValidator,
    );
    if (errors) {
      return;
    }
    const payload = { name, description };
    dispatch(showLoader("Please wait"));
    API.post("/api/station", payload)
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
          <CustomInput
            label="Name"
            placeholder="Enter name"
            handleChange={(value) => clearError("name", value, setName)}
            value={name}
            error={getError("name")}
            required
            className="flex-1"
          />
          <CustomInput
            label="Description"
            placeholder="Enter description"
            handleChange={(value) =>
              clearError("description", value, setDescription)
            }
            value={description}
            error={getError("description")}
            multiline
            className="flex-1"
          />
        </div>
        <div className="flex md:flex-row flex-col justify-between md:space-x-4">
          <div className="flex sm:flex-row flex-col w-full justify-between sm:space-x-2 sm:space-y-0 space-y-4 md:mt-0 -mt-2">
            <SelectInput
              label="Speed"
              value={speed}
              onChange={setSpeed}
              id="speed"
              items={speedOptions}
              minWidth="300"
              required
              className="flex flex-1"
            />
            <CustomInput
              label="price"
              type="number"
              placeholder="Enter starting price"
              handleChange={(value) => clearError("price", value, setPrice)}
              value={price}
              error={getError("price")}
              className="flex-1"
              required
            />
          </div>
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
            required
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
            required
          />
        </div>
      </div>
    </FormPopUp>
  );
};

export default AddChargePointPopUp;
