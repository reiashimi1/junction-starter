"use client";

import Layout from "@/layouts/GuestLayout/Layout";
import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import useValidate from "@/hooks/useValidate";
import { useDispatch } from "react-redux";
import { useState } from "react";
import AddButton from "@/core/buttons/AddButton";
import contactUsValidator from "@/helpers/validators/contactUsValidator";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import Footer from "@/components/landingPage/Footer";
import GuestAPI from "@/helpers/APIServices/GuestAPI";

const ContactUsView = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { clearError, getError, validateErrors } = useValidate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const payload = { name, email, message };
    const errors = validateErrors(payload, contactUsValidator);
    if (!!errors) {
      return;
    }
    dispatch(showLoader("Sending message..."));
    GuestAPI.post("/api/contact-us", payload)
      .then(() => {
        dispatch(showSuccessToast("Message sent successfully"));
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => dispatch(showErrorToast("Couldn't send message")))
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <Layout>
      <div className="pb-20 pt-12 flex justify-center">
        <div className="flex items-center justify-center md:w-1/2 sm:w-4/5 w-full pt-12 sm:pt-24">
          <div className="flex flex-col w-full md:mx-0 mx-4">
            <form
              className="w-full justify-center bg-slate-200 py-5 sm:px-8 px-4 rounded-lg shadow-md rounded-lg"
              onSubmit={handleSubmit}
            >
              <h3 className="text-center mb-12 font-lg font-bold">
                Share you ideas and opinions with us
              </h3>
              <div className="w-full flex flex-col items-center space-y-8">
                <CustomInput
                  label="Full Name"
                  value={name}
                  placeholder="Enter full name"
                  error={getError("name")}
                  handleChange={(value) => clearError("name", value, setName)}
                  required
                  className="flex-1 w-full"
                />
                <CustomInput
                  label="Email"
                  value={email}
                  type="email"
                  placeholder="Enter email"
                  error={getError("email")}
                  handleChange={(value) => clearError("email", value, setEmail)}
                  required
                  className="flex-1 w-full"
                />
                <CustomInput
                  label="Message"
                  value={message}
                  placeholder="Enter message"
                  error={getError("message")}
                  multiline
                  handleChange={(value) =>
                    clearError("message", value, setMessage)
                  }
                  required
                  className="flex-1 w-full"
                />
              </div>
              <div className="flex justify-center mt-8 w-full">
                <AddButton
                  text="Send message"
                  handleClick={handleSubmit}
                  className="w-1/2"
                  variant="contained"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};
export default ContactUsView;
