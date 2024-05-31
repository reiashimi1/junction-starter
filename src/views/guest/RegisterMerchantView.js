"use client";

import Layout from "@/layouts/GuestLayout/Layout";
import CustomStepper from "@/core/CustomStepper";
import OtpToken from "@/components/register/OtpToken";
import RegisterSuccess from "@/components/register/RegisterSuccess";
import * as React from "react";
import withoutAuth from "@/helpers/auth/guestWrapper";
import { useState } from "react";
import RegisterMerchantData from "@/components/register/RegisterMerchantData";

const RegisterMerchantView = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");

  const handleNext = (userEmail) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (!!userEmail) {
      setEmail(userEmail);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center">
        <div
          className="flex items-center justify-center md:w-1/2 sm:w-4/5 w-full pt-32 pb-8"
          // style={{
          //   position: "absolute",
          //   top: "50%",
          //   left: "50%",
          //   transform: "translate(-50%, -50%)",
          // }}
        >
          <CustomStepper
            steps={[
              {
                component: <RegisterMerchantData goNext={handleNext} />,
                label: "Information",
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
                component: <RegisterSuccess />,
                label: "Success",
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

export default withoutAuth(RegisterMerchantView);
