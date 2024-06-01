"use client";

import Layout from "@/layouts/GuestLayout/Layout";
import { useState } from "react";
import SidebarItem from "@/components/account/SidebarItem";
import ChangeName from "@/components/account/ChangeName";
import ChangeEmail from "@/components/account/ChangeEmail";
import ChangePassword from "@/components/account/ChangePassword";
import { Person, Email, Https, Phone,CreditCard } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "@/app/GlobalRedux/Features/authSlice";
import ChangePhoneNumber from "@/components/account/ChangePhoneNumber";
import Card from "@/components/account/CardContent";

const AccountView = () => {
  const [activeItem, setActiveItem] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.authSlice?.user);

  const handleSuccess = (name, email, phoneNumber) => {
    dispatch(refreshUser({ name, email, phoneNumber }));
  };

  const Tabs = [
    {
      id: "change-name",
      icon: <Person />,
      label: "Change name",
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
      id: "change-email",
      icon: <Email />,
      label: "Change email",
      view: (
        <ChangeEmail
          email={user?.email}
          name={user?.name}
          phoneNumber={user?.phone_number}
          onSuccess={handleSuccess}
        />
      ),
      access: true,
    },
    {
      id: "change-phone-number",
      icon: <Phone />,
      label: "Change phone number",
      view: (
        <ChangePhoneNumber
          email={user?.email}
          name={user?.name}
          oldPhoneNumber={user?.phone_number}
          onSuccess={handleSuccess}
        />
      ),
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
  ];

  return (
    <Layout>
      <div className="flex flex-col pt-28">
        <div className="flex md:flex-row flex-col bg-slate-50 2xl:w-4/5 mx-auto pr-5 py-10 rounded-xl border shadow-xl md:h-2/3 h-5/6 md:w-2/3 w-5/6">
          <div className="top-0 min-w-max md:border-r md:border-b-0 border-b md:px-7 px-5 md:pb-0 pb-3">
            <div className="mb-4">
              <div className="font-semibold text-2xl break-words mb-1 text-gray-700 text-center mt-10">
                {user?.firstName} {user?.lastName}
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
      </div>
    </Layout>
  );
};

export default AccountView;
