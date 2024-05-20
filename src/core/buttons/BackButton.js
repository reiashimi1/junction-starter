import { Reply } from "@mui/icons-material";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showLoader } from "@/app/GlobalRedux/Features/loaderSlice";

const BackButton = ({ ...props }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const navigateBack = () => {
    dispatch(showLoader("Going back to previous view"));
    router.back();
  };

  return (
    <div {...props}>
      <div
        className="flex max-w-fit text-white text-xl space-x-2 ml-2 hover:cursor-pointer hover:translate-x-2 hover:text-royalBlue-400"
        onClick={navigateBack}
      >
        <Reply />
        <div>Go back</div>
      </div>
    </div>
  );
};

export default BackButton;
