'use client'
import React from 'react';
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import Heading from "../../utils/Heading";
import DashboardHeader from '../components/Admin/DashboardHeader'
import UserAnalytics from "../components/Admin/Analytics/UserAnalytics";


type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="Academia - Admin"
        description="Elearning is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <div className="w-1/6">
          <AdminSidebar />
        </div>
        <div className="w-[85%] min-h-screen">
          <DashboardHeader />
          <UserAnalytics />
        </div>
      </div>
    </div>
  )
}

export default page;