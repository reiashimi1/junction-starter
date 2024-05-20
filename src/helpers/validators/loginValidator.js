const loginValidator = {
  email: {
    presence: {
      allowEmpty: false,
      message: "Email cannot be empty",
    },
    email: {
      message: "Not a valid email address",
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "Password cannot be empty",
    },
  },
};

export default loginValidator;
