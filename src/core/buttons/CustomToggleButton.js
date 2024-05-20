import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { isArrayEmpty } from "@/helpers/functions";

const CustomToggleButton = ({ choices = [], onChange }) => {
  const [alignment, setAlignment] = useState(null);

  const handleChange = (event, newAlignment) => {
    if (!newAlignment?.disabled && newAlignment != null) {
      setAlignment(newAlignment);
      onChange(newAlignment);
    }
  };

  useEffect(() => {
    if (!isArrayEmpty(choices)) {
      setAlignment(choices[0]);
    }
  }, [choices]);

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {choices.map((choice, index) =>
        choice?.disabled ? (
          <Tooltip key={index} title="This option is disabled for the moment" arrow>
            <ToggleButton value={choice}>
              {choice.label}
            </ToggleButton>
          </Tooltip>
        ) : (
          <ToggleButton key={index} value={choice}>
            {choice.label}
          </ToggleButton>
        ),
      )}
    </ToggleButtonGroup>
  );
};

export default CustomToggleButton;
