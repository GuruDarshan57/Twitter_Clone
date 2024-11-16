import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { MdHomeFilled } from "react-icons/md";
import { HiOutlineBell } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiUser } from "react-icons/hi2";
import Link from "next/link";
import { useGetCurrentUserDetails } from "@hooks/user";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  functional: boolean;
  redirect?: string;
}

const MobileNavbar = () => {
  const { user } = useGetCurrentUserDetails();
  const [active, setActive] = useState("Home");

  const MenuItems: MenuItem[] = [
    {
      name: "Home",
      icon: <GoHome />,
      activeIcon: <MdHomeFilled />,
      functional: true,
      redirect: "/",
    },
    {
      name: "Notifications",
      icon: <HiOutlineBell />,
      functional: false,
    },
    {
      name: "Messages",
      icon: <HiOutlineEnvelope />,
      functional: false,
    },
    {
      name: "Profile",
      icon: <HiOutlineUser />,
      activeIcon: <HiUser />,
      functional: true,
      redirect: `/user/${user?.id}`,
    },
  ];
  return (
    <div className="w-full flex justify-between p-2 px-5 bg-black text-3xl border-t-[0.7px] border-slate-600">
      {MenuItems.map((item) => (
        <span className="p-1">
          <Link
            href={item.redirect ? item.redirect : ""}
            onClick={() => setActive(item.name)}
            className={`${
              item.functional ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            {active === item.name ? item.activeIcon : item.icon}
          </Link>
        </span>
      ))}
      <button className="p-4 bg-sky-600 hover:bg-sky-700 rounded-full mobile:hidden absolute right-2 -top-16">
        <svg
          className="fill-current block h-6 w-6 xl:hidden"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <g>
            <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default MobileNavbar;
