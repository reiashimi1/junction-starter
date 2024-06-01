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
import { appendToPayload, isObjectEmpty } from "@/helpers/functions";
import API from "@/helpers/APIServices/API";

const EditChargePointPopUp = ({ station, editPopUp, setEditPopUp, onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [requests, setRequests] = useState("");

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const editStation = () => {
    const errors = validateErrors(
      {
        name,
        description,
        latitude,
        longitude,
        price,
        discount,
        requests,
      },
      stationValidator,
    );
    if (errors) {
      return;
    }
    const payload = {
      name,
      description,
      latitude,
      longitude,
      price,
      discount,
      requests,
    };
    dispatch(showLoader("Please wait"));
    API.post("/api/station/edit", payload)
      .then(() => {
        dispatch(showSuccessToast("Station edited successfully"));
        onSuccess();
        setEditPopUp(false);
      })
      .catch(() => {
        dispatch(showErrorToast("Something went wrong"));
      })
      .finally(() => dispatch(hideLoader()));
  };

  useEffect(() => {
    if (!isObjectEmpty(station)) {
      setName(station?.name);
      setDescription(station?.description);
      setLatitude(station?.latitude);
      setLongitude(station?.longitude);
      setPrice(station?.price);
      setDiscount(station?.discount);
      setRequests(station?.requests);
    }
  }, [station]);

  return (
    <FormPopUp
      title="Edit station"
      open={editPopUp}
      setOpen={setEditPopUp}
      handleSubmit={editStation}
      submitButtonText="Edit"
      submitButtonColor="primary"
      maxWidth="xl"
      icon={<Edit />}
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
          <div className="flex sm:flex-row flex-col w-full justify-between sm:space-x-2 sm:space-y-0 space-y-4 md:mt-0 mt-6">
            <CustomInput
              label="Price"
              type="number"
              placeholder="Enter price"
              handleChange={(value) => clearError("price", value, setPrice)}
              value={price}
              error={getError("price")}
              required
              className="flex-1"
            />
          </div>
        </div>
        <div className="flex sm:flex-row flex-col w-full justify-between sm:space-x-2 pb-4 sm:space-y-0 space-y-4 sm:pt-0 -pt-2">
          <CustomInput
            label="Discount price / requests"
            placeholder="Enter discount price"
            type="number"
            handleChange={(value) => clearError("discount", value, setDiscount)}
            value={discount}
            error={getError("discount")}
            className="flex-1"
            required
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

export default EditChargePointPopUp;
