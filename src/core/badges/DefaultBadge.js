import { Chip } from "@mui/material";

const DefaultBadge = ({ label, color, width = "w-24" }) => {
  return (
    <div className={`capitalize ${width}`}>
      <Chip label={label} color={color} className="w-full" />
    </div>
  );
};

export default DefaultBadge;
