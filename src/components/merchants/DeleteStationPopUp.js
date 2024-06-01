import FormPopUp from "@/core/modals/FormPopUp";
import * as React from "react";
import { Delete } from "@mui/icons-material";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import { useDispatch } from "react-redux";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";

const DeleteStationPopUp = ({
  deletePopUp,
  setDeletePopUp,
  selectedRow,
  merchantId,
  onSuccess,
}) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(showLoader("Please wait"));
    API.delete(`/merchants/${merchantId}/stations/${selectedRow.id}`)
      .then(() => {
        dispatch(showSuccessToast("Station deleted successfully"));
        onSuccess();
        setDeletePopUp(false);
      })
      .catch(() => dispatch(showErrorToast("Could not delete station")))
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <FormPopUp
      title="Delete station"
      open={deletePopUp}
      setOpen={setDeletePopUp}
      handleSubmit={deleteProduct}
      submitButtonText="Delete"
      submitButtonColor="error"
      icon={<Delete />}
    >
      <div className="my-4">
        Are you sure you want to delete station{" "}
        <span className="font-semibold italic">{selectedRow?.name}</span>?
      </div>
    </FormPopUp>
  );
};

export default DeleteStationPopUp;
