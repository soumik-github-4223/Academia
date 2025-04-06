'use client'
import React from 'react';
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import Heading from "../../../app/utils/Heading";
import DashboardHeader from '../components/Admin/DashboardHeader'
import CourseAnalytics from "../components/Admin/Analytics/CourseAnalytics";


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
          <CourseAnalytics />
        </div>
      </div>
    </div>
  )
}

export default page;