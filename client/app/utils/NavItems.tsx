import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  // {
  //   name: "Courses",
  //   url: "/courses",
  // },
  {
    name: "About",
    url: "/about",
  },
  // {
  //   name: "Policy",
  //   url: "/policy",
  // },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden md:flex">
      {navItemsData &&
        navItemsData.map((i, index) => (
        <Link href={`${i.url}`} key={index} passHref>
          <span
          className={`${
            activeItem === index
            ? "dark:text-[#37a39a] text-[crimson]"
            : "dark:text-white text-black"
          } text-[18px] px-6 font-Poppins font-[400]`}
          >
          {i.name}
          </span>
        </Link>
        ))}
      </div>

      {isMobile && (
      <div className="md:hidden mt-5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <div className="w-full text-center py-4 border-b border-gray-300 dark:border-gray-700">
        <Link href={"/"} passHref>
          <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
          Academia
          </span>
        </Link>
        </div>

        <div className="mt-4 space-y-3">
        {navItemsData &&
          navItemsData.map((i, index) => (
          <Link href={i.url} key={index} passHref>
            <span
            className={`${
              activeItem === index
              ? "dark:text-[#37a39a] text-[crimson] bg-gray-200 dark:bg-gray-700"
              : "dark:text-white text-black"
            } block text-[18px] px-4 py-2 rounded-lg font-Poppins font-[400] hover:bg-gray-300 dark:hover:bg-gray-600`}
            >
            {i.name}
            </span>
          </Link>
          ))}
        </div>
      </div>
      )}
    </>
  );
};

export default NavItems;
