"use client";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, Input, InputAdornment } from "@mui/material";
import * as React from "react";

const PasswordInput = ({
  id,
  value,
  handleInputChange,
  label,
  placeholder = "Enter password",
  error,
  inputClassName,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div {...props}>
      <div>
        {label}
        {required && <span className="ml-1 text-indigo-900">*</span>}
      </div>
      <FormControl className={inputClassName}>
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          error={!!error}
          onChange={(e) => handleInputChange(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleVisibility}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      {!!error && <span className="text-red-600 text-sm py-1">{error}</span>}
    </div>
  );
};

export default PasswordInput;
