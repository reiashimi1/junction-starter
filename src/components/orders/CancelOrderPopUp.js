import FormPopUp from "@/core/modals/FormPopUp";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import { ChangeCircle } from "@mui/icons-material";
import { orderStatuses } from "@/helpers/constants";
import SelectInput from "@/core/inputs/SelectInput";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import CustomInput from "@/core/inputs/CustomInput";
import useValidate from "@/hooks/useValidate";
import changeOrderStatusValidator from "@/helpers/validators/changeOrderStatusValidator";

const CancelOrderPopUp = ({
  changeStatusPopUp,
  setChangeStatusPopUp,
  selectedOrder,
  onSuccess,
}) => {
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const changeStatus = () => {
    const errors = validateErrors(
      { status, description },
      changeOrderStatusValidator,
    );
    if (errors) {
      return;
    }
    const payload = { order_id: selectedOrder.id, reason: description };
    dispatch(showLoader("Please wait"));
    API.patch(`/api/user/cancel-my-order`, payload)
      .then(() => {
        onSuccess();
        setChangeStatusPopUp(false);
        dispatch(showLoader("Order cancelled"));
      })
      .catch(() => dispatch(showErrorToast("Could not change status")))
      .finally(() => dispatch(hideLoader()));
  };

  useEffect(() => {
    if (!!selectedOrder) {
      setStatus("cancelled");
    }
  }, [selectedOrder]);

  return (
    <FormPopUp
      title="Change order status"
      open={changeStatusPopUp}
      setOpen={setChangeStatusPopUp}
      handleSubmit={changeStatus}
      submitButtonText="Cancel"
      submitButtonColor="error"
      icon={<ChangeCircle />}
      isButtonDisabled={!description}
    >
      <div className="flex flex-col my-8">
        <SelectInput
          label="Status"
          value={status}
          onChange={setStatus}
          id="status"
          items={orderStatuses}
          disabled
          minWidth="300"
          className="flex flex-1 mb-4"
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
          required
          className="flex flex-1"
        />
      </div>
    </FormPopUp>
  );
};

export default CancelOrderPopUp;
