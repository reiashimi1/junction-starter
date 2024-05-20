import { Button } from "@mui/material";

const SubmitButton = ({
  variant = "outlined",
  handleClick,
  text,
  disabled = false,
  icon,
  ...props
}) => {
  return (
    <div {...props}>
      <Button
        variant={variant}
        color="success"
        onClick={handleClick}
        disabled={disabled}
        type="submit"
      >
        {icon && icon}
        {text}
      </Button>
    </div>
  );
};

export default SubmitButton;
