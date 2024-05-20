import { Button } from "@mui/material";

const AddButton = ({
  variant = "outlined",
  handleClick,
  text,
  icon,
  ...props
}) => {
  return (
    <div {...props}>
      <Button variant={variant} onClick={handleClick} type="submit" className="w-full">
        {icon && icon}
        {text}
      </Button>
    </div>
  );
};

export default AddButton;
