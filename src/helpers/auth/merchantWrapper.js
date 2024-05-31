import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/GlobalRedux/Features/authSlice";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const accessToken = useSelector((state) => state?.authSlice?.accessToken);
    const role = useSelector((state) => state?.authSlice?.user?.role);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      if (!accessToken) {
        dispatch(logout());
        router.push("/login");
      } else if (role === "admin") {
        router.push("/admin");
      } else if (role === "user") {
        router.push("/user");
      }
    }, [accessToken, router, dispatch, role]);

    // Render the wrapped component if authenticated
    return accessToken ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;
