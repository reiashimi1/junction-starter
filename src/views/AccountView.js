"use client";

import { useState } from "react";
import SidebarItem from "@/components/account/SidebarItem";
import ChangeName from "@/components/account/ChangeName";
import ChangePassword from "@/components/account/ChangePassword";
import {
  Person,
  ParkSharp,
  Https,
  ElectricCarSharp,
  CreditCard,
  CasinoSharp,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout, refreshUser } from "@/app/GlobalRedux/Features/authSlice";
import Card from "@/components/account/CardContent";
import Contribute from "@/components/account/Contribute";
import CarInformation from "@/components/account/CarInformation";
import MenuItem from "@mui/material/MenuItem";
import { theme } from "@/helpers/themeColors";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import { useRouter } from "next/navigation";
import PlaygroundView from "@/views/PlaygroundView";

const AccountView = () => {
  const [activeItem, setActiveItem] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state?.authSlice?.user);

  const handleSuccess = (name, email, phoneNumber) => {
    dispatch(refreshUser({ name, email, phoneNumber }));
  };

  const handleLogout = () => {
    dispatch(showLoader("Logging out"));
    API.post("/auth/lgogout")
      .then(() => {
        dispatch(showLoader("Logged out successfully"));
        dispatch(logout());
      })
      .catch(() => console.error("Could not logout user"))
      .finally(() => {
        router.push("/login");
        dispatch(hideLoader());
        dispatch(logout());
      });
  };

  const Tabs = [
    {
      id: "change-name",
      icon: <Person />,
      label: "Change user data",
      view: (
        <ChangeName
          email={user?.email}
          name={user?.name}
          phoneNumber={user?.phone_number}
          onSuccess={handleSuccess}
        />
      ),
      access: true,
    },
    {
      id: "carInformation",
      icon: <ElectricCarSharp />,
      label: "Car information",
      view: <CarInformation />,
      access: true,
    },
    {
      id: "password",
      icon: <Https />,
      label: "Change password",
      view: <ChangePassword />,
      access: true,
    },
    {
      id: "card",
      icon: <CreditCard />,
      label: "Card",
      view: <Card />,
      access: true,
    },
    {
      id: "plant",
      icon: <ParkSharp />,
      label: "Plant",
      view: <Contribute />,
      access: true,
    },
    {
      id: "play",
      icon: <CasinoSharp />,
      label: "Try your luck",
      view: <PlaygroundView />,
      access: true,
    },
  ];

  return (
    <div className="flex md:flex-row flex-col bg-slate-50 w-full pr-5 border shadow-xl h-full bg-gradient-to-b from-slate-100 to-slate-300 py-4">
      <div className="top-0 min-w-max md:border-r md:border-b-0 border-b md:px-7 px-5 md:pb-0 pb-3">
        <div className="mb-4">
          <div className="flex items-center justify-between font-semibold text-2xl break-words mb-1 text-gray-700 text-center mt-10">
            <div>
              {user?.firstName} {user?.lastName}
            </div>
            <MenuItem onClick={handleLogout}>
              <div style={{ color: theme.palette.red.redA400 }}>Log out</div>
            </MenuItem>
          </div>
          <hr className="my-3" />
        </div>
        <ul className="flex md:items-start items-center flex-col pt-2 pb-4 w-full">
          {Tabs.map(
            (tab, index) =>
              tab.access && (
                <div key={tab.id} className="flex flex-1 w-full">
                  <SidebarItem
                    label={tab.label}
                    icon={tab.icon}
                    onClick={() => setActiveItem(index)}
                    isActive={
                      activeItem === index || (!activeItem && index === 0)
                    }
                  />
                </div>
              ),
          )}
        </ul>
      </div>
      <div className="flex-1 mt-4 p-8">{Tabs[activeItem || 0].view}</div>
    </div>
  );
};

export default AccountView;
