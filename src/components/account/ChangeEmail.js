import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import SubmitButton from "@/core/buttons/SubmitButton";
import API from "@/helpers/APIServices/API";
import useValidate from "@/hooks/useValidate";
import changeEmailValidator from "@/helpers/validators/changeEmailValidator";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import { useDispatch } from "react-redux";

const ChangeEmail = ({ email, name, onSuccess }) => {
  const [newEmail, setNewEmail] = useState("");

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const onSubmit = () => {
    const errors = validateErrors({ email: newEmail }, changeEmailValidator);
    if (!!errors) {
      return;
    }
    const payload = { name, email: newEmail };
    dispatch(showLoader("Please wait..."));
    API.post("/api/user/update-profile", payload)
      .then(() => {
        onSuccess(name, newEmail);
        dispatch(showSuccessToast("Email changed successfully"));
        setNewEmail("");
      })
      .catch((err) => {
        dispatch(showErrorToast(err.response.data.message));
      })
      .finally(() => dispatch(hideLoader()));
  };

  const disabled = useMemo(() => email === newEmail, [email, newEmail]);

  useEffect(() => {
    setNewEmail(email);
  }, [email]);

  return (
    <div>
      <CustomInput
        label="Email"
        placeholder="Change email"
        handleChange={(value) => clearError("email", value, setNewEmail)}
        value={newEmail}
        error={getError("email")}
        type="email"
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

export default ChangeEmail;
