'use client'
import React, { useState } from 'react'
import DashboardHeader from './DashboardHeader'
import DashBoardWidget from "../../components/Admin/Widget/DashBoardWidget"


type Props = {
  isDashboard?:boolean;
}

const DashboardHero = ({isDashboard}: Props) => {
  const [open,setOpen]=useState(false);

  return (
    <div>
        <DashboardHeader open={open} setOpen={setOpen} />
        {
          isDashboard && (
            <DashBoardWidget open={open}/>
          )
        }
    </div>
  )
}

export default DashboardHero