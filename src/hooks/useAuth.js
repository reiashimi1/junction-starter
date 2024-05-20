import { useSelector } from "react-redux";

const useAuth = () => {
  const accessToken = useSelector((state) => state?.authSlice?.accessToken);

  return accessToken ? `Bearer ${accessToken}` : null;
};

export default useAuth;
