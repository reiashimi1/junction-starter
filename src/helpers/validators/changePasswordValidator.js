const changePasswordValidator = {
  oldPassword: {
    presence: {
      allowEmpty: false,
      message: "Insert current password",
    },
  },
  newPassword: {
    presence: {
      allowEmpty: false,
      message: "New password cannot be empty",
    },
  },
  confirmNewPassword: {
    presence: {
      allowEmpty: false,
      message: "Confirm new password",
    },
    equality: {
      attribute: "newPassword",
      message: "Passwords must match",
      comparator: (confirmNewPassword, newPassword) => {
        return newPassword && confirmNewPassword === newPassword;
      },
    },
  },
};

export default changePasswordValidator;
