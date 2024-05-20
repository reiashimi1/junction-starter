import { Button } from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { showLoader } from "@/app/GlobalRedux/Features/loaderSlice";

const LinkButton = ({
  variant = "text",
  color = "secondary",
  text,
  bold = false,
  href,
  target = "_self",
  showWaitLoader = true,
  ...props
}) => {
  const dispatch = useDispatch();

  const handleNavigation = () => {
    if (showWaitLoader) {
      dispatch(showLoader(`Please wait...`));
    }
  };

  return (
    <div {...props}>
      <Link href={href} onClick={handleNavigation} target={target}>
        <Button variant={variant} color={color}>
          <div
            className={`normal-case hover:underline ${bold ? "font-bold" : ""}`}
          >
            {text}
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default LinkButton;
