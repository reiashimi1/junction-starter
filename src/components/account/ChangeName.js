import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import SubmitButton from "@/core/buttons/SubmitButton";
import API from "@/helpers/APIServices/API";
import useValidate from "@/hooks/useValidate";
import changeNameValidator from "@/helpers/validators/changeNameValidator";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";

const ChangeName = ({ email, name, phoneNumber, onSuccess }) => {
  const [fullName, setFullName] = useState("");

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const onSubmit = () => {
    const errors = validateErrors({ name: fullName }, changeNameValidator);
    if (!!errors) {
      return;
    }
    const payload = { name: fullName, email };
    dispatch(showLoader("Please wait..."));
    API.post("/api/user/update-profile", payload)
      .then(() => {
        onSuccess(fullName, email, phoneNumber);
        dispatch(showSuccessToast("Name changed successfully"));
        setFullName("");
      })
      .catch((err) => {
        dispatch(showErrorToast(err.response.data.message));
      })
      .finally(() => dispatch(hideLoader()));
  };

  const disabled = useMemo(() => name === fullName, [name, fullName]);

  useEffect(() => {
    setFullName(name);
  }, [name]);

  return (
    <div>
      <CustomInput
        label="Full Name"
        placeholder="Change full name"
        handleChange={(value) => clearError("name", value, setFullName)}
        error={getError("name")}
        value={fullName}
        className="md:flex-1 mb-5 w-full"
      />
      <div className="flex justify-end mt-8">
        <SubmitButton
          text="Change"
          disabled={disabled}
          handleClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default ChangeName;
