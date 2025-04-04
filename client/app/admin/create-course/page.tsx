'use client'
import React from 'react'
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import Heading from '../../../app/utils/Heading'
import CreateCourse from '../components/Admin/Course/CreateCourse'
import DashboardHeader from '../components/Admin/DashboardHeader'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading
            title="Academia- admin"
            description="Academia is a learning plaform for technical courses"
            keywords="Academia, technical courses, learning, Programming"
        />
        <div className="flex">
            <div className="w-1/5">
            <AdminSidebar/> 
            </div>
            <div className="w-[85%]">
                <DashboardHeader/>
                <CreateCourse/>
            </div>
        </div>
    </div>
  )
}

export default page