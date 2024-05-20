import { FormControl, Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import * as React from "react";

const CustomInput = ({
  label,
  type = "text",
  placeholder,
  handleChange,
  value,
  error,
  multiline = false,
  required = false,
  disabled = false,
  customLabel = true,
  ...props
}) => {
  return (
    <FormControl {...props}>
      {customLabel ? (
        <div className="text-indigo-900">
          {label}
          {required && <span className="ml-1 font-semibold">*</span>}
        </div>
      ) : (
        <InputLabel id={label}>{label}</InputLabel>
      )}
      <Input
        className="w-full"
        type={type}
        error={!!error}
        disabled={disabled}
        // required={required}
        multiline={multiline}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      {!!error && <span className="text-red-600 text-sm py-1">{error}</span>}
    </FormControl>
  );
};

export default CustomInput;
