import NavBar from "@/layouts/GuestLayout/NavBar";
import PageLoader from "@/layouts/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { hideLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import Toast from "@/layouts/Toast";
import {
  Apps,
  ContactPhone,
  Dashboard,
  Inventory,
  ManageAccounts,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { isObjectEmpty } from "@/helpers/functions";
import { getTotalQuantity } from "@/app/GlobalRedux/actions";

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.authSlice?.user);
  const productsCount = useSelector(getTotalQuantity);

  const guestMenuItems = useMemo(
    () => [
      {
        label: "Home",
        route: "/",
        icon: <Apps />,
      },
      {
        label: "Admin Dashboard",
        route: "/admin",
        icon: <Dashboard />,
        hide: isObjectEmpty(user) || user?.role !== "admin",
      },
      {
        label: "Dashboard",
        route:
          isObjectEmpty(user) || user?.role === "admin"
            ? "/admin/dashboard"
            : user?.role === "merchant"
              ? "/merchant/dashboard"
              : "/",
        icon: <Inventory />,
        hide: isObjectEmpty(user),
      },
      // {
      //   label: "Contact us",
      //   route: "/contact-us",
      //   icon: <ContactPhone />,
      //   // hide: !isObjectEmpty(user) && user?.role === "admin",
      // },
      {
        label: "Login / Register",
        route: "/login",
        icon: <ManageAccounts />,
        hide: !isObjectEmpty(user),
      },
    ],
    [user],
  );

  useEffect(() => {
    dispatch(hideLoader());
    setMounted(true);
  }, [dispatch]);

  return (
    mounted && (
      <div className="relative">
        <NavBar menuItems={guestMenuItems}>{children}</NavBar>
        <PageLoader />
        <Toast />
      </div>
    )
  );
};

export default Layout;
