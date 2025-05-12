"use client";
import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashBoardWidget from "../../components/Admin/Widget/DashBoardWidget";

type Props = {
  isDashboard?: boolean;
};

const DashboardHero = ({ isDashboard }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row">
      <div>
        <DashboardHeader open={open} setOpen={setOpen} />
      </div>
      <div className="mt-10 w-full mr-6 ">
        {isDashboard && (
            <DashBoardWidget open={open} />
        )}
      </div>
    </div>
  );
};

export default DashboardHero;
