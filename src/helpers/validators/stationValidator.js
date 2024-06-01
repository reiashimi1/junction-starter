const stationValidator = {
  name: {
    presence: {
      allowEmpty: false,
      message: "Name cannot be empty",
    },
  },
  address: {
    presence: {
      allowEmpty: false,
      message: "Address cannot be empty",
    },
  },
  latitude: {
    presence: {
      allowEmpty: false,
      message: "Latitude cannot be empty",
    },
  },
  longitude: {
    presence: {
      allowEmpty: false,
      message: "Longitude cannot be empty",
    },
  },
};

export default stationValidator;
