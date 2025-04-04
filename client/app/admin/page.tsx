'use client";'
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "./components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "./components/Admin/DashboardHero";



type Props = {};

const page = (props: Props) => {
  
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Academia- admin"
          description="Academia is a learning plaform for technical courses"
          keywords="Academia, technical courses, learning, Programming"
        />
        <div className="flex h-[200vh]">
          <div className="w-1/5">
            <AdminSidebar />
          </div>

          <div className="w-[95%] ">
            <DashboardHero/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
