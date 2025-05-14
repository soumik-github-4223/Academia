import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setactive: (active: number) => void;
  logoutHandler: any;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setactive,
  logoutHandler,
}) => {
  return (
    <div className="w-full pr-6">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "bg-slate-800  " : "bg-transparent"
        } hover:bg-slate-700 `}
        onClick={() => setactive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt=""
          width={20}
          height={20}
          className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full "
        />
        <h5 className="pl-2 md:block hidden font-Poppins text-white  ">
          My Account
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "bg-slate-800  " : "bg-transparent"
        } hover:bg-slate-700 `}
        onClick={() => setactive(2)}
      >
        <RiLockPasswordLine size={20} fill="#fff" />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black ">
          Change password
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "bg-slate-800  " : "bg-transparent"
        } hover:bg-slate-700 `}
        onClick={() => setactive(3)}
      >
        <SiCoursera size={20} fill="#fff" />
        <h5 className="pl-2 md:block hidden font-Poppins text-white  ">
          Enrolled Courses
        </h5>
      </div>

      {user.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 6 ? "bg-slate-800  " : "bg-transparent"
          } hover:bg-slate-700 `}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings size={20} fill="#fff" />
          <h5 className="pl-2 md:block hidden font-Poppins text-white  ">
            Admin Dashboard
          </h5>
        </Link>
      )}

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "bg-slate-800  " : "bg-transparent"
        } hover:bg-slate-700 `}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} fill="#fff" />
        <h5 className="pl-2 md:block hidden font-Poppins text-white  ">
          Logout
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
