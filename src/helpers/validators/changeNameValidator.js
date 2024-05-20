const changeNameValidator = {
  name: {
    presence: {
      allowEmpty: false,
      message: "Name cannot be empty",
    },
  },
};

export default changeNameValidator;
