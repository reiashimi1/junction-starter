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
  onSuccess,
}) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(showLoader("Please wait"));
    API.delete(`/api/admin/products/${selectedRow.id}`)
      .then(() => {
        dispatch(showSuccessToast("Product deleted successfully"));
        onSuccess();
        setDeletePopUp(false);
      })
      .catch(() => dispatch(showErrorToast("Could not delete product")))
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <FormPopUp
      title="Delete product"
      open={deletePopUp}
      setOpen={setDeletePopUp}
      handleSubmit={deleteProduct}
      submitButtonText="Delete"
      submitButtonColor="error"
      icon={<Delete />}
    >
      <div className="my-4">
        Are you sure you want to delete product{" "}
        <span className="font-semibold italic">{selectedRow?.name}</span>?
      </div>
      <div className="my-4">
        This will affect also the existing orders that contain this product
      </div>
      <div>Maybe you can try to change the product status instead</div>
    </FormPopUp>
  );
};

export default DeleteStationPopUp;
