import { useSelector } from "react-redux";

const LoginSpinner = () => {
  const show = useSelector((state) => state.loginSpinner.show);
  const message = useSelector((state) => state.loginSpinner.message);

  if (!show) {
    return null;
  }

  return (
    <div
      className="w-full h-full fixed flex justify-center items-center top-0 left-0"
      style={{ backgroundColor: "grey", opacity: "1", zIndex: 9999 }}
    >
      <span className="text-white flex flex-col items-center relative text-center">
        <div className="animate-bounce text-xl uppercase">HEREEE</div>
      </span>
    </div>
  );
};

export default LoginSpinner;
