import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const CustomStepper = ({ steps, activeStep, setActiveStep }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = { style: { color: "white" } };
          return (
            <Step
              key={step.label}
              disabled={index !== activeStep}
              {...stepProps}
            >
              <StepLabel>
                <div className="text-white">
                  {activeStep === index && step.label}
                </div>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className="flex items-center justify-center mt-5">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${index === activeStep ? "block" : "hidden"} w-full sm:px-0 px-8`}
          >
            {step.component}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CustomStepper;
