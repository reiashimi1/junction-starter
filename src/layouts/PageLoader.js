import { useSelector } from "react-redux";

const PageLoader = () => {
  const show = useSelector((state) => state.loaderSlice.show);
  const message = useSelector((state) => state.loaderSlice.message);

  if (!show) {
    return null;
  }

  return (
    <div
      className="w-full h-full fixed flex justify-center items-center top-0 left-0"
      style={{ backgroundColor: "grey", opacity: ".7", zIndex: 9999 }}
    >
      <span className="text-white flex flex-col items-center relative text-center">
        <div className="animate-bounce text-xl uppercase">{message}</div>
      </span>
    </div>
  );
};

export default PageLoader;
