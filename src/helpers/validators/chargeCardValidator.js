const chargeCardValidator = {
  selectedMethod: {
    presence: {
      allowEmpty: false,
      message: "Payment method cannot be empty",
    },
  },
  amount: {
    presence: {
      allowEmpty: false,
      message: "Amount cannot be empty",
    },
  },
  discountCode: {
    presence: {
      allowEmpty: false,
      message: "Discount code cannot be empty",
    },
  },
  cardNumber: {
    presence: {
      allowEmpty: false,
      message: "Card number cannot be empty",
    },
  },
};

export default chargeCardValidator;
