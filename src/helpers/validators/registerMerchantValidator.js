import moment from "moment";

const registerMerchantValidator = {
  firstName: {
    presence: {
      allowEmpty: false,
      message: "First name cannot be empty",
    },
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: "Last name cannot be empty",
    },
  },
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
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: "Confirm password",
    },
    equality: {
      attribute: "password",
      message: "Passwords must match",
      comparator: (confirmPassword, password) => {
        return password && confirmPassword === password;
      },
    },
  },
  name: {
    presence: {
      allowEmpty: false,
      message: "Name cannot be empty",
    },
  },
};

export default registerMerchantValidator;
