const contactUsValidator = {
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
  message: {
    presence: {
      allowEmpty: false,
      message: "Message cannot be empty",
    },
  },
};

export default contactUsValidator;
