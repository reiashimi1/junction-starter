const otpTokenValidator = {
  code: {
    presence: {
      allowEmpty: false,
      message: "Enter code sent via email",
    },
    equality: {
      attribute: "code",
      message: "Code is not correct",
      comparator: (code) => {
        return code === "2869";
      },
    },
  },
};

export default otpTokenValidator;
