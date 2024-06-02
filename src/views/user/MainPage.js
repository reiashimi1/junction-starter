"use client";

import MapComponent from "@/components/map/MapComponent";
import Layout from "@/layouts/UserLayout/Layout";

const MainPageView = () => {
  return (
    <div className="flex flex-col justify-center">
      <MapComponent />
    </div>
  );
};

export default MainPageView;
