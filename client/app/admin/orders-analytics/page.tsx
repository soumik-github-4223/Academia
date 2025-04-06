'use client'
import React from 'react';
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import Heading from "../../../app/utils/Heading";
import DashboardHeader from '../components/Admin/DashboardHeader'
import OrderAnalytics from "../components/Admin/Analytics/OrderAnalytics";


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
        <div className="w-[85%]">
          <DashboardHeader />
          <OrderAnalytics />
        </div>
      </div>
    </div>
  )
}

export default page;