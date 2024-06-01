import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Album } from "@mui/icons-material";

const SelectInput = ({
  id,
  minWidth = 120,
  label,
  items = [],
  value,
  onChange,
  required = false,
  disabled = false,
  customLabel = false,
  ...props
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div {...props}>
      <FormControl
        variant="standard"
        // sx={{ m: 1, minWidth }}
        sx={{ minWidth }}
        className="w-full"
      >
        {customLabel ? (
          <div className="text-indigo-900">
            {label}
            {required && <span className="ml-1">*</span>}
          </div>
        ) : (
          <InputLabel id={id}>{label}</InputLabel>
        )}
        <Select
          labelId={id}
          id={id}
          value={value}
          onChange={handleChange}
          label={label}
          disabled={disabled}
        >
          {/*<MenuItem value="">*/}
          {/*  <em>None</em>*/}
          {/*</MenuItem>*/}
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {!!item?.color && <Album className={`${item.color}`} />}
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
