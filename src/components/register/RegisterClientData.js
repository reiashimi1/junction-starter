import CustomInput from "@/core/inputs/CustomInput";
import PasswordInput from "@/core/inputs/PasswordInput";
import LinkButton from "@/core/buttons/LinkButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import useValidate from "@/hooks/useValidate";
import registerClientValidator from "@/helpers/validators/registerClientValidator";
import GuestAPI from "@/helpers/APIServices/GuestAPI";
// import SelectInput from "@/core/inputs/SelectInput";
// import { cities } from "@/helpers/constants";
// import CustomCheckbox from "@/core/inputs/CustomCheckbox";

const RegisterClientData = ({ goNext }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [birthday, setBirthday] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [city, setCity] = useState(cities[0].value);
  // const [agreeTerms, setAgreeTerms] = useState(false);

  const { clearError, getError, validateErrors } = useValidate();

  const dispatch = useDispatch();

  const handleNext = () => {
    goNext(email);
    const errors = validateErrors(
      {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      },
      registerClientValidator,
    );
    if (errors) {
      return;
    }
    dispatch(showLoader("Please wait"));
    const payload = {
      firstName,
      lastName,
      email,
      password,
    };
    GuestAPI.post("/auth/register", payload)
      .then((response) => {
        goNext(email);
        dispatch(showSuccessToast("The code has been sent"));
      })
      .catch((error) => {
        dispatch(showErrorToast(error.response.data.message));
      })
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <div className="flex flex-col">
      <form
        className="w-full justify-center bg-white py-5 sm:px-8 px-4 rounded-lg shadow-md rounded-lg"
        onSubmit={handleNext}
      >
        <h3 className="text-center mb-5 font-lg font-bold">
          Register to GiraffEV as client
        </h3>
        <div className="w-full flex sm:flex-row flex-col justify-between sm:space-x-10 my-4 sm:space-y-0 space-y-4">
          <CustomInput
            label="First Name"
            value={firstName}
            placeholder="Enter first name"
            error={getError("firstName")}
            handleChange={(value) =>
              clearError("firstName", value, setFirstName)
            }
            required
            className="flex-1"
          />
          <CustomInput
            label="Last Name"
            value={lastName}
            placeholder="Enter last name"
            error={getError("lastName")}
            handleChange={(value) => clearError("lastName", value, setLastName)}
            required
            className="flex-1"
          />
        </div>
        <div className="w-full flex sm:flex-row flex-col justify-between sm:space-x-10 my-4 sm:space-y-0 space-y-4">
          <CustomInput
            label="Email"
            value={email}
            placeholder="Enter email"
            error={getError("email")}
            handleChange={(value) => clearError("email", value, setEmail)}
            required
            className="flex-1"
          />
        </div>
        <div className="w-full flex sm:flex-row flex-col justify-between sm:space-x-10 mb-4 sm:mt-4 mt-0">
          <PasswordInput
            className="w-full mb-4 rounded"
            inputClassName="w-full"
            value={password}
            label="Password"
            required
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
            required
            handleInputChange={(value) =>
              clearError("confirmPassword", value, setConfirmPassword)
            }
          />
        </div>
        {/*<div className="w-full flex sm:flex-row flex-col justify-between sm:space-x-10 mb-5 sm:mt-4 mt-0 sm:space-y-0 space-y-4">*/}
        {/*  <CustomInput*/}
        {/*    label="Birthday"*/}
        {/*    value={birthday}*/}
        {/*    type="date"*/}
        {/*    placeholder="Enter birthday"*/}
        {/*    error={getError("birthday")}*/}
        {/*    handleChange={(value) => clearError("birthday", value, setBirthday)}*/}
        {/*    className="flex-1"*/}
        {/*  />*/}
        {/*  <CustomInput*/}
        {/*    label="Phone number"*/}
        {/*    value={phoneNumber}*/}
        {/*    placeholder="Enter phone number"*/}
        {/*    error={getError("phoneNumber")}*/}
        {/*    type="number"*/}
        {/*    handleChange={(value) =>*/}
        {/*      clearError("phoneNumber", value, setPhoneNumber)*/}
        {/*    }*/}
        {/*    className="flex-1 appearance-none"*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className="w-full flex sm:flex-row flex-col justify-between sm:space-x-10 mb-5 sm:mt-4 mt-0">*/}
        {/*  <SelectInput*/}
        {/*    label="City"*/}
        {/*    value={city}*/}
        {/*    onChange={setCity}*/}
        {/*    id="city"*/}
        {/*    items={cities}*/}
        {/*    minWidth="300"*/}
        {/*    required*/}
        {/*    className="flex flex-1"*/}
        {/*  />*/}
        {/*  <div className="flex flex-1 flex-col">*/}
        {/*    <CustomCheckbox*/}
        {/*      label="Agree to Terms and Conditions"*/}
        {/*      checked={agreeTerms}*/}
        {/*      onCheck={setAgreeTerms}*/}
        {/*      className="sm:mt-0 mt-4 sm:justify-start justify-center"*/}
        {/*    />*/}
        {/*    <div className="flex justify-end text-darkSlateBlue-800">*/}
        {/*      <LinkButton*/}
        {/*        text="Read here"*/}
        {/*        href="/terms-and-conditions"*/}
        {/*        variant="inherit"*/}
        {/*        className="justify-end"*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <LinkButton
          text="Already have an account? Click to log in."
          href="/login"
          className="flex flex-1 justify-end mt-12"
        />
        <div className="flex justify-between w-full text-violet-900">
          <LinkButton
            text="Register as merchant"
            href="/register/merchant"
            color="inherit"
            className="flex flex-1 justify-end"
          />
        </div>
      </form>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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

export default RegisterClientData;
