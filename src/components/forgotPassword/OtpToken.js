import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomInput from "@/core/inputs/CustomInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import useValidate from "@/hooks/useValidate";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import otpTokenValidator from "@/helpers/validators/otpTokenValidator";
import GuestAPI from "@/helpers/APIServices/GuestAPI";

const OtpToken = ({ goNext, goBack, email }) => {
  const [code, setCode] = useState("");

  const dispatch = useDispatch();

  const { clearError, getError, validateErrors } = useValidate();

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const errors = validateErrors({ code }, otpTokenValidator);
    if (errors) {
      return;
    }
    const payload = { code, email };
    GuestAPI.post("/api/confirm-code", payload)
      .then(() => {
        dispatch(showSuccessToast("Code verified"));
        goNext();
      })
      .catch((error) => {
        dispatch(showErrorToast(error.response.data.message));
      })
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <div className="flex flex-col">
      <form
        className="flex flex-col justify-center bg-white p-10 rounded-lg shadow-md rounded-lg"
        onSubmit={handleNext}
      >
        <div className="italic font-semibold mb-10">
          Enter the code sent in your email
        </div>
        <CustomInput
          label="Otp Code"
          placeholder="Enter code"
          error={getError("code")}
          value={code}
          handleChange={(value) => clearError("code", value, setCode)}
          className="flex-1 sm:mt-0 mt-5"
        />
      </form>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <div className="text-white transition scale-125 hover:scale-100 hover:bg-slate-300 hover:rounded-xl hover:shadow-lg">
          <Button color="inherit" onClick={goBack}>
            Back
          </Button>
        </div>
        <Box sx={{ flex: "1 1 auto" }} />
        <div className="text-plum-700 transition scale-125 hover:scale-100 hover:bg-darkOrchid-700 hover:rounded-xl hover:shadow-lg">
          <Button variant="inherit" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default OtpToken;
