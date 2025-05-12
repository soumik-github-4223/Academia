"use client";
import React, { FC, useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/courseApi";
type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setactive] = useState(1);
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const [courses, setCourses] = useState([]);
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  return (
    <div className="w-[85%] flex mx-auto min-h-screen ">
      <div
        className={`w-[60px] md:w-[310px] h-[450px]  bg-opacity-90 rounded-[5px] shadow-sm mt-[80px] sticky ${
          scroll ? "top-[120px] " : "top-[30px] "
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setactive={setactive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo
            avatar={user?.avatar ? user.avatar.url : avatar}
            user={user}
          />
        </div>
      )}

      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword user={user} />
        </div>
      )}

      {active === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[35px] xl:grid-cols-3">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard
                  item={item}
                  key={index}
                  user={user}
                  isProfile={true}
                />
              ))}
          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins">
              You don't have any purchased courses!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
