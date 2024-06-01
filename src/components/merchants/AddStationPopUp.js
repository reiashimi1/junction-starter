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

const AddStationPopUp = ({ addPopUp, setAddPopUp, merchantId, onSuccess }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const addProduct = () => {
    const errors = validateErrors(
      {
        name,
        address,
        latitude,
        longitude,
      },
      stationValidator,
    );
    if (errors) {
      return;
    }
    const payload = { name, latitude, longitude, address };
    dispatch(showLoader("Please wait"));
    API.post(`/merchants/${merchantId}/stations`, payload)
      .then(() => {
        dispatch(showSuccessToast("Station added successfully"));
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
      title="Create new station"
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
            label="address"
            placeholder="Enter address"
            handleChange={(value) => clearError("address", value, setAddress)}
            value={address}
            error={getError("address")}
            multiline
            className="flex-1"
          />
        </div>
        <div className="flex md:flex-row flex-col justify-between md:space-x-4">
          <div className="flex sm:flex-row flex-col w-full justify-between sm:space-x-2 sm:space-y-0 space-y-4 md:mt-0 -mt-2">
            <CustomInput
              label="Latitude"
              type="number"
              placeholder="Enter latitude"
              handleChange={(value) =>
                clearError("latitude", value, setLatitude)
              }
              value={latitude}
              error={getError("latitude")}
              className="flex-1"
              required
            />
            <CustomInput
              label="Longitude"
              type="number"
              placeholder="Enter longitude"
              handleChange={(value) =>
                clearError("longitude", value, setLongitude)
              }
              value={longitude}
              error={getError("longitude")}
              className="flex-1"
              required
            />
          </div>
        </div>
      </div>
    </FormPopUp>
  );
};

export default AddStationPopUp;
