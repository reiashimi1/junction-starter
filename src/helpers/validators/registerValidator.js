import moment from "moment";

const registerValidator = {
  name: {
    presence: {
      allowEmpty: false,
      message: "Name cannot be empty",
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
  birthday: {
    presence: {
      allowEmpty: false,
      message: "Birthday cannot be empty",
    },
    equality: {
      attribute: "birthday",
      message: "Should be at least 18 years old",
      comparator: (birthday) => {
        return moment().diff(moment(birthday), "years") >= 18;
      },
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
  city: {
    presence: {
      allowEmpty: false,
      message: "City cannot be empty",
    },
  },
  agreeTerms: {
    equality: {
      attribute: "agreeTerms",
      message: "Agree to our terms and conditions to continue",
      comparator: (agreeTerms) => {
        return agreeTerms === true;
      },
    },
  },
};

export default registerValidator;
