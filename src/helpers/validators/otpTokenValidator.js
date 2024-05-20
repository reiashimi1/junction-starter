const otpTokenValidator = {
  code: {
    presence: {
      allowEmpty: false,
      message: "Enter code sent via email",
    },
  },
};

export default otpTokenValidator;
