"use client";

import MapComponent from "@/components/map/MapComponent";
import Layout from "@/layouts/UserLayout/Layout";
import React, { useState } from "react";
import BottomMenu from "@/components/users/BottomMenu";
import MapFilter from "@/views/user/MapFilter";
import SearchInput from "@/core/inputs/SearchInput";
import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import MapMarker from "@/components/map/MapMarker";
import LandingCard from "@/components/landingPage/LandingCard";
import AccountView from "@/views/AccountView";

const MainPageView = () => {
  const [screen, setScreen] = useState(1);

  return (
    <div className="flex flex-col justify-center">
      <>
        <div className="flex inset-0 z-10">
          <BottomMenu changeScreen={setScreen} />
        </div>
        {screen === 0 && <MapComponent />}
        {screen === 1 && <LandingCard />}
        {screen === 2 && <AccountView />}
      </>
    </div>
  );
};

export default MainPageView;
