import { Badge, IconButton, styled } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { showLoader } from "@/app/GlobalRedux/Features/loaderSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 5px",
  },
}));

const ScreenBadge = () => {
  // TODO CHANGE THIS....LIKE const productsCount = useSelector(getTotalQuantity)
  const productsCount = 0;

  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigation = () => {
    dispatch(showLoader("Please wait..."));
    router.push("/user/cart");
  };

  return (
    !!productsCount &&
    Number(productsCount) > 0 && (
      <div className="z-50 fixed right-5 bottom-5">
        <IconButton aria-label="cart" onClick={handleNavigation}>
          <StyledBadge
            badgeContent={productsCount}
            color="secondary"
            className="hover:bg-green-700 bg-green-400 rounded-full p-2"
          >
            <ShoppingCart
              className="text-white"
              sx={{ width: "30px", height: "30px" }}
            />
          </StyledBadge>
        </IconButton>
      </div>
    )
  );
};

export default ScreenBadge;
