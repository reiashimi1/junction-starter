const forgotPasswordSecondValidator = {
  password: {
    presence: {
      allowEmpty: false,
      message: "New password cannot be empty",
    },
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: "Confirm new password",
    },
    equality: {
      attribute: "password",
      message: "Passwords must match",
      comparator: (confirmPassword, password) => {
        return password && confirmPassword === password;
      },
    },
  },
};

export default forgotPasswordSecondValidator;
