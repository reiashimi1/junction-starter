"use client";

import MapComponent from "@/components/map/MapComponent";
import React, { useEffect, useState } from "react";
import BottomMenu from "@/components/users/BottomMenu";
import LandingCard from "@/components/landingPage/LandingCard";
import AccountView from "@/views/AccountView";
import { useDispatch } from "react-redux";
import {
  hideLoginSpinner,
  showLoginSpinner,
} from "@/app/GlobalRedux/Features/loginSpinnerSlice";

const MainPageView = () => {
  const [screen, setScreen] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoginSpinner("a"));
    if (open) {
      const timer = setTimeout(() => {
        dispatch(hideLoginSpinner());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open, dispatch]);

  return (
    <div className="flex flex-col justify-center">
      <>
        <div className="flex inset-0 z-10">
          <BottomMenu changeScreen={setScreen} />
        </div>
        <div className={screen === 0 ? "block" : "hidden"}>
          <MapComponent />
        </div>
        {screen === 1 && <LandingCard />}
        {screen === 2 && <AccountView />}
      </>
    </div>
  );
};

export default MainPageView;
