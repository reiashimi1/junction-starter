import { useCallback, useState } from "react";
import validate from "validate.js";

const useValidate = () => {
  const [errors, setErrors] = useState(null);

  const validateErrors = (attributes, constraints) => {
    const errors = validate(attributes, constraints, { fullMessages: false });
    setErrors(errors);
    return errors;
  };

  const clearError = (key, value, setFunction) => {
    setErrors((prev) => {
      return { ...prev, [key]: undefined };
    });
    if (setFunction) {
      setFunction(value);
    }
  };

  const clearErrors = useCallback(() => setErrors(null), []);

  const getError = (key) => {
    if (!errors) {
      return;
    }
    const errorKey = errors[key] ? errors[key][0] : undefined;
    return errorKey ? errorKey : undefined;
  };

  return { clearError, clearErrors, getError, validateErrors };
};

export default useValidate;
