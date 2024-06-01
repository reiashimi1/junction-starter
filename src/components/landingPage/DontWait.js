import Link from "next/link";
import { useDispatch } from "react-redux";
import { showLoader } from "@/app/GlobalRedux/Features/loaderSlice";

const DontWait = () => {
  const dispatch = useDispatch();

  const handleNavigation = () => {
    dispatch(showLoader("Please wait..."));
  };

  return (
    <div className="py-20 flex justify-center bg-gradient-to-b from-darkMagneta-600 to-midnightBlue-700 text-white">
      <div className="border border-indigo-600 shadow-lg lg:rounded-full rounded-xl mx-2 bg-darkSlateBlue-800 text-xl flex flex-col items-center space-y-2 w-full 2xl:max-w-7xl xl:max-w-5xl lg:max-w-4xl max-w-2xl xl:p-8 lg:p-5 p-3 bg-opacity-70 md:hover:translate-x-4 cursor-pointer">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        <div className="text-center">
          and don&apos;t hesitate to review our{" "}
          <Link
            href="/terms-and-conditions"
            onClick={handleNavigation}
            className="underline italic"
          >
            Terms and Conditions
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default DontWait;
