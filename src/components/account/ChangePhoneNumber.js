import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import SubmitButton from "@/core/buttons/SubmitButton";
import API from "@/helpers/APIServices/API";
import useValidate from "@/hooks/useValidate";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import changePhoneNumberValidator from "@/helpers/validators/changePhoneNumberValidator";

const ChangePhoneNumber = ({ email, name, oldPhoneNumber, onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const onSubmit = () => {
    const errors = validateErrors({ phoneNumber }, changePhoneNumberValidator);
    if (!!errors) {
      return;
    }
    const payload = { phone_number: phoneNumber, name, email };
    dispatch(showLoader("Please wait..."));
    API.post("/api/user/update-profile", payload)
      .then(() => {
        onSuccess(name, email, phoneNumber);
        dispatch(showSuccessToast("Name changed successfully"));
        setPhoneNumber("");
      })
      .catch((err) => {
        dispatch(showErrorToast(err.response.data.message));
      })
      .finally(() => dispatch(hideLoader()));
  };

  const disabled = useMemo(
    () => oldPhoneNumber === phoneNumber,
    [oldPhoneNumber, phoneNumber],
  );

  useEffect(() => {
    setPhoneNumber(oldPhoneNumber);
  }, [oldPhoneNumber]);

  return (
    <div>
      <CustomInput
        label="Phone Number"
        placeholder="Change phone number"
        handleChange={(value) =>
          clearError("phoneNumber", value, setPhoneNumber)
        }
        error={getError("phoneNumber")}
        value={phoneNumber}
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

export default ChangePhoneNumber;
