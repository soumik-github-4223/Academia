"use client";
import React, { FC, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

type Props = {
    open?:boolean;
    setOpen?:(open:boolean) => void;
};

const DashboardHeader: FC<Props> = ({open,setOpen}) => {

    return (
        <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
            <div
                className="relative cursor-pointer m-2"
                onClick={() => setOpen(!open)}
            >
                <IoNotificationsOutline className="text-2xl text-white" />
                <span className="absolute -top-2 -right-2 bg-green-500 rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
                    3
                </span>
            </div>
            {open && (
                <div className="w-[300px] h-[50vh] bg-[#111C43] shadow-xl absolute top-16 right-5 z-10 rounded-lg overflow-hidden">
                    <h5 className="text-center text-[20px] font-semibold border-b border-[#ffffff47] text-white p-4">
                        Notifications
                    </h5>
                    <div className="overflow-y-auto h-full">
                        <div className="bg-[#2d3a4e] border-b border-[#ffffff47] p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-white font-medium">New Question Received</p>
                                <button className="text-sm text-green-400 hover:underline">
                                    Mark as read
                                </button>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit.
                            </p>
                            <p className="text-xs text-gray-500 mt-1">5 days ago</p>
                        </div>
                        <div className="bg-[#2d3a4e] border-b border-[#ffffff47] p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-white font-medium">New Question Received</p>
                                <button className="text-sm text-green-400 hover:underline">
                                    Mark as read
                                </button>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit.
                            </p>
                            <p className="text-xs text-gray-500 mt-1">5 days ago</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHeader;
