"use-client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
// import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/avatar.png";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setroute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, open, setOpen, route, setroute }) => {
  const [active, setactive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const {data}=useSession();  // for getting data from social logins
  // console.log("Data is:",data);

  // console.log("User is:",user);
  const [socialAuth,{isSuccess,error}]=useSocialAuthMutation();

  useEffect(() => {
    
    if(!user){
      if(data){
        socialAuth({email:data?.user?.email, name:data?.user?.name,avatar: data?.user?.image})
      }
    }
    
    if(isSuccess){
      toast.success("Login successfull")
    }
  }, [data,user])
  
  

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

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  return (
    <div className="w-full relative">
      <div className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow transition duration-500"
        }`}
      >
        <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
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
              <NavItems activeItem={activeItem} isMobile={false} />
              {/* <ThemeSwitcher />   */}

              {/* only for mobile */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user?.avatar ? user.avatar : avatar}
                    alt="avatar"
                    className="w-[30px] h-[30px] rounded-full cursor-pointer "
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden md:block cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* mobile sidebar */}
        <div
          className={`fixed w-full h-screen top-0 left-0 z-[99999] transition-all duration-500 ${
            openSidebar
              ? "bg-[#0000024] dark:bg-[unset] opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={handleClose}
          id="screen"
        >
          <div
            className={`w-[75%] max-w-[320px] h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 fixed top-0 right-0 z-[99999999] shadow-lg rounded-l-lg transition-transform duration-500 ${
              openSidebar ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Menu
                </h2>
                <HiOutlineUserCircle
                  size={28}
                  className="cursor-pointer text-gray-600 dark:text-gray-300"
                  onClick={() => setOpen(true)}
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                <NavItems activeItem={activeItem} isMobile={true} />
              </div>
              <div className="mt-6 border-t pt-4 border-gray-300 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Copyright &copy; 2025 Academia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setroute={setroute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}

      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setroute={setroute}
              activeItem={activeItem}
              component={Signup}
            />
          )}
        </>
      )}

      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setroute={setroute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
