"use client";
import { useState } from "react";
import PasswordInput from "@/core/inputs/PasswordInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/app/GlobalRedux/Features/authSlice";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import Layout from "@/layouts/GuestLayout/Layout";
import AddButton from "@/core/buttons/AddButton";
import LinkButton from "@/core/buttons/LinkButton";
import GuestAPI from "@/helpers/APIServices/GuestAPI";
import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import useValidate from "@/hooks/useValidate";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import loginValidator from "@/helpers/validators/loginValidator";
import withoutAuth from "@/helpers/auth/guestWrapper";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const product = searchParams.get("product");

  const { clearError, getError, validateErrors } = useValidate();

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(email);
    const errors = validateErrors({ email, password }, loginValidator);
    if (errors) {
      dispatch(showErrorToast("Error"));
      return;
    }
    dispatch(showLoader("Please wait"));
    const payload = { email, password };
    GuestAPI.post("/api/login", payload)
      .then((response) => {
        const { data, message } = response.data;
        dispatch(login(data));
        dispatch(showSuccessToast(message));
        if (data?.user?.role === "admin") {
          router.push("/admin");
        } else {
          if (product != null) {
            router.push(`/user/products/${product}`);
          } else {
            router.push("/user/products");
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 469) {
          dispatch(showLoader("Redirecting to verification page"));
          router.push(`/verify?email=${email}`);
        } else {
          dispatch(showErrorToast(error.response.data.message));
        }
      })
      .finally(() => dispatch(hideLoader()));
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-midnightBlue-700 to-indigo-800">
        <div
          className="flex items-center justify-center h-screen md:w-2/5 sm:w-4/5 w-full sm:px-0 px-2"
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <form
            className="flex flex-col w-full justify-center bg-slate-100 p-10 rounded-lg shadow-md rounded-lg"
            // onSubmit={onSubmitForm}
          >
            <h3 className="text-center mb-5 font-lg font-bold uppercase">
              Welcome
            </h3>
            <CustomInput
              label="Email"
              value={email}
              placeholder="Enter email"
              error={getError("email")}
              handleChange={(value) =>
                clearError("email", value, (value) => setEmail(value.trim()))
              }
              className="my-3"
            />
            <div className="w-full my-3">
              <div>Password</div>
              <PasswordInput
                className="w-full mb-4 rounded"
                inputClassName="w-full"
                error={getError("password")}
                handleInputChange={(value) =>
                  clearError("password", value, setPassword)
                }
              />
            </div>
            <div className="flex justify-center w-full">
              <AddButton
                handleClick={onSubmitForm}
                text="Log in"
                className="my-5 w-2/5 flex justify-center items-center"
              />
            </div>
            <div className="flex justify-between w-full mt-8 text-violet-900">
              <LinkButton
                text="Forgot password?"
                href="/forgot-password"
                color="inherit"
                className="flex flex-1"
              />
              <LinkButton
                text="Register"
                href="/register"
                color="inherit"
                className="flex flex-1 justify-end"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default withoutAuth(LoginView);
