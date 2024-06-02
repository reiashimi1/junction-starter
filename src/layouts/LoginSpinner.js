import { useSelector } from "react-redux";
import LandingPageViewTest from "@/views/test/LandingPageViewTest";

const LoginSpinner = () => {
  const show = useSelector((state) => state.loginSpinner.show);
  const message = useSelector((state) => state.loginSpinner.message);

  if (!show) {
    return null;
  }

  return (
    <div
      className="w-full h-full fixed flex justify-center items-center top-0 left-0"
      style={{
        background: "linear-gradient(to bottom, #2b004a, #191970)",
        opacity: "1",
        zIndex: 9999,
      }}
    >
      <span className="text-white flex flex-col items-center relative text-center">
        <LandingPageViewTest />
      </span>
    </div>
  );
};

export default LoginSpinner;
