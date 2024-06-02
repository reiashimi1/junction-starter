import CustomInput from "@/core/inputs/CustomInput";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { amountFormatter, isArrayEmpty } from "@/helpers/functions";
import useValidate from "@/hooks/useValidate";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import
  PaymentMethods from "@/components/cart/PaymentMethods";
import chargeCardValidator from "@/helpers/validators/chargeCardValidator";

const OrderDetails = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [amount, setAmount] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  // const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [cardNumber, setCardNumber] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");

  const user = useSelector((state) => state?.authSlice?.user);

  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const clearFields = () => {
    setDiscountCode("");
    setAmount("");
    // dispatch(emptyCart());
  };

  const submitOrder = () => {
    const errors = validateErrors(
      {
        selectedMethod,
        amount,
        discountCode,
        cardNumber,
      },
      chargeCardValidator,
    );
    if (errors) {
      return;
    }

    const payload = {
      // payment_method: paymentMethod.value,
      zip_code: discountCode,
      amount,
      card_number: cardNumber,
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

  // const disableSubmitButton = useMemo(() => isArrayEmpty(products), [products]);
  const disableSubmitButton = false;

  const amountWithDiscount = 0;

  useEffect(() => {
    // const currentDateAndTime = moment().format("YYYY-MM-DDTHH:mm");
    if (!!user) {
      setEmail(user.email);
      setFullName(user?.firstName + " " + user?.lastName);
      setCardNumber(user?.card_number || "");
    }
  }, [user]);

  return (
    <div className="bg-slate-100 p-4 w-full rounded-lg shadow-xl">
      <div className="text-xl text-indigo-800 text-center font-semibold">
        <div>
          Charge your card <CreditCardIcon />{" "}
        </div>
      </div>

      <div className="my-5 flex items-center justify-center">
        {/*<CustomToggleButton*/}
        {/*  choices={paymentMethods}*/}
        {/*  onChange={setPaymentMethod}*/}
        {/*/>*/}
      </div>
      <div className="flex flex-col">
        <div className="flex sm:flex-row flex-col my-4 sm:space-x-4 sm:space-y-0 space-y-4">
          <CustomInput
            label="Full Name"
            placeholder="Enter full name"
            handleChange={setFullName}
            value={fullName}
            disabled
            className="flex-1"
          />
          <CustomInput
            label="Email"
            placeholder="Enter email"
            handleChange={setEmail}
            value={email}
            type="email"
            disabled
            className="flex-1"
          />
        </div>
        <div className="flex sm:flex-row flex-col sm:my-4 sm:space-x-4 sm:space-y-0 space-y-4">
          <CustomInput
            label="Card Number"
            handleChange={(value) =>
              clearError("cardNumber", value, setCardNumber)
            }
            error={getError("cardNumber")}
            value={cardNumber}
            className="flex-1"
          />
        </div>
        <div className="flex sm:flex-row flex-col my-4 sm:space-x-4 sm:space-y-0 space-y-4">
          <CustomInput
            label={
              <div className="flex space-x-2">
                <div>Amount</div>
              </div>
            }
            placeholder="Enter amount"
            handleChange={(value) => clearError("amount", value, setAmount)}
            value={amount}
            error={getError("amount")}
            className="sm:w-2/3 sm:mr-3"
          />
          <CustomInput
            label="Discount Code"
            placeholder="Enter Discount Code"
            handleChange={(value) =>
              clearError("discountCode", value, setDiscountCode)
            }
            value={discountCode}
            error={getError("discountCode")}
            className="sm:w-1/3 sm:ml-3"
          />
        </div>
        <div className="flex flex-col my-4">
          <div>Payment Methods</div>
          <div className="mt-4">
            <PaymentMethods
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
          </div>
        </div>
        {/*<div className="my-4 font-semibold text-green-800 text-lg text-center">*/}
        {/*  Total Amount: {amountFormatter(total)}*/}
        {/*</div>*/}
        {/*{!!total && (*/}
        {/*  <div className="flex space-x-2 items-center justify-center text-green-800 font-bold text-lg">*/}
        {/*    <Tooltip*/}
        {/*      title="Discount applied only for cash on delivery option"*/}
        {/*      arrow*/}
        {/*    >*/}
        {/*      <InfoOutlined className="text-sky-800" />*/}
        {/*    </Tooltip>*/}
        {/*    <div>*/}
        {/*      Amount with discount applied:{" "}*/}
        {/*      {amountFormatter(amountWithDiscount)}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
        <div className="flex justify-center mt-8">
          <button
            onClick={submitOrder}
            disabled={disableSubmitButton}
            className={`px-4 py-3 w-1/2 rounded-xl text-white text-xl shadow-xl ${
              disableSubmitButton
                ? "cursor-not-allowed bg-gray-400"
                : "bg-indigo-400 hover:bg-gradient-to-r hover:from-darkSlateBlue-400 hover:to-darkMagneta-600 hover:scale-105"
            }`}
          >
            CHARGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
