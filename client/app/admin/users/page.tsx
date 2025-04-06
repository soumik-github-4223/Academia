'use client'

import DashboardHero from '../components/Admin/DashboardHero'
import AdminProtected from '../../hooks/adminProtected'
import Heading from '../../utils/Heading'
import React from 'react'
import Sidebar from '../components/Admin/sidebar/AdminSidebar'
import AllUsers from "../../admin/users/AllUsers"

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Academia - Admin"
          description="Academia is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="w-1/6">
            <Sidebar />
          </div>
          <div className="w-5/6">
            <DashboardHero />
            <AllUsers/>
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default page