import NavBar from "@/layouts/UserLayout/NavBar";
import { userMenuItems } from "@/helpers/menuItems";
import PageLoader from "@/layouts/PageLoader";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { hideLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import Toast from "@/layouts/Toast";

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoader());
    setMounted(true);
  }, [dispatch]);

  return (
    mounted && (
      <div>
        <NavBar menuItems={userMenuItems}>
          {children}
        </NavBar>
        <PageLoader />
        <Toast />
      </div>
    )
  );
};

export default Layout;
