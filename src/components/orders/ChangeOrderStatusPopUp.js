import FormPopUp from "@/core/modals/FormPopUp";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import { ChangeCircle } from "@mui/icons-material";
import SelectInput from "@/core/inputs/SelectInput";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import CustomInput from "@/core/inputs/CustomInput";
import useValidate from "@/hooks/useValidate";

const ChangeOrderStatusPopUp = ({
  changeStatusPopUp,
  setChangeStatusPopUp,
  selectedOrder,
  onSuccess,
}) => {
  const [status, setStatus] = useState(1);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const changeStatus = () => {
    // const errors = validateErrors(
    //   { status, description },
    //   changeOrderStatusValidator,
    // );
    // if (errors) {
    //   return;
    // }
    const payload = { status, reason: description };
    dispatch(showLoader("Please wait"));
    API.post(`/api/admin/orders/${selectedOrder.id}/update-status`, payload)
      .then(() => {
        onSuccess();
        setChangeStatusPopUp(false);
      })
      .catch(() => dispatch(showErrorToast("Could not change status")))
      .finally(() => dispatch(hideLoader()));
  };

  const disableButton = useMemo(
    () => status === selectedOrder.status,
    [status, selectedOrder.status],
  );

  useEffect(() => {
    if (!!selectedOrder) {
      setStatus(selectedOrder.status);
      setDescription(selectedOrder.reason);
    }
  }, [selectedOrder]);

  return (
    <FormPopUp
      title="Change order status"
      open={changeStatusPopUp}
      setOpen={setChangeStatusPopUp}
      handleSubmit={changeStatus}
      submitButtonText="Change"
      submitButtonColor="primary"
      icon={<ChangeCircle />}
      isButtonDisabled={disableButton}
    >
      <div className="flex flex-col my-8">
        {/*<SelectInput*/}
        {/*  label="Status"*/}
        {/*  value={status}*/}
        {/*  onChange={setStatus}*/}
        {/*  id="status"*/}
        {/*  items={orderStatuses}*/}
        {/*  minWidth="300"*/}
        {/*  className="flex flex-1 mb-4"*/}
        {/*/>*/}
        {status === "cancelled" && (
          <CustomInput
            label="Description"
            placeholder="Enter description"
            handleChange={(value) =>
              clearError("description", value, setDescription)
            }
            value={description}
            error={getError("description")}
            disabled={disableButton}
            multiline
            className="flex flex-1"
          />
        )}
      </div>
    </FormPopUp>
  );
};

export default ChangeOrderStatusPopUp;
