import React, { useEffect, useMemo, useState } from "react";
// import { Line } from "rc-progress";
import API from "@/helpers/APIServices/API";
import { useRouter } from "next/navigation";

const ProgressBar = ({ airlineId }) => {
  const router = useRouter();
  const [loyaltyProgram, setLoyaltyProgram] = useState("");

  useEffect(() => {
    if (airlineId) {
      // API.get(`/users/loyalty-programs/${airlineId}`)
      //   .then((res) => {
      const loyaltyProgram = { score: 69, threshold: 96 };
      setLoyaltyProgram(loyaltyProgram);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }
  }, [airlineId]);

  const percentage = useMemo(
    () => (loyaltyProgram?.score * 100) / loyaltyProgram?.threshold,
    [loyaltyProgram],
  );

  return (
    <div className="mt-10 w-auto">
      {/*<div className="font-semibold text-xl">Check your loyalty</div>*/}
      {/*<Line percent={percentage} strokeWidth={4} strokeColor="#026e04" />*/}
      {/*<div>*/}
      {/*  {percentage >= 100 ? (*/}
      {/*    <p*/}
      {/*      onClick={() => router.push("/")}*/}
      {/*      className="flex justify-end text-indigo-800 cursor-pointer block px-3 rounded-md font-medium"*/}
      {/*    >*/}
      {/*      Check your offers page!*/}
      {/*    </p>*/}
      {/*  ) : (*/}
      {/*    <p className="flex justify-end text-indigo-800 block px-3 rounded-md font-medium">*/}
      {/*      Score: {loyaltyProgram?.score} (Nice) / {loyaltyProgram?.threshold}*/}
      {/*    </p>*/}
      {/*  )}*/}
      {/*</div>*/}1
    </div>
  );
};

export default ProgressBar;
