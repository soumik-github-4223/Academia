"use-client";
import Link from "next/link";
import React, { FC, useState } from "react";
import NavItems from "../utils/NavItems"

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header: FC<Props> = ({activeItem}) => {
  const [active, setactive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  if (typeof window !== "undefined") {
    // for sticky header
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setactive(true);
      } else {
        setactive(false);
      }
    });
  }

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                {" "}
                Academia
              </Link>
            </div>
            <div className="flex items-center">
                <NavItems
                    activeItem={activeItem}
                    isMobile={false}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
