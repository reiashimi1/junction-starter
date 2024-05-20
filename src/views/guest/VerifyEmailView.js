"use client";

import Layout from "@/layouts/GuestLayout/Layout";
import * as React from "react";
import withoutAuth from "@/helpers/auth/guestWrapper";
import CustomInput from "@/core/inputs/CustomInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import useValidate from "@/hooks/useValidate";
import otpTokenValidator from "@/helpers/validators/otpTokenValidator";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import GuestAPI from "@/helpers/APIServices/GuestAPI";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const VerifyEmailView = () => {
  const [code, setCode] = useState("");
  const [resendCode, setResendCode] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const dispatch = useDispatch();
  const router = useRouter();

  const { clearError, getError, validateErrors } = useValidate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateErrors({ code }, otpTokenValidator);
    if (errors) {
      return;
    }
    const payload = { otp: code, email };
    dispatch(showLoader("Verifying"));
    GuestAPI.put("/api/otp/verify", payload)
      .then(() => {
        dispatch(showSuccessToast("Success"));
        router.push("/login");
      })
      .catch((error) => {
        dispatch(showErrorToast(error.response.data.message));
        setResendCode(true);
      })
      .finally(() => dispatch(hideLoader()));
  };

  const sendCode = () => {
    dispatch(showLoader("Sending code"));
    GuestAPI.post("/api/otp/send", { email })
      .then(() => {
        dispatch(showSuccessToast("The code has been sent"));
      })
      .catch((error) => {
        dispatch(showErrorToast(error.message));
      })
      .finally(() => dispatch(hideLoader()));
  };

  useEffect(() => {
    if (!!email) {
      sendCode();
    }
  }, [email]);

  return (
    <Layout>
      <div className="flex items-center justify-center ">
        {/*TODO: Keep eye on this: bg-gradient-to-b from-midnightBlue-700 to-indigo-800*/}
        <div
          className="flex items-center justify-center h-screen md:w-3/5 sm:w-5/6 w-full sm:px-0 px-3"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex flex-col">
            <form
              className="flex flex-col justify-center bg-white p-10 rounded-lg shadow-md rounded-lg"
              onSubmit={handleSubmit}
            >
              <div className="font-semibold mb-10">
                Enter the code sent in your email:
                <div className="text-center italic underline ml-2">{email}</div>
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
              {resendCode && (
                <div className="text-plum-700 transition scale-125 hover:scale-100 hover:bg-darkOrchid-700 hover:rounded-xl hover:shadow-lg">
                  <Button variant="inherit" onClick={sendCode}>
                    Resend code
                  </Button>
                </div>
              )}
              <Box sx={{ flex: "1 1 auto" }} />
              <div className="text-plum-700 transition scale-125 hover:scale-100 hover:bg-darkOrchid-700 hover:rounded-xl hover:shadow-lg">
                <Button variant="inherit" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withoutAuth(VerifyEmailView);
