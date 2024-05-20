import PageLoader from "@/layouts/PageLoader";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { hideLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import Toast from "@/layouts/Toast";
import AdminNavBar from "@/layouts/AdminLayout/AdminNavBar";

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
        <AdminNavBar>
          {children}
        </AdminNavBar>
        <PageLoader />
        <Toast />
      </div>
    )
  );
};

export default Layout;
