import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomToggleButton from "@/core/buttons/CustomToggleButton";
import { amountFormatter, isArrayEmpty } from "@/helpers/functions";
import { paymentMethods } from "@/helpers/constants";
import useValidate from "@/hooks/useValidate";
import makeOrderValidator from "@/helpers/validators/makeOrderValidator";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import { emptyCart } from "@/app/GlobalRedux/Features/shoppingCartSlice";
import { Tooltip } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

const OrderDetails = ({ products, total }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const user = useSelector((state) => state?.authSlice?.user);

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const clearFields = () => {
    setZipCode("");
    setAddress("");
    setDeliveryDate("");
    dispatch(emptyCart());
  };

  const submitOrder = () => {
    const errors = validateErrors(
      {
        paymentMethod,
        address,
        zipCode,
        deliveryDate,
        phoneNumber,
      },
      makeOrderValidator,
    );
    if (errors) {
      return;
    }
    const filteredProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
    }));
    const payload = {
      products: filteredProducts,
      payment_method: paymentMethod.value,
      zip_code: zipCode,
      delivery_time: deliveryDate,
      address,
      phone_number: phoneNumber,
    };
    dispatch(showLoader("Please wait..."));
    API.post("/api/user/make-an-order", payload)
      .then(() => {
        dispatch(showSuccessToast("Order created successfully"));
        clearFields();
      })
      .catch((err) => {
        dispatch(showErrorToast(err.response.data.message));
      })
      .finally(() => dispatch(hideLoader()));
  };

  const disableSubmitButton = useMemo(() => isArrayEmpty(products), [products]);

  const amountWithDiscount = useMemo(
    () => (paymentMethod.value === "cash" ? total * 0.9 : total),
    [total, paymentMethod],
  );

  useEffect(() => {
    // const currentDateAndTime = moment().format("YYYY-MM-DDTHH:mm");
    // setDeliveryDate(currentDateAndTime);
    if (!!user) {
      setEmail(user.email);
      setFullName(user.name);
      setPhoneNumber(user?.phone_number || "");
    }
  }, [user]);

  return (
    <div className="bg-slate-100 p-4 w-full rounded-lg shadow-xl">
      <div className="text-xl text-indigo-800 text-center font-semibold">
        Order details
      </div>
      <div className="my-5 flex items-center justify-center">
        <CustomToggleButton
          choices={paymentMethods}
          onChange={setPaymentMethod}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex sm:flex-row flex-col my-4 sm:space-x-4 sm:space-y-0 space-y-4">
          <CustomInput
            label="Email"
            placeholder="Enter email"
            handleChange={setEmail}
            value={email}
            type="email"
            disabled
            className="flex-1"
          />
          <CustomInput
            label="Full Name"
            placeholder="Enter full name"
            handleChange={setFullName}
            value={fullName}
            disabled
            className="flex-1"
          />
        </div>
        <div className="flex sm:flex-row flex-col sm:my-4 sm:space-x-4 sm:space-y-0 space-y-4">
          <CustomInput
            label="Phone Number"
            handleChange={(value) =>
              clearError("phoneNumber", value, setPhoneNumber)
            }
            error={getError("phoneNumber")}
            value={phoneNumber}
            className="flex-1"
          />
          <CustomInput
            label="Desirable delivery date/time"
            placeholder="Enter data/time"
            handleChange={(value) =>
              clearError("deliveryDate", value, setDeliveryDate)
            }
            value={deliveryDate}
            error={getError("deliveryDate")}
            type="datetime-local"
            className="flex-1"
          />
        </div>
        <div className="flex sm:flex-row flex-col my-4 sm:space-x-4 sm:space-y-0 space-y-4">
          <CustomInput
            label={
              <div className="flex space-x-2">
                <div>Address</div>
                <Tooltip
                  title="Only inside Halifax, Dartmouth, Bedford"
                  arrow
                  placement="top"
                >
                  <InfoOutlined className="text-slate-800" />
                </Tooltip>
              </div>
            }
            placeholder="Enter address"
            handleChange={(value) => clearError("address", value, setAddress)}
            value={address}
            error={getError("address")}
            className="sm:w-2/3 sm:mr-3"
          />
          <CustomInput
            label="ZIP Code"
            placeholder="Enter zip code"
            handleChange={(value) => clearError("zipCode", value, setZipCode)}
            value={zipCode}
            error={getError("zipCode")}
            className="sm:w-1/3 sm:ml-3"
          />
        </div>
        <div className="my-4 font-semibold text-green-800 text-lg text-center">
          Total Amount: {amountFormatter(total)}
        </div>
        {paymentMethod.value === "cash" && !!total && (
          <div className="flex space-x-2 items-center justify-center text-green-800 font-bold text-lg">
            <Tooltip
              title="Discount applied only for cash on delivery option"
              arrow
            >
              <InfoOutlined className="text-sky-800" />
            </Tooltip>
            <div>
              Amount with discount applied:{" "}
              {amountFormatter(amountWithDiscount)}
            </div>
          </div>
        )}
        <div className="flex justify-center mt-16">
          <button
            onClick={submitOrder}
            disabled={disableSubmitButton}
            className={`px-4 py-3 w-1/2 rounded-xl text-white text-xl shadow-xl ${
              disableSubmitButton
                ? "cursor-not-allowed bg-gray-400"
                : "bg-indigo-400 hover:bg-gradient-to-r hover:from-darkSlateBlue-400 hover:to-darkMagneta-600 hover:scale-105"
            }`}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
