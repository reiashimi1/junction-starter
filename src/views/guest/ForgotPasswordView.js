"use client";

import Layout from "@/layouts/GuestLayout/Layout";
import { useState } from "react";
import * as React from "react";
import OtpToken from "@/components/forgotPassword/OtpToken";
import CustomStepper from "@/core/CustomStepper";
import EmailStep from "@/components/forgotPassword/EmailStep";
import NewPassword from "@/components/forgotPassword/NewPassword";
import withoutAuth from "@/helpers/auth/guestWrapper";

const ForgotPasswordView = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = (userEmail) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (!!userEmail) {
      setEmail(userEmail);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center ">
        {/*TODO: Keep eye on this: bg-gradient-to-b from-midnightBlue-700 to-indigo-800*/}
        <div
          className="flex items-center justify-center h-screen md:w-2/5 sm:w-4/5 w-full sm:px-0 px-3"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CustomStepper
            steps={[
              {
                component: <EmailStep goNext={handleNext} />,
                label: "Enter Email",
              },
              {
                component: (
                  <OtpToken
                    goNext={handleNext}
                    goBack={handleBack}
                    email={email}
                  />
                ),
                label: "Otp Token",
              },
              {
                component: <NewPassword email={email} />,
                label: "Change password",
              },
            ]}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </div>
      </div>
    </Layout>
  );
};

export default withoutAuth(ForgotPasswordView);
