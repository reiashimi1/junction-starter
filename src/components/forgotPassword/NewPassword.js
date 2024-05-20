import PasswordInput from "@/core/inputs/PasswordInput";
import * as React from "react";
import { useState } from "react";
import useValidate from "@/hooks/useValidate";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import { useDispatch } from "react-redux";
import forgotPasswordSecondValidator from "@/helpers/validators/forgotPasswordSecondValidator";
import { useRouter } from "next/navigation";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import GuestAPI from "@/helpers/APIServices/GuestAPI";

const NewPassword = ({email}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { clearError, getError, validateErrors } = useValidate();

  const handleNext = (e) => {
    e.preventDefault();
    const errors = validateErrors(
      { password, confirmPassword },
      forgotPasswordSecondValidator,
    );
    if (errors) {
      return;
    }
    const payload = { password, password_confirmation: confirmPassword, email };
    dispatch(showLoader("Please wait"));
    GuestAPI.post("/api/reset-password", payload)
      .then((response) => {
        dispatch(showSuccessToast("Success"));
        router.push("/login");
      })
      .catch((error) => {
        dispatch(showErrorToast(error.message));
      })
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <div className="flex flex-col w-full">
      <form
        className="flex flex-col justify-center bg-white p-10 rounded-lg shadow-md rounded-lg"
        onSubmit={handleNext}
      >
        <div className="italic font-semibold mb-10">Enter the new password</div>
        <PasswordInput
          className="w-full mb-4 rounded"
          inputClassName="w-full"
          value={password}
          label="Password"
          error={getError("password")}
          handleInputChange={(value) =>
            clearError("password", value, setPassword)
          }
        />
        <PasswordInput
          className="w-full rounded"
          inputClassName="w-full"
          label="Confirm password"
          value={confirmPassword}
          error={getError("confirmPassword")}
          handleInputChange={(value) =>
            clearError("confirmPassword", value, setConfirmPassword)
          }
        />
      </form>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <div className="text-plum-700 transition scale-125 hover:scale-100 hover:bg-darkOrchid-700 hover:rounded-xl hover:shadow-lg">
          <Button variant="inherit" onClick={handleNext}>
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default NewPassword;
