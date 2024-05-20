import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const CustomCheckbox = ({ label, checked, onCheck, ...props }) => {
  const handleCheck = (e) => {
    onCheck(e.target.checked)
  };
  return (
    <div {...props}>
      <FormGroup>
        <FormControlLabel
          required
          control={<Checkbox value={checked} onChange={handleCheck} />}
          label={label}
        />
      </FormGroup>
    </div>
  );
};

export default CustomCheckbox;
