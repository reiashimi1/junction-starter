const chargePointValidator = {
  type: {
    presence: {
      allowEmpty: false,
      message: "Type cannot be empty",
    },
  },
  price: {
    presence: {
      allowEmpty: false,
      message: "Price cannot be empty",
    },
  },
};

export default chargePointValidator;
