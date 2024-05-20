const changePhoneNumberValidator = {
  phoneNumber: {
    presence: {
      allowEmpty: false,
      message: "Phone number cannot be empty",
    },
  },
};

export default changePhoneNumberValidator;
