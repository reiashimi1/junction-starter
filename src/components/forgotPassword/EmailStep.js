import { useState } from "react";
import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LinkButton from "@/core/buttons/LinkButton";
import useValidate from "@/hooks/useValidate";
import forgotPasswordValidator from "@/helpers/validators/forgotPasswordValidator";
import { useDispatch } from "react-redux";
import GuestAPI from "@/helpers/APIServices/GuestAPI";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";

const EmailStep = ({ goNext }) => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { clearError, getError, validateErrors } = useValidate();

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const errors = validateErrors({ email }, forgotPasswordValidator);
    if (errors) {
      return;
    }
    const payload = { email };
    dispatch(showLoader("Please wait"));
    GuestAPI.post("/api/forgot-password", payload)
      .then((response) => {
        dispatch(showSuccessToast("Code sent successfully"));
        goNext(email);
      })
      .catch((error) => {
        dispatch(showErrorToast(error.response.data.message));
      })
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <div className="flex flex-col w-full">
      <form
        className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-md rounded-lg"
        onSubmit={handleNext}
      >
        <CustomInput
          label="Email"
          value={email}
          error={getError("email")}
          placeholder="Enter email"
          handleChange={(value) => clearError("email", value, setEmail)}
        />
        <LinkButton
          text="Back to login page"
          href="/login"
          className="mt-10 flex"
        />
      </form>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <div className="text-plum-700 transition scale-105 hover:scale-100 hover:bg-darkViolet-700 bg-darkOrchid-700 rounded-xl shadow-lg">
          <Button variant="inherit" onClick={handleNext}>
            Send code
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default EmailStep;
