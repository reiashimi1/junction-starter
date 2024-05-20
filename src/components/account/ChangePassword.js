import * as React from "react";
import { useMemo, useState } from "react";
import SubmitButton from "@/core/buttons/SubmitButton";
import PasswordInput from "@/core/inputs/PasswordInput";
import API from "@/helpers/APIServices/API";
import useValidate from "@/hooks/useValidate";
import changePasswordValidator from "@/helpers/validators/changePasswordValidator";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";

const ChangePassword = ({ onSuccess }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const onSubmit = () => {
    const errors = validateErrors(
      { oldPassword, newPassword, confirmNewPassword },
      changePasswordValidator,
    );
    if (!!errors) {
      return;
    }
    dispatch(showLoader("Please wait..."));
    API.post("/api/user/change-password", {
      current_password: oldPassword,
      password: newPassword,
      password_confirmation: confirmNewPassword,
    })
      .then(() => {
        dispatch(showSuccessToast("Password changed successfully"));
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((err) => {
        dispatch(showErrorToast(err.response.data.message));
      })
      .finally(() => dispatch(hideLoader()));
  };

  const disabled = useMemo(
    () => !oldPassword && !newPassword && !confirmNewPassword,
    [oldPassword, newPassword, confirmNewPassword],
  );

  return (
    <div className="">
      <PasswordInput
        label="Old Password"
        inputClassName="w-full rounded"
        error={getError("oldPassword")}
        value={oldPassword}
        handleInputChange={(value) =>
          clearError("oldPassword", value, setOldPassword)
        }
        className="w-full"
      />
      <PasswordInput
        label="New Password"
        inputClassName="w-full rounded"
        error={getError("newPassword")}
        value={newPassword}
        handleInputChange={(value) =>
          clearError("newPassword", value, setNewPassword)
        }
        className="w-full my-5"
      />
      <PasswordInput
        label="Confirm Password"
        inputClassName="w-full rounded"
        error={getError("confirmNewPassword")}
        value={confirmNewPassword}
        handleInputChange={(value) =>
          clearError("confirmNewPassword", value, setConfirmNewPassword)
        }
        className="w-full"
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

export default ChangePassword;
