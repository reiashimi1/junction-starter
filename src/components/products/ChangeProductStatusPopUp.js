import FormPopUp from "@/core/modals/FormPopUp";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import { ChangeCircle } from "@mui/icons-material";
import { activeStatuses } from "@/helpers/constants";
import SelectInput from "@/core/inputs/SelectInput";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";

const ChangeProductStatusPopUp = ({
  changeStatusPopUp,
  setChangeStatusPopUp,
  selectedProduct,
  onSuccess,
}) => {
  const [status, setStatus] = useState(activeStatuses[0].value);

  const dispatch = useDispatch();

  const changeStatus = () => {
    dispatch(showLoader("Please wait"));
    API.patch(`/api/admin/products/${selectedProduct.id}/change-status`)
      .then(() => {
        onSuccess();
        setChangeStatusPopUp(false);
      })
      .catch(() => dispatch(showErrorToast("Could not change status")))
      .finally(() => dispatch(hideLoader()));
  };

  const disableButton = useMemo(
    () => status === selectedProduct.status,
    [status, selectedProduct.status],
  );

  useEffect(() => {
    if (!!selectedProduct) {
      setStatus(selectedProduct.status);
    }
  }, [selectedProduct]);

  return (
    <FormPopUp
      title="Change product status"
      open={changeStatusPopUp}
      setOpen={setChangeStatusPopUp}
      handleSubmit={changeStatus}
      submitButtonText="Change"
      submitButtonColor="secondary"
      icon={<ChangeCircle />}
      isButtonDisabled={disableButton}
    >
      <div className="my-8">
        <SelectInput
          label="Status"
          value={status}
          onChange={setStatus}
          id="status"
          items={activeStatuses}
          minWidth="300"
          className="flex flex-1"
        />
      </div>
    </FormPopUp>
  );
};

export default ChangeProductStatusPopUp;
