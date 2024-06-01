import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/GlobalRedux/Features/authSlice";

const withoutAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const accessToken = useSelector((state) => state?.authSlice?.accessToken);
    const role = useSelector((state) => state?.authSlice?.user?.role);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      if (!!accessToken) {
        if (role === "admin") {
          router.push("/admin");
        } else if (role == "merchant") {
          router.push("/merchant");
        } else if (role === "user") {
          router.push("/user");
        }
      } else {
        dispatch(logout());
      }
    }, [accessToken, role, router, dispatch]);

    return accessToken ? null : <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withoutAuth;
