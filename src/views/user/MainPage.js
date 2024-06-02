"use client";

import MapComponent from "@/components/map/MapComponent";
import Layout from "@/layouts/UserLayout/Layout";

const MainPageView = () => {
  return (
    <div className="flex flex-col justify-center py-8 px-2">
      <MapComponent />
    </div>
  );
};

export default MainPageView;
