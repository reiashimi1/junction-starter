const categoryValidator = {
  name: {
    presence: {
      allowEmpty: false,
      message: "Name cannot be empty",
    },
  },
  description: {
    presence: {
      allowEmpty: false,
      message: "Description cannot be empty",
    },
  },
};

export default categoryValidator;
