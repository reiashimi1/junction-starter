import { useDispatch, useSelector } from "react-redux";
import PositionedSnackbar from "@/core/alerts/PositionedSnackbar";
import { hideToast } from "@/app/GlobalRedux/Features/toastSlice";

const Toast = () => {
  const show = useSelector((state) => state.toastSlice.show);
  const message = useSelector((state) => state.toastSlice.message);
  const success = useSelector((state) => state.toastSlice.success);
  const dispatch = useDispatch();

  if (!show) {
    return null;
  }

  return (
    // <div className="fixed top-10 left-0 w-full h-full">
    <div className="fixed top-12 right-2 animate-bounce text-lg uppercase z-50 rounded-xl hover:opacity-90 hover:cursor-pointer w-80">
      {!!show && (
        <PositionedSnackbar
          message={message}
          onClear={() => dispatch(hideToast())}
          success={success}
        />
      )}
    </div>
    // </div>
  );
};

export default Toast;
