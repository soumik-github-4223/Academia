'use client'

import React from 'react'
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import Heading from "../../utils/Heading";
import DashboardHeader from '../components/Admin/DashboardHeader'
import AllInvoices from "../components/Admin/Orders/AllInvoices";

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Heading 
        title="Academia - Admin" 
        description="Academia is a platform for students to learn and get help from teachers" 
        keywords="Programing,MERN,Redux,Machine Learning" 
      />
      <div className="flex">
        <div className="lg:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <AllInvoices />
        </div>
      </div>
    </div>
  )
}

export default page