const forgotPasswordValidator = {
  email: {
    presence: {
      allowEmpty: false,
      message: "Email cannot be empty",
    },
    email: {
      message: "Not a valid email address",
    },
  },
};

export default forgotPasswordValidator;
