import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/GlobalRedux/Features/authSlice";

const withoutAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const accessToken = useSelector((state) => state?.authSlice?.accessToken);
    const role = useSelector((state) => state?.authSlice?.user?.role);
    const router = useRouter();
    const dispatch = useDispatch();

    const searchParams = useSearchParams();
    const product = searchParams.get("product");

    useEffect(() => {
      if (!!accessToken) {
        if (role === "admin") {
          if (product != null) {
            router.push(`/admin/products/view?id=${product}`);
          } else {
            router.push("/admin/");
          }
          // } else if (role === "guest") {
        } else {
          if (product != null) {
            router.push(`/user/products/view?id=${product}`);
          } else {
            router.push("/user/products");
          }
        }
        // TODO: What if role is no there, handle this case -- handled with comment above
      } else {
        dispatch(logout());
      }
    }, [accessToken, role, router, dispatch, product]);

    return accessToken ? null : <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withoutAuth;
