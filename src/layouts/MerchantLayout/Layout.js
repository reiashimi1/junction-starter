import PageLoader from "@/layouts/PageLoader";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { hideLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import Toast from "@/layouts/Toast";
import MerchantNavBar from "@/layouts/MerchantLayout/MerchantNavBar";

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
        <MerchantNavBar>
          {children}
        </MerchantNavBar>
        <PageLoader />
        <Toast />
      </div>
    )
  );
};

export default Layout;
