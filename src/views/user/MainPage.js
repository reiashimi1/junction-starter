"use client";

import MapComponent from "@/components/map/MapComponent";
import React, { useEffect, useState } from "react";
import BottomMenu from "@/components/users/BottomMenu";
import LandingCard from "@/components/landingPage/LandingCard";
import AccountView from "@/views/AccountView";
import {
  hideLoginSpinner,
  showLoginSpinner,
} from "@/app/GlobalRedux/Features/loginSpinnerSlice";
import { useDispatch } from "react-redux";
import LoginSpinner from "@/layouts/LoginSpinner";

const MainPageView = () => {
  const [screen, setScreen] = useState(0);
  const [chargeEvent, setChargeEvent] = useState(false);

  const dispatch = useDispatch();

  const onCharge = () => {
    setChargeEvent(true);
  }

  useEffect(() => {
    dispatch(showLoginSpinner());
    const timer = setTimeout(() => {
      dispatch(hideLoginSpinner());
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center">
      <>
        <div className="flex inset-0 z-10">
          <BottomMenu changeScreen={setScreen} />
        </div>
        <div className={screen === 0 ? "block" : "hidden"}>
          <MapComponent normalCharge={chargeEvent} />
        </div>
        {screen === 1 && <LandingCard onCharge={onCharge} />}
        {screen === 2 && <AccountView />}
      </>
      <LoginSpinner />
    </div>
  );
};

export default MainPageView;
